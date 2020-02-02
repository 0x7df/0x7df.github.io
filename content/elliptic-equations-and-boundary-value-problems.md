Title: Elliptic equations and boundary-value problems
Date: 2017-02-18 20:45
Category: Maths
Modified: 2017-02-18 20:45
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: draft

## Classification of partial differential equations

Partial differential equations (PDEs) can be classified in the following way.
Consider the general linear second-order PDE:

\begin{equation}
      A(x,y) \frac{\partial^2 u}{\partial x^2}
    + B(x,y) \frac{\partial^2 u}{\partial x \partial y}
    + C(x,y) \frac{\partial^2 u}{\partial y^2}
    =
    F\left(
        x,y,\frac{\partial u}{\partial x},\frac{\partial u}{\partial y}
     \right)
\end{equation}

The discriminant $\Delta(x,y)$ can be defined as:

\begin{equation}
    \Delta(x,y) = B^2(x,y) - A(x,y)C(x,y)
\end{equation}

and the original PDE classified according to the following rules:

1. *Hyperbolic* at $(x,y)$ if $\Delta \gt 0$
2. *Parabolic* at $(x,y)$ if $\Delta = 0$
3. *Elliptic* at $(x,y)$ if $\Delta \lt 0$

The equation is said to be hyperbolic, elliptic or parabolic if it is so over its
whole domain. Equations can be of mixed type.

For example, the *wave equation* is hyperbolic:

\begin{equation}
    \frac{\partial^2 u}{\partial t^2} = c^2\frac{\partial^2 u}{\partial x^2}
\end{equation}

the *heat flow equation* or *diffusion equation* (with constant thermal
conductivity or diffusion coefficient) is parabolic:

\begin{equation}
    \frac{\partial u}{\partial t} = \kappa\frac{\partial^2 u}{\partial x^2}
\end{equation}

and *Poisson's equation* is elliptic:

\begin{equation}
    \frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2}
    = f(x,y)
\end{equation}

A more general form of Poisson's equation is:

\begin{equation}
    \nabla^2u = f
\end{equation}

where:

\begin{equation}
    \nabla^2u = \nabla\cdot(\nabla u)
    = \sum_{i=1}^n \frac{\partial^2 u}{\partial x_i^2}
\end{equation}

where $x_i$ is the $i^{\mathrm{th}}$ dimension of a $n$-dimensional domain.

## Boundary conditions

In general, boundary conditions are given by specifying values for $\alpha$,
$\beta$ and $\gamma$ in the equation:

\begin{equation}
    \alpha(x,y)u(x,y) + \beta(x,y)\frac{\partial}{\partial n}u(x,y)
    = \gamma(x,y)
\end{equation}

where $\partial/\partial n$ is the derivative normal to the boundary.

Then, boundary conditions can be categorised as:

1. *Dirichlet* conditions if $\beta = 0$ (the value is specified)
2. *Neumann* conditions if $\alpha = 0$ (the derivative is specified)
3. *Robin* or *third*-type conditions if neither $\alpha$ nor $\beta$ is zero
4. *Cauchy* conditions if two equations are given with $\alpha = 0$ in one and
   $\beta = 0$ in the other

In any case, if $\gamma = 0$, the boundary condition is said to be
*homogeneous*, and *inhomogeneous* if $\gamma \ne 0$.

Different types of boundary conditions are appropriate to different types of
PDE. Hyperbolic equations require Cauchy boundary conditions and parabolic PDEs
require Neumann or Dirichlet conditions; in both cases on an open boundary
(otherwise the solution would be over-specfied). Elliptic equations require
Dirichlet or Neumann boundary conditions, but on a closed boundary (otherwise
the boundary conditions are insufficient).

Hyperbolic and parabolic equations generally describe *initial-value problems*,
and are often solved by forward integration ("time marching") schemes. On the
other hand, elliptic equations, along with suitable boundary conditions,
generally constitute *boundary-value problems*. In the latter, the PDE describes
a steady state over a specified domain $\mathcal{D}$, given boundary conditions
specified on the boundary $\mathcal{\Lambda}$; systems of this type are usually
solved by iterative methods.

## Finite difference discretisation of elliptic problems

Common solution techniques for elliptic equations include finite difference,
finite element, and spectral methods. Here we consider only finite difference
schemes.

### Two-dimensional Poisson's equation

We have seen Poisson's equation as an example of an elliptic PDE:

\begin{equation}
    \frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2}
    = f(x,y)
\end{equation}

Consider a rectangular domain with homogeneous Neumann boundary conditions:

\begin{equation}
    u(0,y) = u(X,y) = u(x,0) = u(x,Y) = 0
\end{equation}

The second-order-accurate finite-difference approximation is:

\begin{equation}
    \frac{1}{h_x^2} \left(u_{i-1,j} - 2u_{i,j} + u_{i+1,j}\right)
    +
    \frac{1}{h_y^2} \left(u_{i,j-1} - 2u_{i,j} + u_{i,j+1}\right)
    = f_{i,j}
\end{equation}



