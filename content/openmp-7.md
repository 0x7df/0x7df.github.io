Title: OpenMP 7
Date: 2018-05-21 09:53
Category:  
Modified: 2018-05-21 09:53
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: draft

## Synchronisation

We touched in [this post]({filename}openmp-1.md) on the need to sychronise
OpenMP threads, to ensure correctness. For example we saw that updates to
shared variables are not truly atomic, leading to the potential for race
conditions. A sequence of actions on shared data, such as
updating an array with new values then then using it in a subsequent
computation, might need to be synchronised to ensure all threads complete their
writes before any threads go on to the next stage. In [this
post]({filename}openmp-2.md) we noted that the `!$OMP END PARALLEL` directive
is an implicit synchronisation point, which OpenMP ensures that all threads
reach before any thread is allowed to continue. Other directives are implicit
synchronisation points.

In addition to these, OpenMP offers several explicit synchronisation
directives.

### Barrier

    !$OMP BARRIER

All threads must arrive at a barrier before any thread can proceed past it.

For example:

    :::fortran
    program barrier

        use OMP_LIB
        implicit none
        integer, parameter :: ik = 4
        integer, parameter :: rk = 8
        integer(kind=ik) :: thread_id
        integer(kind=ik) :: num_threads
        integer(kind=ik) :: neighbour
        integer(kind=ik), allocatable :: a(:), b(:)

        !$OMP PARALLEL DEFAULT(NONE) SHARED(num_threads)
        num_threads = OMP_GET_NUM_THREADS()
        !$OMP END PARALLEL

        allocate(a(0:num_threads-1), b(0:num_threads-1))

        !$OMP PARALLEL DEFAULT(NONE) PRIVATE(thread_id, neighbour) &
        !$OMP SHARED(a,b, num_threads)

        thread_id = OMP_GET_THREAD_NUM()
        a(thread_id) = thread_id

        neighbour = thread_id - 1_ik
        if (thread_id == 0_ik) neighbour = OMP_GET_NUM_THREADS() - 1_ik
        b(thread_id) = a(neighbour)

        !$OMP END PARALLEL
    
        write(*,*) a
        write(*,*) b
    
    end program barrier

Without any synchronisation:

    :::bash
    $ gfortran -fopenmp -o barrier.x barrier.f95
    $ ./barrier.x 
    $ ./barrier.x 
           0           1           2           3
           3           0           1           0
    $ ./barrier.x 
           0           1           2           3
   536870912           0   536870912           2
    $ ./barrier.x 
           0           1           2           3
           3           0           0           0

the results are wrong and non-deterministic. Correct placement of the barrier:

    :::fortran
    !$OMP PARALLEL DEFAULT(NONE) PRIVATE(thread_id, neighbour) &
    !$OMP SHARED(a,b, num_threads)

    thread_id = OMP_GET_THREAD_NUM()
    a(thread_id) = thread_id

    !$OMP BARRIER

    neighbour = thread_id - 1_ik
    if (thread_id == 0_ik) neighbour = OMP_GET_NUM_THREADS() - 1_ik
    b(thread_id) = a(neighbour)

    !$OMP END PARALLEL

leads to the correct result:

    :::bash
    $ gfortran -fopenmp -o barrier.x barrier.f95
    $ ./barrier.x 
           0           1           2           3
           3           0           1           2
    $ ./barrier.x 
           0           1           2           3
           3           0           1           2

Care must be taken about control flow: a likely bug is where some
threads reach a barrier and some don't due to an `IF` condition:
deadlock.

The `END PARALLEL` directive is an implicit barrier. The end of a parallel
`DO` loop is an implicit barrier.

### Critical region

Only one thread *at a time* can enter a critical region. They can be used to
protect updates to shared variables.

    !$OMP CRITICAL
    ...
    !$OMP END CRITICAL

For example, consider implementing a stack:

### Atomic update

- Modification of shared variable. Update a shared variable can be modified by
  only one thread at a time.


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
