Title: Setting up pelican for my blog
Date: 2016-09-26 17:43
Category:  
Modified: 2016-09-26 17:43
Tags: linux, markdown, pelican, programming, publishing, python
Slug: 
Author: 0x7df
Summary: 
Status: published

1. Install pelican and its prerequisites:

        pip install markdown
        pip install pelican

1. Clone the "nest" theme somewhere:

        cd ~/Perm/Pelican
        git clone https://github.com/molivier/nest.git

1. Install the "nest" theme:

        pelican-themes --install ~/Perm/Pelican/nest --verbose

1. Install the "render_math" plugin and its prerequisites:

        pip install typogrify
        pip install beautifulsoup4
        cd ~/Perm/Pelican
        git clone --recursive https://github.com/getpelican/pelican-plugins

1. Add the location of the "render_math" plugin to the settings file. Ensure the
   following lines are in the "pelicanconf.py" file:

        PLUGIN_PATHS = ["/full/path/to/Perm/Pelican/pelican-plugins"]
        PLUGINS = ["render_math"]
   (Note that on a Mac OS X system, "~/Perm/Pelican..." didn't work.)

1. Clone the site repository:

        cd ~/Code
        git clone https://github.com/0x7df/0x7df.github.io.git

1. Enter the repository:

        cd 0x7df.github.io

1. Switch to the "source" branch (never use the "master" branch, as it is
   purely derivative and gets over-written whenever the static site is built
   from source):

        git checkout source

1. Build locally:

        make html

1. View local build:

        cd output
        python -m SimpleHTTPServer

    and go to [http://localhost:8000](http://localhost:8000).

1. Install ghp-import:

        git clone https://github.com/davisp/ghp-import.git

