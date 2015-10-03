Title: Static site generators - Pelican and Nikola
Date: 2015-10-03 20:06
Category: Review
Modified: 2015-10-03 20:06
Tags: pelican, publishing, blog, python
Slug: static-site-generators
Authors: 0x7df
Summary: Comparison of static site generators

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
