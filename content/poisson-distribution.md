Title: Poisson distribution
Date: 2020-09-18 16:20
Author: 0x7df
Category: Uncategorized
Slug:
Status: published
Tags: mathematics, statistics

Consider a radioactive substance with concentration *C*, in atoms per litre,
which is constant in space and time. The measured half-life is $\tau$, in
seconds, and the decay constant is $\lambda = \ln(2)/\tau$. The number of
decays per second per litre – the decay rate – is $\lambda C$.

However, this is an average value, and the decay is a Poissonian process. The
probability of $k$ decays per litre in any given second-long period is:

$$ p(k) = \frac{\left[\lambda k\right]^k e^{-\left[\lambda C\right]}}{k!} $$

The figure shows example Poisson distributions for $\lambda C$ = 10, 50, 90 and
130.

![poisson_distributions]({static}/images/poisson_distributions.png)

