Title: Upstream differencing and the semi-Lagrangian scheme
Date: 2017-03-15 20:58
Category:  
Modified: 2017-03-15 20:58
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: draft

The upstream differencing technique is probably the simplest numerical
discretisation technique; take as an example the linear advection equation:

$$
\frac{\partial y}{\partial t} + u_0 \frac{\partial y}{\partial x} = 0
$$

which becomes:

$$
\frac{y_j^{n+1} - y_j^n}{\Delta t} + -u_0 \frac{y_j^n - y_{j-1}^n}{\Delta x} = 0
$$

in the upstream scheme. The time and space derivatives have been treated using
forward and backward differencing, respectively. (Note that as it is, this is
upstream under the assumption that $u_0$ is positive in the positive
$x$-direction, so the grid-point at $x_{j-1}$ is further upstream than the grid
point at $x_j$. For $u_0 \lt 0$ the forward difference would be taken.)

Rearranging for $y_j^{n+1}$ gives:

$$
y_j^{n+1} = y_j^n - \alpha \left(y_j^n - y_{j-1}^n\right)
$$

where:

$$
\alpha = \frac{u_0\Delta t}{\Delta x}
$$

This explicit scheme is stable so long as $\alpha \lt 1$, which is the
well-known CFL condition. This is usually interpreted as saying that the scheme
remains stable only when the time-step $\Delta t$ is less than the minimum time
for information to cross the cell, which is $u_0/\Delta x$.

The upstream differencing technique is essentially linear interpolation. In
general, to linearly interpolate values of $y$ at two grid-points $x_{j-1}$ and
$x_j$ onto some interior point $x_*$, we write:

$$
y(x_*) = y_j - \frac{y_j - y_{j-1}}{\Delta x}\left(x_j - x_*}\right)
$$

which we can see is equivalent to the upstream difference equations if we
equate:

$$
y(x_*) = y_j^{n+1}
$$

and:

$$
x_j - x_* = u_0\Delta t
$$

such that:

$$
x_* = x_j - u_0 \Delta t
$$

Therefore, the point that we interpolate onto, $x_*$, is that point which, after the
time-step has elapsed, will have translated to location $x_j$. The upstream
differencing equation is equivalent to equating the (interpolated) value of the
field at this location at the start of the time-step with the value of the
field at the grid point $x_j$ at the end of the time-step, which is the
solution we are seeking.

This is the essence of the semi-Lagrangian differencing scheme. For each
grid-point, we track back along the fluid velocity field until the beginning of
the time-step (at which time the advected field is known) to find what is
referred to as the *departure point*; then we interpolate the advecting field onto
the departure point, and take that value to be the field value at the grid
point at the end of the time-step. This can clearly work in multiple
dimensions, and can be adapted for space- and time-varying velocity fields.

With this interpretation of upstream differencing as interpolation, we can see
that the upstream scheme becomes unstable when the point we need to interpolate onto,
that will arrive at $x_j$ at the end of the time-step, is more than one grid
cell away, and is thus no longer bounded by $x_{j-1}$ and $x_j$. However, it is
clearly possible to generalise the interpolation such that it uses the
appropriate bounding grid points, wherever the departure point might be:

$$
y_j^{n+1} = y_*
          = y_{j-p} - \frac{y_{j-p} - y_{j-p-1}}{\Delta x}\left(x_{j-p} - x_*\right)
$$

Now:

$$
u_0 \Delta t$ = p\Delta x + \left(x_{j-p} - x_*\right)
$$

or:

$$
\alpha  = \frac{u_0\Delta t}{\Delta x} = p + f
$$

where $f$ is the fractional distance across the cell between $x_*$ and
$x_{j-p}$. For simple upstream differencing, the stability condition
that $\alpha \lt 0$ required that $p = 0$, since $p$ can take the values $0, 1,
2, ...$. However, the stability condition for the general semi-Lagrangian
technique is found to be that $f \lt 0$. This is true as long as the closest
bounding grid points are used in the interpolation, no matter what the value
of $p$. Hence, time-steps of any length can be chosen (on stability grounds -
accuracy is as usual a different matter).
