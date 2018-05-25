Title: OpenMP N
Date: 2018-05-17 20:41
Category:  
Modified: 2018-05-17 20:41
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: draft

- The overhead of creating OpenMP threads grows logarithmically with the numbe
  rof threads
- Makes decision about threads a binary one - is it worth parallelising or not;
  if so, overhead of extra threads gorws slowly.

- OpenMP has *internal control variables* that the programmer has access to.
  One such variable contains the number of threads that will be used in the
  *next* parallel region. The programmer can write as well as read this.


Scheduling

 - SCHEDULE(RUNTIME) allows the schedule to be chosen at run time through an
   environment variable; good for eperimentation (not prouction)
 
Critical region

 - CRITICAL is a global lock; if there were mutliple teams of threads in a
   nested parallel region, then still only one thread can be in the critical
   region (or any ciritcal region) 
