---
layout: post
title: Galaxy Simulation
images: /images/spiral_galaxy.png
link: https://jurasic.dev/2023/barnes-hut-simulation/
repository: https://github.com/missing-user/barnes-hut
---
We wrote a simulator for celestial dynamics and the formation of galaxies using the Barnes-Hut algorithm for efficient computation of the gravitational forces. [Jimmy](https://instagram.com/j_adel__) and I wrote this as part of a [university course](https://www.tum.de/en/studies/degree-programs/detail/computational-science-and-engineering-cse-master-of-science-msc).

The following demo was compiled to WebAssembly using Emscripten, but is otherwise based on the same C++ code as the main project. It requires WebGL to run and is best viewed in a Desktop browser. 

{% include bh_visualizer.html %}

## What is this?

Space is cool, and as a physicist, I of course want to know how it works. In this project, let's play god and create our own galaxy. Simulating the attractive forces between celestial bodies is a typical [n-body problem](https://en.wikipedia.org/wiki/N-body_problem) that has a complexity of O(N^2). Luckily, algorithms like Barnes-hut lower the complexity to O(Nlog(N)), and [extensions of it even reach O(N)](https://en.wikipedia.org/wiki/Fast_multipole_method)

The Barnes-Hut algorithm is a hierarchical method that approximates the forces acting on each particle in a system, by approximating groups of far away particles as a single, heavy one. This allows us to simulate systems with thousands of particles, in real time.

The first step in the Barnes-Hut algorithm is to build a tree structure that divides the system into regions. This tree is constructed by recursively dividing the system into smaller sub-regions until each sub-region contains only a few particles. We use an octree, so each cuboid is divided into eight sub-segments per recursion. For a small system with just 100 particles, the tree looks like this:

![](/images/tree_100_particles.png "Octree with 100 Particles")

Once the tree structure is built, the algorithm can approximate the forces acting on each particle, by going down the tree and summing up the contributions from all other particles. 

As the algorithm traverses down the branches, it checks the distance between the particle it is calculating the force on and the sub-region it is currently at. If the distance is sufficiently large, the algorithm approximates the force on the particle using the mass and and position of the sub-region as a whole (this is known as multipole expansion). 

If the distance between the particle and the sub-region is not large enough, the algorithm continues to traverse down the tree, eventually reaching the leaf nodes. At this point, the algorithm degenerates into a regular brute-force computation and calculates the exact force on the particle due to all the other particles in the sub-region.

The Barnes-Hut algorithm is a highly efficient method for simulating the dynamics of galaxies. It can handle large numbers of particles with relative ease, and its hierarchical structure allows it to approximate forces with high accuracy while minimizing the number of calculations required. This makes it an ideal tool for studying the formation and evolution of galaxies, as well as other systems that exhibit complex gravitational interactions.

T﻿his project was created together with [Jimmy](https://instagram.com/j_adel__) as part of the advanced programming course in our [CSE masters degree](https://www.tum.de/en/studies/degree-programs/detail/computational-science-and-engineering-cse-master-of-science-msc). He creates some amazing generative art, so make sure to check him out!

## G﻿allery

Influence of the multipole rejection (theta) parameter in the Barnes-Hut algorithm. Yellow spheres are the centers of mass in the respective nodes, while points with which the pairwise force is computed directly are marked in red. The blue sphere is the point for which the force is computed.

[![Theta parameter visualization video](/images/thetaparameterscreenshot.png)](https://www.youtube.com/watch?v=zAYsITXAerE)
  

Visualization of how sorting the traversal order (indicated by the lines connecting different bodies) improves performance. Notice how the FPS immediately jump by 20% when the scene is Morton ordered:
[![Watch the video](https://img.youtube.com/vi/SRe4MOF6JOs/maxresdefault.jpg)](https://youtu.be/SRe4MOF6JOs)

Formation of star and galaxy clusters from an expanding uniform initial distribution, similiar to the big-bang: 
![](/images/bigbang_clustering.png)
The following image will redirect you to YouTube:
[![Watch the video](https://img.youtube.com/vi/K-4VUi-bIeo/maxresdefault.jpg)](https://youtu.be/K-4VUi-bIeo)
The same principle can be used to simulate  other n-body problems, like the ones that arise in molecular dynamics. In fact, the only thing that needs to be changed is the interaction potential, e.g. by replacing the gravitational potential with a [Lennard Jones](https://en.wikipedia.org/wiki/Lennard-Jones_potential) interaction. At first the particles behave like a gas, but if we "cool down" the substance by continuously removing energy, the particles settle into an energetic equilibrium after a while, forming a "crystal lattice". This form of idealized matter is often called Lennard Jones fluid.

![](/images/hexagonal_structure.png)
