Title: Bias correction of observations in data assimilation for numerical weather prediction
Date: 2017-11-11 13:44
Category:  
Modified: 2017-11-11 13:44
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: draft

In general, the assimilation of observational data for numerical weather
prediction suffers from systematic error, or bias. There are two sources of bias:

1. Systematic error in the observing system itself, e.g. due to imperfect
   calibration or sensor problems, and
2. Bias introduced by the modelling of the observation that is conducted as
   part of the assimilation process.

The former is fairly obvious, and common to all measurement systems.

The latter deserves some explanation. In data assimilation, the initial
conditions of a forecast are adjusted iteratively, until the match between the
forecast and the set of observations being assimilated is optimal. To determine
the closeness of the match, a prediction must be made of the
vaues that the observing systems would give if the current model state were the
true one. This allows a like-for-like comparison with the actual observation.
The model state is projected
onto the observation space, and the models used to do this are called
*observation operators*. An example is the radiation transport modelling used
to infer satellite radiance measurements given an atmospheric state from the
model. Systematic biases can be introduced by these observation
operators.

Mathematically, we denote the vector of observations as $\mathbf{y}$, the model
state vector as $\mathbf{x}$, and the observation operator as $H$, such the
*departures* to be minimised by the assimilation algorithm are:

\begin{equation}
    \mathbf{y} - H\left(\matbf{x}\right)
\end{equation}

Biases in satellite observations are particularly important, as they can affect
the quality of the forecast globally, in a short space of time.

Typically the biases are removed, either before or during the data assimilation
process. This is referred to as bias correction. Generally, bias correction is
done by comparison with some unbiased reference; for example, other
observations from known unbiased observing systems.

Biases introduced by observation operators are particularly complicated to
solve, because in general the biases themselves are dependent on the
atmospheric state. So while, for example, a satellite measurement might be
biased by some fixed offset, errors in the modelling of that measurement by the
observation operator will be dependent on the cloud cover, for example, and
atmospheric pressure and moisture content, etc.

Bias correction can also be done by comparing against the model itself. Comparison
against the forecast model introduces the complexity of needing to distinguish
between model bias and observation bias. The forecast model is, in general,
also biased, and if the model bias is not separated out, the result is that the
bias correction of observations ends up correcting *both* the observation and
the model bias. This is called *drift*.

This tends to reinforce the model bias. For example, if the model tended to
produce temperatures that were systematically too high, then unbiased (or less
biased) observation would appear to be too low in comparison; and if this
discrepancy were attributed to observation bias, the observation would be
corrected upwards, and reinforce the existing model bias.

A further complication is introduced by the fact that both the observation bias
and the model bias are time-dependent. Instruments can degrade, and we have
already seen that bias introduced by the observation operators is dependent on
atmospheric conditions. But the model bias can also change, for example as a
result of updates to the model itself. Therefore a successful bias correction
procedure is likely to be adaptive, rather than static. A static scheme would
be robust against changes in the model bias, but would equally ignore changes
in the observation bias, which we wish to account for. An adaptive scheme must
be designed carefully to respond only to changes in observation bias, and not
to changes in model bias. It can do this if there are unbiased observations
available, because these can be used to diagnose model bias changes. Radoisonde
observations often fulfil this role, as they are not adaptively corrected;
however their coverage is incomplete. Alternatively, a single channel from a
satellite instrument can be assimilated without bias correction, to anchor the
other channels.
