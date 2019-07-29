Title: GitGraph.js
Date: 2019-07-29 13:39
Category:  
Modified: 2019-07-29 13:39
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: published

The documentation is at [https://gitgraphjs.com](https://gitgraphjs.com).

## Installing GitGraph.js

The documentation recommends installation via:

    :::bash
    npm install @gitgraph/js

where `@gitgraph` (as opposed to just `gitgraph`) is v2 of the library.

However, usage directly in a web page via a CDN is also possible, to bypass
installation.

## Basic usage

The basic structure of the web page is given as:


    :::html
    <!DOCTYPE html>
    <html>
    <head>
      <!-- Load the JS file -->
      <script src="https://cdn.jsdelivr.net/npm/@gitgraph/js"></script>
    </head>
    <body>
      <!-- DOM element in which we'll mount our graph -->
      <div id="graph-container"></div>
    
      <!-- Use the `GitgraphJS` global variable to create your graph -->
      <script>
        // Get the graph container HTML element.
        const graphContainer = document.getElementById("graph-container");
    
        // Instantiate the graph.
        const gitgraph = GitgraphJS.createGitgraph(graphContainer);
    
        // Simulate git commands with Gitgraph API.
        const master = gitgraph.branch("master");
        master.commit("Initial commit");
    
        const develop = gitgraph.branch("develop");
        develop.commit("Add TypeScript");
    
        const aFeature = gitgraph.branch("a-feature");
        aFeature
          .commit("Make it work")
          .commit("Make it right")
          .commit("Make it fast");
    
        develop.merge(aFeature);
        develop.commit("Prepare v1");
    
        master.merge(develop).tag("v1.0.0");
      </script>
    </body>
    </html>

which renders as:

![Basic example of a GitGraph-generated image]({static}images/GitGraph_basic_example.png)

Note that random commit hashes are generated automatically when the page is
rendered, so when you refresh the page they change.

## Use in presentations rather than on web pages

For importing into presentations, the simplest way seems to be just to take a
screenshot, which is clunky but still beats drawing the graph by hand in
PowerPoint or Keynote. There's probably a way to capture screenshots
automatically using [Selenium](https://www.seleniumhq.org), which is the way
the Python plotting library [Bokeh](https://bokeh.pydata.org) seems to do it.

Another way would be use [reveal.js](https://revealjs.com) to generate the whole
presentation and then presumably the GitGraph JavaScript code can be wired into
the presentation directly. Reveal.js supports exporting as PDF if you want the
presentation as a file.

## Reveal.js basic usage

To create a reveal.js presentation, first get reveal.js itself. For authoring
presentations, [only a download is needed](https://github.com/hakimel/reveal.js#basic-setup):

    :::bash
    curl -Lo tmp.tar.gz https://github.com/hakimel/reveal.js/archive/3.8.0.tar.gz
    tar xzf tmp.tar.gz && rm tmp.tar.gz
    cd reveal.js-3.8.0

There is a template `index.html` which can be viewed directly in a browser:

    :::bash
    cp index.html test.html
    open test.html # On a Mac

or served by a web server:

    :::bash
    python3 -m http.server &
    open http://localhost:8000/test.html

## GitGraph.js code in a Reveal.js presentation

Getting the GitGraph.js image to render correctly is slightly convoluted, or at
least this way that I hacked around is; there might be better ways.

GitGraph.js uses a named `div` element:

    :::html
    <div id="graph-container"></div>

and then renders the graph in that node of the DOM using some JavaScript:

    :::html
    <script>
        const graphContainer = document.getElementById("graph-container");
        // Do stuff with graphContainer...
    </script>

If you just put the named `div` element inside one of reveal.js's
`<section>...</section>` constructs, which define slides, the graph doesn't
render. This has to be done explicitly.

Reveal provides a `data-state` attribute that can be added to a `section`
element, which causes an event to be triggered when the slide in question
comes up. An event listener can be added which listens for the value given to
the `data-state` attribute, and executes some action upon receiving it. The end
result of this is that some custom code can be executed when the slide in
question comes up. If the GitGraph code is encased inside a named function, the
custom action can be to call this function, and hence render the graph.

Note however that if the `data-state` attribute is added to the `section` element that actually
contains the graph, then the layout isn't right. This is because the `div`
element placement is determined _before_ the graph is rendered, while it is
still empty. To get round this, it is enough to add the `data-state` attribute
to the _first_ section, to ensure the graph is rendered before the slide
containing it comes up. Then the layout is correct. This will work as long as
the first slide doesn't contain the graph; in which case it might be possible to
add a hidden slide with the `data-state` attribute as the first slide, but I
didn't look into this.

So we have:

    :::html
    <!-- Main slide structure -->
	<div class="reveal">
	    <div class="slides">
            <section>
                Slide 1
            </section>
            <section data-state="gitgraph">
                Slide 2
                <!-- DOM element in which we'll mount our graph -->
                <div id="graph-container1"></div></p>
            </section>
        </div>
    </div>

and then the definition code for the graph we want to render:

    :::html
    <!-- Git Graphs -->
    <script>
        function drawGit1() {
            // Get the graph container HTML element.
            const graphContainer = document.getElementById("graph-container1");

            // Instantiate the graph.
            ...
        }
    </script>

which is the same as the example code in the GitGraph.js template index.html,
except enclosed in a function definition.

Finally, the initialisation step for the reveal presentation looks like this:

    :::html
    <script>
        // Existing initialisation step
	    Reveal.initialize({
		    dependencies: [
			    { src: 'plugin/markdown/marked.js' },
				{ src: 'plugin/markdown/markdown.js' },
				{ src: 'plugin/notes/notes.js', async: true },
				{ src: 'plugin/highlight/highlight.js', async: true }
			]
		});

        // Add the event listener
        Reveal.addEventListener('gitgraph', function() {
            drawGit1();
        }, false);
    </script>

To add multiple graphs, I just:

- added the additional containers `graph-container2`, `graph-container3`, ..., in the appropriate places in the slides
- created corresponding functions `drawGit2`, `drawGit3`, ..., in the same
  `<script>` block, and
- added calls to the new functions to the same event listener (that listens to the
  `data-state` value)

This means that the first slide sends an event that triggers the event listener
to render all the graphs.

A full example is at [https://gist.github.com/0x7df/10b3056efc997c502218b4a54f6f532b](https://gist.github.com/0x7df/10b3056efc997c502218b4a54f6f532b).

## PDF export

To
[export the reveal.js presentation to PDF](https://github.com/hakimel/reveal.js#pdf-export)
, it is necessary to serve it via a web server, and use the `?print-pdf` query
string; i.e.:

    :::bash
    python3 -m http.server 8080
    open http://localhost:8080/test.html?print-pdf

Then use the 'Save as PDF' destination in the browser's 'Print' menu. This only
works in Google Chrome and Chromium. The PDF export of the [example mentioned
above](https://gist.github.com/0x7df/10b3056efc997c502218b4a54f6f532b) is
[here]({attach}attachments/test_gitgraphjs_in_revealjs.pdf).
