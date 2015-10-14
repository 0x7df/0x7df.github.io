Title: Remembering Bayes's formula 
Date:  
Category: Statistics
Modified: 
Tags: bayes, mathematics, probabililty, statistics 
Slug: 
Author: 0x7df
Summary: An easier way to remember Bayes's formula 
Status: published

It's probably just me, but I could never remember Bayes's formula:

$$ P(A|B) = \frac{P(B|A) P(A)}{P(B)} $$

as-is. I don't use it very often, so I didn't have it at my fingertips.
However, I found it easy to remember:

$$ P(A,B) = P(A|B) P(B) $$

which is the more general formula that says that the probability of $A$ _and_
$B$ is the probability of $A$ given $B$ multiplied by the probability of just $B$.

This sticks. So:

$$ P(A,B) = P(A|B) P(B) $$
$$ P(A,B) = P(B|A) P(A) $$

Therefore:

$$ P(A|B)P(B) = P(B|A)P(A) $$

and:

$$ P(A|B) = \frac{P(B|A)P(A)}{P(B)} $$

which is Bayes's formula.

The other trick I use to help remember what it all means is, once I've got the
formula, not to use $A$ and $B$
as the symbols representing events, but instead to use $C$ and $E$ for "cause"
and "effect":

$$ P(C|E) = \frac{P(E|C)P(C)}{P(E)} $$

You could use $T$ and $O$, for "theory" and "observation", or whatever works
for you.

[eddy]: https://faculty.washington.edu/jmiyamot/p548/eddydm%20prob%20reas%20i%20clin%20medicine.pdf
[kahneman]: https://books.google.co.uk/books?id=MScNAAAAQBAJ

Then it's easier to know, given some situation, which numbers to put where. To
illustrate this, we'll use a 
classic example from [Eddy, D. M. (1982), _Probabilistic reasoning in
clinical medicine: problems and opportunities_][eddy], in [Kahneman _et al._
(Eds.),
_Judgement under uncertainty: heuristics and biases_, Cambridge University
Press][kahneman]. 

In this example, the following problem concerning diagnosing breast cancer
using a mammogram is set:

> Suppose a physician has had experience with a number of women who, in all
> important aspects... are similar to this particular patient. And suppose the
> physician knows from this experience that the frequency of cancer in this
> group is, say, 1 out of 100... Now let the physician order a mammogram and
> receive a report that... the lesion is malignant.

Values of 80% for true positives and 10% for false positives are reported for
this particular kind of diagnostic test (or thereabouts).

Now we can distinguish between cause and effect; we let "the patient has
cancer" be the cause, $C$, and "the test is positive" be the effect, $E$.
The question posed is what is the probability that the patient has cancer given
that the test is reported as positive: i.e. what is $P(C|E)$. Recall that:

$$ P(C|E) = \frac{P(E|C)P(C)}{P(E)} $$

We have to insert numbers in for the other values, to solve the problem. The
first is $P(E|C)$: the probability of the effect (a positive test) given that
the cause is true (the patient has cancer). This is simply the true positive
rate of the test, 0.8. Next, $P(C)$ is the probability that the patient has
cancer; i.e. the base rate for the reference group. The doctor has already
judged this to be 0.01 (1 in 100 for women similar to this one in all important
aspects). The final number we need is $P(E)$; i.e. the probability of this
effect occurring. This isn't a conditional probability, but the probability
irrespective of the cause. We can work this out by summing the conditional
probabilities of the effect over all possible causes.

Generally then:

$$ P(E) = \sum_c P(E|c) P(c) $$

where we have used the symbol $c$ to represent causes. When $c = C$, the cause
is that the patient has cancer; all possible $c \ne C$ represent other causes.
In this case we don't have to itemise all the possibilites, because no matter
how many other reasons there are for the test coming up true, they are
accounted for in the false positive rate.

Hence:

$$ P(E) = P(E|c{=}C) P(c{=}C) + P(E|c{\ne}C) P(c{\ne}C) $$

The first two quantities on the right hand side have been identified already:
0.8 and 0.01. The probability of a positive test arising when no cancer is
present is 0.1 (false positive rate of 10%), and the probability of no cancer
is simply 1 - 0.01 = 0.99. Hence, and finally:

$$ P(C|E) = \frac{(0.8)(0.01)}{(0.8)(0.01) + (0.1)(0.99)} $$

which gives an answer of abut 0.075, or 7.5% probability that the patient
actually has cancer given a positive test. The main reason this is so
surprisingly low is
the low relative incidence of cancer in the first place. If the rate of cancer
in this group, the formula would be:

$$ P(C|E) = \frac{(0.8)(0.5)}{(0.8)(0.5) + (0.1)(0.5)} $$

giving nearly a 90% chance of the patient having cancer, given exactly the same
test. This illustrates a key point - the usefulness of a test doesn't
depend on only the intrinsic properties of the test, like its accuracy (true
positive rate) and its false alarm rate, but also on how common the phenomenon
being tested for is. Two tests with the same accuracy and false alarm rate,
that test for, say, lung cancer and asthma, cannot be treated with the same
degree of confidence given the different underlying prevalences of those two
conditions. Interestingly, this also means the same test for the same disease
might need to be treated with differing confidence in different
populations; cystic fibrosis is much commoner in European countries than in
Asia, so doctors in those locations would have different levels of confidence
in the test.
