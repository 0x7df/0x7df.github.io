Title: Hydrostatic balance in the atmosphere
Date: 2015-05-02 22:10
Author: 0x7df
Category: Atmospheric science
Tags: exponential atmosphere, fluid dynamics, homogeneous atmosphere, hydrostatic balance, hydrostatic equilibrium, meteorology
Slug: hydrostatic-balance-in-the-atmosphere
Status: published

Atmospheric pressure at any altitude represents the total weight, per
unit area, of the air column above that altitude. The pressure,
therefore, decreases with altitude as there is less air above pressing
down. To find the rate of decrease of pressure with height, consider a
vertical column of air with unit cross-sectional area, having
pressure $ p$ at height $ z
$. At height $ z + dz$ the pressure
has decreased to some value $ p-dp$, and the
pressure difference $ dp$ is equal to the weight
of the slice of the vertical air column having thickness $ dz$
(at height $ z$).
Assuming $ dz$ is small enough that the air
density, $ \rho$, and the acceleration due to
gravity, $ g$, can both be considered constant
within the slice:

$$ dp = -g \rho dz $$

Here $ g$ is the acceleration of gravity that
transforms the areal mass element $ \rho dz$ into
an areal weight element $ g\rho dz$.

This equation is called the *hydrostatic equation*. It is commonly
written as:

$$ \frac{\partial p}{\partial z} = -g \rho $$

This expresses that the upward vertical pressure-gradient force is
balanced by the downward gravitational force, a situation usually
referred to as *hydrostatic equilibrium*.

With increasing altitude, the density of air also decreases (e.g. from
an average of 1.2 kg/m^3^ at the surface to an average of 0.7 kg/m^3^ at
5 km); hence the rate of change of pressure with height decreases with
height. Air temperature also affects density (in a way described by the
equation of state), and therefore the rate of pressure decrease with
altitude.

Substituting in the equation of state allows us to integrate the
hydrostatic equation to obtain an expression for $ p(z)$.
The equation of state for dry air is:

$$ p = \rho R T $$

where $ R = R^{*}/m$ is the individual gas
constant for dry air, and $ R^{*}$ and $ m
are the universal gas constant and the molecular weight
of dry air, respectively. (The equation of state for moist air can be
obtained by replacing $ T$ with $ T_v$,
which is the *virtual temperature*. It can be shown
that moist air is lighter than dry air of the same temperature and
pressure, because the water vapour is lighter than the dry air it
replaces; so that in cases where only the density of air is important,
dry air of slightly higher temperature may be substituted for moist air.
Virtual temperature is the fictitious temperature to which dry air must
be raised to have the same density as the moist air in question, and of
course it depends on the moisture content as well as the pressure.)

Making this substitution gives:

$$ \frac{\partial p}{\partial z} = -\frac{g}{RT}p
$$

and hence:

$$ \frac{dp}{p} = \frac{g}{RT}dz $$

By integration:

$$ p = p_0 \exp \left( -\frac{g}{R} \int_{z_0}^z
\frac{1}{T} dz' \right) $$

(assuming $ g$ is constant with height).

In the special case where the temperature is constant with height, the
pressure profile is:

$$ p = p_0 \exp \left( -\frac{g(z-z_0)}{RT} \right)
$$

The temperature in the atmosphere varies by a factor of two, whereas the
pressure varies by six orders of magnitude.

Model atmospheres
-----------------

The following is question 3.5 from [*A Short Course in Cloud Physics*,
by Rogers and
Yau](https://www.elsevier.com/books/a-short-course-in-cloud-physics/yau/978-0-7506-3215-7).

> *Two model atmospheres often used in theoretical work are the
> homogeneous atmosphere:*
>
> $ \rho(z) = \rho_0 $$
>
> *and the exponential atmosphere:*
>
> $ \rho(z) = \rho_0 e^{-z/H} $$
>
> *where* $ \rho_0$ *is the density at the
> surface and H is called the scale height of the atmosphere. The top of
> the homogeneous atmosphere is defined as the altitude where the
> pressure falls to zero. Prove that the height of the top of the
> homogeneous atmosphere equals the scale height of the exponential
> atmosphere.*

For this problem we need the equation of [hydrostatic
balance](en.wikipedia.org/wiki/Hydrostatic_equilibrium):

$$ \frac{\partial p}{\partial z} = -\rho(z) g $$

which describes the equilibrium achieved in a fluid under gravity, where
the upward[pressure gradient
force](en.wikipedia.org/wiki/Pressure-gradient_force) balances the
opposing force due to gravity.

First consider the [homogeneous
atmosphere](http://glossary.ametsoc.org/wiki/Homogeneous_atmosphere);
using this equation it is very simple to calculate the height at which
the pressure falls to zero because, since the density is constant, the
gradient of pressure with height is also constant:

$$ \frac{\partial p}{\partial z} = -\rho_0 g $$

That is, the pressure falls off linearly:

$$ p(z) = \left( -\rho_0 g \right) z + p_0 $$

where $ p_0$ is the pressure at the surface
($ z = 0$). From this equation we see that the
pressure falls to zero when:

$$ z|_{p=0} = \frac{p_0}{\rho_0 g} $$

Now consider the [exponential
atmosphere](http://en.wikipedia.org/wiki/Barometric_formula); we can
determine *H* in the following way. First, we integrate the equation for
hydrostatic balance from some height $ z = z'$ up
to $ z = \infty$ to obtain the pressure at height
$$ z'$:

$$ \int_{z'}^{\infty} \frac{\partial p}{\partial z} dz =
-\rho_0 g \int_{z'}^{\infty} e^{-z/H} dz $$

If we assume that the pressure tends to zero as height tends to
infinity, and we set $ z' = 0$, then:

$$ p_0 = \rho_0 g H $$

Consequently:

$$ H = \frac{p_0}{\rho_0 g} $$

Hence, as long as $ p_0$ has the same value in
both the homogeneous and exponential atmospheres, the height of the top
of the homogeneous atmosphere is equal to the scale height of the
exponential atmosphere.

<div>

[![Pressure (mb) vs. height (m) for two model
atmospheres](https://plot.ly/~0x7df/11.png)](https://plot.ly/~0x7df/11/ "Pressure (mb) vs. height (m) for two model atmospheres")  
<https://plot.ly/embed.js>

</div>
