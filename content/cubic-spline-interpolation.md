Title: Cubic spline interpolation
Date: 2017-05-03 20:42
Category:  
Modified: 2017-05-03 20:42
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: draft

Given a set of points, $x_{i-1}, x_i, x_{i+1}, x_{i+2}$, separated by $\Delta
x$, at which some quantity $y$ has known values $y_{i-1}, y_i, ...$,
respectively, we can find the value $y_x$ at some arbitrary point $x$ using
*cubic spline interpolation*.

A cubic polynomial is:

$$
Y_i(z) = a_i z^3 + b_i z^2 + c_i z + d_i
$$

where:

$$
z = \frac{x - x_i}{\Delta x}
$$

for $x_i \le x \le x_{i+1}$.

At the left point:

$$
Y_i(0) = d_i = y_i
$$

and on the right:

$$
Y_i(1) = a_i + b_i + c_i + d_i = y_{i+1}
$$

To provide further conditions we also consider the derivatives:

$$
Y'(z) = 3a_i z^2 + 2b_i z + c_i
$$

$$
Y'(0) = c_i
$$

$$
Y'(1) = 3a_i + 2b_i + c_i
$$

The coefficients are therefore:

$$
a_i = 2(y_i - y_{i+1}) + Y'_i + Y'_{i+1}
$$

$$
b_i = 3(y_{i+1} - y_i) - 2Y'_i - Y'_{i+1}
$$

$$
c_i = Y'_i
$$

$$
d_i = y_i
$$

We match up to the second derivatives of the two adjacent piecewise cubic
functions at a given point:

$$
Y_{i-1}(1) = Y_i(0) = y_i
$$

$$
Y'_{i-1}(1) = Y'_i(0)
$$

$$
Y''_{i-1}(1) = Y''_i(0)
$$

...

$$
Y_0(0) = y_0
$$

$$
Y_{n-1}(1) = y_n
$$

...

$$
Y''_0(0) = 0
$$

$$
Y''_{n-1}(1) = 0
$$

