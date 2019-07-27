Title: OpenMP 5
Date: 2019-07-27 12:07
Category:  
Modified: 2019-07-27 12:07
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: published

## Exercise - determine the area of a Mandelbrot set

### Overview

In [several]({filename}openmp-1.md) [previous]({filename}openmp-2.md) [posts]({filename}openmp-3.md) [...]({filename}openmp-4.md), the basics of OpenMP were described.

As an exercise, let's determine the area of a Mandelbrot set using a simple 
algorithm parallelised with OpenMP.

### Plotting a Mandelbrot set

The Mandelbrot set is the set of complex numbers, $c$, for which the function
$f(z) = z^2 +c$ does not diverge when iterated from $z = 0$. That is, the
sequence $f(0), f(f(0)), ...$:

$z_0 = 0$

$z_1 = z_0^2 + c = c$

$z_2 = z_1^2 + c = c^2 + c = c(c + 1)$

$z_3 = z_2^2 + c = c^2(c+1)^2 + c = c[c(c+1)^2 + 1]$

does not diverge.

Plotting a Mandelbrot set involves creating a two-dimensional grid of pixels (a
discretised representation of the complex plane), representing the potential
$c$ values, and then running an algorithm
for each pixel to determine whether it's inside the set (the sequence does not diverge for that value of $c$) or outside the set.

Since the process for a given pixel is entirely independent of all other
pixels, this process parallelises very well. Algorithms like this are often called
*embarrassingly parallel*, as the different tasks really are completely independent of each
other and involve no communication or synchronisation, except perhaps for a step
at the end. The speedup achieved by increasing the number of threads should be
very close to ideal.

We will use a simple condition of $|z_i| > 2$ to identify points that diverge.
Of course, the points that diverge do so at different rates (the points closer
to the edges diverge more slowly), and we need to iterate for longer to
determine if a point exceeds this threshold if it is diverging slowly.
Therefore even with a finite threshold, in practice a maximum number of
iterations is also defined. Since points closer to the edges diverge more and
more slowly, this tends to smooth the edges; the lower the maximum number of
iterations is, the less detail we see around the edges.

We will begin with a serial implementation, and just write something to prove
we're calculating the Mandelbrot set correctly.

    :::fortran
    program mandelbrot_serial

        implicit none

        integer, parameter :: ik = 4
        integer, parameter :: rk = 8

        integer(kind=ik), parameter :: maximum_iterations = 100000_ik
        real(kind=rk), parameter    :: escape_threshold = 2.0_rk

        real(kind=rk), parameter    :: xmin = -2.5_rk
        real(kind=rk), parameter    :: xmax = 1.0_rk
        real(kind=rk), parameter    :: ymin = 0.0_rk
        real(kind=rk), parameter    :: ymax = 1.0_rk
        real(kind=rk), parameter    :: xsize = xmax - xmin
        real(kind=rk), parameter    :: ysize = ymax - ymin

        integer(kind=ik), parameter :: scale_factor = 80_ik
        integer(kind=ik), parameter :: nx = 7_ik*scale_factor
        integer(kind=ik), parameter :: ny = 2_ik*scale_factor
        integer(kind=ik), parameter :: npix = nx*ny

        real(kind=rk) :: dx, dy, x, y
        integer(kind=ik) :: ipix, ix, iy, iteration

        complex(kind=rk) :: c
        complex(kind=rk) :: z
         
        logical :: diverged

        dx = xsize / float(nx)
        dy = ysize / float(ny)
    
        do ipix = 1_ik, npix
            iy = (ipix - 1_ik)/nx
            ix = ipix - iy*nx
            x = xmin + ix*dx
            y = ymin + iy*dy + 1.e-07_rk

            c = cmplx(x, y, kind=rk)
    
            diverged = .false.
            z = c
            do iteration = 1_ik, maximum_iterations
                if (abs(z) > escape_threshold) then
                    diverged = .true.
                    exit
                endif
                z = z**2_ik + c
            enddo
            if (.not. diverged) then
                write(*,*) x, ",", y
            endif
        enddo
    
    end program mandelbrot_serial

We implement a one-dimensional loop over the pixels, and first find the indices in
the $x$- and $y$-dimensions of the pixel, and from these the $x$ and $y$
co-ordinates; these are of course the real and imaginary parts of the complex
number, $c$. Note that since the set is symmetric about the $y$-axis, we only
calculate for $y \ge 0$.

We then iterativaly calculate $z_i = z_{i-1}^2 + c$, starting from
$z_0 = 0$, until $|z_i| > 2$, which is our escape threshold. If this condition is
fulfilled, we assume the sequence has diverged, which means the point is not part of the
set. Otherwise, the point is considered part of the set, and the $x$, $y$
coordinates are printed to allow plotting.

Compiling:

    :::bash
    $ gfortran -o mandelbrot_serial.x mandelbrot_serial.f95

and running:

    :::bash
    $ ./mandelbrot_serial.x > mandelbrot_serial.csv

gives a comma-separated value file to plot using some Python:

    :::python
    #!/usr/bin/env python
    
    import pandas as pd
    import matplotlib.pyplot as plt

    df = pd.read_csv('mandelbrot_serial.csv', header=None, names=['x', 'y+'])
    df['y-'] = pd.Series(-df['y+'], index=df.index)
    fig = plt.figure()
    ax = fig.add_subplot(111)
    df.plot(x='x', y='y+', ax=ax, xlim=[-2.5,1.0], ylim=[-1.0,1.0], style='.k', legend=False, ms=2)
    df.plot(x='x', y='y-', ax=ax, xlim=[-2.5,1.0], ylim=[-1.0,1.0], style='.k', legend=False, ms=2)
    ax.set_aspect('equal')
    ax.set_xlabel('Re(c)')
    ax.set_ylabel('Im(c)')
    plt.show()

so that:

    :::bash
    $ ./mandelbrot_serial.py

gives:
![Alt Text]({filename}/images/mandelbrot_serial.png)
which seems in the right ball park.

### Initial parallelism

We now make a first attempt to add OpenMP. So far, we've covered the `!$OMP
PARALLEL` directive, so we will stick to using just that, even though as we'll
cover later there are much better ways of doing it.

    :::fortran
    !$OMP PARALLEL DEFAULT(NONE) &
    !$OMP          PRIVATE(ipix, ix, iy, x, y, c, z, iteration) &
    !$OMP          FIRSTPRIVATE(dx, dy) &
    !$OMP          REDUCTION(+:n_diverged)
    do ipix = 1_ik, npix
        iy = (ipix - 1_ik)/nx
        ix = ipix - iy*nx
        x = xmin + ix*dx
        y = ymin + iy*dy + 1.e-07_rk
        c = cmplx(x, y, kind=rk)

        z = c
        do iteration = 1_ik, maximum_iterations
            if (abs(z) > escape_threshold) then
                n_diverged = n_diverged + 1_ik
                exit
            endif
            z = z**2_ik + c
        enddo
    enddo
    !$OMP END PARALLEL

Simply inserting the `!$OMP PARALLEL` directive pair gives an answer that's a
factor of $N$ too large, because all $N$ threads perform the whole loop (each
getting the correct answer in its private copy of `n_diverged`), and of course
this takes just as long as the serial version - longer actually, since we've
added the redundant work of managing the threads. Therefore we must also add
some logic to manually distribute the work amonsgt the threads. In the
following example, we divide the total number of pixels into contiguous blocks
and give each block to a thread:

    :::fortran
    !$OMP PARALLEL DEFAULT(NONE) &
    !$OMP          PRIVATE(ipix, ix, iy, x, y, c, z, iteration, number_of_threads, this_thread, pix_per_thread) &
    !$OMP          FIRSTPRIVATE(dx, dy) &
    !$OMP          REDUCTION(+:n_diverged)
    number_of_threads = OMP_GET_NUM_THREADS()
    this_thread = OMP_GET_THREAD_NUM()
    pix_per_thread = npix/number_of_threads
    do ipix = this_thread*pix_per_thread + 1_ik, min((this_thread + 1_ik)*pix_per_thread, npix)

        ! ... loop body ...

    enddo
    !$OMP END PARALLEL

This reduced the time to about 55% of the serial value on four threads, which
is only about half of the theoretically available speed-up. If, instead, we
try:

    :::fortran
    !$OMP PARALLEL DEFAULT(NONE) &
    !$OMP          PRIVATE(ipix, ix, iy, x, y, c, z, iteration, number_of_threads, this_thread, pix_per_thread) &
    !$OMP          FIRSTPRIVATE(dx, dy) &
    !$OMP          REDUCTION(+:n_diverged)
    number_of_threads = OMP_GET_NUM_THREADS()
    this_thread = OMP_GET_THREAD_NUM()
    do ipix = 1_ik, npix
        if (mod(ipix,number_of_threads) == this_thread) then

            ! ... loop body ...

        endif
    enddo
    !$OMP END PARALLEL

which cycles over the threads and allocates each pixel to the next thread. This
reduced the time to about 39% of the original, which is better. Why?

We can see more clearly what's happening by timing individual threads within
the parallel block. In the first example, typical times for the threads are:

           3  0.187000006    
           2   1.05900002    
           1   2.03399992    
           0   2.95700002

whereas for the second example:

           0   2.01200008    
           3   2.05299997    
           2   2.05900002    
           1   2.06500006

Evidently, the time per thread is much more balanced in the second example; in
the first, there's a factor of 15 difference between the time taken by the
fastest and slowest threads. If we investigate the total number of iterations
conducted by each thread:

           3  14779591
           2  100787622
           1  223484798
           0  343662484

we see this is imbalanced by at least as much, whereas in the faster scheme:

           0   170697247
           1   170807456
           2   170696023
           3   170513769

The second version has better *load balance* - a naive
distribution of work, like dividing pixels equally between threads, can be poorly
balanced if the work per pixel is highly variable. The second way of
distributing the work clearly allocates a similar balance of pixels to each
thread.

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
