import numpy as np
import matplotlib.pyplot as plt

RHO_0 = 1
SURFACE_THICKNESS = 1./10.
RADIUS = 1.

z = np.linspace(0, 1.5, 100)

rho_z = RHO_0 / (1. + np.exp((z - RADIUS)/SURFACE_THICKNESS))

dleft  = RADIUS - 0.5*SURFACE_THICKNESS
dright = RADIUS + 0.5*SURFACE_THICKNESS

plt.plot(z, rho_z)
plt.plot([dleft,  dleft], [0., 1.1], linestyle=':', color='black')
plt.plot([dright, dright],[0., 1.1], linestyle=':', color='black')
plt.ylabel('\\rho_z/\\rho_0')
plt.xlabel('z/a')
# TODO: annotate dotted lines: a-d/2 and a+d/2

plt.show()

