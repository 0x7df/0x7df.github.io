Title: Analytic solution
Date: 2015-02-22 10:41
Author: 0x7df
Category: Uncategorized
Slug: 
Status: draft
Tags: neutron transport, physics

The neutrons passing through point $P$ on the surface of a sphere, and
thus comprising the scalar flux there, can be divided into two types,
depending on whether they have passed through sphere or not. The plane
tangential to the sphere at $P$ divides the whole system into two
infinite half-spaces, in which, in the absence of scattering, the two
types of neutron originate: the neutrons emitted in the half-space that
does not contain the sphere arrive at $P$ without having passed
through the sphere, whereas the neutrons emitted in the half-space that
does contain the sphere cannot reach $P$ without crossing some secant
line of the sphere. Hence we divide the scalar flux, $\phi(P)$ into
two contributions, $\phi_d(P)$ and $\phi_0(P)$, which have and
have not passed through the sphere respectively.

Consider the simpler case of determining $\phi_0(P)$. These neutrons
have direction $\hat\Omega$ such that $\hat\Omega\cdot\hat n
\le 0$, where $\hat n$ is the unit vector at $P$ directly riadially outward.
The angular flux $\psi(P,\Omega)$ is given by:

$$ \psi(\mathbf{r},\hat\Omega) = \int_0^\infty
\frac{S(\mathbf{r}-\hat\Omega x)}{4\pi} \mathrm{exp} \left[
-\int_0^x \Sigma(\mathbf{r}-\hat\Omega x') dx' \right] dx $$

If the source density and the cross-section are constant in this region,
$S(\mathbf{r}) = S$ and $\Sigma(\mathbf{r}) = \Sigma_0$, this
becomes simply:

$$ \psi(\mathbf{r},\hat\Omega) = \frac{S}{4\pi\Sigma}  $$

In the other half-space, the equation becomes:

$$
\psi(\mathbf{r},\hat\Omega) = \frac{S}{4\pi}
\int_{c(\hat\Omega)}^\infty \mathrm{exp} \left[ -\int_0^x
\Sigma(\mathbf{r}-\hat\Omega x') dx' \right] dx  
$$

where $c(\hat\Omega)$ is the chord length represented by the path of
the neutron across the sphere. This becomes:

$$
\psi(\mathbf{r},\hat\Omega) = \left\{  
\begin{array}{l l}  
\frac{S}{4\pi\Sigma_0} \mathrm{exp}\left[-\Sigma_d
c(\hat\Omega)\right] & c(\hat\Omega) \lt x \\  
\frac{S}{4\pi\Sigma_d} \mathrm{exp}\left[-\Sigma_d
c(\hat\Omega)\right] & c(\hat\Omega) \ge x \\  
\end{array}  
\right.  
$$


