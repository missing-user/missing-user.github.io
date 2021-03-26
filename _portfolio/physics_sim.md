---
title: Spatial Hashing
date: 2020-04-19
image: "/physicssim-light.png"
image_dark: "/physicssim.png"
link: https://jurasic-park.de/physicsSim/
repository: https://github.com/missing-user/physicsSim/
images:
- "/images/physicssim.png"
- "/images/physicssim.webp"
- "/images/physicssim_dark.png"
- "/images/physicssim_dark.webp"

---
My attempt at implementing a spatial hashing algorithm for 2D physics. The algorithms uses circles, points and axis aligned rectangles as primitives and detects overlaps efficiently. Currently only simple spring forces are supported for the primitives. The solver is a semi implicit Euler implementation, so energy isn't perfectly conserved due to rounding errors