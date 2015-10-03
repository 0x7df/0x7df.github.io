Title: CUDA basics part 2
Date: 2015-04-21 20:58
Author: 0x7df
Category: Computer science
Tags: C, CUDA, GPU, HPC, massively parallel, parallel computing, parallel programming
Slug: cuda-basics-part-2
Status: published

Introduction
------------

Recently, I posted [a basic introduction to CUDA C for programming
GPUs](https://0x7df.wordpress.com/2015/04/05/cuda-basics-part-1/ "CUDA basics part 1"),
which showed how to do a vector addition. This illustrated some of the
CUDA basic syntax, but it wasn't a complex- enough example to bring to
light some of the trickier issues to do with designing algorithms
carefully to minimise data movement. Here we move on to the more
complicated algorithm for matrix multiplication, *C = AB*, where we'll
see that elements of the matrices get used multiple times, so we'll want
to put them in the shared memory to minimise the number of times they
get retrieved from the much slower global (or device) memory. We'll also
see that, because data that a thread puts into shared memory is only
accessible by the other threads in the same thread block, we need to be
careful how we do this.

Naive matrix multiplication in CUDA
-----------------------------------

First, let's ignore those concerns and put together the simplest
implementation of matrix multiplication; then we'll analyse the memory
access, and see how we can improve on it.

Before we begin, however, some-error checking. Below is a function-like
C macro that will be used to surround each CUDA statement we execute
with a check of the return code. The return code is set to the
pre-defined variable `cudaSuccess` if the statement executed
successfully, or an error value otherwise. (Hence, we declare the
variable that will contain the CUDA statement return to be type
`cudaError_t`.) Where an error value is returned, we pass this to the
CUDA function `cudaGetErrorString`, which returns an error message that
we can print.

`  
\#define cudaCheck(stmt)                                               
\\  
    do \\  
{                                                                \\  
        cudaError_t err = stmt;                                       
\\  
        if (err != cudaSuccess) \\  
{                          \\  
     printf("ERROR: failed to run %s\\n", stmt);                \\  
      printf("ERROR: CUDA error %s\\n", cudaGetErrorString(err)); \\  
      return -1;                                                 \\  
    }                                                              \\  
} while (0)  
`

### Simple matrix multiplication kernel

### [![tiled_matrix_multiplication_1](https://0x7df.files.wordpress.com/2015/03/tiled_matrix_multiplication_1.png?w=296)](https://0x7df.files.wordpress.com/2015/03/tiled_matrix_multiplication_1.png)

Now for the kernel function. The way we've chosen to divide this problem
up amongst threads is to have each thread calculate a single element in
the output vector, *C*. Mathematically, for an *m*-by-*n* matrix *A* and
an *n*-by-*p* matrix *B*, this is:

$$ C_{i,j} = \sum_{k=1}^n A_{i,k}B_{k,j} $$

for each of the *m*-by-*p* elements in *C*. This is illustrated in the
figure, where the input matrices *A* and *B* are shown in grey, and the
result, matrix *C*, in blue; a single element of *C* is highlighted in
red, and the corresponding row and column of *A* and *B* are also
highlighted.

We implement this in CUDA C as follows:

`  
__global__ void matrixMultiply(float *A, float *B,  
float *C, int numACols,  
int numBRows, int numBCols,  
    int numCRows, int numCCols)  
{  
        
// Get the row and column indices of the single  
// element of the output matrix that this thread  
// is dealing with  
    int col = threadIdx.x + blockDim.x*blockIdx.x;  
    int row = threadIdx.y + blockDim.y*blockIdx.y;  
      
// Calculate the output matrix element  
    if ((row < numCRows) && (col < numCCols))  
{  
        float Ctmp = 0;  
        for (int k = 0; k < numACols; ++k)  
{  
            Ctmp += A[row*numACols+k]*B[k*numBCols+col];  
        }  
        C[row*numCCols + col] = Ctmp;  
    }  
}  
`

This is reasonably simple. Each thread figures out which output matrix
element it is responsible for, simply by checking the thread indices. It
proceeds only if the element indices are within the correct bounds of
the output matrix, which may not be the case if there are more threads
than elements (because we have to have a whole number of thread blocks).
Where they are, it retrieves the correct row of *A* and column of *B*,
and calculates the corresponding single element of *C*.

### Naive matrix multiplication host code

For completeness, here is the host code. The new things here that we
didn't see in the vector multiplication example are:

1.  The use of the C macro `cudaCheck` (defined above) for error
    checking
2.  The fact that the grid and the thread blocks are two-dimensional
3.  The call to `cudaDeviceSynchronize()`

`

int main(int argc, char **argv) {

float *hostA, *hostB, *hostC;  
  float *deviceA, *deviceB, *deviceC;  
  int numARows, numACols; // Rows, columns in the matrix A  
  int numBRows, numBCols; // Rows, columns in the matrix B  
  int numCRows, numCCols; // Rows, columns in the matrix C  
    int sizeA, sizeB, sizeC; // Size in memory of each of A, B and C  
    int gridXSize, gridYSize; // Number of thread blocks in x, y
dimensions of grid  
    int blockSize; // Number of threads in block

// Allocate and populate the A and B matrices  
// hostA and hostB, and get numARows, numACols,  
// numBRows, numBCols

// Set numCRows and numCCols  
    numCRows = numARows;  
    numCCols = numBCols;  
      
  // Allocate the C matrix  
    hostC = (float*)malloc(numCRows*numCCols*sizeof(float));  
      
// Allocate GPU memory  
sizeA = numARows*numACols*sizeof(float);  
sizeB = numBRows*numBCols*sizeof(float);  
sizeC = numCRows*numCCols*sizeof(float);  
cudaCheck(cudaMalloc((void **) &deviceA, sizeA));  
cudaCheck(cudaMalloc((void **) &deviceB, sizeB));  
   cudaCheck(cudaMalloc((void **) &deviceC, sizeC));

// Copy data to the GPU  
   cudaCheck(cudaMemcpy(deviceA, hostA, sizeA,
cudaMemcpyHostToDevice));  
   cudaCheck(cudaMemcpy(deviceB, hostB, sizeB,
cudaMemcpyHostToDevice));

// Initialize the grid and block dimensions  
   blockSize = 16;  
   gridXSize = (numCCols-1)/blockSize + 1;  
   gridYSize = (numCRows-1)/blockSize + 1;  
   dim3 dimGrid(gridXSize, gridYSize, 1);  
   dim3 dimBlock(blockSize, blockSize, 1);  
   
   // Launch the GPU Kernel  
   matrixMultiply<<<dimGrid,dimBlock>>>(deviceA, deviceB,  
deviceC, numACols,  
numBRows, numBCols,  
                               numCRows, numCCols);  
  cudaDeviceSynchronize();

// Copy the GPU memory back to the CPU  
   cudaCheck(cudaMemcpy(hostC, deviceC, sizeC,
cudaMemcpyDeviceToHost));

// Free the GPU memory  
   cudaCheck(cudaFree(deviceA));  
   cudaCheck(cudaFree(deviceB));  
   cudaCheck(cudaFree(deviceC));  
   
  // Do something with the solution, free the host memory, return

}  
`

The call to `cudaDeviceSynchronize()` ensures that all threads have
finished before the host code proceeds any further.

### Performance analysis of the naive implementation

Clearly, each of the *mp* elements of *C* requires a full row of *A* and
a full column of *B* - both of length *n* - to be read from memory, and
one value to be written back. Hence there are *(2n + 1)mp* memory
accesses. Re-examining the kernel, we see that there are two floating
point operations per iteration of the inner loop (one multiply and one
add), and *n* iterations of that loop, which is completed for each of
the *mp* elements in the product matrix. Hence, there are 2*nmp* FLOP,
and the CGMA is 2*n*/(2*n* + 1); which is effectively 1, except when the
matrices are very small. With a memory bandwidth of 150 GB/s, the
algorithm is limited to just under 150/8 = 20 GFLOP/s (assuming double
precision), which is still less than 2% of the available compute of our
nominal 1 TFLOP GPU.

Improving on the naive implementation
-------------------------------------

However, it turns out that we can improve on this. So far, all the data
storage has been in global memory, because that's the only permissible
location for CUDA memory allocations in the host code, and that's where
the data stays unless we explicitly move it, once inside the kernel
function (we'll see how later). It's also clear that in this algorithm
data gets re-used frequently. Every row of matrix *A* is used *p* times
and every column of matrix *B* is used *m* times. If we contrive an
algorithm that gets the necessary data into shared memory before it is
needed, and keeps it there while it is being re-used, then we can
clearly reduce the global memory accesses.

However, it's not as though we can read *A* and *B* into shared memory
and have them accessible to all the threads working on the computation;
shared memory isn't globally accessible, despite the name, but is
instead local to a single streaming multiprocessor, and only 'shared'
amongst the threads in whichever thread block is currently assigned to
the SM. Hence our goal is to ensure that the threads in a given thread
block have the subset of input data they need available in their SM's
shared memory, under the general assumption that because of the small
size of the shared memory, not all of the needed data will fit in at
once.

[![tiled_matrix_multiplication_2](https://0x7df.files.wordpress.com/2015/03/tiled_matrix_multiplication_2.png?w=285)](https://0x7df.files.wordpress.com/2015/03/tiled_matrix_multiplication_2.png)Consider
a thread block covering an area of the product matrix *C*, which is *a*
rows high by *a* columns wide, with the top-left element being *i*,*j*
and the bottom-right therefore being *i+a,j+a*. This is shown in the
figure. To compute these values, the rows *i, i+1, ..., i+a* of matrix
*A* and columns *j, j+1, ..., j+a* of matrix *B* are required,
comprising horizontal and vertical strips, respectively, of dimension *a
× n* elements. We assume in general these strips comprise too much data
to move all together to shared memory. Instead, we move a block of
elements from the strip of *A*, and a block of elements from the strip
of *B* - i.e. two blocks of size *a* × *a*, one from each matrix; we
will refer to these as *tiles*. Performing matrix multiplication on
these two tiles creates a tile of partial sums in the *C* elements. When
the next pair of tiles from *A* and *B* are retrieved, the partial sums
are further incremented, until eventually the full strips have been
processed and the final answers are available.

There is still some duplication of global memory accesses, because any
given strip of *A* will be required by all the thread blocks of the *C*
matrix that share the same row indices; and any given strip of *B* will
be required by all the thread blocks of the *C* matrix that share the
same column indices. However, we can see that there is at least *some*
re-use of data in shared memory; each sub-row of the tile from *A* gets
re-used *a* times (for the *a* elements of the output matrix that have
the same row index), as does each sub-column of the tile from *B*. This
data re-use reduces the retrievals from global memory by a factor of
*a*.

Here is the kernel for tiled matrix multiplication.

`

__global__ void matrixMultiply(float *A, float *B, float *C,  
int numARows, int numACols,  
int numBRows, int numBCols,  
int numCRows, int numCCols) {

// Define device shared-memory storage for  
// tiles of the matrices  
// Scope: each tile is accessible by a single  
// block of threads  
__shared__ float tileA[TILE_WIDTH][TILE_WIDTH];  
__shared__ float tileB[TILE_WIDTH][TILE_WIDTH];

// Define abbreviated variables for the  
// block and thread IDs  
// Scope: stored in registers and therefore  
// accessible by single threads  
int bx =  blockIdx.x;  
int by =  blockIdx.y;  
int tx =  threadIdx.x;  
int ty =  threadIdx.y;

// Each thread is responsible for a single  
// element of the product matrix C.  
// Determine which element, from the block  
// and thread indices  
int row = by*TILE_WIDTH + ty;  
int col = bx*TILE_WIDTH + tx;

// Initialise a temp variable for the solution  
// for this matrix element  
// Scope: in register, private to individual thread  
float Ctemp = 0;

// Loop over the tiles in the A and B matrices  
// that will contribute to the calculation of  
// this element in the product matrix. We are  
// looping over columns of A for a given row  
// (equal to the row index of the C element),  
// and over rows of the B matrix for a given  
// column index (equal to the column index of  
// the C element)  
int numTiles = (numACols-1)/TILE_WIDTH + 1;

for (int tl = 0; tl < numTiles; ++tl) {

// Load the tiles into shared memory, so all  
// threads in the block have access to the  
// whole tiles. Each thread needs to load only  
// a single value of each of the A and B tiles.  
if ((row < numARows) && (tl*TILE_WIDTH + tx < numACols)) {  
tileA[ty][tx] = A[row*numACols + tl*TILE_WIDTH + tx];  
} else {  
tileA[ty][tx] = 0.;  
}  
if ((tl*TILE_WIDTH + ty < numBRows) && (col < numBCols)) {  
tileB[ty][tx] = B[(tl*TILE_WIDTH + ty)*numBCols + col];  
} else {  
tileB[ty][tx] = 0.;  
}  
__syncthreads();

// Loop over the elements within the A and B  
// tiles that contribute to this element of C  
for (int k = 0; k < TILE_WIDTH; ++k) {  
Ctemp += tileA[ty][k] * tileB[k][tx];  
}  
__syncthreads();  
}

// Write the final value into the output array  
if ((row < numARows) && (col < numBCols)) {  
C[row*numBCols + col] = Ctemp;  
}  
}  
`

In each thread block, the *a*^2^ threads load two float values each and
perform 2*a* floating-point operations to compute the dot product of the
row and column sub-sections (both of length *a*) required for the single
output matrix element it holds. Hence there are 2*a* computations for
two memory loads, which gives a CGMA ratio of *a*. For the naive
implementation it was 1, so we have improved the CGMA by a factor of *a*
by tiling the data.

There are a few other things to note in the kernel.

1.  The use of the `__shared__` identifier in the allocations statements
    for `tileA` and `tileB` (which are the temporary storage arrays for
    the tiles of *A* and *B*). This keyword is how we cause the storage
    to be allocated in shared memory (and therefore it can be used only
    in `__device__` functions, not `__host__` functions).
2.  `TILE_WIDTH` is a C macro that we assume has been defined elsewhere.
3.  Calculation of the *C* element indices `row` and `col` is done using
    `TILE_WIDTH`, where previously `blockDim.x` and `blockDim.y`
    appeared. This works because we have *defined* the tile to be the
    same size as the thread block. In theory it could be different, but
    doing so gives us the very convenient consequence that each thread
    needs only to load a single element from each of *A* and *B* into
    shared memory to construct the tiles. This means the host code that
    calls the kernel needs to use `TILE_WIDTH` to define the block size:

    `  
    gridXSize = (numCCols-1)/TILE_WIDTH + 1;  
    gridYSize = (numCRows-1)/TILE_WIDTH + 1;  
    dim3 DimGrid(gridXSize, gridYSize, 1);  // gridSize blocks in the
    grid  
    dim3 DimBlock(TILE_WIDTH, TILE_WIDTH, 1); // blockSize threads in
    each block  
    matrixMultiply<<<DimGrid,DimBlock>>>(deviceA, deviceB,
    deviceC, ...  
    `

4.  We have put some logic around the statements that transfer data to
    the shared-memory tile storage. Since we can't guarantee that there
    will be a whole number of thread blocks in the matrix, this prevents
    threads whose `row`, `col` indices are outside the bounds of either
    *A* or *B* from attempting to retrieve data that isn't there.
5.  The appearance of `__syncthreads()`. This is a barrier
    synchronization across all threads that ensures all threads complete
    any work up to this point before any proceed further. Without this,
    some threads could move on to begin computing matrix elements before
    other threads have loaded the correct data into shared memory, and
    out-of-date data could be used.

