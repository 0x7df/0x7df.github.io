Title: Fredholm integral equations and the resolvent kernel
Date: 2016-09-25 22:34
Category: Maths
Modified: 2016-09-25 22:34
Tags: mathematics
Slug: 
Author: 0x7df
Summary: 
Status: draft

Consider the _inhomogeneous Fredholm integral equation_:

$$ H \psi(\mu) = \lambda \int_a^b \sigma(\mu, \mu') \psi(\mu') d\mu'
               + S(\mu) $$

The unknown to be solved for is $\psi(\mu)$ where $a \le \mu \le b$ is the
independent variable, and the known function $\sigma(\mu, \mu')$ is known as
the _kernel_. This is an _inhomogeneous_ equation because the known function
$S(\mu) \ne 0$.

It is a _Fredholm_ equation because the limits on the integral are constants;
if they were variables then the equation would be a _Volterra_ equation.

If $H = 0$, then the equation is of the _first kind_; $H = 1$ gives rise to a
Fredholm equation of the _second kind_, and otherwise the equation is of the
_third kind_.

For Fredholm equations of the second kind, where $H = 1$, we can look for
iterative solutions, i.e.:

$$ \psi(\mu) = \psi_0(\mu) + \lambda\psi_1(\mu) + \lambda^2\psi_2(\mu)
             + ... + \lambda^n\psi_n(\mu) + ... $$

When this is substituted into the original equation, we obtain:

$$ \psi_0(\mu) = S(\mu) $$
$$ \psi_1(\mu) = \int_a^b \sigma(\mu, \mu') \psi_0(\mu') d\mu' $$
$$ \psi_2(\mu) = \int_a^b \sigma(\mu, \mu') \psi_1(\mu') d\mu' $$
$$ ... $$
$$ \psi_n(\mu) = \int_a^b \sigma(\mu, \mu') \psi_{n-1}(\mu') d\mu' $$

This can be carried on until the iterative solution converges to some
desired level of accuracy. The process is called _Neumann expansion_. The
condition for the series solution to be convergent is:

$$ |\lambda| \le \frac{1}{||\sigma||} $$

where the square of the norm of the kernel is given by:

$$ ||\sigma||^2 = \int_a^b \int_a^b |\sigma(\mu, \mu')|^2 d\mu' d\mu $$

(See M. Masujima, _Applied Mathematical Methods in Theoretical Physics_, 2005.)


An alternative approach is called _Fredholm theory_. In Neumann iteration, we
repeatedly operate on $S(\mu)$ using the kernel $\sigma(\mu, \mu')$, to obtain
a converged answer for $\psi(\mu)$. One could ask instead: what _single_
operation, involving the kernel, could be applied to $S(\mu)$ to obtain the
same value of $\psi(\mu)$? That is, what $R(\mu, \mu')$ for which:

$$ \psi(\mu) = \int_a^b R(\mu, \mu') S(\mu') d\mu' + S(\mu) $$

The function $R(\mu, \mu')$ is called the _resolvent kernel_, and it is easy to
find $\psi(\mu)$ once this known. The proof of the above equation is complex
(see J. Kondo, _Integral Equations_, 1991), but the general method of obtaining
$R(\mu, \mu')$ is quite simple.

We first define the _iterated kernels_:

$$ \sigma_1(\mu, \mu') = \sigma(\mu, \mu') $$
$$ \sigma_2(\mu, \mu') = \int_a^b \sigma(\mu, \mu'')\sigma(\mu'', \mu') d\mu'' $$
$$ \sigma_3(\mu, \mu') = \int_a^b \int_a^b \sigma(\mu, \mu''') \sigma(\mu''', \mu'')\sigma(\mu'', \mu') d\mu'' d\mu''' $$
$$ \sigma_n(\mu, \mu') = \int_a^b d\mu^{(n)} \int_a^b d\mu^{(n-1)} ... \int_a^b
d\mu'' \sigma(\mu, \mu^{(n)}) \sigma(\mu^{(n)}, \mu^{(n-1)}) ... \sigma(\mu'', \mu')
$$

(The notation $x^{(n)}$ indicates $x$ with $n$ primes). So we can re-write:

$$ \psi_0(\mu) = S(\mu) $$
$$ \psi_1(\mu) = \int_a^b \sigma_1(\mu, \mu') S(\mu') d\mu' $$
$$ \psi_2(\mu) = \int_a^b \sigma_2(\mu, \mu') S(\mu') d\mu' $$
$$ ... $$
$$ \psi_n(\mu) = \int_a^b \sigma_n(\mu, \mu') S(\mu') d\mu' $$

and further:

$$ \psi(\mu) = \psi_0(\mu) + \lambda\psi_1(\mu) + \lambda^2\psi_2(\mu) + ... +
\lambda^n\psi_n(\mu) + ... $$

can be written:

$$ \psi(\mu) = S(\mu) + \lambda \int_a^b \sigma_1(\mu, \mu') S(\mu') d\mu'
             + \lambda^2 \int_a^b \sigma_2(\mu, \mu') S(\mu') d\mu' + ...
             + \lambda^n \int_a^b \sigma_n(\mu, \mu') S(\mu') d\mu' + ... $$

or:

$$ \psi(\mu) = S(\mu) + \sum_{n=1}^\infty \lambda^n \int_a^b \sigma_n(\mu,
\mu') S(\mu') d\mu' $$

Bringing the summation inside the integral:

$$ \psi(\mu) = S(\mu) + \int_a^b \sum_{n=1}^\infty \lambda^n \sigma_n(\mu,
\mu') S(\mu') d\mu' $$

we can write:

$$ \psi(\mu) = S(\mu) + \int_a^b R(\mu, \mu'; \lambda) S(\mu') d\mu' $$

where:

$$ R(\mu, \mu'; \lambda) = \sum_{n=1}^{\infty} \lambda^n \sigma_n(\mu, \mu') $$

Like Neumann iteration, this is an iterative process, but it has two
significant advantages:

1. Firstly, finding the resolvent kernel requires fewer iterations than Neumann
expansion.
2. Secondly, finding the resolvent kernel requires knowledge of only the
kernel, $\sigma(\mu, \mu')$, not the function $S(\mu)$. This is a practical
advantage if the same kernel is applied in different circumstances involving
different functions $S(\mu)$.

## Example 1

As an example we can take the simplest possible equation of this form, for
which the kernel and the source term are constants:

$$ \sigma(\mu, \mu') = \sigma_0 $$
$$ S(\mu) = S_0 $$

so that:

$$ \psi(\mu) = S(\mu) + \lambda\int_a^b \sigma(\mu, \mu') \psi(\mu') d\mu' $$

becomes:

$$ \psi(\mu) = S_0 + \lambda\sigma_0\int_a^b \psi(\mu')d\mu' $$

This is easily solvable; because the right-hand side clearly has no dependence on $\mu$, we can see that
$\psi(\mu)$ must be a constant $\psi_0$, hence:

$$ \psi_0 = \frac{S_0}{1 - \lambda\sigma_0(b-a)} $$

Now using the resolvent kernel method to obtain the solution, we write:

$$ \psi(\mu) = S(\mu) + \int_a^b R(\mu, \mu'; \lambda) S(\mu') d\mu' $$

where:

$$ R(\mu, \mu'; \lambda) = \sum_{n=1}^{\infty} \lambda^n \sigma_n(\mu, \mu') $$

We have:

$$\sigma_1(\mu, \mu') = \sigma_0 $$
$$\sigma_2(\mu, \mu') = \sigma_0^2 (b - a) $$
$$\sigma_3(\mu, \mu') = \sigma_0^3 (b - a)^2 $$
$$ ... $$
$$\sigma_n(\mu, \mu') = \sigma_0^n (b - a)^{n-1} $$

hence:

$$ R(\mu, \mu'; \lambda) = \sum_{n=1}^{\infty} \lambda^n \sigma_0^n (b -
a)^{n-1} $$

and:

$$ \psi(\mu) = S_0 + \int_a^b \sum_{n=1}^{\infty} \lambda^n \sigma_0^n (b -
a)^{n-1} S(\mu') d\mu' $$

$$ \psi_0 = S_0 \left(1 + \sum_{n=1}^{\infty} \left[ \lambda \sigma_0 (b -  
a)\right]^n \right) $$

This is equal to:

$$ \psi_0 = S_0 \left(1 - \frac{\lambda\sigma_0(b - a)}{\lambda\sigma_0(b - a)
- 1} \right) $$

as long as $|\lambda\sigma_0(b-a)| < 1$, hence:

$$ \psi_0 = \frac{S_0}{1 - \lambda\sigma_0(b - a)} $$

which is the same solution as earlier, obtained by solving directly.

## Example 2

Masujima (2005) gives the following example, with $\sigma(\mu, \mu') = e^{\mu -
\mu'}$, $a = 0$ and $b = 1$:

$$ \psi(\mu) = S(\mu) + \lambda\int_0^1 e^{\mu-\mu'}\psi(\mu')d\mu' $$

The iterated kernels simplify to:

$$ \sigma_n(\mu, \mu') = e^{\mu - \mu'} $$

for all $n$, and hence the resolvent kernel is:

$$ R(\mu, \mu'; \lambda) = \sum_{n=1}^{\infty} \lambda^n e^{\mu-\mu'} $$

which is:

$$ R(\mu, \mu'; \lambda) = \frac{\lambda}{1 - \lambda} e^{\mu - \mu'} $$

as long as $|\lambda| \lt 1$; in which case:

$$ \psi(\mu) = S(\mu) + \frac{\lambda}{1 - \lambda} \int_0^1 e^{\mu - \mu'}
S(\mu') d\mu' $$

## Example 3

We now consider the example where $\sigma(\mu, \mu') = \mu\mu'$ and $a = 0$ and
$b = 1$.

$$ \psi(\mu) = S(\mu) + \lambda \int_0^1 \mu \mu' \psi(\mu') d\mu' $$

The iterated kernels are:

$$ \sigma_1(\mu, \mu') = \mu\mu' $$
$$ \sigma_2(\mu, \mu') = \int_0^1 \mu\mu''\mu''\mu' d\mu'' = \mu\mu'/3 $$
$$ \sigma_3(\mu, \mu') = \int_0^1 \int_0^1 \mu\mu'''\mu'''\mu''\mu''\mu'
d\mu''d\mu''' = \mu \int_0^1 \mu'''^2 \int_0^1 \mu''^2 d\mu'' d\mu''' =
\mu\mu'/9 $$
$$ \sigma_n(\mu,\mu') = \mu\mu'/3^{n-1} $$

Hence the resolvent kernel is:

$$ R(\mu, \mu'; \lambda) = \sum_{n=1}^\infty \lambda^n \mu\mu' / 3^{n-1} $$

$$ R(\mu, \mu'; \lambda) = \frac{\mu\mu'\lambda}{1 - \lambda/3} $$

The solution is therefore:

$$ \psi(\mu) = S(\mu) + \frac{\lambda}{1 - \lambda/3} \mu \int_0^1 \mu' S(\mu')
d\mu' $$

Consider three cases.

### Case 1: $S(\mu) = S_0$

For constant source:

$$ \psi(\mu) = S_0 + \frac{\lambda}{1 - \lambda/3} \frac{\mu S_0}{2} $$

$$ \psi(\mu) = S_0 \left( 1 + \frac{\lambda\mu}{2[1 - \lambda/3]}\right) $$

For $\lambda = 3/4$:

$$\psi(\mu) = S_0 \left(1 + \frac{\mu}{2}\right) $$

For $\lambda = 1$:

$$ \psi(\mu) = S_0 \left(1 + \frac{3\mu}{4}\right) $$

### Case 2: $S(\mu) = \mu$

In this case:

$$ \psi(\mu) = \mu + \frac{\lambda}{1 - \lambda/3} \mu \int_0^1 \mu' \mu' d\mu' $$

$$ \psi(\mu) = \mu + \frac{\lambda}{1 - \lambda/3} \mu \frac{1}{3} $$

$$ \psi(\mu) = \frac{3\mu}{3 - \lambda} $$

For $\lambda = 1$

$$ \psi(\mu) = \frac{3\mu}{2} $$

### Case 3: $S(\mu) = 3\mu^2/2$

$$ \psi(\mu) = \frac{3\mu^2}{2} + \frac{3\lambda}{2[1 - \lambda/3]} \mu \int_0^1 \mu'^3 d\mu' $$

$$ \psi(\mu) = \frac{3\mu^2}{2} + \frac{3\lambda\mu}{8[1 - \lambda/3]} $$

$$ \psi(\mu) = \frac{3}{2} \left( \mu^2 + \frac{\lambda\mu}{4[1 - \lambda/3]}
\right) $$

For $\lambda = 1$:

$$ \psi(\mu) = \frac{3}{2}\left(\mu^2  + \frac{3\mu}{8} \right) $$
