Title: Plasma Dynamics
Date: 2016-09-25 22:34
Category: physics 
Modified: 2016-09-25 22:34
Tags: plasma physics
Slug: 
Author: 0x7df
Summary: 
Status: draft

If electrons are displaced within an electrically-neutral plasma, the resultant
charge separation sets up an electric field that exerts a restoring force on the
electrons. The electrons are accelerated back to their original positions, at
which point they have non-zero velocity and so overshoot, thus setting up a
field in the opposite direction. This sets up an oscillation with a frequency
characteristic of the plasma, called the _electron plasma frequency_. It can be
shown to be proportional to the square root of the electron density.

If a test charge $Q$ is placed within an electrically neutral plasma, it draws
towards it the oppositely-charged components and repels the like-charged
components. The result is that outside this cloud of oppositely-charged
particles, the plasma is shielded from the test charge and feels no electric
field due to it. The radius of this cloud depends on the balance between the
strength of the field due to $Q$ and the thermal velocities of the plasma
particles which allow them to escape from it. The _Debye length_ is a
characteristic distance of the plasma that is proportional to $\sqrt T$ and
inversely proportional to the square root of the electron density. It is a
measure of the range of the effect of the test charge $Q$.

In an external magnetic field the _Lorentz force_ is:

$$ m \mathbf{j} = -e\mathbf{v}\wedge\mathbf{B} $$

If we introduce:

$$ \mathbf{\omega}_{\mathrm{ce}} = \frac{e\mathbf{B}}{m} $$

then:

$$ \dot{\mathbf{v}} = \mathbf{\omega}_{\mathrm{ce}} \wedge \mathbf{v} $$

where $\mathbf{\omega}_{\mathrm{ce}}$ is the _electron cyclotron frequency_.
Under normal fusion plasma conditions, it is about the same as the electron
plasma frequency.

The magnitude of the velocity component parallel to the $B$-field is unaffected,
and the $B$-field force is always perpendicular to the particle motion, therefore
it clearly causes the electron to follow a circular path (in the perpendicular
plane). Adding the constant speed in the parallel direction, we see the electron
has a helical path. The frequency of this helical motion is
$\mathbf{\omega}_{\mathrm{ce}}$. The amplitude of this helical motion is
$v_\perp/\omega_{\mathrm{ce}}$, and this is known as the _Larmor radius_.

Since $\mathbf{\nabla}\cdot\mathbf{B} = 0$, and $B$-field for which $\partial
B_z/\partial z \ne 0$, i.e. the $z$-component is increasing in the
$z$-direction, must also have a radial component. For example:

$$ \mathbf{\nabla}\cdot\mathbf{B} = \frac{1}{r} \frac{\partial}{\partial
r}\left(rB_r\right) + \frac{\partial B_z}{\partial z} = 0$$

Therefore:

$$ B_r = -\frac{1}{2}r\left(\frac{\partial B_z}{\partial z}\right) $$

Consequently a particle in such a field experiences a force:

$$ F = -e\mathbf{v}_\perp \mathbf{\hat e} \wedge B_r \mathbf{\hat e}_r $$

$$ F = -\frac{v_\perp^2}{2l_c}\mathbf{\hat e}_z $$

where $l_c$ is a characteristic length of the $B$-field:

$$ l_c = \left( \frac{1}{B_0} \frac{\partial B}{\partial z} \right)^{-1} $$

Note that this net force turns out to be in the negative $z$-direction so it
acts to retard the motion of the particle towards the region of increased $B_z$.
Eventually the particle will turn round if $v_\perp / v_z$ is small enough.
Hence particles can become trapped in a central region.

