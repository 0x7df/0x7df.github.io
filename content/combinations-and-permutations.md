Title: Combinations and permutations
Date: 2015-03-13 05:01
Modified: 2020-09-03 21:06
Author: 0x7df
Category: Maths
Tags: combinations, combinatorics, factorial, julia, permutations, python
Slug: combinations-and-permutations
Status: published
Summary: The mathematics of combinations and permutations

![abstract-balls-blue-200]({static}images/abstract-balls-blue-1346.png)

I recently had to teach the formulae for calculating the number of
combinations and permutations, when selecting $r$
items out of a pool of $n$. In case you're ever
in the same boat, here's a refresher. There are four scenarios:

<table>
    <thead>
        <tr>
            <td>
            </td>
            <td align="center">
                <span style="color:#333399;"> Combinations </br> &nbsp; (order doesn't matter): &nbsp; </span>
            </td>
            <td align="center">
                <span style="color:#033399;"> Permutations </br> &nbsp; (order does matter):    &nbsp; </span>
            </td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <span style="color:#333399;"> Selected items are replaced: &nbsp; </span>
            </td>
            <td align="center">
                $$ \frac{\left(n + r - 1\right)!}{ r!\left(n - 1\right)!} $$
            </td>
            <td align="center">
                $$ n^r $$
            </td>
        </tr>
        <tr>
            <td>
                <span style="color:#333399;"> Selected items are not replaced: &nbsp; </span>
            </td>
            <td align="center">
                $$ \frac{n!}{r!\left(n-r\right)!} $$
            </td>
            <td align="center">
                $$ \frac{n!}{\left(n-r\right)!} $$
            </td>
        </tr>
    </tbody>
</table>

### The factorial function

The exclamation mark represents [the *factorial*](http://mathworld.wolfram.com/Factorial.html):

$$ x! = x \times \left(x-1\right) \times \left(x-2\right) \times \ldots \times 2 \times 1 $$

For example:

$$ 5! = 5 \times 4 \times 3 \times 2 \times 1 = 120 $$

You can invoke it in [Python](https://www.python.org/) like this:

    $ python
    >>> import math
    >>> math.factorial(5)
    120

or perhaps, if you're going to use it a lot:

    $ python
    >>> from math import factorial as fac
    >>> fac(4)
    24

In [Julia](http://julialang.org/):

    $ julia
    julia> factorial(7)
    5040

One last thing to know about the factorial function, is that $0! = 1$.

### Permutations vs. combinations

To get the formulae right, there are two choices to make. First, we have
to decide whether or not the order that items are selected in matters to
us. The various different arrangements of some group of items are called
*permutations* when the order matters; e.g. if the arrangement $(1, 2, 3)$
is considered different from $(2, 3, 1)$. If the order doesn't matter -
e.g. if the arrangements $(a, b, c)$, $(b, c, a)$, $(b, a, c)$, etc., are
considered to be the same - then the arrangements are referred to as
*combinations*.  This depends on the application.

### With vs. without replacement

The second thing we have to consider is whether or not each item that
gets selected is put back into the pool before the next selection is
made. For example, in a [lottery](http://en.wikipedia.org/wiki/Lottery), when a ball
is selected, it can't get selected again - this scenario is selection
*without replacement*. For a group of kids playing [pass the
parcel](http://en.wikipedia.org/wiki/Hot_potato_%28game%29), as far as
they're concerned the same individual can get selected any number of
times - you stay in the game even after you've been selected and you
hope you might get chosen again. So this is selection *with
replacement*. (NB in practice that's not a very sensible way to play
pass the parcel if you want an easy time, so adults running the game are
more likely to see it as selection *without replacement*...)

This leads to our four scenarios. Now let's work out the equations.

### 1. Permutations without replacement

You have $ n$ distinct items and you have to
select $ r$ of them. The order doesn't matter, and the
items aren't replaced in the pool once selected. There are $ n$
possibilities for the first item, but because there is
no replacement, there are only $n-1$
possibilities for the second item, then only $ n-2$
possibilities for the third, etc. Since, to get the
total number, we're going to multiply these together, we start to see
that the formula for the total number of combinations, say $ M$,
is going to look something like:

$$ M = n \times \left(n-1\right) \times \left(n-2\right) \times \ldots $$

If we continued this series of terms right to the end, down to 1, then
that would be the same as taking the factorial of $ n$.
However, the number of terms we need to multiply
together is the same as the number of selections in whatever game we're
playing. We need to remember we're only selecting $ r$
items, so there are going to be only $ r$
terms:

$$ M = n \times \left(n-1\right) \times \left(n-2\right)
\times \ldots \times \left(n-r+1\right) $$

So just taking the factorial of $ n$ will only
give the right answer if we want to select all the items eventually,
i.e. if $ r = n$. In general we need to truncate
the series after $ r$ terms. How do we do this?
The answer is going to be $ n!/\left(n-r\right)!$,
and this will be easiest to see using an example. Let
$ n = 6$ and $ r = 3$. We
can write the answer out the long way:

$$ M = 6 \times 5 \times 4 $$

and compare this with the formula for $ n!$:

$$ n! = 6 \times 5 \times 4 \times 3 \times 2 \times 1 $$

Clearly:

$$ M = \frac{n!}{\left(3 \times 2 \times 1 \right)}$$

which of course is the same as

$$ M = \frac{n!}{3!}$$

After working out another couple of simple examples
like this, you will see that the denominator always needs to be
$ \left(n-r\right)!$, to cancel out the last
$ \left(n-r\right)!$ terms of the factorial of $ n$, leaving just the first $ r$
terms that we need. Hence:

$$ M = \frac{n!}{\left(n-r\right)!} $$

### 2. Permutations with replacement

The difference here from the last example is that each time we make a
selection, we replace the item afterwards. Every selection is made from
the same original pool, rather than from a gradually decreasing pool. So
in this case the formula is going to look something like:

$$ M = n \times n \times n \times \ldots $$

The logic above about there only being $ r$ terms
is exactly the same here, so we end up with:

$$ M = n^r $$

Simple!

### 3. Combinations without replacement

Now we take the first scenario - permutations without replacement - and
adapt it to the scenario where we don't distinguish between different
orderings of the selected items. Clearly, we're going to have reduce the
number - there will be fewer combinations than there are permutations.
Let's assume $ n = 5$ and $ r = 3$.
Imagine the items are numbered balls like in a
lottery, and imagine the selected balls are $(1, 3, 4)$. If these were
your numbers, you'd win no matter what order they came out in, so the
permutations of the $ r$ selected items - $(1, 3,
4)$, $(1, 4, 3)$, $(3, 1, 4)$, $(3, 4, 1)$, $(4, 1, 3)$ and $(4, 3, 1)$ - are the
same, and should be considered just one distinct arrangement. Of course,
we already know that there are $ r!$ permutations
of $ r$ selected items, so if we care about the
order of the selected items, then there are going to be $ r!$
more possibilities than if we don't. So, all we have to
do to get the number of combinations is reduce the number of
permutations by a factor of $ r!$. Hence:

$$ M = \frac{n!}{r!\left(n-r\right)!} $$

### 4. Combinations with replacement

This scenario is slightly more complicated. *Without* replacement, to
get from the number of permutations to the number of combinations, we
just reduced by a factor of $ r!$. You might
therefore think that the answer here is going to be the number of
permutations *with* replacement, similarly reduced by a factor of
$ r!$; but it isn't. Let's take a simple example:
a pool of three numbers, and selection of two items. The permutations
without replacement are:
</br>(1,2)
</br><span style="color:#ff0000;">(2,1)</span>
</br>(1,3)
</br><span style="color:#ff0000;">(3,1)</span>
</br>(2,3)
</br><span style="color:#ff0000;">(3,2)</span>

and the _additional_ ones if replacement is allowed are:
</br>(1,1)
</br>(2,2)
</br>(3,3)

The permutations highlighted in red are the ones you'd get rid of if you
were interested only in combinations. Notice that there aren't any red
ones in the second batch - the "extra" possibilities that arise when
replacement is allowed are the same for permutations as for combinations
(in this special case of selecting two items). When you generalise this
idea to larger numbers, you do end up with some red items in the second
batch, but not as high a proportion as in the first batch. So we have to
reduce the second batch by some different factor, not $ r!$.

This shows us why reducing the total number of permutations by
$ r!$ doesn't work with replacement, but it doesn't
actually help us do the calculation, because we can't easily work out
how big the second batch is, nor what factor to reduce it by. However,
what if we pretend that, whenever we get repetition due to the items
being replaced, an item being selected a second time is actually a new
item? So instead of $(1,1)$ we could perhaps write $(1,1′)$, with the prime
on the second $1$ indicating our pretense that it's a different item. If
we had $(1,1,2,1)$ for an $ r = 4$ trial, we'd call
it $(1,1′,2,1′′)$, indicating that the three instances where $1$ was
selected should all be treated as if they were different items. We're
now back in the realm of permutations without replacement, for which the
formula is $ m! /r!\left(m-r\right)!$, where now
we're using $ m$, for the "expanded" number of
items to choose from as a consequence of replacement being allowed,
rather than $ n$, the true number of distinct
items. Now we just need to work out $ m$. It turns
out that:

$$ m = n + r - 1 $$

That is, selecting *with* replacement from a pool of $ n$
is like selecting *without* replacement from a pool of
$ n + r - 1$. There are $ r - 1$
extra possibilities to select from, because once we
have selected the first item, the remaining $ r - 1$
items could be (in reality) the same item every time,
but we are pretending that they are different. Hence, substituting for
$ m$:

$$ \frac{m!}{\left(m - r\right)!} = \frac{\left(n + r - 1\right)!}{\left(n
- 1\right)!} $$

This gives us the number of permutations, which we *can* now reduce by
$ r!$ to get the number of combinations. Our final
formula is therefore:

$$ M = \frac{\left(n + r - 1\right)!}{ r!\left(n - 1\right)!}
$$

