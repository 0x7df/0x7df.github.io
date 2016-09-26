Title: Understanding Bayes's formula
Date: 2016-09-25 22:34
Category: statistics 
Modified: 2016-09-25 22:34
Tags: mathematics, probability 
Slug: 
Author: 0x7df
Summary: 
Status: draft

[hoffgiger]: http://library.mpib-berlin.mpg.de/ft/uh/UH_Using_1998.pdf

$$ P(C|E) = \frac{\mathrm{TP}}{\mathrm{TP} + \mathrm{FP}} = \frac{8}{8+99} $$

$$ P(C|E) = \frac{P(E|C)P(C)}{P(E)} = 
            \frac{P(E|C)P(C)}{P(E|C)P(C) + P(E|!C)P(!C)} $$

$$ P(C|E) = \frac{(8/10)(1/100)}{(8/10)(1/100) + (1/10)(99/100)} $$

$$ P(C|E) = \frac{(n_{E,C}/n_C)(n_C/n)}
                 {(n_{E,C}/n_C)(n_C/n) + (n_{E,!C}/n_{!C})(n_{!C}/n)} $$

$$ P(C|E) = \frac{n_{E,C}}{n_{E,C} + n_{E,!C}} $$

Generally
---------

$$ P(C_i|E) = \frac{P(E|C_i)P(C_i)}{\sum_j P(E|C_j)P(C_j)} $$

$$ P(C_i|E) = \frac{\frac{n_{E,C_i}}{n_{C_i}}\frac{n_{C_i}}{n}}
                   {\sum_j \frac{n_{E,C_j}}{n_{C_j}}\frac{n_{C_j}}{n}} $$

$$ P(C_i|E) = \frac{n_{E,C_i}}{n_E} $$

Intuitive
---------

$$ P(C|E) = \frac{P(E|C)}{\sum P(E|C_j)} $$

Equivalent to:

$$ PC|E) = \frac{TP}{TP +FP} $$

where $TP$ and $FP$ are the true and false positive _rates_ (whereas
previously, above, they were the true and false positive absolute numbers).
This is fine if the different causes $C_i$ are equal probability.

