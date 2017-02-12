Title: Total derivative
Date: 2015-08-30 21:43
Author: 0x7df
Category: Uncategorized
Slug: 691
Status: draft
Tags: fluid dynamics, mathematics, physics

It is important in fluid dynamics to distinguish between two kinds of
time derivative, for functions of multiple variables. The more common
time derivative of a function is the *partial derivative*,
$ \partial / \partial t$. This is the rate of change of
the function with time, with all other variables held constant. When the
variables on which the function depends are independent of each other,
the partial derivatives are sufficient to determine the rate of change
of the function with respect to each of them. However, if there are
dependencies among the independent variables, this is no longer the
case.

The second kind of time derivative is the *total derivative*, $ d / dt$
or sometimes $ D / Dt$. This
is the rate of change of the function with time, but taking into account
not only the direct effect of time, but also its indirect effects due to
changes in those other variables that are themselves functions of time.
Typically, the other dependent variables are the spatial coordinates,
and the total derivative takes into account the fact that, in addition
to the properties of the fluid element changing intrinsically with time,
its position is also changing with time, and therefore the spatial
coordinates are functions of time.

For example, for a function $ f(x, y, z, t)$:

$$ \frac{Df}{Dt} = \frac{\partial f}{\partial t} \frac{dt}{dt}
+ \frac{\partial f}{\partial x}\frac{dx}{dt} + \frac{\partial
f}{\partial y}\frac{dy}{dt} + \frac{\partial f}{\partial
z}\frac{dz}{dt} $$

Hence:

$$ \frac{Df}{Dt} = \frac{\partial f}{\partial t} +
u\frac{\partial f}{\partial x} + v\frac{\partial f}{\partial y} +
w\frac{\partial f}{\partial z} $$

where $ u, v, w$ are the components of the fluid
velocity in the $ x, y, z$ directions
respectively. In vector notation, for any coordinate system:

$$ \frac{Df}{Dt} = \frac{\partial f}{\partial t} +
\mathbf{u}\cdot\nabla f $$

where $ \mathbf{u}$ is the flow velocity. The
total derivative is often referred to as the *material derivative* or
the *Lagrangian derivative*, as it gives the rate of change that would
be experienced by following the motion of the fluid element. The first
term on the right - the partial derivative with respect to time - is
often called the *local derivative* or the *Eulerian derivative* because
it measures the rate if change of the quantity at a fixed point in
space. The second term is often referred to as the *convective
derivative*.

