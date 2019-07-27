Title: OpenMP 1
Date: 2019-07-27 20:27
Category:  
Modified: 2019-07-27 20:27
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: published

# Overview

OpenMP is a set of extensions to Fortran, C and C++, consisting of compiler
directives, library routines, and environment variables, that allows the
programming of shared-memory applications. Typically it allows parallelism to
be added to an existing application without a major re-write.

The OpenMP programming model is based on the notion of *threads*. Threads are
similar to processes, but as well as having their own private memory, they can
share memory with each other. Different threads can follow different logical
paths through the same code; each thread has its own program counter.

Usually there is one thread per core; there can be more but then the core has
to time-share between the threads, which introduces some overhead. In some
systems there is hardware support for multiple threads per core
(symmetric multithreading (SMT), also known as hyperthreading).

Unlike MPI, threads do not exchange information via messages, but simply via
reading and writing to shared memory.

By default, threads execute independently of each other; there is no
synchronisation. Therefore to ensure correctness, the programmer must ensure
that actions on shared data occur in the correct order. Note that an update to
a shared variable, e.g. `x = x + 1`, is not atomic. If there are two threads, the
correct result is `x + 2`, but it is possible for thread 1 to read `x`, and then
for thread 2 to read `x` before thread 1 has incremented the value and written it
back to `x`. The final result would be `x + 1`.

The most common OpenMP idiom is the parallelisation of loops, where the
iterations of the loop are independent of each other.

For example, in:

    :::fortran
    do i = 1, imax
        a(i) = a(i) + b(i)
    end do

the loop iterations are independent of each other and the loop can be parallelised, whereas:

    :::fortran
    do i = 2, imax
        a(i) = a(i-1) + a(i) 
    end do

has a *loop-carried dependency*. The loop iterations must be done in the
correct order to obtain the correct result.

In the former case the loop iterations can be carried out in any order, and can
therefore be shared amongst a number of threads. If `imax = 100` and there are
two threads, we could do iterations 1-50 on thread 1 and 51-100 on thread 2,
giving essentially a factor of two increase. (In practive the overhead of
creating and managing the threads reduces, often drastically, the speedup.)

A *reduction* operation produces a single value from a set of values, e.g. the
sum, product, maximum, minimum, etc. For example, consider the loop: 

    :::fortran
    x = 0
    do i = 1, n
        x = x + y[i]
    enddo

For correctness we would need to ensure only one thread at a time incremented
`x`, which would destroy all the parallelism. It's better if each thread performs
its own private reduction, and then these per-thread results are reduced to the
final answer. If the number of threads is small relative to the number of
values being aggregated, then there is still substantial parallelism.

# Implementation

OpenMP is implemented in source code by means of *compiler directives*; these are special
source code lines that are only meaningful to certain OpenMP-compliant compilers. Directives are
protected by a *sentinel*, which for OpenMP is:

- `!$OMP` for Fortran
- `#pragma omp` for C/C++

Clearly the directive appears as an ordinary comment and is therefore ignored by the
compiler if the compiler is not OpenMP-compliant, or if OpenMP is not requested.

For example:

    :::fortran
    program hello_world
        !$OMP PARALLEL
        write(*,*) "Hello world!"
        !$OMP END PARALLEL
    end program hello_world

To compile an OpenMP program, the addition of a (compiler-dependent) flag at
the compile and link steps makes OpenMP available. E.g. using GCC:

    :::bash
    $ gfortran -fopenmp -o hello_world hello_world.f95

OpenMP is built into most compilers. The flag for Intel compilers is `-openmp`.
OpenMP is on by default in the Cray compiler.

The number of threads at run-time is determined from an environment variable:

    :::bash
    $ export OMP_NUM_THREADS=4

(The default number of threads is implementation-dependent. It might be 1,
or it might be equal to the number of cores in the system.)

Then the application is run as normal:

    :::bash
    $ ./hello_world 
     Hello world!
     Hello world!
     Hello world!
     Hello world!

<hr/>

- [OpenMP 1 (Overview, Implementaion)]({filename}openmp-1.md)
- [OpenMP 2 (Parallel regions, OpenMP functions)]({filename}openmp-2.md)
- [OpenMP 3 (OpenMP clauses)]({filename}openmp-3.md)
- [OpenMP 4 (Reductions)]({filename}openmp-4.md)
- [OpenMP 5 (Exercise: Madelbrot set)]({filename}openmp-5.md)
- [OpenMP 6 (Work-sharing constructs)]({filename}openmp-6.md)
- [OpenMP 7 (Synchronisation)]({filename}openmp-7.md)

<hr/>

These notes are built on the "Hands-on Introduction to OpenMP" tutorial given at the UK OpenMP Users' Conference.

This work is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.

[http://creativecommons.org/licenses/by-nc-sa/4.0/deed.en_US](http://creativecommons.org/licenses/by-nc-sa/4.0/deed.en_US)

This means you are free to copy and redistribute the material and adapt and build on the
material under the following terms: you must give appropriate credit, provide a link to the license and indicate if changes were made. If you adapt or build on the material you must distribute your work under the same license as the original.
