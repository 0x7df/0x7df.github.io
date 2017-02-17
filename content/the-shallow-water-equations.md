Title: The shallow water equations
Date: 2017-02-17 15:29
Category: Atmospheric Science
Modified: 2017-02-17 15:29
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: published

The governing equations in geophysical fluid dynamics can be simplified somewhat if the
horizontal length and velocity scales are much larger than the vertical length and
velocity scales, respectively.

They are commonly used to describe both the ocean and atmosphere, as well as estuaries,
rivers and channels.

A set of assumptions are made:

1. The fluid is incompressible.
2. Vertical acceleration is small compared with horizontal accelerations, and
   [hydrostatic balance]({filename}/hydrostatic-balance-in-the-atmosphere.md)
   can be assumed.

Making these assumptions results in the 3D shallow water equations ([de Boer (2003)](
https://www.utwente.nl/ewi/sacs/teaching/Thesis/aukje-de-boer-comparison-of-two-numerical-schemes-for-solving-the-1d-shallow-water-equations.pdf).
However it is much more common to make the additional assumption that:

3. The horizontal velocity is constant with height/depth (there is no vertical shear).

Given these assumptions, the 2D shallow water equations are then derived by integrating
over height to remove the vertical velocity, and therefore the vertical dimension
altogether. (Note that this is not the same as assuming the vertical velocity is zero,
which is not necessarily the case. If the bathymetry accounted for, the vertical velocity must be
non-zero where the floor changes depth. The vertical velocity can be recovered from
solutions of the shallow water equations via the continuity equation.)

In the following equations we will ignore viscosity (i.e we will work from the Euler
fluid equations not the Navier-Stokes equations, although in some disciplines the
fluid viscosity is important and can be included in the shallow water equtions). This
renders the non-linear PDEs hyperbolic rather than parabolic. We shall also ignore
diffusion.

## Three-dimensional shallow water equtions

In general in 3D the conservation of momentum is expressed by:

$$ \frac{\partial \mathbf{u}}{\partial t} + \mathbf{u}\cdot\nabla\mathbf{u}
    + f\mathbf{k}\times\mathbf{v} = -\frac{1}{\rho}\nabla p - g\mathbf{\hat k} $$

where $f$ is the Coriolis parameter, $\mathbf{\hat k}$ is a unit vector pointing away
from the centre of the planet. Also, $\mathbf{u}$ is the three-dimensional velocity
vector and $\mathbf{v}$ is the two-dimensional horizontal velocity vector, and we
have assumed the Coriolis force acts solely in the horizontal, since its vertical
component is small compared with the gravitational and pressure gradient forces.

Alternatively:

$$ \frac{\partial u}{\partial t} + \frac{\partial uu}{\partial x}
    + \frac{\partial uv}{\partial y} + \frac{\partial uw}{\partial z}
    = -\frac{1}{\rho}\frac{\partial p}{\partial x}  + fv $$

$$ \frac{\partial v}{\partial t} + \frac{\partial vu}{\partial x}
    + \frac{\partial vv}{\partial y} + \frac{\partial vw}{\partial z}
    = -\frac{1}{\rho}\frac{\partial p}{\partial y} - fu $$

$$ \frac{\partial w}{\partial t} + \frac{\partial wu}{\partial x}
    + \frac{\partial wv}{\partial y} + \frac{\partial ww}{\partial z}
    = -\frac{1}{\rho}\frac{\partial p}{\partial z} - g $$

The conservation of mass under the assumption of incompressibility is:

$$ \nabla\cdot\mathbf{u} = 0 $$

or:

$$ \frac{\partial u}{\partial x} + \frac{\partial v}{\partial y}
   + \frac{\partial w}{\partial z} = 0 $$

The condition of hydrostatic balance, which is the first key assumption of the
shallow water equations, is given by:

\begin{equation} \label{HydrostaticBalance} \frac{1}{\rho}\frac{\partial p}{\partial z} = -g \end{equation}

This is derived from the momentum equation describing $w$ by assuming that the left-
hand side is zero:

$$ \frac{Dw}{Dt} = \frac{\partial w}{\partial t} + \frac{\partial wu}{\partial x}
    + \frac{\partial wv}{\partial y} + \frac{\partial ww}{\partial z}
    = 0 $$

The hydrostatic balance equation can be immediately integrated from some arbitrary depth
$z$ up to the free surface, to give:

$$ p = p_0 + \rho g\left(h - z\right) $$

where $p_0$ is the fixed pressure at the free surface (e.g. zero for the atmosphere, or
atmospheric pressure for the ocean), and $h$ is the elevation of the free
surface above $z = 0$.

Then:

$$ \frac{\partial p}{\partial x} = \rho g\frac{\partial h}{\partial x} $$

and similarly for $\partial p/\partial y$. I.e.:

$$ -\frac{1}{\rho}\nabla_h p = -g \nabla_h h $$

The implication is that the horizontal pressure gradient force is a result only of
horizontal variatons in the free surface height.

The remaining two components of the momentum equation are consequently:

\begin{equation} \label{3Du} \frac{\partial u}{\partial t} + \frac{\partial uu}{\partial x}
    + \frac{\partial uv}{\partial y} + \frac{\partial uw}{\partial z}
    = -g\frac{\partial h}{\partial x} + fv \end{equation}

\begin{equation} \label{3Dv} \frac{\partial v}{\partial t} + \frac{\partial vu}{\partial x}
    + \frac{\partial vv}{\partial y} + \frac{\partial vw}{\partial z}
    = -g\frac{\partial h}{\partial y} - fu \end{equation}

Equations $\ref{3Du}$, $\ref{3Dv}$ and $\ref{3Dh}$ are the 3D shallow water equations.

## Two-dimensional shallow water equations

To obtain the 2D shallow water equations we integrate the 3D equations over $z$, to
obtain depth- (or height-) averaged forms of the equations. The Liebniz integral
rule is required since $h$, which is one of the limits of the integration over $z$,
depends on $x$, $y$ and $t$.

In 2D, the shallow water equations (neglecting diffusion, viscosity and friction) are:

$$ \frac{\partial h}{\partial t} + \frac{\partial hu}{\partial x} + \frac{\partial hv}
    {\partial y} = 0 $$

$$ \frac{\partial hu}{\partial t} + \frac{\partial hu^2}{\partial x}
    + \frac{\partial huv}{\partial y} = -g\frac{\partial h}{\partial x} + fhv $$

$$ \frac{\partial hv}{\partial t} + \frac{\partial huv}{\partial x}
    + \frac{\partial hv^2}{\partial y} = -g\frac{\partial h}{\partial y} -fhu $$

The shallow water equations can be written more compactly thus:

$$ \frac{\partial phi}{\partial t} + \mathbf{v}\cdot\nabla\phi + \phi\nabla\cdot\mathbf{v}
    = 0$$

$$ \frac{\partial\mathbf{v}}{\partial t} + \mathbf{v}\cdot\nabla\mathbf{v}
    + \nabla\mathbf{\phi} + f\mathbf{\hat k}\times\mathbf{v} = 0 $$

where $\phi = gh$.

The first equation is obtained by integrating the continuity equation:

$$ \frac{\partial u}{\partial x} + \frac{\partial v}{\partial y}
   + \frac{\partial w}{\partial z} = 0 $$

with respect to $z$ to give:

$$ \left(\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y}\right)h + w_h - w_0 = 0 $$

The vertical velocity disappears at the lower boundary ($w_0 = 0$) and the vertical
velocity at the free surface (at height $h$) is given by:

$$ w_h = \frac{Dh}{Dt} $$

Thus:

$$ \frac{Dh}{Dt} = \frac{\partial h}{\partial t} 
    + \frac{\partial hu}{\partial x} + \frac{\partial hv}{\partial y} = w_h
    = \left(\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y}\right)h $$


# One-dimensional shallow water equations

In 1D, which is often used for river management and hydraulics, the equations are:

$$ \frac{\partial u}{\partial t} = -u \frac{\partial u}{\partial x}
                                   -g \frac{\partial h}{\partial x} $$
$$ \frac{\partial h}{\partial t} = -u \frac{\partial h}{\partial x}
                                   -h \frac{\partial u}{\partial x} $$

where $h$ is the height of the free surface. Accelerations in the $y$ direction have
also been assumed negligible.

In both equations the first term on the right
represents advection and the second term on the right represents [adjustment](
{filename}/adjustment-of-meteorological-fields-in-nwp.md). (More
complex variants are used in river modelling and hydraulics that account for, for example,
the cross-sectional area of the channel. These are often referred to as the
[Saint Venant](
https://en.wikipedia.org/wiki/Shallow_water_equations#One-dimensional_Saint-Venant_equations)
equations, having originally been derived by Adhemar Jean Claude Barre de Saint-Venant,
in 1871.)

In hydraulics studies Coriolis force is ignored but in geophysics applications it is
included, making the shallow water equations a useful simplistic framework in which to
study rotational flow under gravity.

