Title: Minimum detectable activity
Date: 2019-03-29 22:12
Category:  
Modified: 2019-03-29 22:12
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: draft

At least two problems plague the measurement of radioactive samples; one is
the inevitable existance of background radioactivity, and the other is the
statistical fluctuation inherent in radiation measurement.

The most basic question is whether a weak sample is even acive or not; a
recorded increase in counts could be the result of the sample being introduced,
but it also could be due to a statistical fluctuation in the background
radiation.

We can, given some known, constant (on average), background rate of radiation,
make a decision about how different a measurement must be from the average
before we will attribute it to an active sample, as opposed to a fluctuation in
the background.

This has to be a compromise between the situation where no activity is present
and the one where activity is present (but weak relative to the background).

Consider first if no activity is present. We would like to be correct in this
case, say, 95% of the time. That is, we can accept a 5% false alarm rate, in
which we claim activity is present when it is not.

Therefore we set a *critical level* of activity, $L_c$, above which there is
only a 5% probability of registering, given a sample with no activity.

If the measured background count is $n_B$, and the measured total
count is $n_T$, then the net count resulting from the sample is:

$n_S =n_T - n_B$


$n_S$ is a random variable with a normal distribution and standard deviation:

$$ \sigma_S^2 = \sigma_T^2 + \sigma_B^2 $$

If there is no activity in the sample, $n_S = 0$, then the distribution of
$n_S$ centres on zero with standard deviation $\sigma_S$, and we know that 95%
of the area of the distribution lies below $1.645\sigma_S$; hence this is our
critical threshold:

$$ L_c = 1.645 \sigma_S$$

Since:

$$ \sigma_T = \sigma_B $$

we can write:

$$ \sigma_S^2 = 2 \sigma_B^2 $$

Therefore:

$$ \sigma_S = \sqrt{2} \sigma_B $$

and:

$$ L_c = 2.326 \sigma_B $

Next, consider when activity *is* present. We now wish to avoid false
negatives, so we decide on a minimum detectable value of $n_S$, which we will
label $n_D$, that is high enough to ensure there is only a low probability of
registering a count less than the critical level $L_c$ given a sample
with true mean activity $n_D$.

If we chose $n_D$ to be $L_c$ itself, there would be a 50% probability of
getting a false negative (a count beneath the threshold $L_c$). To reduce that
probability to, say, 5% again, we shift $n_D$ higher, by $1.645\sigma_D$:

$$ n_D = L_c + 1.645\sigma_D$

where \sigma_D$ of course is the standard deviation of the distribution of
counts for a true mean of $n_D$.

If we assume as a first approximation the width of this distribution is the
same as the width of the distribution arond zero, hence:

$$ \sigma_D \approx \sqrt{2} \sigma_B $$

then we can simplify to:

$$ n_D = 4.653\sigma_B $$

In short, this is the minimum activity to ensure a false negative rate of 5%,
given a trigger point ($L_c$) chosen to ensure a false positive rate of no more
than 5%.

The logic is the same for detecting other things; e.g. let's say you have a
website where you measure the rate of visits or revenue, and you run an
experiment to see if introducing a new feature improves your stats. You would
refer to this as the minimum detectable *effect*, but otherwise the situation
is exactly the same.
