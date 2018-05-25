Title: Notes on thermal radiation transport with IMC
Date: 2018-04-03 13:23
Category:  
Modified: 2018-04-03 13:23
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: draft

$$ \frac{\partial}{\partial t} \left(E\rho\right) =
\nabla\cdot\left(\frac{\lambda c}{3}\nabla\left(aT^4\right)\right) $$

where:

- $E$ = energy density
- $\rho$ = material density
- $\lambda$ = mean free path
- $a$ = Stefan-Boltzmann constant
- $c$ = speed of light
- $T$ = temperature

Assume that:

$$ \lambda = \frac{T^n}{\rho k_0} $$

$$ E \propto T^\beta $$

(N.B. $1/\rho\lambda$ = opacity = $k_0T^{-n}$.)


$$ \left(\frac{1}{c}\frac{\partial}{\partial t} + \mu\frac{\partial}{\partial
z}\right)I = \eta - \chi I $$

$$ \epsilon_s = \frac{\rho c_VnRT}{M_mm} $$

Let $\chi$ be constant in space and time.

$$a = \frac{4\sigma}{c} $$


$$ u_m = c_VRT $$

($\mathrm{mol}^{-1}$)

$$ u_m = \frac{c_VRT}{M_m} $$

($\mathrm{g}^{-1}$)

$$ u_m = \frac{c_VRT\rho}{M_m} $$

($\mathrm{cm}^{-3}$)

$$ u_m = bT $$

Therefore:

$$b = \frac{c_VR\rho}{M_m} $$

$$a = \frac{4\sigma}{c} $$

$$ \sigma = \frac{ac}{4} $$

$$ B = \frac{\sigma T^4}{\pi} = \frac{ac}{4\pi}T^4 $$

$$ a = \frac{8\pi^5k^4}{15c^3h^3} $$

Since $a = 4\sigma/c$:

$$ \sigma = \frac{2\pi^5k^4}{15c^2h^3} $$

$$ B(T) = \frac{P(T)}{A} = \sigma T^4 = \frac{ac}{4}T^4 $$

We get $B(T) = \sigma T^4$ from integrating Planck's Law for black-body
radiation:

$$ b\left(\nu, t\right) =\frac{2h\nu^3}{c^2} \frac{1}{\exp{\left(h\nu/kT\right)} - 1} $$

