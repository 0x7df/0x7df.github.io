Title: CUDA basics part 1
Date: 2015-04-05 20:59
Author: 0x7df
Category: Computer science
Tags: C, CUDA, GPU, HPC, massively parallel, parallel computing, parallel programming
Slug: cuda-basics-part-1
Status: published

Introduction
------------

[CUDA (Compute Unified Device
Architecture)](http://en.wikipedia.org/wiki/CUDA)is an extension of
[C/C++](http://www.tutorialspoint.com/cprogramming/c_overview.htm),
developed by [NVIDIA](http://www.nvidia.com/page/home.html), the
[GPU](http://www.webopedia.com/TERM/G/GPU.html)manufacturer, for
programming their devices. (There is also a [Fortran
version](https://www.pgroup.com/resources/cudafortran.htm), developed by
[PGI](http://www.pgroup.com/).) The purpose of CUDA is to allow
developers to program GPUs much more easily than previously, and since
its inception in 2007, the use of GPUs has opened up beyond just
graphics to more general, e.g. scientific, computing, which is often
referred to as general-purpose GPU computing -
[GPGPU](http://en.wikipedia.org/wiki/General-purpose_computing_on_graphics_processing_units).

CUDA is proprietary, which in my opinion disqualifies it from use in
major code development. The lifetime of high-performance scientific and
engineering codes is typically decades, and given [the uncertainty
surrounding supercomputing
architectures](http://dx.doi.org/10.1017/S0962492912000050), a credible
candidate for a programming model needs to be supported by a wide range
of compilers and on a wide range of platforms. (A similar programming
language is [OpenCL](https://www.khronos.org/opencl/), which as the name
suggests, is an open standard, being developed by a consortium of
organisations.) However, the [point has been
made](https://www.coursera.org/course/hetero)that CUDA is a useful
teaching vehicle for the basic concepts of programming heterogeneous,
many-core supercomputers.

Heterogeneous Computing
-----------------------

Let's assume here that the model is heterogeneous; i.e. there are CPUs
(hosts) and GPUs (devices) working in conjunction, and that the
application runs on the CPU host, handing specific, highly
[data-parallel](http://queue.acm.org/detail.cfm?id=1365499) parts of the
program off to the device as and when appropriate. Also , we assume
initially that the CPU part is basically serial; that is, we're not
combining CUDA with [MPI](http://www.mpi-forum.org/) at this stage.

To exploit this kind of architecture, it's necessary to *kernelise* the
code: identify parts of it suitable for a high level of concurrency,
turn them into kernel functions that are handed over to the GPU device.
These will typically be portions of the code that are highly
data-parallel - i.e. loops over large sets of data items where the
iterations of the loops are independent of each other. A nice example is
a simple "DAXPY" loop (i.e. a double precision *Ax* + *y* vector
addition) or "DAXBY" loop (*Ax* × *y*), implemented here in C:

    void vectorAdd(int n, double a, double *x, double *y) {
        for (int i = 0; i < n; ++i) {  
            y[i] = a*x[i] + y[i];
        }
    }

Note that the element indices are all `i`; there's no use of data from
previous iterations of the loop. It's this absence of *loop-carried
dependencies* that makes this loop data-parallel, and therefore suitable
for threading. Essentially, we can calculate all the iterations of the
loop independently, in any order; hence we can pass it to a GPU and
invoke as many threads as there are elements, to do the work as
concurrently as possible.

GPU hardware overview
---------------------

### Threading

This post is about how to program using CUDA, but to understand what's
going on it's necessary to have a minimum of knowledge about the
hardware architecture. A single GPU is comprised of a set of what are
known, in NVIDIA's terminology, as *streaming multiprocessors* (SMs);
these are, according to [Hennessy and
Patterson](http://booksite.elsevier.com/9780123838728/), "multithreaded
[SIMD](http://en.wikipedia.org/wiki/SIMD) processors", with the nearest
non-GPU equivalent being a multithreaded [vector
processor](http://www.phy.ornl.gov/csep/ca/node24.html). The typical
number of SMs in one GPU is between 2 and 30, varying from generation to
generation. Each SM can support a maximum number of threads at one time,
typically in the low thousands (e.g. 1,536) ; so overall the GPU can
handle tens of thousands of threads simultaneously. A key aspect of the
GPU is that, as well as being massively multithreaded, it also has a
SIMD aspect. The threads assigned to a streaming multiprocessor are
grouped into sets of 32 threads, called *warps*. Each 32-thread warp is
dealt with by the SM in a SIMD fashion; that is, each instruction is
fetched once and executed for all 32 threads at the same time. So all
the threads in a particular warp are progressed in lock-step. Hence
there are two types of parallelism at play in a GPU:

1.  Multithreading (a kind of[SPMD - single program/multiple data
    parallelism](en.wikipedia.org/wiki/SPMD)), where different
    processors execute the same program independently, on different
    subsets of the data; and
2.  SIMD (single instruction/multiple data), where each processor is
    executing the same instruction at the same time as every other.

Note that the SIMD aspect causes problems in cases where, as a result of
the logic of the particular bit of code being executed, different
threads within the same warp end up going down different paths through
the code, and therefore require different instructions. The GPU can
handle this *control divergence*, but execution becomes inefficient; so
it's something the programmer needs to be aware of and think explicitly
about avoiding.

### Memory

As will become clear, it's also vitally important to understand the
memory hierarchy of a GPU. As well as, and separate from, the host CPU's
memory (and we'll ignore the
[hierarchy](http://www.bottomupcs.com/memory.html)there), the GPU device
has several different levels of memory:

![gpu_layout](https://0x7df.files.wordpress.com/2015/02/gpu_layout.png)

-   The main *global memory* or *device memory*, which is accessible to
    all the threads on the GPU,
-   The *constant memory*, also globally accessible,
-   The *shared memory*, of which each streaming multiprocessor has its
    own private bank, accessible to only the threads on that SM, and
-   The per-thread *private memory*.

On reaching a portion of the code that is data parallel and suitable for
passing to the GPU, the programmer allocates memory in the device's
global memory, and then uses CUDA commands to transfer data items from
the CPU host memory into the global memory. Calculated quantities then
need to be explicitly transferred back again. This is where we see the
first key difference from [OpenMP](www.openmp.org) threading; in that
model, variables and arrays in memory are declared as either private
(each thread has its own copy) or global (every thread sees the same bit
of memory); but either way they all reside on the same memory hardware.
In CUDA we explicitly have to transfer data from CPU to GPU memory space
and back again.

The global (device) memory is the only memory that the host CPU can read
and write to. Transfers into shared memory and private memory can be
done only by the GPU itself.

Threads and blocks
------------------

When we implement a CUDA kernel function, which is a chunk of highly
data-parallel code that will be handled by a large set of threads
working concurrently, we arrange the threads into a *grid* of *thread
blocks*. We'll worry about why this is, later; for now just note that a
grid is a three-dimensional construction of *l ×* *m* × *n* thread
blocks, each of which is three-dimensional grouping of *i* × *j* × *k*
threads. The actual values of *i*, *j*, ... to be used are defined in
the host code by the special CUDA statements:

    dim3 gridDims(l,m,n);  
    dim3 blockDims(i,j,l);  
    myKernel<<<gridDims,blockDims>>>(args);  

The third statement launches the kernel function called `myKernel`, and
is a standard C function call statement - i.e. `myKernel(args)` - but
with the special CUDA notation - `<<<gridDims, blockDims>>>` - rather
unpleasantly intruding between the function name and its arguments. The
previous two lines define the variables `gridDims` and `blockDims` as
having `dim3` type.

CUDA requires that the blocks be independent of each other; there is no
way to communicate between different blocks that are executing.

The reason for grouping threads together into blocks, is so that the
streaming multiprocessor can switch between threads (or really between
warps, which are sets of 32 threads that are always executed in
lock-step) - this means that one warp is waiting for a memory access,
the SM can switch to another in the meantime.

Vector addition - host code
---------------------------

The host C code running on the CPU will look something like this:

    int main(int argc, char **argv) {
        int n, gridSize;  
        float *hostX, *hostY;  
        float *deviceX, *deviceY;  
        cudaError_t err;

        // Allocate and populate the hostX and hostY vectors

        // Allocate GPU memory  
        int size = n*sizeof(float);  
        err = cudaMalloc((void **) &deviceX, size);  
        err = cudaMalloc((void **) &deviceY, size);

        // Copy memory to the GPU  
        err = cudaMemcpy(deviceX, hostX, size, cudaMemcpyHostToDevice);  
        err = cudaMemcpy(deviceY, hostY, size, cudaMemcpyHostToDevice);
        
        // Initialize the grid and block dimensions  
        dim3 gridDims(ceil(n/256),1,1);  
        dim3 blockDims(256,1,1);
        
        // Launch the GPU Kernel  
        myKernel<<<gridDims,blockDims>>>(n, deviceX, deviceY);
        
        // Copy the GPU memory back to the CPU  
        err = cudaMemcpy(hostY, deviceY, size, cudaMemcpyDeviceToHost);
        
        // Free the GPU memory  
        err = cudaFree(deviceX);  
        err = cudaFree(deviceY);
        
        // Do something with the solution, free the host  
        // arrays, return  
    }  

In the definition of the grid and block dimensions, we've chosen to have
256 threads per block, and therefore *n*/256 blocks (and we've used the
ceiling function to make sure the number of blocks is rounded *up* to
the nearest integer if *n* isn't divisible by 256). The grid and the
blocks are one-dimensional, for simplicity.

Hopefully, the various CUDA functions that are called - `cudaMalloc`,
`cudaMemcpy` and `cudaFree` - are fairly self-explanatory, and are [well
documented](http://docs.nvidia.com/cuda/cuda-c-programming-guide).

Vector addition - kernel code
-----------------------------

The CUDA kernel function that is called looks like this:

    __global__ void vecAdd(int n, float *x, float *y) {  
        int i = threadIdx.x + blockDim.x*blockIdx.x;  
        if (i < n) y[i] = x[i] + y[i];  
    }  

The first difference from an ordinary C function is the `__global__`
keyword at the beginning of the function declaration. The compiler needs
to distinguish between functions for the host CPU and kernel functions
intended for the GPU; it does this using the keywords `__host__` for the
former, and either `__global__` or `__device__` for the latter. The
second difference is the existence of the pre-defined variables
`threadIdx` and `blockIdx`, which give the (*x*, *y*, *z*) indices of
the thread within the block, and of the block within the grid,
respectively; and `blockDim`, which gives the (*x*, *y*, *z*) dimensions
of the block, as defined in the function call.

The `if` statement is included for the case where *n* is not divisible
by 256 and therefore we have `ceil(n/256)` blocks, resulting in there
being more threads than elements in the vector(s).

Parallel efficiency
-------------------

If we ignore the multiplication by the constant *A* for the moment, and
concentrate on the vector addition `y[i] = x[i] + y[i]`, we can see that
there are three memory accesses (two reads and a write) for each
statement, and only one floating-point calculation (the addition). The
[compute-to-global-memory-access (CGMA)
ratio](http://www.greatlakesconsortium.org/events/GPUMulticore/Chapter4-CudaMemoryModel.pdf)
is therefore 1:3, or 1/3. This is an important metric of the performance
of an application or section of code. We often refer to codes as being
either *compute-bound* or *memory-bound*, depending on whether the
limiting factor on improving their performance is the rate at which we
can do computations, or the rate at which we can retrieve and send data
to and from memory. We'll see now that for a typical GPU, this vector
addition operation is very clearly memory-limited.

A typical memory bandwidth for a GPU might be, say, 200GB/s, which means
that we can load/store:

$$ \frac{200\,\mathrm{GB/s}}{8\,\mathrm{B/memory\:access}} =
25 \times 10^9\,\mathrm{memory\:access/s} $$

Crudely, this limits the actual computation rate to

$$ 25 \times
10^9\,\mathrm{memory\:access/s}\,\times\,0.33\,\mathrm{FLOP}/\mathrm{memory\:access}
\approx 8\,\mathrm{GFLOP/s} $$

The peak theoretical performance of the GPU might be, say, 1000 GFLOP/s
double-precision – i.e. the actual performance obtained is  less than 1%
of peak. This is the case no matter how many threads there are - the
limiting factor is how quickly data can be transferred between the
global memory and the processors.

For this function - simple vector addition - there isn't a great deal we
can do about the fact that it's memory bound. You have to bring back
each pair of elements from *x* and *y* from memory, then put the result
back again - the number of memory operations is irreducible. For more
complex operations, where pieces of data are typically used multiple
times, the trick is to use shared memory, which is much, much faster
than global memory. However, there is obviously much less of it, so only
small chunks of data can be placed there at a time; this means that
programmers need to think very carefully about memory access patterns in
their code, to ensure that multiple uses of a given chunk of data are
grouped as closely together as possible in the flow of the program, so
data isn't continually being placed and replaced in shared memory, via
expensive global memory operations. This is analogous to moving data
from memory into local
[cache](http://searchstorage.techtarget.com/definition/cache-memory) in
a normal CPU, except that in CUDA programming for GPUs, the programmer
is explicitly controlling movement of data between the shared and global
memory.

Actually, one way to improve the vector addition might be to
utilise [instruction-level parallelism
(ILP)](www.cs.iastate.edu/~prabhu/Tutorial/PIPELINE/instrLevParal.html).
In the kernel, the single floating-point operation has to wait for both
of the input vector elements (`x[i]` and `y[i]`) to be retrieved from
global memory before it can begin. Hence if the global memory reads and
writes take *M* clock cycles each, and the floating operation takes *N*,
then the total number of clock cycles is *(M+1)+N+M* (assuming the
second load begins one clock cycle after the first, but otherwise that
they are done simultaneously). This is *2M+N+1*, so to go through it *k*
times is *k(2M+N+1)*.

However, if within the kernel we loaded two values of each input vector,
say `x[i+1]` and `y[i+1]` as well as `x[i]` and `y[i]`, then the
computation of `x[i] + y[i]` starts after *M+1* cycles and takes *N*
cycles, so the result is written back to global memory after *(M+1)+N+M*
cycles as before; *but*, x[i+1] can start to load after 2 cycles, and
y[i+1] after 3 cycles, so computation of `x[i+1] + y[i+1]` can begin
after *M+3* cycles, and still takes *N*. Hence `y[i+1]` has been written
back to global memory after *(M+3)+N+M* cycles. This means the whole
operation to get `x[i] + y[i]` and `x[i+1] + y[i+1]` takes *(M+3)+N+M*
cycles overall, which is only 2 cycles more than it took to get only
`x[i] + y[i]` in the original kernel. For *k* elements, it will take
*k(2M+N+3)/2*. This is basically going to take half the time of the
original (as long as *2M+N* is large enough that the constant doesn't
matter).

Nothing has been done to reduce the
[latency](http://www.hardwaresecrets.com/article/Understanding-RAM-Timings/26/2)of
the memory operations, or to do fewer of them; instead they've been
overlapped as much as possible. This is called *latency-hiding* - doing
other useful things while waiting for data to return from memory.
Actually, at a different level, the concept of latency-hiding is also
fundamental to the GPU and threading; by dividing up the data to be
processed into small chunks, and having many different threads operate
on those chunks, the GPU has much more flexibility to schedule work so
that memory latency can be hidden. For this reason, GPUs are described
as *throughput-oriented* - they are more concerned with operating on
lots of data concurrently so they need to worry less about latency;
whereas CPUs, on the other hand, are *latency-oriented*, and are
designed with as many tricks as possible up their sleeve to reduce
latency, under the assumption of, basically, a sequential execution
model.

If the same sequential processor were handling all the elements, like in
a typical CPU, then this
[pipelining](cs.stanford.edu/people/eroberts/courses/soco/projects/risc/pipelining/)
is the sort of thing modern processors try to do for you anyway, without
you having to worry about it.

* * * * *

<div style="background:#FFFFFF;margin:0 10px 10px 0;padding:0 10px 0 0;text-align:left;font-family:Arial, Helvetica, sans-serif;line-height:1em;">
<div style="font-size:11px;padding:0 0 10px;font-weight:bold;color:#045989;">

High-performance computing systems: Status and outlook

</div>

<div style="font-size:11px;">

J. J. Dongarra and A. J. van der Steen (2012).
<a href="http://journals.cambridge.org/action/displayJournal?jid=ANU">Acta Numerica</a>,
<a href="http://journals.cambridge.org/action/displayIssue?iid=8539365">Volume 21 </a>,
<a href="http://journals.cambridge.org/action/displayAbstract?aid=8539374">May 2012, pp.379-474</a>

</div>

</div>
