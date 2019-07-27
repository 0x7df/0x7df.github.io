Title: OpenMP 6
Date: 2019-07-27 20:31
Category:  
Modified: 2019-07-27 20:31
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: published

## Work-sharing constructs

As
[we've]({filename}openmp-1.md)
[seen]({filename}openmp-2.md)
[in]({filename}openmp-3.md)
[previous]({filename}openmp-4.md)
[posts]({filename}openmp-5.md)
, in a parallel region, all threads execute the same code.
[When we parallelised the calculation of the Mandelbrot set]({filename}openmp-5.md)
, we had to devise manual ways of dividing the work amongst the threads
ourselves.

However, OpenMP provides additional directives, called *work-sharing
directives*, to help with this. Work-sharing directives indicate that work
should be divided up between threads, rather than replicated.

### Parallel Do

OpenMP has extensive support for parallelising loops, since loops are the main
source of parallelism in many, particularly scientific, applications.

    !$OMP DO [<clauses>...]
    ...
    [!$OMP END DO]

The closing directive is optional.

The `!$OMP DO` directive can take:

 - `PRIVATE`
 - `FIRSTPRIVATE`
 - `REDUCTION`

clauses. Recall from [earlier]({filename}openmp-3.md) that loop counters are
private by default (in Fortran).

Since the `!OMP PARALLEL` / `$OMP DO` combination is so common, there's a
shorthand version:

    !$OMP PARALLEL DO [<clauses>...]
    ...
    [!$OMP END PARALLEL DO]

This can take all the clauses that the `PARALLEL` directive can take.

Returning to our Mandelbrot set example, we can replace the logic for manually
distributing threads with the `!$OMP DO` directive:

      !$OMP DO
      do ipix = 1_ik, npix

          ... loop body ...
      
      enddo
      !$OMP END DO

The speedup we see is comparable with the first example, where we divided the
pixels into a set of $N$ contiguous blocks, where $N$ was the number of threads
used.

#### `SCHEDULE` clause

Without any clauses, `!$OMP DO` or `!$OMP PARALLEL DO` will attempt to
distribute work as evenly as possible across threads. The scheduling can also
be controlled explicitly using the `SCHEDULE` clause:

    !$OMP DO SCHEDULE(STATIC[,n]|DYNAMIC[,n]|AUTO|GUIDED|RUNTIME)
    ...

where `n` is an integer chunk size to be passed to the scheduling algorithm.

##### `STATIC`

If `n` is specified, the iterations are divided into chunks of
size `n`, and distributed cyclically to the the threads; this is called a
*block cyclic* schedule. If a chunk size is not specified, the one chunk per
thread is created, of approximately equal size; this is a *block* schedule.

In the manual work distribution in the
[Mandelbrot set exercise]({filename}openmp-5.md)
, the first, poorer way we chose of distributing the threads was equivalent to
`SCHEDULE(STATIC)`, and the second more successful attempt was equivalent to
`SCHEDULE(STATIC, 1)`.

Looking at the run times, we can see this:

![Alt text]({static}images/mandelbrot_openmp.001.png)

The figure shows speed-ups (lower is better) compared with the serial version
as a function of chunk size, for different schedules. The manual block schedule
is the green curve and the manual cyclic schedule is the green curve. Use of
the `!$OMP DO SCHEDULE(STATIC, n)` directive instead, gives the red curve. For
$n = 1$ the performance is similar to the manual cyclic, and for $n = 525$ the
performance is similar to the manual block schedule (where the total number of
pixels in the problem was 2100, and four threads were used).

#### `DYNAMIC`

With the dynamic schedule, the problem is broken up into chunks of size $n$ as
before, but instead of being cyclically allocated to threads, the chunks are
allocated dynamically; i.e. on a first-come, first-served basis. Once a thread
finishes its chunk, it is assigned the next chunk in the list. If no chunk size
is specified, it defaults to one.

As might be expected, this schedule improves the overall performance slightly.
Not only this, but the performance is less sensitive to chunk size.

![Alt text]({static}images/mandelbrot_openmp.002.png)

Here we've also added single points for both the static and dynamic schedules,
to indicate the performance when no chunk size is specified.

#### `GUIDED`

This schedule is like `DYNAMIC`, except that the chunk size starts off large
and gets exponentially smaller as it proceeds. The size of the next chunk is
proportional to the number of remaining iterations divided by the number of
threads. In this scheme the chunk size $n$ defines the *minimum* chunk size;
when this is not defined, the default is one.

The `GUIDED` schedule performs poorly for this problem at this scale; better
than serial, but consistently worse than all the other ways of dividing the
problem considered so far.

#### `AUTO`

The `AUTO` schedule allows the run-time complete freedom to choose the
assignment of loop iterations to threads. This is useful if a loop is executed
many time, as then the runtime can evolve a good schedule with high performance
and low overheads.

#### `RUNTIME`

`RUNTIME` causes the schedule to be determined at run time, from the
`OMP_SCHEDULE` environment variable. E.g.:

    :::bash
    export OMP_SCHEDULE="dynamic, 8"

#### Choosing a schedule

The following rules of thumb will help choosing a schedule:

1. `STATIC` has the lowest overhead, but is appropriate for only load-balanced
   loops.
2. `STATIC, n` can be an improvement for mildly load-imbalanced loops; the
   smaller chunks can potentially help mix up the more and less costly
   iterations so they are spread more evenly across threads.
3. `DYNAMIC` is often better if the load imbalance is very severe. However,
   care must be taken with data locality.
4.  `GUIDED` can be an improvement over `DYNAMIC`, but care should be taken
    with loops where the earlier iterations are more costly. In such cases,
    since the loop by definition can be performed in any order, it might be
    possible to re-order it to begin with the less costly iterations.
5. `AUTO` might be useful if the loop is executed many times over.
6. `RUNTIME` should only be used for interactive experimentation.

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
