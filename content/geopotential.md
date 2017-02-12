Title: Geopotential
Date: 2015-08-30 16:58
Author: 0x7df
Category: Atmospheric science
Slug: geopotential
Status: published
Tags: atmospheric science, meteorology, physics

The *geopotential*:

$$ \phi = gz $$

is the gravitational potential - i.e. the gravitational potential energy
per unit mass - at a location in the earth's atmosphere. It is often
used as a vertical coordinate instead of height above sea level,
$ z$.

The geopotential at height $ z$ is the difference
between the gravitational potential energy at some reference height,
$ z_0$, usually taken to be zero (sea level), and
that at $ z$. This difference is numerically equal
to the work done in raising the parcel from $ z_0$
to $ z$:

$$ \phi(z) = \int_{z_0}^z g(z') dz' $$

The simplification to:

$$ \phi = gz $$

assumes that $ g$ is constant with height. If the
variation is to be taken into account, a suitable profile for
$ g(z)$ is:

$$ g(z) = \frac{g_0}{\left[ 1 + \left(
z/E\right)\right]^2} $$

where $ g_0$ is the value at sea level and
$ E$ is the earth's mean radius. Substituting into
the definition of geopotential:

$$ \phi(z) = \int_{z_0}^z g(z') dz' $$

gives:

$$ \phi(z) = \int_{z_0}^z \frac{g_0}{\left[ 1 + z' / E
\right]^2} dz' $$

$$ \phi(z) = g_0 E^2 \int_{z_0}^z \frac{1}{\left[ E+z'
\right]^2} dz' $$

$$ \phi(z) = g_0 \frac{z-z_0}{\left( 1+z/E \right) \left(
1+z_0/E \right)} $$

or, if we take $ z_0$ to be zero:

$$ \phi(z) = g_0 \frac{z}{1+z/E} $$

The assumption that gravity is constant is equivalent to assuming that
$ z \ll E$ so that $ z/E \ll 1$,
and therefore that the denominator on the right-hand
side of the above equation is unity.

In terms of differentials:

$$ d\phi = g dz $$

and taking into consideration the hydrostatic equation:

$$ dp = -\rho g dz $$

we obtain:

$$ d\phi = -\frac{dp}{\rho} = -\alpha dp $$

where $ \alpha = 1 / \rho$ is the specific volume
(volume per unit mass).

The geopotential is larger than the geometric height by a factor of
$ g$ - e.g. the geopotential in $ \mathrm{J/kg}$ is about 10
times the magnitude of the geometric altitude in metres. To make the
geopotential have numerical magnitude more nearly equal to the geometric
height, it is often expressed in units a factor of $ g_0$
smaller; these units are usually called *geopotential
metres*, or *dynamic metres*, or *geodynamic metres*. That is, the
geopotential in these units, is:

$$ \mathrm{gpm}(z) = \frac{\phi(z)}{g_0} $$

$$ \mathrm{gpm}(z) = \frac{\int_{z_0}^z g(z') dz'}{g_0} $$

$$ \mathrm{gpm}(z) = \frac{z}{1+z/E} $$

Rogers and Yau Problem 3.2b
---------------------------

> Show that the geopotential at pressure level $ p$
> of an atmosphere in hydrostatic equilibium is given
> by:
>
> $$ \phi(p) = R\bar T\ln{\left(p_0/p\right)} $$
>
> where $ \phi(p_0) = 0$.

The differential expression for hydrostatic equilibrium is:

$$ dp = -g\rho dz $$

From the definition of geopotential:

$$ \phi(z) = g \int_{z_0}^z dz' $$

we have:

$$ d\phi = g dz $$

Hence:

$$ dp = -\rho d\phi $$

Introducing the equation of state gives:

$$ dp = \frac{p}{RT} d\phi $$

$$ \int \frac{dp}{p} = -\frac{1}{R} \int \frac{d\phi}{T} $$

Performing the integration gives:

$$ \ln(p) = -\frac{1}{R\bar T} \phi(p) + C $$

where $ \bar T$ is the average temperature
through the layer from $ p_0$ to $ p$.
Since $ \phi(p_0) = 0$:

$$ C = \ln{p_0} $$

Hence:

$$ \phi(p) = R\bar T\ln{(p_0/p)} $$

