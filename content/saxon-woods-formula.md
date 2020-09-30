Title: Saxon-Woods formula
Date: 2016-09-25 22:34
Category:  
Modified: 2016-09-25 22:34
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: draft

For electromagnetic charge distribution of nuclei. Charge density, $\rho_z$ as
a function of radius, $r$:

$$ \rho_z\left(r\right) = \frac{\rho_0}{1 + \exp{\frac{r-a}{d}}} $$

where:

- $\rho_0$ is the charge density at $r = 0$, i.e. $\rho_0 =
  \rho_z\left(0\right)$
- $a$ is the nuclear radius, $r = r_0 A^{1/3}$ where $A$ is the mass number
  and $r_0 = 1.25 fm$ is a constant
- $d$ is a length representing the 'surface thickness' of the nucleus (typical
  value 0.5 fm)

# TODO: add figure generated by saxon-woods-formula-ploy.py 

Python code:

    # TODO: add full Python code here when complete, see
    #       ./saxon-woods-formula-ploy.py

    import numpy as np
    import matplotlib.pyplot as plt
    
    RHO_0 = 1
    SURFACE_THICKNESS = 1./3.
    DIAMETER = 1.

    radius = np.linspace(0, 1.5, 100)

    rho_z = RHO_0 / (1. + np.exp((radius - DIAMETER)/SURFACE_THICKNESS))

    plt.plot(radius, rho_z)
    plt.show()

