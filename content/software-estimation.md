Title: Software estimation
Date: 2020-03-03 12:54
Category:  
Modified: 2020-03-03 12:54
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: draft

# Software estimation

Estimating the duration of software projects is well known to be difficult
[?refs?].

Making what are essentially intuitive judgements is an inherently biased human
activity (in any context, not just software), as described by [?Kahneman etc?].
Intuitive forecasts are non-regressive, and forecasters are excessively
confident. In fact, over-confidence and ignorance have been shown to be
positively correlated [?In Kahneman, or just Dunning-Kruger?]. There are also
good reasons to believe that estimating how log an activity will take is more
difficult in software development than in other domains, due to the sheer
complexity of software entities [?Brooks, Mythical Mon-Month?].

Other than intuitive expert judgement, there also appears to be no consistently
successful method or model for producing objective, accurate forecasts of
software effort ?REF?. Adding slippage factors and estimating confidence
intervals are prone to the same biases ?REF?.

Ideally, an Agile approach to software development would always be used, in
which medium- and long-term forecasts of project delivery are not made, or at
least not in any detail ?REF?. Instead, frequent, short iterations are
undertaken (e.g. three week 'sprints'). In this model, the only effort
estimation needed is to determine what tasks can be achieved in the next
iteration. The biases are still there, but with less impact, as a result simply
of not forecasting far into the future. However, this kind of approach is not
always compatible with the expectations of traditional project/programme
management.

Kahneman and Tversky ?REF? recommend anchoring estimates in the _base rate_ for
the appropriate class of tasks (the _reference class_), and then allowing the
estimate for a specific instance of that class to deviate from the base rate
only to a degree that is constrained by the measured predictability of the
class. That is, if the average measured duration of past software rojects in
the appropriate reference class is $\tau$, then an adjusted, unbiased forecast,
$t'$, is obtained by reducing the difference between the estimate and the base
rate by $\rho$, the product-moment correlation between predictions and
outcomes, which is a measure of predictability. Hence:

$t' - \tau = \rho\(t - \tau\)$

Such an approach requires some level of data collection to understand the base
rate, $\tau$, and the predictability, $\rho$, for the reference class in
question.

While collecting such data is definitely a good idea, in the meantime the only
other approach that is documented to improve effrt estimates consistently is
the use of estimation checklists. The nature of the estimation bias is to
ignore external factors and focus on the 'internal' specifics of the task being
estimated. Even in the absence of base rate data (which inherently account for
external factors), at least with a checklist the forecaster is reminded of some
of the external factors that ought to be taken in to account.

Here's a suggested template for an estimation checklist. To avoid bureaucracy,
rather than requiring a written response, this, or something based on it, could
be used just to structure the discussions that necessarily take place between
software developers, domain experts, project managers, suppliers, and users or
customers, before delivery dates are agreed.

- Documentation and scope
    - Is there a written scope?
    - Has a reasonable set of test problems been identified and agreed?
    - Does the test set cover an appropriate range of modes of operation, use
      cases, edge cases, etc.?
    - Have acceptance criteria been agreed with the end user?
    - Is there misleading or potentially biasing information in the scope or
      other documentation?
- People
    - Have individuals been identified to conduct each part of the work?
    - Have other activities that could disrupt the developers' time been taken
      into account, e.g.:
        - Conferences
        - Training
        - IT / hardware updates
        - Downtime (planned and unplanned)
        - Holidays
        - Sickness
    - Do the estimates include time for all development phases, as well as
      coding time, e.g.:
        - Research, planning, design
        - Assembling and setting up tests
        - Testing and debugging
        - End user testing
        - Refactoring/cleaning
        - Code review
        - Writing documentation
        - Merging and conflict resolution
        - Release, acceptance, authorisation meetings
        - Technical reports, presentations
    - Do the estimates account for time spent on other non-development
      activities, e.g.:
        - Team meetings, training, performance reviews, etc.
        - Other unrelated planned technical work involving the same people or
          infrastructure?
        - Unplanned technical work: user support, bug reports, etc.
    - Has additional time been added for 'unknown unknowns'?

Kahneman, D. and A. Tversky (1977): Intuitive prediction: biases and corrective
procedures. Decision Research, Technical Report PTR-1042-77-6.

Kahneman, D. (20??): Thinking, Fast and Slow.

Brooks, F.P. (1995): The Mythical Man-Month: Essays on Software Engineering,
Addison-Wesley.


