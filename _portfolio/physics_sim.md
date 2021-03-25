---
title: Spatial Hashing
image: /physicssim-light.png
image_dark: /physicssim.png
url: https://jurasic-park.de/physicsSim/
repository: https://github.com/missing-user/physicsSim/
---
My attempt at implementing a spatial hashing algorithm for 2D physics. The algorithms uses circles, points and axis aligned rectangles as primitives and detects overlaps efficiently. Currently only simple spring forces are supported for the primitives. The solver is a semi implicit Euler implementation, so energy isn't perfectly conserved due to rounding errors