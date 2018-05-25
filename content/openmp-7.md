Title: OpenMP 7
Date: 2018-05-20 11:16
Category:  
Modified: 2018-05-20 11:16
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: draft

# Work-sharing constructs

In a parallel region, all threads execute the same code.

Work-sahring directives indicate that work should be divided up between
threads, rather than replciated.

OpenMP has extensive support for parallelsing loops, since loops are the main
source of parallelism in many, particularl scientific, applications. There are
a number of options to control which iterations are executed by which thread.


<hr/>

- [OpenMP 1 (Overview, Implementaion)]({filename}openmp-1.md)
- [OpenMP 2 (Parallel regions, OpenMP functions)]({filename}openmp-2.md)
- [OpenMP 3 (OpenMP clauses)]({filename}openmp-3.md)
- [OpenMP 4 (Reductions)]({filename}openmp-4.md)
- [OpenMP 5 (Work-sharing constructs)]({filename}openmp-5.md)
- [OpenMP 6 (Synchronisation)]({filename}openmp-6.md)
- [OpenMP 7 ()]({filename}openmp-7.md)

<hr/>

These notes are built on the "Hands-on Introduction to OpenMP" tutorial given at the UK OpenMP Users' Conference.

This work is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.

[http://creativecommons.org/licenses/by-nc-sa/4.0/deed.en_US](http://creativecommons.org/licenses/by-nc-sa/4.0/deed.en_US)

This means you are free to copy and redistribute the material and adapt and build on the
material under the following terms: you must give appropriate credit, provide a link to the license and indicate if changes were made. If you adapt or build on the material you must distribute your work under the same license as the original.
