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
When implementing a numerical solver, it is often desirable to let the user pass their problem as an arbitrary callable function to your library. Unfortunately, the C++ compiler struggles with this, and often fails to Auto-Vectorize such functions, leaving precious performance on the table. 

This could be a function they want to integrate, a custom potential they want to simulate, or a force (e.g. to simulate non-standard interaction forces like in molecular simulations or when dealing with [modified Newtonian gravity](https://en.wikipedia.org/wiki/Modified_Newtonian_dynamics))

For my [many-body simulation](https://jurasic.dev/2023/barnes-hut-simulation/) I was also looking for a way to implement user defined force calculations, but without compromising performance. The user should be able to pass a function that takes in two bodies and returns the pairwise interaction force between them, e.g. due to gravity or electromagnetic repulsion.

Roughly speaking, a naive many-body code has this structure:

```cpp
for(int i=0; i<particles.size(); i++){
  double acceleration = 0.0;
  for(int j=0; j<particles.size(); j++){
    acceleration += pairwise_force(particles[i], particles[j]);
  }
}
```

Turns out that passing the `pairwise_force` using a `std::function<double(Particle, Particle)>` is a really bad idea, because it turns this into an entirely scalar loop, even if the same code was vectorizing perfectly fine when inlined. Since this was the hot-loop in my simulation, the resulting performance drop of 8-16x is completely unacceptable. 

[Quick Bench Link](https://quick-bench.com/q/06TMup5sU8Q81zAOkE6ge-sbupY)

[](https://quick-bench.com/q/06TMup5sU8Q81zAOkE6ge-sbupY)

![Quick Bench results of different ways to pass the function](/images/function_application_table.png)

But there is a really nice way to fix this issue! By making the argument `pairwise_force` of a template type instead of `std::function<double(Particle, Particle)>`, we force the compiler to inline the function. The result is a more readable, flexible implementation, where the user can pass their own force implementation, but at the performance level of a hardcoded routine.   

## Compiler Explorer

Looking at the compiled cssembly in [Compiler Explorer](https://godbolt.org/) reveals that the fast implementations were all successfully vectorized and use the `YMM` registers

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
