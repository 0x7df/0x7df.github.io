Title: Applying Fredholm theory to the transport equation
Date: 
Category:  
Modified: 
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: draft

In a previous post, the spatially-discretised, 1D, fixed-source, mono-energetic
neutron transport equation was shown to be:

$$ \psi(\mu) = \lambda(\mu) \int_{-1}^1 \sigma(\mu, \mu') \psi(\mu') d\mu'
+ S(\mu) $$

where:

$$ \lambda(\mu) = \frac{h}{2|\mu| + \Sigma h} $$

$$ S(\mu) = \frac{hq(\mu) + 2|\mu|\psi^{\mathrm{IN}}_j}{2|\mu| + \Sigma h} $$

In a different post, iterative methods for solving inhomogeneous Fredholm
equations of the second kind were introduced; these equations have the form:

$$ \psi(\mu) = \lambda \int_a^b K(\mu, \mu') \psi(\mu') d\mu' + S(\mu) $$

where $\lambda$ is a constant.

The standard source iteration method in solving the neutron transport equation
is equivalent to the Neumann expansion method described in this latter post.
However in the latter post, an alternative method was given in which ...


$$ \psi(\mu) = h \int_{-1}^1 \frac{\sigma(\mu, \mu')}{2|\mu| + \Sigma h}
\psi(\mu') d\mu' + S(\mu) $$

We can see that:

$$ K(\mu, \mu') = \frac{\sigma(\mu, \mu')}{2|\mu| + \Sigma h} $$


