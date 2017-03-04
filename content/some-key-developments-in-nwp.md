Title: Some key developments in NWP
Date: 2017-02-27 16:28
Category:  
Modified: 2017-02-27 16:28
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: draft

- Two early models for medium-range:
    - The UCLA model (Mintz and Arakawa)
    - The GFDL (Geophysical Fluid Dynamics Laboratory) model: Smagorinsky and
      Miyakoda

- In particular, Miyakoda, Hembree, Strickler and Shulman (1972) reported a
  set of two-week predictions made at GFDL, which showed skill beyond a week
  (although low beyond 3-4 days)

- The UK Met Office developed a 10-level, 100km-resolution, semi-implicit
  model under Fred Bushby

- ECMWF's original model was a finite-difference (grid-point) model:
    - Conserved potential enstrophy for non-divergent flow
    - Used the semi-implicit time-stepping scheme, which allowed an initial
      20-minute time-step rather than a 5-minute time-step which an explicit
      scheme would have required
    - Enabled 2-degree resolution
    - Arakawa C-grid (staggered grid), due to low 'computational noise' and
      ease of implementation of semi-implicit scheme
    - Sadourny (1975), following Arakawa (1966), describes a finite-difference
      scheme designed to conserve *potential enstrophy* during vorticity
      advection by the horizontal flow.
    - See also Burridge and Haseler (1977), Burridge (1979)
    - First version tested in 1977
    - By 1979-1980, forecasts were useful up to 5-6 days ahead

- Sadourny went to UCLA to study Mintz's model; Hollingsworth went to GFDL to
  study theirs. Both models were brought to ECMWF ad the first ECMWF Technical
  Report in 1976 described an inter-comparison of the two.

- The original ECMWF operational model had a choice of two physics packages:
    - The GFDL physics, which had been in use for 15 years so was robust and
      well-validated, but relatively crude
    - A new ECMWF physics package, which was more sophisticated but relatively
      untested
  Early experiments in 1978-1979 showed little difference, so the ECMWF
  physics package was selected.

- There was rapid development of spectral models around 1975, following a
  proposal put forward by Orszag (1970) and refined by Eliasen *et al.* (1970)
    - Several national meteorological services implemented operational
      spectral models
    - Although the first ECMWF operational model was a finite difference model,
      work began in 1976 on a spectral version and this was formulated even
      before the start of operations with the grid-point model
    - However the gri-point model was selected for initial operational use as
      there was pressure to get started, and there was relatively little
      experience with spectral methods
    - At ECMWF, Girard and Jarraud (1982) performed a comprehensive study
      demonstrating the superiority for comparable cost of a spectral model
      with triangular truncation
    - The ECMWF operational grid-point model was replaced with a spectral model
      at the beginning of 1983


