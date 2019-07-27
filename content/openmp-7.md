Title: OpenMP 7
Date: 2019-07-27 20:32
Category:  
Modified: 2019-07-27 20:32
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: published

## Synchronisation

We touched in [this post]({filename}openmp-1.md) on the need to sychronise
OpenMP threads, to ensure correctness. For example, we saw that updates to
shared variables are not truly atomic, leading to the potential for race
conditions. A sequence of actions on shared data, such as
updating an array with new values then then using it in a subsequent
computation, might need to be synchronised to ensure that all threads complete their
writes before any threads go on to the next stage. In [this
post]({filename}openmp-2.md) we noted that the `!$OMP END PARALLEL` directive
is an implicit synchronisation point, which OpenMP ensures that all threads
reach before any thread is allowed to continue. Other directives are implicit
synchronisation points.

As well as these, OpenMP offers several explicit synchronisation
directives, which we'll look at here.

### Barrier

    !$OMP BARRIER

All threads must arrive at a barrier before any thread can proceed past it.

For example, consider the following code, which populates shared arrays `a` and
`b` with the thread numbers and the numbers of the threads' neighbours:

    :::fortran
    program barrier

        use OMP_LIB
        implicit none
        integer, parameter :: ik = 4
        integer(kind=ik) :: thread_id
        integer(kind=ik) :: num_threads
        integer(kind=ik) :: neighbour
        integer(kind=ik), allocatable :: a(:), b(:)

        !$OMP PARALLEL DEFAULT(NONE) SHARED(num_threads)
        num_threads = OMP_GET_NUM_THREADS()
        !$OMP END PARALLEL

        allocate(a(0:num_threads-1), b(0:num_threads-1))

        !$OMP PARALLEL DEFAULT(NONE) PRIVATE(thread_id, neighbour) &
        !$OMP     SHARED(a,b, num_threads)

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

The results are both wrong and non-deterministic, because some threads proceed to the
lines where `a` is read before `a` has been fully populated. Correct placement
of the barrier:

    :::fortran
    !$OMP PARALLEL DEFAULT(NONE) PRIVATE(thread_id, neighbour) &
    !$OMP     SHARED(a,b, num_threads)

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
threads reach a barrier and some don't, due to an `IF` condition.

The `END PARALLEL` directive is an implicit barrier. The end of a parallel
`DO` loop is an implicit barrier.

### Critical region

Only one thread *at a time* can enter a critical region. They can be used to
protect updates to shared variables.

    !$OMP CRITICAL
    ...
    !$OMP END CRITICAL

For example, consider implementing a stack:

    :::fortran
    module critical_mod
    
        implicit none
        integer, parameter :: ik = 4
        integer, parameter :: rk = 4
    
        contains
    
        subroutine getnext(next, stack)
            integer(kind=ik), allocatable, intent(inout) :: stack(:)
            integer(kind=ik), intent(out) :: next
            integer(kind=ik), allocatable :: temp(:)
            integer(kind=ik) :: ub
            ub = ubound(stack, 1_ik)
            next = stack(ub)
            allocate(temp(ub-1_ik))
            temp(:) = stack(1_ik:ub-1_ik)
            call move_alloc(from=temp, to=stack)
        end subroutine getnext
    
        subroutine putnew(new, stack)
            integer(kind=ik), allocatable, intent(inout) :: stack(:)
            integer(kind=ik), intent(in) :: new
            integer(kind=ik), allocatable :: temp(:)
            integer(kind=ik) :: ub, inew
            ub = ubound(stack, 1_ik)
            allocate(temp(ub+1_ik))
            temp(1_ik:ub) = stack(:)
            call move_alloc(from=temp, to=stack)
            stack(ub+1_ik) = new
        end subroutine putnew
    
        subroutine work(next, new, thread_id)
            integer(kind=ik), intent(in) :: next, thread_id
            integer(kind=ik), intent(out) :: new
            real(kind=rk) :: u
            call random_number(u)
            new = FLOOR(2*u)
            write(*,*) 'Processed item', next, 'on thread', thread_id
        end subroutine work
    
    end module critical_mod

    program critical
    
        use OMP_LIB
        use critical_mod
        implicit none
        integer(kind=ik) :: next, new, i, thread_id, maxx
        integer(kind=ik), allocatable :: stack(:)
    
        maxx = 10_ik
        allocate(stack(maxx))
        stack = (/(i,i=1_ik,maxx)/)
    
        !$OMP PARALLEL DEFAULT(NONE) SHARED(stack, maxx) PRIVATE(next, new, thread_id)
        thread_id = OMP_GET_THREAD_NUM()
        do while (size(stack) > 0_ik)
    
            !$OMP CRITICAL
            if (size(stack) > 0_ik) call getnext(next, stack)
            !$OMP END CRITICAL
    
            call work(next, new, thread_id)
    
            !$OMP CRITICAL
            if (new > 0) then
                maxx = maxx + 1_ik
                call putnew(maxx, stack)
            endif
            !$OMP END CRITICAL
    
        enddo
        !$OMP END PARALLEL
    
    end program critical

Here, we create an initial stack of ten values, then enter a loop in which the
latest value is popped off the stack and processed, during which there is a 50:50
probability of a new value being created and added to the stack. Because the
stack is a single data structure shared across all threads, the
interactions with it must be protected inside critical sections. If they were
not, for example, two threads could get same value, because the second of these
reads the value before the first has had chance to remove it. Essentially, the
critical section makes the popping and adding operations atomic. The step where
a thread processes the value it holds does not need to be protected, because
this is unique to the thread and there is no shared data involved.

### Atomic update

The atomic direactive is used to protect modification of a shared variable. It
applies to only a single statement.

The syntax is:

    !$OMP ATOMIC
    ...

where the statement must have one of the forms:

    :::fortran
    x = x <op> <expr>
    x = <expr> <op> x
    x = <intr>(x, <expr>)

and `<op>` is one of `+`, `*`, `-`, `/`, `.and.`, `.or.`, `.eqv.` or `.neqv.`;
and `<intr>` is one of `max`, `min`, `iand`, `ior` or `ieor`. Note that the
evaluation if `<expr>` is not atomic.

### Lock routines

Occasionally we may require more flexibility than is provided by the `CRITICAL`
directive.

A lock is a special variable that can be set by a thread. No other thread can
set the lock until the thread that set the lock has unset it.

Setting a lock can either be blocking or non-blocking.

A lock must be initialised before it is used, and can be destroyed when it is
no longer required.

Lock variables should not be used for any other purpose.

The syntax is:

    :::fortran
    use omp_lib

    subroutine omp_init_lock(omp_lock_kind <var>)
    subroutine omp_set_lock(omp_lock_kind <var>)
    logical function omp_test_lock(omp_lock_kind <var>)
    subroutine omp_unset_lock(omp_lock_kind <var>)
    subroutine omp_destroy_lock(omp_lock_kind <var>)


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
