Title: The Physics of D-T Fusion
Date: 2015-02-21 21:49
Author: 0x7df
Category: Uncategorized
Slug:
Status: draft
Tags: fusion, physics

### Nuclear Potential Barrier

The mutual repulsive Coulomb force that a deuterium nucleus and a
tritium nucleus exert on each other is given by:

$$ F(r) = \frac{k Z_D Z_T e^2}{r^2} $$

where *Z~D~* and *Z~T~* are the charges of the deuterium and tritium
nuclei in units of *e* (which, despite being unity, shall be retained in
the equations for pedagogical reasons), *r* is the separation, and *k*
is the Coulomb constant 1/4*πε*~0~. The work done by this force in
moving a pair of nuclei from their minimum separation (*R*~D~ + *R*~T~)
to an infinite separation is:

$$ W = \int_{r_1}^{r_2} F(r) dr $$

$$ W = \int_{R_D + R_T}^{\infty} \frac{dr}{r^2}
$$

$$ W = -k Z_D Z_T e^2 \left[ \frac{1}{r} \right]_{R_D +
R_T}^{\infty} $$

The work done by the force is equal to the decrease in potential that
occurs asa result of the action of the force:

$$ \\Delta U = -W $$

$$ \\Delta U = k Z_D Z_T e^2 \left[ \frac{1}{r}
\right]_{R_D + R_T}^{\infty} $$

$$ \\Delta U = -\frac{k Z_D Z_T e^2}{R_D + R_T}
$$

Hence if the potential at infinite separation is assumed to be zero, the
energy required to bring the D-T nuclei to their point of closest
approach is:

$$ E = \frac{e^2}{4\pi\varepsilon_0\left(R_D + R_T\right)}
$$

In general, the nuclear radius, R, can be approximated by:

$$ R = R_0 A^{1/3} $$

so for D-T:

$$ E = \frac{e^2}{4\pi\varepsilon_0R_0\left(A_D^{1/3} +
A_T^{1/3}\right)} $$

which evaluates to about 355 keV.

At first glance, then, one might assume that a D-T gas would need to be
raised to a temperature of 355 keV (4.1 x 10^9^ K) - two orders of
magnitude greater than the temperature in the core of the sun – to
initiate fusion.

However, there are two flaws in this analysis which, when corrected,
show that fusion occurs at significantly lower temperatures. These are:

1.  For any system of particles at a given temperature, the particle
    energies are not all equal to k~B~T, as assumed above, but instead
    have the Maxwell-Boltzmann (or Maxwellian) distribution. Therefore,
    even at temperatures significantly lower than the nuclear potential
    barrier, some particles in the tail of the distribution have high
    enough energies to overcome it.
2.  The above treatment is purely classical; in reality, barrier
    penetration, or quantum tunnelling, allows fusion to occur at
    energies lower than than the Coulomb barrier with finite
    probability.

### The Maxwell-Boltzmann Distribution

The Maxwell-Boltzmann distribution function, *f*(*v*) is defined as
follows. In a system of *N* particles of mass *m* at temperature *T*,
the number of particles that have speeds between *v* and *v* + *dv* is
*dN*, given by:

$$ dN = Nf(v)dv $$

Therefore, *f*(*v*)*dv* gives the fraction of particles (*dN*/*N*) in
the range *dv*. The Maxwell-Boltzmann distribution function can be
derived using statistical mechanics; it is:

$$ f(v) = \frac{4}{\sqrt{\pi}} \left( \frac{m}{2k_BT}
\right)^{3/2}v^2 \exp\left( -\frac{mv^2}{2k_BT}\right)
$$

Often, the Maxwell-Boltzmann distribution function is written in terms
of the particle energy. This is:

$$ E = \frac{1}{2} mv^2 $$

so that:

$$ dE = mv dv $$

Now, if:

$$ dN = Nf(E)dE $$

then:

$$ f(v)dv = \frac{4}{\sqrt{\pi}} \left( \frac{m}{2k_BT}
\right)^{3/2}\sqrt{\frac{2E}{m}} \exp\left(
-\frac{E}{k_BT}\right)\frac{dE}{m} $$

Now, since:

$$ f(v)dv = f(E)dE $$

Hence:

$$ f(E) = \frac{2}{\sqrt{\pi}} \left( \frac{1}{k_BT}
\right)^{3/2}\sqrt{E} \exp\left( -\frac{E}{k_BT}\right)
$$

### Quantum Tunnelling

Individual nuclei with energies lower than the nuclear potential barrier
can undergo fusion due to the phenomenon of barrier penetration, or
quantum tunnelling, which is an example of the wave nature of particles.
Consider a tritium nucleus of energy *E* incident on a stationary
deuterium target nucleus whose potential is *U*(*r*), where *r* is the
radial distance from the nucleus centre. Outside the barrier, the wave
function of the tritium nucleus is sinusoidal with amplitude *y*(*r*);
however, upon interacting with the barrier, it does not reduce
immediately to zero, but assumes an exponentially decreasing form until
it emerges on the inside. At this point it must smoothly resume a
sinusoidal form, albeit diminished in amplitude. Since the probability
of a finding a particle in a volume element equals the square root of
the wave function’s amplitude in that element, this means there is a
finite probability of finding the particle inside the potential barrier.

The probability of transmission through the barrier, *T*, is:

$$ T = 1 - R $$

where *R* is the probability of reflection. For the simple case of a
square barrier with height *U*~0~ and width *a*, and α*a* >> 1, *T* is
given by:

$$ T \\propto e^{-2\alpha a} $$

where:

$$ \alpha = \sqrt{\frac{2m\left(U_0 - E\right)}{\hbar^2}}
$$

Provided the energy of the interacting particles is well below the
Coulomb barrier, the cross-section for fusion can be represented, to a
good approximation, as a function of the relative particle energy, *W*,
i.e. the total kinetic energy of the two nuclei in the centre-of-mass
system:

$$ \sigma(W) \sim \frac{1}{W} \exp{\left(-\frac{2^{1/2}\pi
M^{1/2} Z_D Z_T e^2}{\hbar W^{1/2}}\right)} $$

where *M* is the reduced mass:

$$ M = \frac{m_Dm_T}{m_D + m_T} $$

