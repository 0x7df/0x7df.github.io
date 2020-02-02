Title: Atomic collapse
Date: 2015-02-21 20:25
Author: 0x7df
Category: Uncategorized
Slug:
Status: draft
Tags: physics

> Show from classical electromgnetic theory that a negative electron
> orbiting a positive nucleus in a mechanically stable orbit radiates
> energy continuously at a frequency equal to that of its motion.

First, we show that a charge undergoing acceleration radiates energy, and work
out the power radiated.

We can do this without recourse to Maxwell's equations, by following a
derivation given by Edward Purcell, in his book *Electricity and Magnetism*.

Consider, to begin with, a stationary point charge, for example an electron. By
virtue of its charge, it generates a radial electric field, given by Coulomb's
law:

$$ E = \frac{kq}{r^2} $$

If the charge were moving at a constant speed, then the pattern of electric
field lines would be translating in the same direction at the same speed as the
charge itself, but other than this constant translation, is otherwise
undisturbed.

On the other hand, if the charge undergoes an *acceleration*, this results in a
disturbance in the electric field that propagates from the charge outwards. To
see this, imagine that the charge, inititally moving left to right with some
constant velocity, undergoes a change in velocity $\Delta v$ in some short time
$\Delta t$. The electric field does not adjust everywhere instantaneously to
this new speed, but rather the 'knowledge' of the change propagates out at the
speed of light, $c$. Some time $t >> \Delta t$ after the change in velocity,
the electric field lines within a radius $r = ct$ of the charge have adjusted
to the new velocity, but the electric field lines beyond the radius $c(t +
\Delta t)$ are still in the configuration they would have been in had the
velocity increase not occurred; the 'news' of the change, travelling at the
finite speed of light, has not reached that region of space yet.

It is not possible to have a discontinuity in the electric field lines, so we
must have electric field lines within the spherical shell from $r = ct$ to $c(t
+ \Delta t)$ which have a tangential component. We can calculate the tangential
component of the electric field, as follows.

First, we note that the *slope* of an arbitrary electric field line at angle
$\theta$ from the direction of the charge's motion is given by:

$$ \frac{E_r}{E_\perp} = \frac{c\Delta t}{\Delta vt\sin{\theta}} $$

The radial component is just the thickness of the spherical shell, and the
tangential component is the distance tangentially to the shell between the
original (exterior) and adjusted (interior) field lines. For the line along the
direction of motion ($\sin{\theta} = 0$) this is zero, and for the electric
field line perpendicular to the electron's motion ($\sin{\theta} = 1$) the
distance is $v\Delta t$.

Knowing this ratio allows us to determine $E_\perp$, since we know the radial
component; this is the same as for a quiescent, undisturbed electric field at
the same position - the acceleration has not changed this. That is:

$$ E_r = \frac{kq}{r^2} $$

and so:

$$ E_\perp = \frac{\Delta v t \sin{\theta}}{c \Delta t} \frac{kq}{r^2} $$

Generalising $\Delta v/\Delta t$ to acceleration $a$:

$$ E_\perp = \frac{a t \sin{\theta}}{c} \frac{kq}{r^2} $$

and substituting $r/c$ for $t$:

$$ E_\perp = \frac{a \sin{\theta}}{c^2} \frac{kq}{r} $$

At this point, we note that the field falls off as $1/r$, whereas the radial
field falls off as $1/r^2$.

The density of energy stored in the electric field, $\eta$, is given by:

$$ \eta = \frac{1}{2} \eta_0 E^2 $$

hence:

$$ \eta = \frac{1}{2} \eta_0 \frac{k^2 q^2 a^2 \sin^2{\theta}}{r^2 c^4} $$

and substituting:

$$ k = \frac{1}{4\pi\eta_0} $$

simplifies this to:

$$ \eta_e = \frac{1}{2} \frac{q^2 a^2 \sin^2{\theta}}{16 \pi^2 \eta_0 r^2 c^4} $$

The expression above gives the energy density due to the electric field,
$\eta_e$; but for plane waves the energy stored in the magnetic field,
$\eta_m$, is equal. Therefore the total energy density, $\eta$, is twice this.

The energy passing through a unit area normal to the direction of propagation
of the radiation, per unit time - i.e. the flux of energy - is given by the
energy density multiplied by the speed of propagation; this flux is:

$$ S = c\eta $$

$$ S = \frac{q^2 a^2 \sin^2{\theta}}{16 \pi^2 \eta_0 r^2 c^3} $$

This flux in a given direction goes inversely as the square of the distance.

Since the flux is the power radiated per unit area, to find the total power
radiated in all directions, we need only to integrate over all directions.

A unit area in spherical coordinates is given by:

$$ dA = 2\pi r^2 \sin{\theta} d\theta $$

Hence:

$$ P = \int S dA $$

and:

$$ P = \frac{q^2 a^2}{8 \pi \eta_0 c^3} \int_0^{\pi} \sin^3{\theta} d\theta $$

The integral evaluates to $4/3$, hence:

$$ P = \frac{q^2 a^2}{6 \pi \eta_0 c^3} $$

This is known as _Larmor's equation_ (not to be confused in any way with
_Larmor frequency_ which is to do with nuclear processes).

Now that we know the power radiated (the energy loss per unit time), we can
start to calculate the time it will take for the radiating electron to lose all
its energy.

The rate of energy loss is not constant, because as the electron loses energy,
its radial distance from the nucleus decreases, and hence its acceleration
decreases:

$$ a = \frac{v^2}{r} = \omega^2 \rho $$

where $\rho$ is the radius of revolution. Hence:

$$ P = \frac{q^2\omega^4\rho^2}{6\pi\eta_0c^3} $$

We know that, for an oscillating system, the average total (kinetic plus
potential) energy is:

$$ E = \frac{1}{2} m_e \omega^2 \rho^2 $$

and hence we can use this to show that the power, or energy loss, is a fixed
fraction of the total energy:

$$ P / E = \frac{1}{E} \frac{dE}{dt} = \frac{q^2\omega^2}{3\pi\eta_0m_ec^3} $$

The right-hand side is a constant (as long as we make the approximation, as is
typical in dealing with damped harmonic oscillators, that the frequency of
rotation $\omega$ stays constant); call it $\lambda$:

$$ E = \lambda \frac{dE}{dt} $$

and therefore:

$$ E(t) = E_0 e^{-\lambda t} $$

The time taken for the energy to reduce by a factor of $1/e$ is:

$$\Delta t = \frac{1}{\lambda} = \frac{3 \pi \eta_0 m_e c^3}{q^2 \omega^2} $$
