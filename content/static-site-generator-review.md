Title: Static site generation, Pelican, and GitHub hosting
Date: 2015-10-03 20:06
Category: Programming
Modified: 2015-10-03 20:06
Tags: pelican, publishing, blog, python, github, latex
Slug: static-site-generation
Author: 0x7df
Summary: Comparison of static site generators
Status: published

[wordpress]: http://www.wordpress.com
[pelican]: http://blog.getpelican.com

This post discusses moving setting up and using a static site generator,
[Pelican][], and moving existing posts from [Wordpress][] to Pelican.

Comparing and choosing a generator
----------------------------------

[octopress]: http://octopress.org
[jakevdp]:https://jakevdp.github.io/blog/2013/05/07/migrating-from-octopress-to-pelican
[hyde]: http://hyde.github.io 
[nikola]: https://getnikola.com
[stackoverflow]: http://stackoverflow.com
[quickstart]: http://docs.getpelican.com/en/stable/quickstart.html

Many options are available for static site generation, with
[Octopress][] being a popular choice. I was interested in a Python-
based one, [for reasons that have been discussed elsewhere][jakevdp], and the
usual options that come up are [Hyde][], [Nikola][], and
Pelican. [The article cited above][jakevdp] suggested Hyde wasn't
well documented, so I skipped that altogether in the interests of time. The
Nikola documentation looked great, so I started with that; however, I spent
quite a while trying to install it, eventually with no luck. I needed to
install some prerequisites, the installation took a long time, and I ended up
with some missing packages. I'm sure another hour of Googling
[StackOverflow][] and messing would have sorted it, but I lost
interest and moved on to Pelican; this [installed out of the box in a few
seconds][quickstart], and I was away.

Importing from Wordpress
------------------------

[mywp]: http://0x7df.wordpress.com

Importing from Wordpress just involves exporting the [original blog][mywp] as
an XML file, which can be done from the "WP Admin" menu under "Tools". Pelican
provides a command for importing from this file:

    pelican-import --wpfile -m markdown --dir-page [wordpress-filename].xml

The `--wpfile` flag specifies that the source is Wordpress (various
alternatives are available), the `-m` option specified that the output should
be Markdown (as opposed to reStructured Text), and `--dir-page` tells Pelican
to include the "Pages" from the Wordpress blog as well as the blog articles,
and put them in a `pages` directory.

Maths pain
----------

[render-math]: https://github.com/barrysteyn/pelican_plugin-render_math
[typogrify]: https://github.com/mintchaos/typogrify
[grep-sed-regex]: ({filename}/content/grep-regex-and-sed-inline-replace-on-multiple-files.md)

The original Wordpress articles that I imported contained a lot of maths, and
there was a significant amount of pain involved in converting the syntax used
by Wordpress to the syntax required by Pelican. in fact, Pelican doesn't
natively support maths, so a plugin is required: for this I used
[render-math][]. As per the docs, for this I needed to install
[Typogrify][] first, then add the following to the `pelicanconf.py`
settings file:

    PLUGIN_PATHS = [".."]
    PLUGINS = ["pelican_plugin-render_math"]

to point Pelican at the location where I cloned the plugin.

The text wrangling that was required to convert the Wordpress-syntax maths
delimiters:

    \$latex ...maths... \$latex

to those required for Pelican (i.e.:

    $$ ...maths... $$

for displayed equations and:

    $ ...math...$
    
for in-line equations), was both annoying and unnecessary in theory (since
both platforms are using LaTeX, dammit), and is the subject of [a different
post]({filename}grep-regex-and-sed-inline-replace-on-multiple-files.md). Once
done, I could move on to themes.

Pelican themes
--------------

[nest]: https://github.com/molivier/nest
[github]: http://github.com
[pelican-themes]: https://github.com/getpelican/pelican-themes

[This website](http://pelicanthemes.com/) shows examples of available themes, from
which I chose the [Nest][] theme; I cloned this directly into the Pelican
install directory:

    cd /usr/local/lib/python2.7/dist-packages/pelican/themes/
    sudo git clone https://github.com/molivier/nest.git 

(The `pelican-themes -lv` command can be used to determine the path to the
Pelican installation directory.)

(Afterwards I realised a [GitHub][] repository [pelican-themes][] containing
a large number of themes is available, making it a lot easier to switch while
looking for a good theme.)

Deployment to GitHub
--------------------

[aws]: http://aws.amazon.com/
[ghp]: https://pages.github.com/
[ghp-import]: https://github.com/davisp/ghp-import/
[peliblog]: http://martinbrochhaus.com/pelican2.html
[blogcomm]: http://martinbrochhaus.com/pelican2.html#comment-1819417669

Although I have a domain - [0x7df.io](http://0x7df.io) - and a website hosted
on [Amazon Web Services][aws], I wanted both to keep this separate to begin
with, and try out hosting on [GitHub Pages][ghp].

There are two ways to manage a website/blog on GitHub pages. The first is to
create a special branch, which has to be called `gh-pages` inside a repository;
the web documents committed on that branch then become available at:
`http://username.github.io/project/`. This is ideal for creating
project-specific sites, like documentation. The second method, which is what I
used, is to create a special repository, called `username.github.io` which
contains the web pages. These are then available at
`http://username.github.io/`; they're considered the general user or
organisation web pages, as opposed to being specific to any one project. In
this case, the data doesn't need to be on the `gh-pages` branch, but can be on
the more usual branch `master`.

I used the [ghp-import][] tool to do the uploading - this is used by the
Pelican `Makefile` and is recommended [elsewhere][peliblog]. I installed it
with:

    sudo apt-get install ghp-import

even though this isn't documented. As suggested [here][blogcomm], I added all
the content and tools to a
different branch called `source`, but it can be anything - to keep it
separate from the output, which I want to commit to the `master` branch. After
making changes to the content, running `make html` to re-build, checking on a
local development server that runs in the background (initiated by `python -m
pelican.server &` inside the `output` directory), then committing to the
`source` branch of my repository, I can just run `make github` to call
`ghp-import`. This commits the changes to the built website (in the `output`
directory) to branch `master`, and pushes the modified `master` branch to the
repository on GitHub. With this workflow there is never a need to explicitly
switch to `master` and do any commits - this is all handled by `ghp-import`.

If you're using the project-specific `gh-pages` branch, the `ghp-import` will
still do the job. It defaults actually to committing the built website to this
branch, and in my workflow requires the `-b master` switch to tell it to commit
to `master` instead. Note that the `-p` flag to `ghp-import` will handle the
push to GitHub, although in the Pelican Makefile this flag isn't used and the
push is a separate command.

Either way, it's worth being very clear that `ghp-import` treats the branch it
commits to - `gh-pages` by default or whatever branch you specify if the `-b`
flag is supplied - as *totally derivative*. Assume it blows away whatever is
already there and replaces it with the new content. So you never manually
modify anything on that branch; keep all your content, configuration files,
tools, and anything else you care about, on a different branch, and keep the
destination branch for `ghp-import` clean.
