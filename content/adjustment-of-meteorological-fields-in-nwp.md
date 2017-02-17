Title: Adjustment of meteorological fields in NWP
Date: 2017-02-16 00:32
Category: Atmospheric science
Modified: 2017-02-16 00:32
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: published

According to [Riddaway and Hortal](http://www.ecmwf.int/sites/default/files/elibrary/2002/16948-numerical-methods.pdf), the set of coupled non-linear partial differential equations solved in [numerical weather prediction](https://en.wikipedia.org/wiki/Numerical_weather_prediction) (NWP) describe three important dynamical processses:

1. Advection
2. Diffusion
3. Adjustment

The first two are familiar to the non-meteorologist more used to working with the general equations of fluid motion. The third, *adustment*, is less so.

They describe adjustment as 'how the mass and wind fields adjust to one another'.

[Marchuk (1974)](https://books.google.com/books?isbn=0323157467) also identifies three basic factors defining the evolution of meteorological fields (p.118):

1. The transport of meteorological substances along particle trajectories
2. Turbulent exchange
3. The adjustment of the fields

which are analogous.

Marchuk describes the distinction thus:

>> One can imagine the following simplified pattern of evolution of the meteorological fields. Let us consider an elementary time interval $\Delta t$. During this time interval, the meteorological [fields], fixed at the initial instant of the time interval, will move along the trajectories with a velocity $\mathbf{u}$, so that the initial particle position vector $\mathbf{r}_0$ will become $\mathbf{r} = \mathbf{r}_0 + \mathbf{u}\Delta t$. Naturally, this will disrupt the basic adjustment... The adjustment of the fields takes place after their displacement along the trajectories, during the second step. The wave processes, ... gravity and sound waves, are considered as the mechanism of field adjustment in the case of the simplest models of atmospheric motions. The wave processes are instrumental in distributing the discrepancies in adjustment over the [meteorological fields] and in correcting these disrepancies in accordance with the laws of dynamics... Of course, this is a simplification of the complex nature of the dynamics of atmospheric processes; however, such a model reflects, in general outline, the continuous operation of the basic factors, and does it better, the smaller the $\Delta t$.

Similarly, in [Lauritzen *et al.* (2010](https://www.amazon.co.uk/d/Books/Numerical-Techniques-Atmospheric-Lecture-Computational-Science-Engineering/3642116396):

>> On large scales, the dynamics of the atmosphere is approximately *balanced*,
>> and it is important for numerical solutions to be approximately balanced in
>> the same sense... Fast *acoustic* and *inertio-gravity waves* [are]
>> responsible for the *adjustment* towards balance.

>> ... The fast acoustic and inertio-gravity waves are observed to be
>> energetically weak... The weakness of these fast waves corresponds to 
>> certain kinds of approximate balance between other terms in the governing
>> equations... The atmosphere is continually being perturbed away from balance
>> by a variety of mechanisms, including flow over orography, convective
>> instability, and the nonlinear nature of the balanced dynamics. The
>> mechanism by which the atmosphere adjusts back towards balance involves the
>> radiation and ultimate dissipation of the fast acoustic and inertio-gravity
>> waves.

>> The physical mechanism for acoustic waves involves the interaction of
>> compressibility and flow divergence: convergence of fluid locally leads to
>> an increase in density and hence pressure; the resulting pressure gradient
>> then drives fluid acceleration leading to new convergence displaced from the
>> original convergence.

>> There are two basic physical mechanisms underlying inertio-gravity waves.
>> At the inertial end of the spectrum, i.e. shallow waves, an air parcel
>> displaced from its equilibrium position experiences a restoring force
>> provided by the Coriolis effect. At the gravity wave end of the spectrum,
>> i.e. deep waves, an air parcel displaced from its equilibrium position
>> has a density different from that of the reference profile at that height
>> and so experiences a restoring force due to buoyancy, i.e. the imbalance
>> between the gravitational force on the parcel and the vertical pressure
>> gradient force. In intermediate parts of the spectrum both mechanisms
>> operate to some degree.

>> Making the [vertical balance] approximation in the governing equations
>> corresponds to filtering internal acoustic waves from the governing 
>> equations. More precisely, it corresponds to taking the limit in which
>> the propagation speed of internal acoustic waves becomes infinite, so
>> that the adjustment to balance is instantaneous. In the unapproximated
>> equations all information propagates at a finite speed; these are 
>> *hyperbolic* equations. The balance approximation introduces a certain
>> non-locality.

>> Similar ideas apply in the case of [horizontal] balance. The atmosphere
>> adjusts towards... balance through the radiation and dissipation of
>> inertio-gravity waves. The balance approximation filters inertio-gravity
>> waves from the governing equations, or, rather, corresponds to the limit
>> in which inertio-gravity waves propagate infinitely fast so that the
>> adjustment process is instantaneous.

>> Even if we are solving the unapproximated (i.e. hyperbolic) governing
>> equations, balance and the implied nonlocality are important. However
>> the solution of elliptic equations requires quite different numerical techniques
>> from the solution of hyperbolic equations. Model developers therefore
>> face an important choice between inherently local explicit time stepping
>> techniques and inherently nonlocal implicit time stepping techniques.
