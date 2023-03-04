---
layout: post
title: Barnes-Hut Simulation
images: /images/spiral_galaxy.png
link: https://github.com/missing-user/barnes-hut
repository: https://github.com/missing-user/barnes-hut
---
Simulating a galaxy using the Barnes-Hut algorithm is an exciting way to explore the dynamics of celestial bodies and the formation of galaxies. It allows us to observe the evolution of our galaxy over time and gain insights into the complex gravitational interactions that govern the universe.

Space is cool, and as a physicist, I of course want to know how it works. In this project, let's play god and create our own galaxy. Simulating the attractive forces between celestial bodies is a typical [n-body problem](https://en.wikipedia.org/wiki/N-body_problem) that has a complexity of O(N^2). Luckily, algorithms like Barnes-hut lower the complexity to O(Nlog(N)), and [extensions of it even reach O(N)](https://en.wikipedia.org/wiki/Fast_multipole_method)

The Barnes-Hut algorithm is a hierarchical method that approximates the forces acting on each particle in a system, by approximating groups of far away particles as a single, heavy one. This allows us to simulate systems with thousands of particles, in real time.

The first step in the Barnes-Hut algorithm is to build a tree structure that divides the system into regions. This tree is constructed by recursively dividing the system into smaller sub-regions until each sub-region contains only a few particles. We use an octree, so each cuboid is divided into eight sub-segments per recursion. For a small system with just 100 particles, the tree looks like this:

![](/images/tree_100_particles.png "Octree with 100 Particles")

Once the tree structure is built, the algorithm can approximate the forces acting on each particle, by going down the tree and summing up the contributions from all other particles. 

As the algorithm traverses down the branches, it checks the distance between the particle it is calculating the force on and the sub-region it is currently at. If the distance is sufficiently large, the algorithm approximates the force on the particle using the mass and and position of the sub-region as a whole (this is known as multipole expansion). 

If the distance between the particle and the sub-region is not large enough, the algorithm continues to traverse down the tree, eventually reaching the leaf nodes. At this point, the algorithm degenerates into a regular brute-force computation and calculates the exact force on the particle due to all the other particles in the sub-region.

The Barnes-Hut algorithm is a highly efficient method for simulating the dynamics of galaxies. It can handle large numbers of particles with relative ease, and its hierarchical structure allows it to approximate forces with high accuracy while minimizing the number of calculations required. This makes it an ideal tool for studying the formation and evolution of galaxies, as well as other systems that exhibit complex gravitational interactions.