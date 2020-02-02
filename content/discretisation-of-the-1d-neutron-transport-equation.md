Title: Discretisation of the 1D neutron transport equation
Date: 2016-09-25 22:34
Category:  
Modified: 2016-09-25 22:34
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: draft

The 1D, fixed-source, mono-energetic neutron transport equation is:

$$ \mu \frac{d\psi}{dx}
   + \Sigma(x) \psi(\mu, x)
   = \int_{-1}^1 \sigma(\mu, \mu', x) \psi(\mu', x) d\mu'
   + q(\mu, x)
$$

where the independent variables $x$ and $\mu$ represent the spatial position
and the direction cosine of travel of the neutrons, $\psi(\mu, x)$ is the
angular flux of neutrons, $\Sigma(x)$ is the total neutron cross-section,
$\sigma(\mu, \mu', x)$ is the cross-section for the scattering of
neutrons from direction $\mu'$ into direction $\mu$, and $q(\mu, x)$ is the
emission density of neutrons into direction $\mu$ at point $x$ (independent of
the neutron flux $\psi$).

Although this equation assumes time-independence, a fixed source, only
scattering and absorption (not fission), and no energy-dependence, a fully
general transport code with fission, energy-dependence, and either
time-dependence or an eigenvalue search, boils down to solving this equation. The
presence of fission as well as time-dependence or an eigenvalue search are taken
care of by an outer iteration procedure which iteratively solves this equation
whilst modifying the source density $q(\mu, x)$ of this equation.
Energy-dependence, assuming a multi-group framework, is also taken care of by
stepping through energy groups and having group-to-group scattering accounted
for via the emission density.

A spatial discretisation scheme often employed is called diamond differencing.
Combining:

$$ \mu \frac{\psi_{j+1/2}(\mu) - \psi_{j-1/2}(\mu)}{h} + \Sigma_j \psi_j(\mu)
= \int_{-1}^1 \sigma_j(\mu, \mu') \psi_j(\mu') d\mu' + q_j(\mu) $$

and:

$$ \psi_j = \frac{1}{2} \left(\psi_{j-1/2} + \psi_{j+1/2}\right) $$

gives:

$$ 2\mu \frac{\psi_j(\mu) - \psi_{j-1/2}(\mu)}{h} + \Sigma_j \psi_j(\mu)
= \int_{-1}^1 \sigma_j(\mu, \mu') \psi_j(\mu') d\mu' + q_j(\mu) $$

and hence:

$$ \psi_j(\mu) \left(\frac{2\mu}{h} + \Sigma_j\right)
= \int_{-1}^1 \sigma_j(\mu, \mu') \psi_j(\mu') d\mu' + q_j(\mu)
+ 2\mu\frac{\psi_{j-1/2}}{h} $$

for $\mu \gt 0$ and:

$$ 2\mu \frac{\psi_{j+1/2}(\mu) - \psi_j(\mu)}{h} + \Sigma_j \psi_j(\mu)
= \int_{-1}^1 \sigma_j(\mu, \mu') \psi_j(\mu') d\mu' + q_j(\mu) $$

$$ \psi_j(\mu) \left(-\frac{2\mu}{h} + \Sigma_j\right)
= \int_{-1}^1 \sigma_j(\mu, \mu') \psi_j(\mu') d\mu' + q_j(\mu)
- 2\mu\frac{\psi_{j+1/2}}{h} $$

for $\mu \lt 0$. These equations can be written:

$$ \psi_j(\mu) \left(\frac{2|\mu|}{h} + \Sigma_j\right)
= \int_{-1}^1 \sigma_j(\mu, \mu') \psi_j(\mu') d\mu' + q_j(\mu)
+ \frac{2|\mu|}{h}\psi_j^{\mathrm{IN}} $$

We now write this as:

$$ \psi(\mu) = \lambda(\mu) \int_{-1}^1 \sigma(\mu, \mu') \psi(\mu') d\mu'
+ S(\mu) $$

where the subscript $j$ has been suppressed, and where:

$$ \lambda(\mu) = \frac{h}{2|\mu| + \Sigma h} $$

$$ S(\mu) = \frac{hq(\mu) + 2|\mu|\psi^{\mathrm{IN}}_j}{2|\mu| + \Sigma h} $$

The equation is solved by an iterative process; an initial trial solution for
$\psi$ is used to evaluate the integral on the right-hand side - the scattering
source - and then this used in turn to solve for $\psi$. 
