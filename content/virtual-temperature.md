Title: Virtual Temperature
Date: 2015-08-31 22:02
Author: 0x7df
Category: Atmospheric science
Slug: virtual-temperature
Status: published

Equation of state for dry air
-----------------------------

The ideal-gas equation of state is:

$$ p = \rho R T $$

where $ R$ is the individual gas constant for the
gas in question, and:

$$ R = \frac{nR^*}{m} = \frac{R^*}{M} $$

where $ R^*$ is the universal gas constant ($ 8.31~
\mathrm{J/mol.K}$) and $ n, m$ are the number of moles and the
mass of the sample of gas, respectively; and $ M = m/n$
is the molecular mass of the gas.

Dry air is typically assumed to be a perfect gas, with an individual gas
constant of $ 287~\mathrm{J/kg.K}$  or $ 2.87 \times 10^6~\mathrm{cm^2/s^2.K}$.

Moist air and virtual temperature
---------------------------------

Water vapour is also assumed to be a perfect gas, with an individual gas
constant of $ 461.5~\mathrm{J/kg.K}$. The ratio of $ R / R_v$:

$$ \sigma = \frac{R}{R_v} = \frac{M_v}{M} = 0.622 $$

where $ R, M$ are the gas constant and molecular mass
of dry air, and $ R_v, M_v$ of water vapour.

Moist air is a mixture of dry air and water vapour. To determine the
individual gas constant of moist air, consisting of some mixture of dry
air and water vapour, we first write the equation of state for water
vapour:

$$ e = \rho_v R_v T $$

where $ e$ is the water vapour pressure and $ \rho_v$ is the density of water
vapour. The pressure of the moist air is the sum of the partial pressures of
the dry air and the water vapour:

$$ p_m = p + e = \rho R T + \rho_v R_v T $$

$$ p_m = \rho R T + \rho_v \frac{R}{\sigma} T $$

$$ p_m = RT\left(\rho + \frac{\rho_v}{\sigma}\right) $$

$$ p_m = RT\frac{1}{V}\left(m + \frac{m_v}{\sigma}\right) $$

$$ p_m = RT \frac{\rho_m}{m + m_v}\left(m +
\frac{m_v}{\sigma}\right) $$

This allows us to introduce the *virtual temperature*, which is the
fictitious temperature that dry air would have to have to achieve
the same (lower) density of the moist air, at the same pressure:

$$ p_m = \rho_m RT_v $$

From comparing the last two equations we can see that:

$$ T_v = \left[m + \frac{m_v}{\sigma}\right]\frac{1}{m+m_v} T $$

$$ T_v = \left[m + m_v + \frac{m_v}{\sigma} - m_v\right]
\frac{1}{m + m_v} T $$

$$ T_v = \left[1 + \frac{m_v}{m +
m_v}\left(\frac{1}{\sigma} - 1\right)\right] T $$

$$ T_v = \left[1 + \frac{m_v}{m + m_v}\frac{1 -
\sigma}{\sigma} \right] \frac{1}{m + m_v} T $$

By definition, the mixing ratio $ \mu = m_v/(m + m_v)$
is the ratio of the mass of water vapour to the mass of
moist air:

$$ T_v = \left[1 + \frac{1-\sigma}{\sigma} \mu \right] T $$

The virtual temperature is always slightly higher, by at most a few
degrees, than the true temperature of the moist air.

Geopotential in terms of virtual temperature
--------------------------------------------

[geopotential]: {filename}geopotential.md

[Elsewhere][geopotential] we have seen that the geopotential is:

$$ d\phi = -\frac{1}{\rho} dp $$

Substituting in the equation of state for moist air, involving the
virtual temperature:

$$ d\phi = -RT_v \frac{dp}{p} $$

Integrating:

$$ \phi = \phi_0 - R \int_{p_0}^p T_v d\ln p $$

