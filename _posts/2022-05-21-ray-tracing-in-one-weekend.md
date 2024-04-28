---
layout: post
title: Ray Tracing
images:
  - /images/raytracing.png
  - /images/raytracing.webp
link: https://github.com/missing-user/RaytracingWeekend
repository: https://github.com/missing-user/RaytracingWeekend
---
I finally took the time to follow the [Ray Tracing in One Weekend](https://raytracing.github.io/books/RayTracingInOneWeekend.html) book series with my friends. We also added multithreading, GUI and dispersion, as well as some optimizations.

Ever since I started playing around with the 3D software [Blender](https://www.blender.org/) in high school, I was fascinated by light transport simulations. Especially ray tracing, often hailed as the gold standard in rendering, is the algorithm behind a lot of stunningly realistic images in movies, video games, and even scientific visualizations. And what better way to learn about their inner workings than to implement one yourself? So I rolled up my virtual sleeves and embarked on a guided journey with Peter Shirley's excellent book series [Ray Tracing in One Weekend](https://raytracing.github.io/books/RayTracingInOneWeekend.html).

## What is Ray tracing

In its essence, a ray tracer mimics the behavior of light rays as they travel through the world, just in reverse. Imagine you're standing in a virtual world, surrounded by objects. To create an image of this scene, the ray tracer shoots rays from your viewpoint (the camera) into the scene. These rays bounce around, interacting with objects, and eventually reach a light source. Along the way, they gather information about the color, texture, and lighting of the objects they encounter. This process is repeated for every pixel in the image, resulting in a photo realistic representation of the scene.

![](https://raw.githubusercontent.com/missing-user/RaytracingWeekend/gui/Image_Outputs/metal_and_diffuse.png)

Reference image of 3 spheres made from different materials

![emission demo](https://raw.githubusercontent.com/missing-user/RaytracingWeekend/gui/Image_Outputs/only_emissive.png)

After finishing the base ray tracer, which includes sphere, cube and triangle as the shape primitives with diffuse, specular, metal for the materials, I wanted to get more realistic.

![](https://raw.githubusercontent.com/missing-user/RaytracingWeekend/gui/Image_Outputs/concentric_spheres.png)

Programmatically generated scene with concentric glass spheres.

## Dispersion

Ever since Pink Floyd invented prisms in their iconic publication "The Dark Side of the Moon", humans were fascinated by dispersion and the pretty lights it produces.
![pink floyd prism poster dark side of the moon](/images/Dark_Side_of_the_Moon.png) 

Dispersion means that different wavelengths of light bend by varying degrees, when passing through a medium. The dispersion relation is a material specific property, and not all exhibit it to the same degree (that's why diamons sparkle in so many colors and glass shards do not). To simulate it correctly, I needed to include [spectral information in the rendering](https://pbr-book.org/3ed-2018/Color_and_Radiometry/Spectral_Representation). Each traced ray now also has a wavelength associated with it, which is used when computing the dispersion and converted back to a color when writing the pixel.

![dispersion demo](https://raw.githubusercontent.com/missing-user/RaytracingWeekend/gui/Image_Outputs/emissive_dispersive.png)

Dispersion is visible at the edges of the glass spheres (rainbow colored edges)

![](https://raw.githubusercontent.com/missing-user/RaytracingWeekend/gui/Image_Outputs/monkey_caustics.png)
Caustics and dispersion from a sphere light through a triangle mesh.  

The inclusion of spectral information immediately makes the rendering much slower, since we now don't just need one ray to estimate the color of a point, but have to average over many wavelengths instead. Since this is just unnecessary work when no dispersion is present, I added an optimization. Rays start out with color information, and only switch to a spectral representation when dispersed (i.e. they pass through glass). In reality, all materials have some sort of dispersion relation, but the ray tracer only simulates it for dielectric materials, where it is most noticeable. Coloring all light rays that traveled through glass in green for debugging purposes produces the following image (green pixels rays were split into multiple wavelengths and are hence significantly more expensive to calculate. Debug image is the same scene as above).
![which rays travelled through glass](https://raw.githubusercontent.com/missing-user/RaytracingWeekend/gui/Image_Outputs/debug_efficient_dispersion.png)

### Black-body Radiation

This also means, that the light sources suddenly don't just need a color, but an emission spectrum as well! Any hot body (like the sun, or a classical light bulb) will approximately emit a so-called black body spectrum, due to the motion of its atoms. By sampling our wavelengths from this distribution, we can realistically simulate the color of black body radiation at different temperatures!

![](https://raw.githubusercontent.com/missing-user/RaytracingWeekend/gui/Image_Outputs/planck_2000K.png "2000K blackbody radiation")

2000K blackbody radiation

![](https://raw.githubusercontent.com/missing-user/RaytracingWeekend/gui/Image_Outputs/planck_4500K.png "4500K blackbody radiation")

4500K blackbody radiation

![](https://raw.githubusercontent.com/missing-user/RaytracingWeekend/gui/Image_Outputs/planck_8000K.png "8000K black body radiation")

8000K black body radiation

![](https://raw.githubusercontent.com/missing-user/RaytracingWeekend/gui/Image_Outputs/temperature_gradient.png "Image produced by changing the temperature of the light source during the render")

Image produced by changing the temperature of the light source during the render

### Per-Pixel Variance Estimation

By implementing per-pixel variance estimation, I introduced an optimization that significantly speeds up rendering while maintaining visual quality. This technique allows the renderer to exit early if the noise in a pixel falls below a certain threshold, focusing computational resources where they're most needed.

![](https://raw.githubusercontent.com/missing-user/RaytracingWeekend/gui/Image_Outputs/sameTimeAdaptive.png)
![](https://raw.githubusercontent.com/missing-user/RaytracingWeekend/gui/Image_Outputs/1000adaptive.png)
![](https://raw.githubusercontent.com/missing-user/RaytracingWeekend/gui/Image_Outputs/samplecounts200.png)

These three images show the effect of adaptive sampling. The first image is rendered with a constant number of samples per pixel and the second with adaptive sampling. Although the second image has the same total numer of samples as the first one, it has less visible noise (especially on the diffuse areas around the light and in shadows). The third image (black and white) shows which areas were sampled more often. The adaptive sampling algorithm estimates the variance of each pixel at runtime and decides whether to continue sampling or not.

## Gallery

![](https://raw.githubusercontent.com/missing-user/RaytracingWeekend/gui/Image_Outputs/spectrum_rgb.png)

Rainbow produces by interpolating RGB looks unnatural and would not produce realistic dispersion.

![](https://raw.githubusercontent.com/missing-user/RaytracingWeekend/gui/Image_Outputs/spectrum_xyz.png)

Rainbow produced by simulating the intensity of different wavelengths using the planck spectrum. The wavelengths are convoluted by the sensitivity spectrum of our eyes receptors to get the color we would see. This produces a realistic spectrum image and much better dispersion.

![multithreading artifacts](https://raw.githubusercontent.com/missing-user/RaytracingWeekend/gui/Image_Outputs/cursed_memory.png)

Artifacts caused by race conditions between multiple threads which try to write into the image array.

![](https://raw.githubusercontent.com/missing-user/RaytracingWeekend/gui/Image_Outputs/obj_susan_test_inverted.png)

Testing OBJ file loading 

![](https://raw.githubusercontent.com/missing-user/RaytracingWeekend/gui/Image_Outputs/dispersion_rgb.png)

Simplified RGB dispersion model, debug image

![](https://raw.githubusercontent.com/missing-user/RaytracingWeekend/gui/Image_Outputs/metal_and_diffuse_cross.png)

What happens if we apply a cross product instead of a dot product to the normals?

![](https://raw.githubusercontent.com/missing-user/RaytracingWeekend/gui/Image_Outputs/bvh_traversal_cost.png)

Debug view showing the BVH traversal cost, when splitting on the longest axis. Red is expensive, blue is cheap.
