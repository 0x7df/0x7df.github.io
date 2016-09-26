Title: Spherical harmonics
Date: 2016-09-25 22:34
Category:  
Modified: 2016-09-25 22:34
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: draft

The spherical harmonics are special functions defined on the surface of a
unit sphere. That is, they are particular functions of $\theta$ and $\phi$ in
spherical polar coordinates.

They are solutions in spherical polar coordinates to Laplace's equation, which
states that the divergence of the gradient of a scalar field is zero:

$$ \nabla^2 = 0 $$

The spherical harmonics are defined for $m \ge 0$ by:

$$ Y_l^m\(\theta, \phi\) = N_l^m P_l^m\(\cos\theta\) e^{im\phi} $$

where $Y_l^m$ is the spherical harmonic of degree $l$ and order $m$, $P_l^m$
is the _associated Legendre polynomial_, and $\phi$ and $\theta$ are the
longitude, $\phi = [0, 2\pi]$, and co-latitude or polar angle,
$\theta = [0, \pi]$, respectively.

For $m \lt 0$, the relation:

$$ Y_l^m\(\theta, \phi\) = \left[ Y_l^{|m|}\(\theta, \phi\) \right]^* $$

defines the spherical harmonics, where the asterisk denotes complex conjugation.

The co-latitude is the difference between $\pi/2$ and the latitude. Where the
latitude has interval $[-\pi/2, $pi/2]$, the co-latitude has the interval $[0,
\pi]$. $\cos\theta$, where $\theta$ is the co-latitude, is $\cos\(\pi/2 -
\delta\)$, where $\delta$ is the latitude, which is by definition $\sin\delta$; i.e.
the cosine of the co-latitude is equal to the sine of the latitude. Therefore we
write:

$$ Y_l^m\(\theta, \phi\) = P_l^m\(\mu\) e^{im\phi} $$

where $\mu = \sin\delta$.

The spherical harmonics are mutually orthogonal. Recall that two functions $f$
and $g$ are said to be _orthogonal_ on the interval $[a, b]$ if their inner
product over that interval is zero:

$$ \langle f | g \rangle = \int_a^b \rho(x) f^*(x) g(x) dx = 0 $$

where $\rho(x)$ is a weight function, which is often unity for all $x$. The
orthogonality of the spherical harmonics is 

The normalising factor $N_l^m$ is chosen to make the spherical harmonics
orthonormal, such that:

$$ \int_{-1}^1 \left[ Y_l^m\(\theta, \phi\) \right]^* Y_l^m\(\theta, \phi\) d\mu
= 0 $$

and:

$$ \int_0^{2\pi} \left[ Y_l^m\(\theta, \phi\) \right]^* Y_l^m\(\theta, \phi\)
d\phi = 0 $$


$$ \int
