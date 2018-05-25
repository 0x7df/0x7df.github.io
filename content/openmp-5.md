Title: OpenMP 5
Date: 2018-05-19 14:05
Category:  
Modified: 2018-05-19 14:05
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: draft

# Exercise - determine the area of a Mandelbrot set

## Overview

As an exercise, let's determine the area of a Mandelbrot set using a simple 
algorithm parallelised with OpenMP.

## Plotting a Mandelbrot set

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
$c$ values, and then running the iterative algorithm
for each pixel to determine whether it's inside the set (the sequence does not diverge for that value of $c$) or outside the set.

Since the process for a given pixel is entirely independent of all other
pixels, this process parallelises very well. Processes like this are often called
*embarrassingly parallel*, as they really are completely independent of each
other and involve no communication or synchronisation, except perhaps for a single step
at the end. The speedup achieved by increasing the number of threads should be
very close to ideal.

We will use a simple condition of $|z_i| > 2$ to identify points that diverge. Of
course, we need to iterate longer to determine if a point diverges if
it is diverging slowly, so in practice a maximum number of iterations is
defined. Since points closer to the edges diverge more and more slowly, the
lower the maximum number of iterations is, the less detail we see arond the
edges.

We will begin with a serial implementation, and just write something to prove
we are calculting the Mandelbrot set correctly.

    :::fortran
    program mandelbrot_serial

        implicit none

        integer, parameter :: ik = 4
        integer, parameter :: rk = 8

        integer(kind=ik), parameter :: maximum_iterations = 10000_ik
        real(kind=rk), parameter    :: escape_threshold = 2.0_rk

        integer(kind=ik), parameter :: scale_factor = 80_ik
        integer(kind=ik), parameter :: nx = 7_ik*scale_factor
        integer(kind=ik), parameter :: ny = 4_ik*scale_factor
        integer(kind=ik), parameter :: npix = nx*ny
        real(kind=rk), parameter    :: xmin = -2.5_rk
        real(kind=rk), parameter    :: xmax = 1.0_rk
        real(kind=rk), parameter    :: ymin = -1.0_rk
        real(kind=rk), parameter    :: ymax = 1.0_rk

        real(kind=rk) :: dx, dy, xsize, ysize, x, y
        integer(kind=ik) :: ipix, ix, iy, iteration

        complex(kind=8) :: c
        complex(kind=8) :: z
         
        logical :: diverged

        xsize = xmax - xmin
        ysize = ymax - ymin
    
        dx = xsize / float(nx)
        dy = ysize / float(ny)
    
        do ipix = 1_ik, npix
            iy = (ipix - 1_ik)/nx + 1_ik
            ix = ipix - (iy - 1_ik)*nx
            x = xmin + ix*dx
            y = ymin + iy*dy
            c = cmplx(x, y, kind=8)
    
            diverged = .false.
            z = c
            do iteration = 1_ik, maximum_iterations
                if (abs(z) > escape_threshold) then
                    diverged = .true.
                    !n_diverged = n_diverged + 1_ik
                    exit
                endif
                z = z**2_ik + c !(ipix)
            enddo
            if (.not. diverged) then
                write(*,*) x, ",", y
            endif
        enddo
    
    end program mandelbrot_serial

We implement a one-dimensional loop over pixels, and first find the indices in
the $x$- and $y$-dimensions of the pixel, and from the $x$ and $y$
co-ordinates; these are of course the real and imaginary parts of the complex
number, $c$. We then iterativaly calculate $z_i = z_{i-1}*2 + c$, starting from
$z_0 = 0$, until $z_i > 4$, which is our escape threshold. If this condition is
fulfilled, the sequence has diverged, which means the point is not part of the
set. Otherwise, the point is considered part of the set, and the $x$, $y$
coordinates are printed to facilitate plotting.

Compiling:

    :::bash
    $ gfortran -o mandelbrot_serial mandelbrot_serial.f95

and running:

    :::bash
    $ ./mandelbrot_serial > mandelbrot_serial.csv

gives a comma-separated value file to plot using some Python:

    :::python
    #!/usr/bin/env python
    
    import pandas as pd
    import matplotlib.pyplot as plt

    df = pd.read_csv('mandelbrot_serial.csv', header=None, names=['x', 'y'])
    fig = plt.figure()
    ax = fig.add_subplot(111)
    df.plot(x='x', y='y', ax=ax, xlim=[-2.5,1.0], ylim=[-1.0,1.0], style='.k', legend=False, ms=2)
    ax.set_aspect('equal')
    plt.show()

so that:

    :::bash
    $ ./mandelbrot_serial.py

gives:

![Alt Text]({filename}/images/mandelbrot_serial.png)

which seems in the right ball park.


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
