Title: Diffusion
Date: 2017-03-05 14:07
Author: 0x7df
Category: physics
Slug: 
Status: published
Tags: diffusion, physics

Diffusion Equation
------------------

The time-dependent diffusion equation is:

$$  
\frac{\partial u}{\partial t} = \nabla \cdot \left(
D\left(\mathbf{r}, t\right) \nabla u\left(\mathbf{r}, t\right)
\right) + Q\left(\mathbf{r}, t\right)  
 $$

where:

-   $ \mathbf{r}$ is position
-   $ t$ is time
-   $ u \left( \mathbf{r}, t \right)$ is the
    unknown, i.e. diffusing quantity
-   $ D \left( \mathbf{r}, t \right)$ is the
    diffusion coefficient
-   $ Q \left( \mathbf{r}, t \right)$ is the
    source density

From hereon we will display the quantities $ D$,
$ Q$ and $ u$ without
their arguments, for simplicity of notation.

To derive the diffusion equation we begin with Fick's law [(Fick,
1855)](#fn1):

$$  
\mathbf{F} = -D \nabla u  
 $$

The vector field $ \mathbf{F}$ is the flux,
which is the rate of transfer per unit area; the integral of the normal
component of $ \mathbf{F}$ over a given surface
is equal to the rate of flow through the surface. The direction of the
flux vector is normal to the surface of constant concentration. Fick's
law says that for a given concentration $ u$ at a
point $ \mathbf{r}$, the flux is
proportional to the concentration gradient there, and has the opposite
direction.

$ Q$ is the source density: the concentration
produced per unit time per unit volume.

The divergence of $ \mathbf{F}$, i.e. $
\nabla \cdot \mathbf{F}$, is the rate of loss of
concentration per unit time from the volume element.

Hence, by conservation:

$$  
\frac{\partial u}{\partial t} =  
- \nabla \cdot \mathbf{F} + Q  
 $$

Hence:

$$  
\frac{\partial u}{\partial t} =  
\nabla \cdot D \nabla u + Q  
 $$

As we saw above, this is the diffusion equation (sometimes known as
Fick's second law).

The equation as written is linear, although it would be non-linear if we
allowed the diffusion coefficient $ D$ to vary
with the unknown $ u$, as well as with $ x$
and $ t$.

Special Cases
-------------

In the special case that $ D$ is constant in space and time, then
this equation simplifies to:

$$  
\frac{\partial u}{\partial t} = D \nabla^2 u + Q  
 $$

and in steady-state, if $Q$ is also constant, $ \partial u/\partial t = 0$,
it reduces to Poisson's equation:

$$  
\nabla^2 u = \frac{Q}{D}
 $$

and further to Laplace's equation if the source term is zero:

$$  
\nabla^2 u = 0  
 $$

Returning now to the full equation, we recall that:

$$
\nabla = \hat i \frac{\partial}{\partial x} + \hat j
\frac{\partial}{\partial y} + \hat k \frac{\partial}{\partial z}
$$

$$
= \hat e_{\rho} \frac{\partial}{\partial \rho} + \hat
e_{\phi} \frac{\partial}{\partial \phi} + \hat e_z
\frac{\partial}{\partial z}
$$

$$
= \hat e_{r} \frac{\partial}{\partial r} + \hat e_{\theta}
\frac{\partial}{\partial \theta} + \hat e_{\phi}
\frac{\partial}{\partial \phi}  
$$

in Cartesian, cylindrical and spherical geometries, respectively.

Consider first spherical geometry:

$$  
\nabla \cdot D \nabla u = $$
$$
\frac{1}{r^2} \frac{\partial}{\partial r} \left( r^2 D
\frac{\partial u}{\partial r} \right) +  
\frac{1}{r \sin \theta} \frac{\partial}{\partial \theta} \left(
\frac{D \sin \theta }{r} \frac{\partial u}{\partial \theta}
\right) +  
\frac{1}{r \sin \theta} \frac{\partial}{\partial \phi} \left(
\frac{D}{r \sin \theta} \frac{\partial u}{\partial \phi}
\right)  
 $$

In cylindrical geometry:

$$  
\nabla \cdot D \nabla u =  
\frac{1}{\rho} \frac{\partial}{\partial \rho} \left( \rho D
\frac{\partial u}{\partial \rho} \right) +  
\frac{1}{\rho} \frac{\partial}{\partial \phi} \left(
\frac{D}{\rho} \frac{\partial u}{\partial \phi} \right) +  
\frac{\partial}{\partial z} \left( D \frac{\partial u}{\partial
z} \right)  
 $$

and in Cartesian geometry:

$$  
\nabla \cdot D \nabla u =  
\frac{\partial}{\partial x}\left( D \frac{\partial u}{\partial
x} \right) +  
\frac{\partial}{\partial y}\left( D \frac{\partial u}{\partial
y} \right) +  
\frac{\partial}{\partial z}\left( D \frac{\partial u}{\partial
z} \right)  
 $$

In one dimension:

$$
\frac{\partial u}{\partial t} = \frac{1}{r^2}
\frac{\partial}{\partial r} \left( r^2 D \frac{\partial
u}{\partial r} \right) + Q   
$$

$$\frac{\partial u}{\partial t} = \frac{1}{\rho}
\frac{\partial}{\partial \rho} \left( \rho D \frac{\partial
u}{\partial \rho} \right) + Q
$$

$$
\frac{\partial u}{\partial t} = \frac{\partial}{\partial x}
\left( D \frac{\partial u}{\partial x} \right) + Q  
 $$

These equations can be generalised:

$$  
\frac{\partial u}{\partial t} = \frac{1}{x^p}
\frac{\partial}{\partial x} \left(x^p D \frac{\partial
u}{\partial x} \right) + Q  
 $$

where:

-   $ p = 0$ for plane geometry
-   $ p = 1$ for 1D cylindrical geometry, and
-   $ p = 2$ for 1D spherical geometry.

Heat Flow Equation
------------------

The phenomena of heat conduction and diffusion are basically the same,
and [Fick, 1855](#fn1) first put diffusion on a quantitative
basis by adopting the mathematical equation of heat conduction derived
by Fourier [(Fourier, 1822)](#fn2).

The heat flow equation of Fourier is:

$$  
a \frac{\partial \theta}{\partial t} = \frac{\partial}{\partial
x} K \frac{\partial \theta}{\partial x}  
 $$

where $ a$ is the heat capacity of the material
per unit volume and $K$ is the thermal
conductivity. For constant conductivity this becomes:

$$  
\frac{\partial \theta}{\partial t} = \frac{K}{a}
\frac{\partial^2 \theta}{\partial x^2}  
 $$

where the corresponding equation for diffusion is:

$$  
\frac{\partial u}{\partial t} = D \frac{\partial^2 u}{\partial
x^2}  
 $$

For the two equations to correspond, we equate temperature
$ \theta$ with concentration $ u$, which clearly implies that $ D = K/a$.
However, it is also the case that:

$$  
\mathbf{F} = -K \nabla \theta  
 $$

which, when compared with Fick's law for diffusion, implies that
$ D = K$, and therefore that in diffusion, unlike in heat
conduction, $ a = 1$. This is because we have
identified $ C$ with $ \theta$,
whereas in heat conduction, the diffusing 'substance'
is actually heat, not temperature. The factor $ a$ 
is needed to convert temperature to the amount of heat per unit
volume, whereas in diffusion, the concentration is already by definition
the amount of substance per unit volume, so $ a = 1$.

* * * * *

1.  <a name="fn1" href="http://www.tandfonline.com/doi/abs/10.1080/14786445508641925">
    Fick, A, 1855. On liquid diffusion. The London,
    dinburgh, and Dublin Philosophical Magazine and Journal of Science,
    X, 30-39.</a>
2.  <a name="fn2" href="https://books.google.co.uk/books?id=No8IAAAAMAAJ">
    Fourier, JBJ, 1822. Théorie Analytique de la chaleur. F.
    Didot, Paris.</a>

