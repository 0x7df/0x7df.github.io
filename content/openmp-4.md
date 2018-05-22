Title: OpenMP 4
Date: 2018-05-22 21:44
Category:  
Modified: 2018-05-22 21:44
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: published

# Reductions

As mentioned in the [overview post](), a *reduction* operation produces a
single value from a set of values, e.g. the sum, product, maximum, minimum,
etc.

To preserve as much parallelism as possible, each thread reduces its data into a
private result, and then these are subsequently reduced into the final result.
The first step is done in parallel.

These operations are implemented via the `REDUCTION` clause:

    REDUCTION(<op>:<list...>)

For example:

    :::fortran
    program reduction
        use OMP_LIB
        implicit none
        integer :: irow, icol, b, nrows, ncols
        integer, allocatable :: c(:,:)

        nrows = 4
        !$OMP PARALLEL DEFAULT(NONE) SHARED(ncols)
        ncols = OMP_GET_NUM_THREADS()
        !$OMP END PARALLEL

        allocate(c(nrows,ncols))

        b = 9
        c(:,:) = 1
        !$OMP PARALLEL REDUCTION(+:b) PRIVATE(irow,icol)
        icol = OMP_GET_THREAD_NUM() + 1
        do irow = 1, nrows
            b = b + c(irow,icol)
        enddo
        !$OMP END PARALLEL

        write(*,*) "b =", b
    end program reduction
&nbsp;

    :::bash
    $ gfortran -fopenmp -o reduction1 reduction1.f95
    $ ./reduction1
     b =          25

The initial value of the *reduction variable*, `b`, is saved, and then each
thread gets its own private copy of `b`, initialised to zero. Inside the
parallel region, each thread updates its own copy of `b` within the loop. At
the final `!$OMP END PARALLEL` directive, the private copies are reduced to the
final `b`.

Reductions can be performed on arrays as well as scalar variables. The
reduction is performed on each element of the array.

<hr/>

- [OpenMP 1 (Overview, Implementaion)]({filename}openmp-1.md)
- [OpenMP 2 (Parallel regions, OpenMP functions)]({filename}openmp-2.md)
- [OpenMP 3 (OpenMP clauses)]({filename}openmp-3.md)
- [OpenMP 4 (Reductions)]({filename}openmp-4.md)
- [OpenMP 5 (Work-sharing constructs)]({filename}openmp-5.md)
- [OpenMP 6 (Synchronisation)]({filename}openmp-6.md)
- [OpenMP 7 ()]({filename}openmp-7.md)

<hr/>

These notes are built on the "Hands-on Introduction to OpenMP" tutorial given at the UK OpenMP Users' Conference.

This work is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.

[http://creativecommons.org/licenses/by-nc-sa/4.0/deed.en_US](http://creativecommons.org/licenses/by-nc-sa/4.0/deed.en_US)

This means you are free to copy and redistribute the material and adapt and build on the
material under the following terms: you must give appropriate credit, provide a link to the license and indicate if changes were made. If you adapt or build on the material you must distribute your work under the same license as the original.
