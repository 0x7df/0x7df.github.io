Title: OpenMP 3
Date: 2019-07-27 20:28
Category:  
Modified: 2019-07-27 20:28
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: published

# OpenMP clauses

The `!$OMP PARALLEL` directive can have further information added in the form of
*clauses*, which can be comma- or space-separated:

    !$OMP PARALLEL <clauses...>
    ...
    !$OMP END PARALLEL

These define certain
aspects of the way in which the parallel region will be handled, such as the
scope of certain variables, the number of threads, etc.

For example,
clauses can define whether variables in the parallel region are *shared* or
*private*. In general:

    !$OMP PARALLEL DEFAULT(SHARED|PRIVATE|NONE) PRIVATE(list...) SHARED(list...)

The first clause specifies whether variables by default should be shared or
private (or no default), and the following two over-ride the default in certain
cases by explicitly listing variables that should be either private or shared.
Note that `DEFAULT` is `SHARED` unless specified otherwise, which is potentially dangerous. If `DEFAULT` is `NONE`,
then all variables used in the parallel region must be explicitly listed
within either the `PRIVATE` or `SHARED` clause. Best practice is to be explicit
and specify `DEFAULT(NONE)`, so that you're forced to think about each variable
in the parallel region and how it should be handled.

## Private data

Each thread has its own unique copy of a private variable, which is independent
of the values other threads hold. E.g.:

    :::fortran
    program private1
        use OMP_LIB
        implicit none
        integer :: a
        !$OMP PARALLEL DEFAULT(PRIVATE)
        a = OMP_GET_THREAD_NUM()
        write(*,*) "a =", a
        !$OMP END PARALLEL
    end program private_shared
&nbsp;

    :::bash
    $ gfortran -fopenmp -o private1 private1.f95 
    $ ./private1 
     a =           3
     a =           0
     a =           2
     a =           1

Private variables are *uninitialised* at the beginning of the parallel
block, even if they were defined previously. They do not inherit the value from
any preceding part of the code:

    :::fortran
    program private2
        implicit none
        integer :: a, b
        b = 9
        !$OMP PARALLEL DEFAULT(PRIVATE)
        write(*,*) "a, b =", a, b
        !$OMP END PARALLEL
    end program private2
&nbsp;

    :::bash
    $ gfortran -fopenmp -o private2 private2.f95 
    $ ./private2
     a, b =           0           0
     a, b =           0           0
     a, b =       32766  -466164000
     a, b =       32766  -466163792
    $ ./private2
     a, b =           0           0
     a, b =           0           0
     a, b =       32766  -310876344
     a, b =       32766  -310876240

Also, private data is destroyed at the end of the parallel region; any original
value that was set prior to the parallel region is unaffected:

    :::fortran
    program private3
        use OMP_LIB
        implicit none
        integer :: a
        a = 9
        write(*,*) "Before: a =", a
        !$OMP PARALLEL DEFAULT(NONE) PRIVATE(a)
        a = OMP_GET_THREAD_NUM()
        write(*,*) "During: a =", a
        !$OMP END PARALLEL
        write(*,*) "After:  a =", a
    end program private3
&nbsp;

    :::bash
    $ gfortran -fopenmp -o private3 private3.f95 
    $ ./private3
     Before: a =           9
     During: a =           3
     During: a =           1
     During: a =           2
     During: a =           0
     After:  a =           9

In Fortran, loop iterators are private by default.

## Shared data

All threads can access shared data. If we want a variable from outside the
parallel region to be used in the parallel region, or to persist afterwards, it
needs to be shared.

    :::fortran
    program shared1
        use OMP_LIB
        implicit none
        integer :: nthreads
        !$OMP PARALLEL DEFAULT(NONE) SHARED(nthreads)
        nthreads = OMP_GET_NUM_THREADS()
        !$OMP END PARALLEL
        write(*,*) nthreads
    end program shared1
&nbsp;

    :::bash
    $ gfortran -fopenmp -o shared1 shared1.f95 
    $ ./shared1 
               4

Or:

    :::fortran
    program shared2
        use OMP_LIB
        implicit none
        integer :: a
        a = 10
        !$OMP PARALLEL DEFAULT(NONE) SHARED(a)
        write(*,*) a + OMP_GET_THREAD_NUM()
        !$OMP END PARALLEL
    end program shared2
&nbsp;

    :::bash
    $ gfortran -fopenmp -o shared2 shared2.f95 
    $ ./shared2 
              13
              10
              12
              11

A common idiom is for different threads to work on different portion of the
same shared array:

    :::fortran
    program shared3
        use OMP_LIB
        implicit none
        integer :: irow, icol, nrows, ncols
        real, allocatable :: my_array(:,:)

        nrows = 10
        !$OMP PARALLEL
        ncols = OMP_GET_NUM_THREADS()
        !$OMP END PARALLEL

        allocate(my_array(nrows,ncols))

        !$OMP PARALLEL DEFAULT(NONE) PRIVATE(irow, icol) SHARED(my_array, nrows)
        icol = OMP_GET_THREAD_NUM() + 1
        do irow = 1, nrows
            my_array(irow, icol) = icol
        enddo
        !$OMP END PARALLEL

        do irow = 1, nrows
            write(*,*) my_array(irow, :)
        enddo

    end program shared3
&nbsp;

    :::bash
    $ gfortran -fopenmp -o shared3 shared3.f95 
    $ ./shared3
       1.00000000       2.00000000       3.00000000       4.00000000    
       1.00000000       2.00000000       3.00000000       4.00000000    
       1.00000000       2.00000000       3.00000000       4.00000000    
       1.00000000       2.00000000       3.00000000       4.00000000    
       1.00000000       2.00000000       3.00000000       4.00000000    
       1.00000000       2.00000000       3.00000000       4.00000000    
       1.00000000       2.00000000       3.00000000       4.00000000    
       1.00000000       2.00000000       3.00000000       4.00000000    
       1.00000000       2.00000000       3.00000000       4.00000000    
       1.00000000       2.00000000       3.00000000       4.00000000

Long OpenMP directives can be broken across multiple lines using the standard
Fortran line continuation character, e.g.:

    !$OMP PARALLEL DEFAULT(NONE) PRIVATE(irow, icol) &
    !$OMP     SHARED(my_array, nrows)

## `FIRSTPRIVATE`

Although by default private variables are uninitialised at the beginning of a
parallel region, they can be made to inherit an existing value by using the
`FIRSTPRIVATE` clause.

    :::fortran
    program first_private
        use OMP_LIB
        implicit none
        integer :: a, b
        b = 9
        !$OMP PARALLEL DEFAULT(NONE) PRIVATE(a) FIRSTPRIVATE(b)
        write(*,*) "a, b =", a, b
        !$OMP END PARALLEL
    end program first_private
&nbsp;

    :::bash
    $ gfortran -fopenmp -o first_private first_private.f95 
    $ ./first_private 
     a, b =  -510675160           9
     a, b =           0           9
     a, b =  -510674576           9
     a, b =  -510675056           9

## Other clauses

In addition to the `DEFAULT`, `FIRSTPRIVATE`, `PRIVATE` and `SHARED` clauses,
the `!$OMP PARALLEL` directive can also have the following:

- `COPYIN(<list...>)`
- `IF(<logical-expression>)`
- `NUM_THREADS(<integer-expression>)`
- `REDUCTION(<operator>:<list...>)`

which are described in subsequent posts.

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
