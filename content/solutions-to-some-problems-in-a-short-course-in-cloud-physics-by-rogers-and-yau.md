Title: Solutions to some problems in "A Short Course in Cloud Physics", by Rogers and Yau
Date: 2015-02-21 22:09
Author: 0x7df
Category: Uncategorized
Slug: 
Status: draft
Tags: atmospheric science, meteorology, physics

CHAPTER 1 - Thermodynamics of dry air
-------------------------------------

The effective molecular weight, $ M_{eff}$ of dry
air is a weighted average of the molecular weights of the main permanent
constituents:

$$ M_{\mathrm{eff}} = \sum_{n=1}^N f_n M_n $$

where $ f_n$ and $ M_n $
are the fraction (by mass) and the molecular weight of the
$ n^{\mathrm{th}}$ constituent. Given the data in the
table, the effective molecular weight of dry air is:

$$ M_{\mathrm{eff}} = (0.7557 \times 28.016) + (0.2315 \times
32.000) + (0.0128 \times 39.944) $$

CHAPTER 3 - Parcel buoyancy and atmospheric stability
-----------------------------------------------------

*Two model atmospheres often used in theoretical work are the
homogeneous atmosphere:*

$$ \rho(z) = \rho_0 $$

*and the exponential atmosphere:*

$$ \rho(z) = \rho_0 e^{-z/H} $$

*where* $ \rho_0$ *is the density at the surface
and H is called the scale height of the atmosphere. The top of the
homogeneous atmosphere is defined as the altitude where the pressure
falls to zero. Prove that the height of the top of the homogeneous
atmosphere equals the scale height of the exponential atmosphere.*

For this problem we need only the equation of hydrostatic balance:

$$ \frac{\partial p}{\partial z} = -\rho(z) g $$

First consider the homogeneous atmosphere; it is very simple to
calculate the height at which the pressure falls to zero because, since
the density is constant, the gradient of pressure with height is also
constant:

$$ \frac{\partial p}{\partial z} = -\rho_0 g $$

That is, the pressure falls off linearly:

$$ p(z) = \left( -\rho_0 g \right) z + p_0 $$

where $ p_0$ is the pressure at the surface
($ z = 0$). From this equation we see that the
pressure falls to zero when:

$$ z|_{p=0} = \frac{p_0}{\rho_0 g} $$

Now consider the exponential atmosphere; we can determine *H* in the
following way. First, we integrate the equation for hydrostatic balance
from some height $ z = z'$ up to $ z =
\infty$ to obtain the pressure at height *z*':

$$ \int_{z'}^{\infty} \frac{\partial p}{\partial z} dz =
-\rho_0 g \int_{z'}^{\infty} e^{-z/H} dz $$

If we assume that the pressure tends to infinity as height tends to
infinity, and we set $ z' = 0$, then:

$$ p_0 = \rho_0 g H $$

Consequently:

$$ H = \frac{p_0}{\rho_0 g} $$

Hence, as long as $ p_0$ has the same value in
both the homogeneous and exponential atmospheres, the height of the top
of the homogeneous atmosphere is equal to the scale height of the
exponential atmosphere.

* * * * *

*Prove that the geopotential* $ \mathrm{\psi}$
*and the specific enthalpy, h, of an air sample undergoing a dry
adiabatic process are related by:*

$$ h + \psi = \mathrm{const} $$

From problem (1.5) we recall that specific enthalpy of a gas is defined
by:

$$ h = u + p\alpha $$

where *u* is the specific internal energy. The geopotential is defined
as the potential energy of a unit mass at height *z* above mean sea
level (or some other reference level). From this definition we have:

$$ d\psi = g dz $$

That is, the change in gravitational potential energy (per unit mass) is
equal to the force (per unit mass) times the change in height. If *h*
+ *ψ* is constant, then $ dh = -d\psi$. That is:

$$ du + pd\alpha + \alpha dp = -g dz $$

If the process is adiabatic, meaning there is no net energy flow into
the air sample, then the change in internal energy *du* must be
accounted for by the work done, *dw*:

$$ du = -dw $$

That is, the work done by the sample in expanding its volume against the
pressure of the surrounding medium must be accounted for by a drop in
the sample's internal energy (altitude increase); or, the compressional
work done on the sample by the atmosphere leads to an equivalent
increase in the sample's internal energy (altitude decrease). Either way
the work done is expressed by $ dw = pd\alpha$,
therefore:

$$ du = -pd\alpha $$

This leads to cancellation of the first two terms in the equation
relating *dh* and $ d\psi$, such that:

$$ \alpha dp = -g dz $$

or:

$$ \frac{dp}{dz} = -g\rho $$

Since we know this result to be true (it is just the equation for
hydrostatic balance), the initial premise must also be true.

* * * * *

*Show that the geopotential at pressure level$p$ of an
atmosphere in hydrostatic equilibrium is given by:*

$$ \psi(p) = R'\bar T_\nu \mathrm{ln} (p_0/p)
$$

*where$\psi(p_0) = 0$.*

The geopotential, assuming gravity is constant with height, is:

$$ \psi(z) = \int_0^z g dz' = gz $$

An atmosphere in hydrostatic equilibrium is described by:

$$ \frac{\partial p}{\partial z} = -g\rho
$$

Substituting the ideal gas equation of state gives:

$$ \frac{\partial p}{\partial z} =
-\frac{gp}{R'T_\nu} $$

and integrating gives:

$$ \mathrm{ln} p = -\frac{g}{R' \bar T_\nu} z +
\mathrm{ln} C $$

where $\mathrm{ln} C$ is the constant of integration, and we have
replaced $T_\nu$ everywhere with its average value$\bar
T_\nu$, to bring it out of the integral. Rearranging for$z$ and
substituting into the equation for the geopotential gives:

$$ \psi(p) = R' \bar T_\nu\mathrm{ln} (C/p)
$$

If $\psi(p_0) = 0$, then $\mathrm{ln} (C/p_0) = 0$ since neither
$R'$ nor $\bar T_\nu$ is zero. Hence $C = p_0$, and:

$$ \psi(p) = R' \bar T_\nu\mathrm{ln} (p_0/p) $$

* * * * *

The geopotential as a function of altitude is given by:

$$ \mathrm{gpm}(z) = \frac{\psi(z)}{g_0} =
\frac{1}{g_0}\int_0^z g(z') dz' $$

The acceleration due to gravity is the gravitational force exerted by
the earth on a unit mass:

$$ g(z) = \frac{F_g(z)}{m} = \frac{GM_e}{(R + z)^2}
$$

Substituting this into the equation for gpm gives:

$$ \mathrm{gpm}(z) = \frac{GM_e}{g_0}\int_0^z
\frac{1}{(R + z)^2} dz' $$

The reference value of$g$,$g_0$, is typically chosen to be the
value at the earth's surface:

$$ g_0 = \frac{GM_e}{R^2} $$

hence:

$$ \mathrm{gpm}(z) = R^2\int_0^z \frac{1}{(R +
z)^2} dz' $$

The integral of one over a quadratic is given by:

$$ \int \frac{1}{az'^2 + bz' + c} dz' =
-\frac{2}{2az' + b} $$

where $4ac - b^2 = 0$, which is the case here. Hence the solution is:

$$ \mathrm{gpm}(z) = R^2 \left[ \frac{1}{R} - \frac{1}{z' + R} \right] dz' $$
$$ = R + \frac{R^2}{z' + R} $$
$$ = \frac{Rz}{R + z} $$
$$ = z\left(\frac{1}{1 + z/R}\right) $$
$$ \approx z\left( 1 - \frac{z}{R} \right)$$

where the last step is valid as long as $z/R << 1$. Hence:

$$ \mathrm{gpm}(z) \approx z - az^2 $$

if $a = 1/R = 1/6.378137 \mathrm{km} = 0.156786 \mathrm{km}^{-1}$.
The values of gpm at 1, 10 and 50 km are therefore 0.999843, 9.984321
and 49.608036 km respectively.

* * * * *

To solve this problem we use our knowledge of the ambient and parcel
lapse rates to determine the buoyant force on the parcel arising from
the temperature difference at a particular height. The upward force due
to the pressure gradient is the same on the parcel as on the displaced
air:$-V(\partial p/\partial z)$ for parcel volume$V$. However
the force due to gravity is$\rho Vg$ on the parcel, and$\rho'Vg$$
on the ambient air; hence:

\\begin{eqnarray} F_B &=& (-\rho Vg) - (-\rho'Vg) \\ &=&
Vg(\rho'-\rho) \\end{eqnarray}

The resulting acceleration, which is the buoyant force per unit mass, is
therefore:

$$ \frac{d^2z}{dt^2} =
g\left(\frac{\rho'-\rho}{\rho}\right) $$

Using the equation of state for an ideal gas, we can re-write this in
terms of temperature:

\\begin{eqnarray} \frac{d^2z}{dt^2} &=&
g\left(\frac{p/R'T'-p/R'T}{p/R'T}\right) \\ &=&
g\left(\frac{1/T'-1/T}{1/T}\right) \\ &=&
g\left(\frac{T}{T'}-1\right) \\ &=& g\left(\frac{T-T'}{T'}\right)
\\end{eqnarray}

If we use the linear approximation for the dry adiabatic parcel lapse
rate:

\\begin{eqnarray} \frac{dT}{dz} &=& -\frac{g}{c_p}\frac{T}{T'} \  
&\approx& -\frac{g}{c_p} \\end{eqnarray}

then both the lapse rates are linear, and we can write:

\\begin{eqnarray} T(z) &=& T(0) - \\Gamma z \\ T'(z) &=& T'(0) - \gamma
z \\end{eqnarray}

Substituting these into the equation of motion, and assuming the parcel
is initially in equilibrium with its surroundings ($T'(0) = T(0)$)
gives:

$$ \frac{d^2z}{dt^2} = g(\gamma-\\Gamma)\frac{z}{T'}
$$

This is a second-order ODE, but it is non-linear in that the coefficient
of$z$ depends on$z$, through$T'$. We can however substitute
$T(0)$ for$T'$ on the assumption that the reduction in$T'$ over
the sorts of height variation that will be occur in a minute is small
compared to$T(0)$ itself. This linearises the equation and yields a
second-order ODE with constant coefficients, with only a small penalty
in error. To solve we postulate a solution$z(t) = e^{\lambda t}$,
then determine$\lambda$. By differentiating this twice we can write:

$$ \lambda^2 e^{\lambda t} = q e^{\lambda t}
$$

Therefore$\lambda = \\pm\sqrt{q}$ and$z(t) = e^{\sqrt{q}t}$$
and$z(t) = e^{-\sqrt{q}t}$ are solutions of the differential
equation (we could verify this by substitution back into the original
equation). Since the solutions are linearly independent we can construct
the general solution:

$$ z(t) = C_1 e^{\sqrt{q}t} + C_2 e^{-\sqrt{q}t}
$$

From the boundary conditions:

\\begin{eqnarray} z(0) &=& 0 \\ \frac{dz}{dt} &=& 0.5 \mathrm{m/s}
\\end{eqnarray}

we have:

\\begin{eqnarray} C_1 + C_2 &=& 0 \\ C_1\sqrt{q} - C_2\sqrt{q} &=&
0.5 \mathrm{m/s} \\end{eqnarray}

and:

$$ C_1 = \frac{0.25\mathrm{m/s}}{\sqrt{q}}
$$

Therefore:

$$ z(t) = \frac{0.25\mathrm{m/s}}{\sqrt{q}}
\left(e^{\sqrt{q}t} - e^{-\sqrt{q}t}\right) $$

Evaluating this for$t = 60$ s gives$z = 45$ m. Differentiating for
speed,$w$, gives:

$$ w(t) = \frac{dz}{dt} = 0.25\mathrm{m/s}
\left(e^{\sqrt{q}t} + e^{-\sqrt{q}t}\right) $$

For$t = 60$ s,$w = 1.28$ m/s.

* * * * *

*When deflated, a hot-air balloon has a weight of 1100 N. The balloon
has a volume of 1000 m$^3$ when inflated. Estimate the temperature to
which the air in the balloon must be heated for it to float at a steady
altitude of 2 km while carrying passengers with a combined weight of
1500 N. Assume a standard atmosphere, and assume that the pressure
inside the balloon equals that of the ambient air.*

For the balloon to float at some steady altitude$z'$, the net
vertical force must be zero at that altitude:

$$ \left(\frac{\partial^2z}{\partial
t^2}\right)_{z'} = 0 $$

We can consider the air in balloon as a parcel of air, on which there is
a downward force of$\rho gV$; the downward force on the displaced
air is$\rho'gV$, so the net downward force is$-gV(\rho-\rho')$.
The upward force due to the pressure gradient is the same on the parcel
as on the displaced air, so the net upward force is zero. In addition,
we have a downward force due to the weight of the balloon and gondola
etc,$-mg$. Consequently, for steady floating at altitude$z'$, we
have:

$$ -g(z)V(\rho(z)-\rho'(z)) - mg(z) = 0 $$

The$g$ cancels, and rearranging gives:

$$ \rho' - \rho = \frac{m}{V} $$

Substituting the equation of state and recognising that the pressure in
the balloon$p$ is the same as the pressure outside,$p'$, gives:

$$ \frac{p}{R'T'} - \frac{p}{R'T} = \frac{m}{V}
$$

Hence:

$$ T = \left( \frac{1}{T'} -
\frac{mR'}{pV}\right)^{-1} $$

We know that$V$ = 1000 m$^3$ and$m$ = 2600 N/9.81 ms$^{-2}$,
and for a standard atmosphere,$T'$ = 275.154 K,$p'$ = 79.501 x
10$^3$ Pa; consequently$T$ = 374 K.

