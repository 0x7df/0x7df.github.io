Title: Thermal radiation, Kirchhoff's law, and black bodies (1/4)
Date: 2015-05-17 14:53
Modified: 2020-09-18 16:29
Author: 0x7df
Category: Physics
Tags: black body, thermal radiation, thermodynamics
Slug: thermal-radiation-kirchhoffs-law-and-black-bodies-14
Status: published

Thermal radiation
-----------------

![Thermal imaging]({static}images/STS-3_infrared_on_reentry.jpg?w=127)

All matter continuously emits electromagnetic radiation as a consequence
of its temperature. This radiation is called **thermal radiation** or
**heat radiation** (although of course it isn't intrinsically different
from electromagnetic radiation generated by any other means). Thermal
radiation is what makes thermal imaging possible, and why hot embers
glow, etc. From our everyday experience and from experimentation we can
see that both the wavelength and intensity of radiation emitted depend
in some way on the temperature of the matter.

We can understand a lot about the properties of thermal radiation from
thought experiments, in particular by considering a hollow enclosure of
any shape, whose walls are opaque to radiation and which are held
everywhere at a constant temperature. The inner surface emits thermal
radiation, and therefore the interior space is filled with a radiation
field. The walls also absorb radiation. If at a particular time a small
volume $ dv$ of space around a point $ P$ contains an amount of radiation $ Q$,
then the quantity $ Q/dv$ is called the **energy
density** at point $ P$. We can show that *the energy
density in a constant-temperature enclosure is independent of the nature
of the walls of the enclosure, and depends only on the temperature of
the walls*.

First, imagine two such containers, $ A$ and $ B$,
with the same wall temperatures, but in which, for some
reason (e.g. the material of the walls perhaps) the energy density is
different. It is higher in $ B$.
![two_cavities]({static}images/two_cavities.png?w=300)

Then imagine we can bring the two enclosures together to form a single
enclosure - perhaps they each have at least one flat face of a given
shape and size, which we can match up, and then instantaneously remove
these walls so the two cavities are joined into one. If $ B$
had the higher initial energy density, then the energy
density in $ A$ will begin to increase, and the energy
density in $ B$ will decrease. Correspondingly, the
walls of $ A$ will increase in temperature by
absorbing the excess radiation, and the walls of $ B$
will cool. The result is that we are causing heat to flow from one body
to another at higher temperature without doing any work, which
contravenes the second law of thermodynamics. From this we can conclude
that, if the walls are at the same temperature, then the energy
densities must be the same, no matter what. Hence, the energy density in
each enclosure is dependent on only the wall temperature.

The result also applies to the energy density in any restricted range of
wavelengths,  between $ \lambda$ and $ \lambda
+ d\lambda$. If, when we first conjoin the two enclosures,
instead of simply removing the interior walls we replace them with a
screen that is transparent to radiation only in the wavelength range of
interest, then the situation is the same. Therefore not only must the
total energy density be the same in the two enclosures (if their wall
temperatures are the same), but the energy density in any given range of
wavelengths must also be the same; i.e. the energy in both enclosures
must have the same *spectrum*. This spectrum is called the **Planck
spectrum** or the **black-body spectrum**, and is evidently a function
of temperature only.

Kirchhoff's Law (1859)
----------------------

For radiation of wavelengths between $ \lambda$ and
$ \lambda + d\lambda$, the **absorptive power** (or
**absorptivity**), $ a_\lambda$, of a surface is
defined as the fraction of the energy incident on the surface that is
absorbed. The **emissive power**, $ e_\lambda$, is
the energy emitted per unit area per unit time (per unit wavelength);
such that $ e_\lambda d\lambda$ is the energy
emitted per unit area per unit time.

Knowing this, we can determine that, if a new body is inserted into a
constant-temperature enclosure of the kind discussed earlier, then some
amount of radiation, $ dQ$, will be incident on each
unit area in each unit time, and an amount $ a_\lambda dQ$
will be absorbed. Since the nature of the walls of the
outer container cannot have any effect on the density or spectrum of the
radiation inside the enclosure, then the body cannot either; it must be
in equilibrium and the emission per unit area per unit time -
$ e_\lambda d\lambda$ - must equate to the absorption.
Hence:

$$ a_\lambda dQ = e_\lambda d\lambda $$

and:

$$ \frac{dQ}{d\lambda} = \frac{e_\lambda}{a_\lambda} $$

Because $ dQ$ depends only on the temperature, then
for a given temperature both sides of the above equation are equal to a
constant, whose value depends on the temperature and the wavelengths in
question, but not on the composition of the body. This is **Kirchhoff's
law**:

> *The ratio of the emissive to absorptive power for radiation of a
> given wavelength is the same for all bodies at the same temperature*.

A way of clarifying this is to compare two different bodies, placed
separately in the interior. The body discussed above, has equilibrium
state:

$$ a_\lambda dQ = e_\lambda d\lambda $$

but if this is replaced with a different body having different surface
properties $ a_\lambda'$ and $ e_\lambda'$,
then the new equilibrium state is:

$$ a_\lambda' dQ = e_\lambda' d\lambda $$

The ratios $ a_\lambda/e_\lambda$ and
$ a_\lambda' / e_\lambda'$ must clearly be equal.
Alternatively, you can think of a body inside and therefore in
equilibrium with one enclosure, being instantaneously transferred to a
different enclosure at the same temperature, and arrive at the same
conclusion again.

Black bodies and perfect radiators
----------------------------------

One interesting consequence of the fact that:

$$ a_\lambda dQ = e_\lambda d\lambda $$

is that a stronger absorber (larger $ a_\lambda$) is
also a stronger emitter (larger $ e_\lambda$), at a
given temperature and for a given wavelength of radiation. In fact a
perfect absorber, for which $ a_\lambda = 1$, and
which we therefore refer to as a **black body**, also radiates as
intensely as it's possible to do so under the given conditions; so it is
also sometimes called a **full** or **perfect radiator**.

![Hole in cavity as black body](http://upload.wikimedia.org/wikipedia/commons/e/ef/Hole_in_Cavity_as_Blackbody.png)

An enclosure with a small hole acts nearly as a block body, absorbing
radiation incident on it with a very small probability of escape (as
long as the walls absorb a non-zero fraction of the radiation incident
on them).

A black body is a theoretical construct - a substance like
[lamp black](https://paleotechnics.wordpress.com/2014/02/25/lampblack-what-it-is-and-what-its-good-for/)
is an excellent but not perfect absorber - but one way to approach a
black body very nearly, is by constructing a sealed enclosure with only
a small hole through the walls. Radiation incident on this hole has a
very tiny probability of escaping again (i.e. by being reflected off the
interior walls) as long as the hole is small in comparison with the
dimensions of the enclosure; therefore this system acts as a perfect
absorber or black body.

Interestingly, such an enclosure doesn't have the characteristics of a
black body only in terms of its ability to *absorb* the radiation
incident on it; radiation *emitted* from the hole also has identical
characteristics to radiation emitted from a black body. We can see this
from the fact that, if we were to place a black body of the same
temperature into the interior of the cavity, then for it to remain at
this original temperature (which it must), the radiation emitted from
the cavity walls must be incident on the black body inside it with just
the same rate as the rate at which the black body is emitting radiation
itself. Hence, the radiation in the enclosure - or any enclosure with
constant wall temperature - is black-body radiation.

Since the radiation in the interior of any constant-temperature
enclosure has the intensity of black-body radiation, then another way of
expressing Kirchhoff's law is that:

> The ratio of the emissive power of a body to the emissive power of a
> black body at the same temperature is equal to the absorptive power of
> the body.

(Recall that the absorptive power is just a number between 0 and 1).
This ratio is also called the **emissivity**, or **absorptivity**.

