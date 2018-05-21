Title: OpenMP 2
Date: 2018-05-21 22:50
Category:  
Modified: 2018-05-21 22:50
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: published

# Parallel regions

In the example in the [first post]({filename}openmp-1.md):

    :::fortran
    program hello_world
        !$OMP PARALLEL
        write(*,*) "Hello world!"
        !$OMP END PARALLEL
    end program hello_world

the pair of directives, `!$OMP PARALLEL` and `!$OMP END PARALLEL`,
define a *parallel region*, which is a block of code that will be executed by
all the threads. The rest of the code is executed by a single thread. E.g.:

    :::fortran
    program parallel_region
        implicit none
        write(*,*) "Serial region"
        !$OMP PARALLEL
        write(*,*) "Parallel region"
        !$OMP END PARALLEL
        write(*,*) "Serial again"
    end program parallel_region

which gives:

    :::bash
    $ gfortran -fopenmp -o parallel_region parallel_region.f95 
    $ ./parallel_region 
     Serial region
     Parallel region
     Parallel region
     Parallel region
     Parallel region
     Serial again

When the thread executing a serial region encounters a parallel directive, it
creates a team of threads and it becomes the *master thread* of the team. Each
thread, including the master, gets a thread number between $0$ and $N-1$, where $N$
is the number of threads requested.

On encountering the `!$OMP END PARALLEL` directive, all the threads 
are killed except the master, which continues execution.

This is known as the fork/join model.

Note that the master thread waits
until all other threads have finished before the parallel region is closed, to
ensure all work is completed no data are lost. The `!$OMP END PARALLEL`
directive is therefore an implicit *synchronisation*.

Two requirements are imposed on the definition of a parallel region:

1. The start and end directives for a parallel region must appear in the same
   routine.
2. It must not be possible to leave the parallel region except via the closing
   directive; e.g. via a `GO TO` statement.

## Nested parallel regions

It's possible to nest parallel regions:

    :::fortran
    program nested
        implicit none
        !$OMP PARALLEL
        write(*,*) "Parallel outer"
        !$OMP PARALLEL
        write(*,*) "Parallel inner"
        !$OMP END PARALLEL
        !$OMP END PARALLEL
    end program nested

Nesting is controlled by the `OMP_NESTED` environment variable:

    :::bash
    $ gfortran -fopenmp -o nested.x nested.f95
    $ export OMP_NUM_THREADS=2
    $ export OMP_NESTED=TRUE
    $ ./nested.x 
     Parallel outer
     Parallel outer
     Parallel inner
     Parallel inner
     Parallel inner
     Parallel inner
    $ export OMP_NESTED=FALSE
    $ ./nested.x 
     Parallel outer
     Parallel outer
     Parallel inner
     Parallel inner

There are good use cases for using nested routines; the danger is ensuring you
don't create too many threads - having many more threads than cores will
negatively affect performance.

# OpenMP functions

The OpenMP library provides routines to determine the number of threads,
and the number of the executing thread: 

    :::fortran
    program thread_number
        use OMP_LIB
        implicit none
        !$OMP PARALLEL
        write(*,*) "Thread", OMP_GET_THREAD_NUM(), "of", OMP_GET_NUM_THREADS(), &
            "threads"
        !$OMP END PARALLEL
    end program thread_number

Note the use of the Fortran `use` statement to make available the OpenMP library
routines.

Compiling and running gives:

    :::bash
    $ gfortran -fopenmp -o thread_number thread_number.f95 
    $ ./thread_number 
     Thread           1 of           4 threads
     Thread           2 of           4 threads
     Thread           0 of           4 threads
     Thread           3 of           4 threads

Unlike the sentinel-protected directives, the use of `OMP_GET_THREAD_NUM()` and
`OMP_GET_NUM_THREADS()` will cause an error if compiled without OpenMP support:

    $ gfortran -o thread_number thread_number.f95
    Undefined symbols for architecture x86_64:
      "_omp_get_num_threads_", referenced from:
          _MAIN__ in ccWD4iLd.o
      "_omp_get_thread_num_", referenced from:
          _MAIN__ in ccWD4iLd.o
    ld: symbol(s) not found for architecture x86_64
    collect2: error: ld returned 1 exit status

To prevent this problem, a second type of sentinel is available, in addition to
`!$OMP`. This is simply `!$`, and is prepended to ordinary Fortran lines (as opposed to OpenMP directives) that should be
conditionally compiled only when the compiler is OpenMP-compliant. Hence:

    :::fortran
    program thread_number
        use OMP_LIB
        implicit none
        !$OMP PARALLEL
        !$ write(*,*) "Thread", OMP_GET_THREAD_NUM(), "of", OMP_GET_NUM_THREADS(), &
        !$     "threads"
        !$OMP END PARALLEL
    end program thread_number
<br/>

    :::bash
    $ gfortran -o thread_number thread_number.f95 
    $ ./thread_number 
    $ gfortran -fopenmp -o thread_number thread_number.f95 
    $ ./thread_number 
     Thread           0 of           4 threads
     Thread           3 of           4 threads
     Thread           1 of           4 threads
     Thread           2 of           4 threads

Note that it's possible to extend a source code line that is protected in
this way over several lines, by using the standard Fortran line continuation
character, `&`.

(Note also, in this example the order that the threads execute the write
statement is different from the previous run; this is important. There is no guaranteed order of
threads.)

Outside a parallel region, the thread number and total number of threads returned by
`OMP_GET_THREAD_NUM()` and `OMP_GET_NUM_THREADS()`, respectively, are defined; but the total number of threads is 1:

    :::fortran
    program serial_thread_number
        use OMP_LIB
        implicit none
        !$ write(*,*) "I am thread", OMP_GET_THREAD_NUM(), "of", OMP_GET_NUM_THREADS(), &
        !$     "threads"
    end program serial_thread_number
&nbsp;

    :::bash
    $ gfortran -fopenmp -o serial_thread_number serial_thread_number.f95
    $ export OMP_NUM_THREADS=4
    $ ./serial_thread_number 
     I am thread           0 of           1 threads

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
