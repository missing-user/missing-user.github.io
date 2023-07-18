# Personal website

My little web dev playground... Have you been wondering what kinds of projects I've been building lately?
Fear no more! Just check out [the website](https://missing-user.github.io) and you'll be up to date!

Everything is written in plain JS, CSS & HTML, and should have no dependencies except for the font.
The Website is mostly written from scratch, using plain CSS and HTML for the skelleton. It then get's populated with Markdown content by the static site generator. As a basis for my CSS I stripped down [Barebones CSS](https://acahir.github.io/Barebones/), to 11 kB (2.4 kB compressed), which implements a the classic 12col layout using modern CSS grid and basic theming with CSS variables. 

I'm using Jekyll as the static site generator, which automatically runs as a github action on commit. For a more comfortable editing experience, I use [Decap CMS](https://decapcms.org/), which has a small footprint and rich text editing for the underlying Markdown files. 

## Local development

To setup the local environment run `bundle` and then `bundle exec jekyll serve`.
