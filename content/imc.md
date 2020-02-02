Title: imc
Date: 2018-07-20 20:30
Category:  
Modified: 2018-07-20 20:30
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: draft

u_m = c_v RT (mol^-1)

u_m = c_v RT / M_m (g^-1)

u_m = c_v RT\rho / M_m (cm^-3)

u_m = bT

Therefore b = c_v R\rho / M_m

a = 4\sigma / c

\sigma = ac / 4

B = \sigma T^4 / \pi

  = acT^4 / 4\pi

a = 8\pi^5k^4 / 15c^3h^3

\sigma = 2\pi^5k^4 / 15c^2h^3

a = 4\sigma / c

B(T) = P(T) / A = \sigma T^4 = acT^4 / 4

                      ^
                      |
                Get this from
                integrating Planck's
                Law for black-body
                radiation

\sigma(\nu,T) = [2h\nu^3 / c^2 ] / [exp(h\nu / kT) - 1]

Planck distribution
-------------------

B(\nu, T) = [2h\nu^3 / c^2] (exp(h\nu / T) - 1)^-1

int_0^\infty B(\nu, T) d\nu = acT^4 / 4\pi

\sigma_a(\nu,T) = [ \gamma_a / (h\nu)^3 ] (1 - exp(-h\nu / T))    --- in FC71

D == \gamma / h^3

\sigma_p (T) = \int B(\nu,T)\sigma_a(\nu,T)d\nu / \int B(\nu,T)d\nu

             = \int (2h\nu^3 / c^2) (\gamma / (h\nu)^3) ((1-exp(-h\nu / T)) / (exp(h\nu / T) - 1)) d\nu
               ---------------------------------------------------------------------------------------
                                                   (ac / 4\pi) T^4


             = (2h\gamma 4\pi / c^2h^3acT^4) \int (1-exp(-h\nu/T)) / (exp(h\nu/T) - 1) d\nu

             = (8\gamma\pi / ac^3h^2T^4) \int ... d\nu

a = 8\pi^5 / 15c^3h^3

             = (8\gamma\pi 15 c^3 h^3 / 8 \pi^5 c^3 h^2 T^4) \int ... d\nu

             
