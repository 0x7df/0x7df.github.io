Title: Viterbi algorithm
Date: 2016-09-25 22:34
Category:  
Modified: 2016-09-25 22:34
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: draft

For hidden Markov models (HMMs).

For a sentence of length $n$, define $S_k$ for $k = -1, 0, ..., n$ to be the
set of tags at position $k$. If the sentence is `the dog barks' then $S_{-1} =
S{0} = {*}$, and $S_k = S$ for $k = 1, 2, ..., n$. For simplicity, let $S = {D,
N, V, P}, so we have:

<table>
    <tr> <td>$k$: </td><td>-1</td><td>0</td><td>1</td>                     <td>2</td>                     <td>3</td> </tr>
    <tr> <td>$S_k$</td><td>* </td><td>*</td><td>D<br />N<br />V<br />P</td><td>D<br />N<br />V<br />P</td><td>D<br />N<br />V<br />P</td> </tr>
    <tr> <td>     </td><td>  </td><td> </td><td>the</td>                   <td>dog</td>                   <td>barks</td> </tr>
</table>

Now, for a given $k$, we define:

\[
    r\left(y_{-1},y_0,...,y_k\right)
    = \Pi_{i=1}^k q\left(y_i|y_{i-2},y_{i-1}\right)
      \Pi_{i=1}^k e(x_i|y_i\right)
