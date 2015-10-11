Title: Genetic algorithms
Date: 2015-06-03 07:36
Author: 0x7df
Category: Uncategorized
Slug: 599
Status: draft
Tags: algorithm, evolutionary algorithsm, evolutionary computing, computing,
programming

In a genetic algorithm, a population of random solutions to the problem
in question is generated. Each individual solution is encoded in a
binary string (its genotype). The ‘fitness’ of each individual (i.e. how
good a solution to the problem it is) is assessed.

An iterative process then follows, whereby the fittest half of the
population is kept, and the other half discarded. The fit solutions are
paired up and allowed to mate: that is, the binary strings of each
parent are broken in half at some random point, and one half from the
mother and one half from the father joined together to create a new
individual – a daughter solution. This is called crossing over. In this
way each coupled pair of parents spawns two daughter solutions, thus
restoring the total population to its original size.

The theory is that the population of solutions will evolve as the
iterations progress, and become on average better and better solutions
to the given problem. After some number of generations, the process is
stopped, and the fittest individual out of the final population is
assumed to be the best possible solution to the problem in question.

An important additional process is the application of random mutations.
After the crossing over process, some bits in the binary strings of the
daughter solutions are mutated at random (that is, changed from a 1 to a
0 or vice versa). This is done by generating a random number between 0
and 1 for each bit in each string: if the number is greater than some
threshold, then the bit is mutated. The size of the threshold dictates
how much mutation will occur.

It is also important to note that the fittest half of the population is
not necessarily the best choice of individuals to go forward and mate.
Sometimes this can cause the GA to approach the solution very quickly,
thereby reducing the amount of genetic diversity in the population. If
this occurs the algorithm slows down and can fail. To maintain genetic
diversity whilst still allowing the overall population to improve, we
simply allow the fitter solutions a higher probability of going forward.
For example, if the range of possible fitnesses is normalised to the
range 0 to 1, then a random number can be generated for each individual:
and the individual goes forward if the random number is lower than its
normalised fitness. That way, the fitter the solution, the more likely
it is to survive, but the element of randomness means the culling of
unfit solutions does not happen too quickly.

An iteration would go as follows:

-   Assess the fitness of the population (and any other interesting
    stats)
-   Determine whether this is to be the final population, and if so,
    finish
-   Cycle through all the individuals, selecting which will survive, and
    copying their genotypes to a temporary population
-   Randomly pair up individuals in the temporary population
-   Generate a cross-over point for each pair
-   Cross over each pair, creating two daughters for each pair
-   Perform mutation on the offspring

