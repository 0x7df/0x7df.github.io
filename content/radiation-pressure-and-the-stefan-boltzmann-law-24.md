Title: Radiation pressure and the Stefan-Boltzmann law (2/4)
Date: 2015-05-17 15:12
Author: 0x7df
Category: Uncategorized
Slug: 
Status: draft
Tags: physics, thermodynamics

In a
[previous post on Kirchhoff's law (1859) and black bodies]({filename}thermal-radiation-kirchhoffs-law-and-black-bodies-14.md)
, we saw
that the energy density of thermal radiation is a function of
temperature only. The first measurements of thermal radiation (from hot
platinum wire) were made by Tyndall, and from his results Stefan
concluded, in 1879, that the energy radiated went as the fourth power of
the absolute temperature. This empirical relationship was later
theoretically determined, for black bodies, by Boltzmann in 1884. The
law that bears both their names is:

$$ R_B = \sigma T^4 $$

and $ \sigma$ is known as the Stefan-Boltzmann
constant, and $ R_B$ is the emissive power, the
radiant power emitted per unit area.

Radiation pressure
------------------

Before we begin, it's necessary to understand that radiation exerts a
pressure. The easiest way to calculate the radiation pressure is to
assume that photons are particles of mass $ m$, where
$m$ is given by:

$$ e = mc^2 $$

$e$ being the photon energy. If we do this, then we
can treat the radiation field as a photon gas and find its pressure in
the same way as we would for a normal gas, from kinetic arguments; we
assume the pressure is the sum of all the impulses delivered to a unit
area of the wall in unit time by particles colliding with it.

The collision rate of a single particle is:

$$ \frac{|u_x|}{2 L_x}$$

where $ u_x$ is the component of the particle's velocity normal to the wall
(assumed
conserved), and $ L_x$ is the dimension of the
container along the normal to the wall. The impulse delivered in each
collision is equal to the momentum change of the particle, i.e.:

$$ 2m|u_x|$$

So the impulse per unit time is:

$$ \frac{m u_x^2}{L_x} $$

for a single particle. This leads to:

$$ \frac{N \bar m c^2}{3 L_x}$$

for $N$ particles, where $ c^2/3$ is
the mean value of $ \bar{u_x^2}$ and $ \bar m$
is the mean mass. This force corresponds to a pressure of:

$$ p = \frac{N \bar m c^2}{3 V} $$

where we have assumed the volume $ V = L_x A$; or:

$$ p = \frac{n \bar m c^2}{ 3}$$

where $ n = N/V$ is the number density of particles.
Replacing $ \bar m c^2$ with $/bar e$
gives:

$$ p = \frac{1}{3} n\bar e$$

which is the same as:

$$ p = \frac{1}{3} \frac{E}{V} $$

Derivation of the Stefan-Boltzmann law - energy density
-------------------------------------------------------

Let's begin with the general thermodynamic expression:

$$ dE = T dS - p dV $$

which applies when volume is the only constraint to be be varied. If we
divide by $ dV$ at fixed $ T$ we
obtain:

$$ \left( \partial E/\partial V\right)_T = T \left(\partial
S/\partial V\right)_T - p $$

We can see that for an enclosure at constant temperature:

$$ \left(\partial E/\partial V\right)_T = E/V $$

(i.e. the energy density in the cavity), since increasing the size of
the cavity just adds more radiation at the same density (we proved in
the
[previous post]({filename}thermal-radiation-kirchhoffs-law-and-black-bodies-14.md)
that the energy density is constant throughout and
depends only on the temperature of the walls, not on the size or shape
or material). Hence:

$$ E/V = T \left(\partial S/\partial V\right)_T - p
$$

Next we can also use the Maxwell relation:

$$ \left(\partial S/\partial V\right)_T = \left(\partial
p/\partial T\right)_V $$

which comes from the fact that both:

$$ dF = -S dT - p dV $$

$$ dF = \left(\partial F/\partial T\right)_V dT +
\left(\partial F/\partial V\right)_T dV $$

are true, so that we can identify:

$$ S = -\left(\partial F/\partial T\right)_V $$

$$ p = - \left(\partial F/\partial V\right)_T $$

and, bearing in mind that $ \left(\partial/\partial V\right)_T
\left(\partial F/\partial T\right)_V = \left(\partial/\partial
T\right)_V \left(\partial F/\partial V\right)_T$,
arrive at:

$$ \left(\partial S/\partial V\right)_T = \left(\partial
p/\partial T\right)_V$$.

Inserting this result into:

$$ E/V = T \left(\partial S/\partial V\right)_T - p
$$

gives:

$$ E/V = T \left(\partial p/\partial T\right)_V - p
$$

Now, the radiation pressure is $ p = (1/3) E/V$, so:

$$ 4p = T \left(\partial p/\partial T\right)_V
$$

Hence:

$$ dp/p = 4 dT/T $$

at fixed $ T$. It follows that $ p \propto T^4$, and since $ p \propto E/V$, then:

$$ E/V \propto T^4 $$

That is, the radiation energy density is proportional to the fourth
power of the temperature. (We will call the constant of proportionality
here $a$ to distinguish it from $ \sigma$,
since here we are considering energy density, and the
version of the Stefan-Boltzmann law we gave at the beginning was for the
radiated power per unit area.) Hence, and finally:

$$ E/V = a T^4 $$

Stefan-Boltzmann law - radiated power
-------------------------------------

If the energy density in the interior of our constant-temperature
enclosure is $ E/V = a T^4$, then the flux onto unit
area of the cavity wall would be $ ac T^4$ if the
radiation were all incident normally on the wall. If it were incident at
an angle $ \theta$ to the normal, the flux would be
$ ac T^4 \cos \theta$. In reality the radiation is
isotropic, so the flux is given by:

$$ R_B = \int{ac T^4 \cos \theta}df $$

where we have equated the radiated power per unit area, $R_B$, with the
flux of radiation falling on the wall, which must be true if the
wall temperature stays constant; and where $ df$ is the
area element of the unit sphere centred at the point of interest on the
wall. This is given by:

$$ df = \frac{2\pi r^2 \sin \theta d\theta}{ 4\pi r^2} $$

so the flux is:

$$R_B = \frac{1}{2} \int_0^{\pi /2} {ac T^4 \cos\theta\sin\theta} d\theta  = \frac{1}{4} acT^4 $$

If we define $ \sigma = (1/4) ac$ then:

$$ R_B = \sigma T^4 $$

which is where we began.

Note that, since we know from Kirchhoff's law that a non-black body
radiator has emissive power $ R = a R_B$, where
$ a$ is the absorptivity of the non-black body at the
temperature in question, then in general:

$$ R = a\sigma T^4 $$

Care is needed using this formula because $ a$ often
has a strong dependence on temperature.

In practice, it is usually the difference between emitted and absorbed
radiation that is measured. A black body at temperature $ T_1$
emits radiation at a rate of $ \sigma T_1^4$ per
unit area, but if it is placed in a sealed enclosure with wall
temperature $ T_2$, so that its surroundings are at
temperature $ T_2$, it is subject to incident
radiation at a rate of $\sigma T_2^4$. (This latter must
be true since, if the body were in equilibrium with the radiation field
of the enclosure, it would be radiating at a rate of$\sigma T_2^4$,
and since it's in equilibrium, must absorb radiation at
the same rate. The rate of absorption is no different when the body is
at a different temperature  (Assume the body is small enough compared to
the enclosure that its presence doesn't disturb the radiation field in
the enclosure - $ T_2$ is constant.))

