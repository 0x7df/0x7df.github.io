Title: Recursive Karatsuba multiplication
Date: 2014-05-11 10:54
Category:
Modified: 2020-10-14 13:17
Tags:
Slug:
Author: 0x7df
Summary:
Status: published

The [Karatsuba algorithm](https://en.wikipedia.org/wiki/Karatsuba_algorithm)
for multiplication is a good candidate for teaching recursion in programming.
It allows you to simplify the multiplication of two large numbers into three
multiplications of smaller numbers, and applying this recursively mean the
mulitplications can be reduced as far as one wants, e.g. until only single-
digit numbers are involved.

To multiply two large numbers, $x$ and $y$, note that these can be decomposed
into:

$$ x = x_1 10^m + x_0 $$
$$ y = y_1 10^m + y_0 $$

where $x_0$ and $y_0$ are less than $10^m$. (In general bases other than 10
can of course be used.)

The product $xy$ is then:

$$ xy = \left( x_1 10^m + x_0 \right) \left( y_1 10^m + y_0 \right) $$

$$ xy = x_1 y_1 10^{2m} + \left(x_1 y_0 + x_0 y_1\right) 10^m + x_0 y_0 $$

which involves four multiplications. This can be reduced to three by
recognising that:

$$ x_1 y_0 + x_0 y_1 = \left(x_1 + x_0\right) \left(y_1 + y_0 \right) - x_1y_1 - x_0y_0 $$

the final two terms of which are already computed.

The recursive implementation of this s most efficient when $m = n/2$.

An implementation in Python is as follows:

    :::python
    import math


    def multiply(x,y):
        """
        Karatsuba multiplication of two positive integers
        """

        strx = str(x)
        stry = str(y)
        n = max(len(strx),len(stry))

        # Base case
        if n == 1:
            return x * y

        m = n // 2

        # Prevents empty string arising when extracting a and c later
        while len(strx) < n:
          strx = "0" + strx
        while len(stry) < n:
          stry = "0" + stry

        x1 = int(strx[:-m])
        x0 = int(strx[-m:])
        y1 = int(stry[:-m])
        y0 = int(stry[-m:])

        # The three recursive multiplies
        z2 = multiply(x1, y1)
        z0 = multiply(x0, y0)
        z1 = multiply((x1 + x0), (y1 + y0)) - z2 - z0

        result = int(str(z2) + 2 * m2 *"0") + int(str(z1) + m2 * "0") + z0

        # Test correctness
        assert(result == x * y)

        return result

The use of string manipulation to decompose the inputs is marginally faster
than using integer arithmetic, which is fine for a simple demo, but means
negative numbers cannot be handled, and base-10 is hard-wired; but re-
implementing in a way that permits negative inputs, and allows other bases
to be chosen at run-time, would be a good exercise.
