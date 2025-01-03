---
layout: post
title: C++ Functions as Arguments
images:
  - /images/carbon_light.png
  - /images/carbon_dark.png
link: https://quick-bench.com/q/1uCnfwnH8nvIXB_ncuU_KDT1Cxc
repository: https://gist.github.com/missing-user/3114bacb98bc035156ec362c6b73251c
mathjax: false
---
When implementing a numerical solver, we often want the user to pass their problem as an arbitrary callable function to your library. Unfortunately, C++ compilers usually fail to auto-vectorize such functions when they are in another source file, leaving precious performance on the table. Using templates, we can fix this.

To give a slightly more concrete example, let's imagine we wrote some integration routines and want the argument to these routines to be the user function. How should the call signature look? Should it be an `std::function`? A function pointer? Something else entirely? Does it even matter? 

Unfortunately it does. For my [many-body simulation](https://jurasic.dev/2023/barnes-hut-simulation/) I was facing this exact situation when looking for a way to implement user defined force calculations. The user should be able to pass a function that takes in two bodies and returns the pairwise interaction force between them, e.g. due to gravity or electromagnetic repulsion.

Roughly speaking, a naive many-body code has this structure:

```cpp
for(int i=0; i<particles.size(); i++){
  float acceleration = 0.0;
  for(int j=0; j<particles.size(); j++){
    acceleration += pairwise_force(particles[i], particles[j]);
  }
}
```

When refactoring from a hard coded force calculation to `pairwise_force` using a `std::function<double(Particle, Particle)>`, I immediately noticed a slowdown of 8-16x. Suspicious - that's right around the vector length using AVX2 and single precision (256bit / 32bit = 8). Turns out, both Intel and GCC keep this as an entirely scalar loop, even if the same code was vectorizing perfectly fine before. 

This is the case, even when both definitions are in the same translation unit. Passing a function pointer causes the same problem. 

The solution is surprisingly simple! By making the argument `pairwise_force` of a template type instead of `std::function<double(Particle, Particle)>`, we force the compiler to inline the function. The result is a more readable, flexible implementation, where the user can pass their own force implementation (e.g. as a lambda function), without compromising runtime performance. 

[Quick Bench Link](https://quick-bench.com/q/06TMup5sU8Q81zAOkE6ge-sbupY)[](https://quick-bench.com/q/06TMup5sU8Q81zAOkE6ge-sbupY)

![Quick Bench results of different ways to pass the function](/images/function_application_table.png)



## Compiler Explorer

Looking at the compiled assembly in [Compiler Explorer](https://godbolt.org/) reveals that the fast implementations were all successfully vectorized and use the `YMM` registers

```
.L21:
    vmulpd  ymm0, ymm1, YMMWORD PTR [rbx+rax]
    vmovupd YMMWORD PTR [rdx+rax], ymm0
```

<https://godbolt.org/z/zexbh1vTs>

while the `std::function` implementation is stuck with `XMM` registers, that only hold one `QWORD` (64bit double)

```
std::_Function_handler<double (double, double), main::{lambda(double, double)#1}>::_M_invoke(std::_Any_data const&, double&&, double&&):
        vmovsd  xmm0, QWORD PTR [rsi]
        vmulsd  xmm0, xmm0, QWORD PTR [rdx]
```

<https://godbolt.org/z/afGo1o1f1>

## References

* During my investigation I came across [this great benchmark](https://quick-bench.com/q/ZOCYEdFoOkuYa0og6BngFh0nj00) comparing different ways of passing function, that is applied to a vector of elements. 
* Thanks for the helpful input by [Fabio Gratl](https://www.cs.cit.tum.de/en/sccs/people/fabio-gratl/), developer of the amazing [AutoPas library](https://github.com/AutoPas/AutoPas).
