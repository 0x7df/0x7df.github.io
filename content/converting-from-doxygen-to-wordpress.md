Title: Converting from Doxygen to WordPress
Date: 2015-03-29 19:27
Author: 0x7df
Category: Programming
Tags: doxygen, latex, markdown, python, regular expressions, text processing, wordpress
Slug: converting-from-doxygen-to-wordpress
Status: published

Overview
--------

I write code documentation in [Doxygen](www.doxygen.org/), and in some
cases include a fair amount of information about the mathematical theory
of the problem that the code is solving. It seemed worthwhile posting
the same content on [Wordpress](https://wordpress.com). However, the
syntax isn't 100% interchangeable, despite both applications supporting
[Markdown](http://daringfireball.net/projects/markdown/). This is mainly
because Doxygen extends Markdown by providing [a large range of special
commands](http://www.stack.nl/~dimitri/doxygen/manual/commands.html),
which begin with a `/` or a `@`.

The bulk of the changes that need to be made are to the equations.
Doxygen and WordPress both allow 
[![\\LaTeX](https://s0.wp.com/latex.php?latex=%5CLaTeX&fg=000 "\LaTeX")](http://www.latex.org)
equations; Doxygen by actually
calling ![\\LaTeX](https://s0.wp.com/latex.php?latex=%5CLaTeX&fg=000 "\LaTeX")
to generate
[PNG](en.wikipedia.org/wiki/Portable_Network_Graphics)-format images
which it embeds in the [HTML](www.w3schools.com/html/)files that it
generates, and WordPress by using one of [various
plug-ins](https://wordpress.org/plugins/search.php?q=latex) (see
documentation [here](https://en.support.wordpress.com/latex/)). However,
while the code for the actual equation is identical in both, being
standard
[amsmath](http://www.ams.org/publications/authors/tex/amsmath)-style
[![\\LaTeX](https://s0.wp.com/latex.php?latex=%5CLaTeX&fg=000 "\LaTeX")](http://www.latex.org),
the delimiters that identify it as maths and separate it from the body
of the text are different. References also need to be handled
differently.

[caption id="" align="alignright" width="404"]![xkcd:
Automation](http://imgs.xkcd.com/comics/automation.png) xkcd: Automation
- http://imgs.xkcd.com/comics/automation.png[/caption]

Rather than do the conversion by hand, I knocked up a simple
[Python](http://python.org) script to do it (and in doing so risked
falling into the trap of spending more time writing code to automate the
task than I would have spent doing it manually) using simple [regular
expressions](www.regular-expressions.info/) in some cases. This post
describes how the script works, so along the way we'll learn a bit of
Python, something about regular expressions, and a bit about Doxygen and
WordPress syntax.

Let's jump straight in. The script is called from the command line:

[code lang="bash"]

> python dox2wp.py /path/to/doxygen/data/example.md

[/code]

The script is called `dox2wp.py`, and we've passed the full path to a
Doxygen Markdown file called `example.md` as an argument to the Python
script.

Main script
-----------

The first part of the script looks like this:

[code lang="python"]  
if __name__ == "__main__":

args = sys.argv[1:]

reffile = '/default/path/to/references.md'

for arg in args:  
errmsg = processdox(arg,reffile)  
for msg in errmsg:  
print msg  
[/code]

The first line - `if __name__ == "__main__":` - is a fairly standard
Python construct that checks that the module being executed has been
called from the command-line or interpreter directly, and not by some
other Python module or function. [This
answer](http://stackoverflow.com/a/419185/3832350) on
[StackOverflow](http://stackoverflow.com)gives more details. The next
line retrieves the arguments that were passed in to the Python script
using the `sys` module's `argv` function  (this assumes `sys` has been
imported using `import sys` somewhere prior to this statement; usually
at the very top of the file). The `argv` function returns the arguments
as a list; the zeroth element corresponds to the name of the script, so
we ignore that and just get elements 1 through to the end of the list
and store them in a new list called `args`. You can find documentation
for the `sys` module [here](https://docs.python.org/2/library/sys.html).

Next we define a hard-wired path to a file, which we'll come back to
later.

The next chunk of code is where the main business happens. We loop over
all the items in `args`, each of which is assumed to be a Markdown file
we want to process. For each, we call the function `processdox`, passing
in both the path to the file, and the hard-wired path mentioned above.
The `processdox` function returns a list of error messages, which we
bind to the variable `errmsg`. The last action in this script is to loop
over the error messages returned by the processing function, and print
them to the screen.

Function \`processdox\`
-----------------------

The body of the `processdox` function is given below:

[code lang="python"]  
def processdox(filename,reffile):

errmsg = checkfile(filename)

if len(errmsg) == 0:  
processfile(filename,reffile=reffile)

return errmsg  
[/code]

The first line is the function definition, which also specifies the
arguments that function accepts: `filename` and `reffile`. Then, two
functions are called: the first, `checkfile`, does some error-checking,
and the second, `processfile`, does the main work - but only if the
length of the list `errmsg` is zero (i.e. it contains no data, which is
a way of checking that `checkfile` didn't return any error messages).

Error checking
--------------

Let's see the file-checking function `checkfile` next:

[code lang="python"]  
def checkfile(filename):

errmsg = []

filebase, fileext = os.path.splitext(filename)

if fileext != '.md':  
errmsg.append(filename+' is not Markdown')

if not os.path.isfile(filename):  
errmsg.append(filename+' does not exist or is  
not a file')

return errmsg  
[/code]

This first declares the `errmsg` variable as an empty list, and then
uses the standard `os.path` module's `splitext` function, which returns
the file's extension, and everything up to that extension (as a tuple),
which we write into `fileext` and `filebase`. Doing this allows us to
check easily that the file extension is `.md`. The next check is that
the filename given refers to something that exists and is a file (e.g.
as opposed to a directory), using the `isfile()` function. Documentation
for `os.path` can be found
[here](https://docs.python.org/2/library/os.path.html#module-os.path).

Notice that all we do on finding an error is to append an error message
to the previously defined list, using `errmsg.append()`. The reason for
this is that, although it scarcely matters for this almost trivial
application, I find it good practice to let a piece of code go on for as
long as it can after encountering errors, because there may be further
errors that will get picked up subsequently. If it stopped immediately,
the user would fix that error, and start it again, whereupon the next
error encountered would cause it to bail out again. For software with
complicated input this could go on for a long time and cause a lot of
frustration. The behaviour here, however, is to keep going and identify
as many errors as possible before stopping, so we minimise the number of
iterations the user will have to go through to fix everything.

For example, if we call:

[code lang="bash"]  
> python dox2wp.py isnotmarkdown.txt doesnotexist.md \\  
> existsbutisafolder.md realmarkdown.md  
[/code]

then we get:

[code]  
isnotmarkdown.txt is not Markdown  
doesnotexist.md does not exist or is not a file  
existsbutisafolder.md does not exist or is not a file  
[/code]

Note there's no error message referring to `realmarkdown.md`, which
meets the criteria and so is processed successfully.

It's important to understand that this isn't the same as being
fault-tolerant or trying to recover from the errors. In principle, as
soon as the user does something that doesn't seem to fit in with the way
a piece of code is intended to work, we should stop and let the user
know; trying to recover starts to get into the realm of making
assumptions about what the user wants. All we're doing here is
continuing to progress through the *error-checking* when an error is
encountered; as soon as one is, the actual processing is prevented by
the `if` statement around the call to `processfile`. We do allow the
application to continue to the next Markdown file if an error was
encountered previously, but since processing of each file is completely
independent, this seems safe enough.

Of course, all this is total overkill for what we're trying to do, but
is useful to illustrate the principles in a simple application.

The actual format conversion part
---------------------------------

### Preamble

Function `processfile` executes the real work. This is somewhat longer
so we'll deal with it in sections. It starts with:

[code lang="python"]  
def processfile(filename,reffile='references.md'):

fi = open(filename,'r')  
fo = open(filename+'.txt','w')  
fr = open(reffile,'r')  
[/code]

After the function definition, which like the previous one we saw
defines the input arguments `filename` and `reffile` (but with the
addition that the `reffile` variable defaults to `references.md` if no
argument is passed in), the next three lines open some files. `filename`
and `reffile` are opened as read-only (with some obvious error-checking
around `reffile` clearly missing). A new file called `reffile + '.txt'`
is opened as writeable, and this will contain the output; the filename
will be the same as the input but with `.txt` appended, e.g.
`example.md.txt` if the input was `example.md`.

The next stage is to define some regular expressions that will get used
later; we define them here rather than nearer to where they get used
because their use will be inside a loop, and there's no point
re-defining them every time the loop is executed, because they're always
the same.

[code lang="python"]  
p1 = re.compile('@f\\$[^@]*@f\\$')  
p2 = re.compile('@ref [^"]* "[^"]*"')  
[/code]

We'll come back to these when they're needed.

The final part of the pre-amble involved setting up a counter and an
empty list for the references, again which we'll come to when we need
them.

[code lang="python"]  
refnum = 1  
footnotes = []  
[/code]

In the next stage we enter the loop over individual lines in the input
file, which Python implements very simply as `for line in fi:`, with
`line` being the variable name into which each successive line is
placed, and `fi` just being the pointer to the opened text file.

The first text-processing operation is to replace < and > with their
HTML equivalents: `&lt;` and `&gt;`, respectively.

[code lang="python"]  
for line in fi:

\# Some of the later changes insert "<" and ">" so do  
\# these as early as possible  
line = line.replace('<','&lt;')  
line = line.replace('>','&gt;')  
[/code]

The reason for this is that, for this to work overall, the final output
needs to be copied and pasted into WordPress's HTML editor, rather than
the Visual editor. Consequently, there's a risk that any < and >
symbols appearing in mathematical formulae will get interpreted as
delimiters for an HTML tag. E.g. if:

$$ a < b$ and also $ b > c $$

appeared on a single line then the string:

$$ < b$ and also $ b > $$

would get interpreted as an HTML tag (and ignored as not recognised),
leaving:

$$ a c $$

I wasn't expecting this, at least not when the < and > symbols were
safely inside the correct `$latex` and `$` delimiters identifying them
as maths - but it happened, which seems like a flaw in the WordPress
parsing.

### Special commands

Subsequently, we remove some of the Doxygen special commands:

[code lang="python"]  
\# Remove the table of contents special command  
line = line.replace('\\\\tableofcontents','')

\# Replace the Doxygen special commands for sections  
\# with Markdown  
if '\\section' in line:  
fields = line.split()  
line = '\# ' + ' '.join(fields[2:])  
if '\\subsection' in line:  
fields = line.split()  
line = '\#\# ' + ' '.join(fields[2:])  
if '\\subsubsection' in line:  
fields = line.split()  
line = '\#\#\# ' + ' '.join(fields[2:])  
[/code]

The first special command is `\tableofcontents`, which appears on its
own and causes Doxygen to automatically insert a contents table into the
rendered page at that location. We strip this out by replacing it with
an empty string, using the `replace` string method.

Next are `\section`, `\subsection` and `\subsubsection`. Each of these
special commands is followed by two arguments: first an identifying tag,
which can then be used elsewhere in the Doxygen pages to create a link
to this section, followed by the actual title of the section, e.g.:

[code]  
\\subsection introdoxy Introduction to Doxygen  
[/code]

We don't care about the ID tag, but we want to keep the title and retain
it at the same location as the section title in the WordPress post. To
do this we split the line into a list of tokens, separated by
whitespace, using `line.split()`. The resulting list, in `fields`, would
look like this for the example above if we printed it out:

[code lang="python"]  
['\\\\subsection', 'introdoxy', 'Introduction', 'to', 'Doxygen']  
[/code]

The idea is to discard the first two elements and keep the rest, joining
them back together into a string, and stripping out the quotation marks.

[code]  
line = '\#\# ' + ' '.join(fields[2:])  
[/code]

Here the `string.join(list)` syntax in Python joins all the elements of
`list` together into a single string, using `string` as the delimiter.
Hence in our example, `' '.join(fields[2:])` would yield
`Introduction to Doxygen`, and we prepend `##` to this string to turn it
into standard Markdown format for a level 2 section header.

There's probably a more compact way to deal with the multiple cases
(i.e. `\section`, `\subsection`, etc.) involving counting how many times
the string `sub` appears and prepending the appropriate number of hashes
accordingly; but for only three cases, writing them out explicitly isn't
difficult, and leads to easier-to-understand code.

### References

The next section of code deals with references. In Doxygen, we insert
references into the main body of the text like this:

    @ref ref01 "Fick (1855)"

(or we could use `\ref` instead of `@ref`). Elsewhere, there would be a
references section - in this case in a separate file called
`references.md`, which is why we've previously seen that file being
hard-wired in the main script and then passed in to this function as an
argument. In the references section, there would be an entry like:

    -# \anchor ref01 Fick, A, 1855. On liquid diffusion. The London, Edinburgh, and Dublin Philosophical Magazine and Journal of Science, X, 30-39.

The initial `-#` is to create a numbered list, and the `\anchor ref01`
creates an anchor that the earlier `@ref ref01` syntax can link to. The
remainder is the text that appears in the references section.

What we want to do is replace the in-line reference with a link to a
footnote, and use the long reference text as the footnote.

For an individual references, the code that does this looks like this:

[code lang="python"]  
\# References

refidstr = 'fn'+str(refnum)  
refnum += 1

fields = istr.split()  
reftxt = " ".join(fields[2:]).strip('"')

ostr = '<a href="\#'+refidstr+'">'+reftxt+'</a>'  
line = line.replace(istr,ostr)

doxref = fields[1]  
for refline in fr:  
if doxref in refline:  
reffull = ' '.join(refline.strip().split()[3:])  
break  
footnotes.append('<a name="'+refidstr+'">'+reffull+'</a>')  
[/code]

Although you don't see it here, the Doxygen text containing the in-line
reference is contained in `istr` - we'll explain how it got there
shortly. The first thing we do is create a unique string for the anchor
that will be used as the ID for the footnote; i.e. if the anchor is
`fn1`, then the inline reference will be:

[code lang="html"]  
<a href="fn1">Fick (1855)</a>  
[/code]

and the footnote would be:

[code lang="html"]  
<a name="fn1">Fick, A, 1855. On liquid diffusion...</a>  
[/code]

We have previously set up a counter for the references we discover,
which was `refnum`, so the code `refidstr = 'fn'+str(refnum)` will
create `fn1` for the first reference, `fn2` for the second, etc. You can
see that `refnum` is incremented by 1 in the next line of the code
fragment above to ensure this.

Next, we want to extract the text for the in-line reference ("Fick
(1855)" in our example), for which we use the same kind of trick as we
did for the section headings. The only difference here is that we have
to add the `strip('"')` function to strip off the quotation marks.

At this point we have enough information to construct the new text for
the in-line reference:

[code lang="python"]  
ostr = '<a href="\#'+refidstr+'">'+reftxt+'</a>'  
[/code]

and replace the original string with the new one:

[code lang="python"]  
line = line.replace(istr,ostr)  
[/code]

There's one final job; we have to create the footnote and put it at the
bottom of the page. We'll store it in a list called `footnotes` in the
interim, and then write the list out after all the other processing has
been finished, so it appears in its proper place at the bottom of the
page.

[code lang="python"]  
doxref = fields[1]  
for refline in fr:  
if doxref in refline:  
reffull = ' '.join(refline.strip().split()[3:])  
break  
footnotes.append('<a name="'+refidstr+'">'+reffull+'</a>')  
[/code]

So what is this doing? We know the text that Doxygen is using - `ref01`
- in our example, because we can extract it from the second token of the
`istr` line (where the first token is just the `@ref` code). Then we
have to search line-by-line through the reference file, `fr`, until we
find a line that contains the string we're after - this will cause
`if doxref in refline` to return true. We know this is the right line,
so we can extract the long text of the reference into `reffull` using
the same `split` then `join` technique as we've seen before, starting at
the fourth token (the first three being `-#`, `\anchor` and `ref01`, all
of which we want to discard).

The real code, however, is a bit more complex; firstly because we need
to find the appropriate text strings in our Doxygen code before we can
format them (recall we haven't explained how `istr` gets defined yet),
and also because there might be more than one reference on one line, so
we have to deal with that. We do this via regular expressions, which
first requires that the Python `re` module is imported (documented
[here](https://docs.python.org/2/library/re.html)). Once it is, we can
compile a regular expression using the code we saw earlier but didn't
explain:

[code lang="python"]  
p2 = re.compile('@ref [^"]* "[^"]*"')  
[/code]

The regular expression is the bit inside the single quotes:

    @ref [^"]* "[^"]*"

and the `[`, `]`, `^` and `*` characters are special characters that
have particular meanings in the regular expression language. The caret,
`^`, is a `not` operator, so `^"` means not the quotation mark
character. Using `[ ]` defines a set of characters that are allowed, so
for example `[aeiou]` would match any vowel character. So `[^"]` means
any character from the set of characters that are not the quotation mark
`"`. Finally, the `*` character means match any number of whatever went
previously. Hence, for example, `a*` would match `a`, `aa`, `aaa`, etc.
Putting all this together, the regular expression `[^"]*`, which appears
twice, means match any string of any length that doesn't contain a
quotation mark. The reason we need to specify that the string shouldn't
contain quotation marks is that these are used as delimiters, to
surround the in-line text of the reference. If we could guarantee that
quotation marks would never appear elsewhere on the same line, it
wouldn't matter; but we can't.

Now we understand the regular expression syntax used, we need to
understand the rest of the line. Compiling the regular expression
creates a special regular expression object, which we've bound to `p2`,
and which can be used later. We do this by writing:

[code lang="python"]  
for item in p2.finditer(line):  
istr = item.group()  
[/code]

This calls the `finditer` method of the `p2` regular expression object
on the text string `line`, which returns an iterator of all the
instances where the pattern represented by `p2` was matched. We need to
do this because there could be more than one match in any given `line`.
The second line returns the actual matched text string from `item`,
using the `group` method, and puts it into `istr`. We now have the full
thing:

[code lang="python"]  
\# Loop over all matches against p2 in line  
for item in p2.finditer(line):

\# Extract the matched text  
istr = item.group()

\# Create the unique reference (and increment the counter for next
time)  
refidstr = 'fn'+str(refnum)  
refnum += 1

\# Get the in-line reference text  
fields = istr.split()  
reftxt = " ".join(fields[2:]).strip('"')

\# Construct the WordPress-format inline reference and  
\# replace the old Doxygen-format one  
ostr = '<a href="\#'+refidstr+'">'+reftxt+'</a>'  
line = line.replace(istr,ostr)

\# Get the full reference text to use as the footnote  
doxref = fields[1]  
fr.seek(0)  
for refline in fr:  
if doxref in refline:  
reffull = ' '.join(refline.strip().split()[3:])  
break  
footnotes.append('<a name="'+refidstr+'">'+reffull+'</a>')  
[/code]

The only additonal thing here that you haven't already seen is the
`fr.seek(0)` line, which rewinds the references file to the beginning
each time we do a search through it. It's common snafu in Python that
once you've done a `for line in file:`-type of construct, you can't just
do another one. The file pointer is left at the end, so the second time
round nothing will happen (and it's not an error).

### Maths

The final set of replacement operations we want to conduct is to replace
any Doxygen-style maths delimiters with the appropriate WordPress ones.
Doxygen allows several different kinds of delimiter. Firstly, in-line
equations can be included by surrounding them with `\f$` tags; e.g.:

`...the equation \f$ E = mc^2 \f$ is well-known...`

Alternatively, we can create a numbered equation on its own line by
using the opening delimiter `\f{equation}` and the closing delimiter
`\f}`. For example:

[code]  
\\f{equation}  
F = ma  
\\f}  
[/code]

Then finally, a non-numbered equation can be created on its own line by
using:

[code]  
\\f[  
a^2 + b^2 = c^2  
\\f]  
[/code]

In WordPress, there is only one way to embed mathematics, which is to
use the opening delimiter `$latex` followed by the closing delimiter
`$`. This is used whether we want the maths in-line or on its own line;
there's no support for equation numbering.

Replacing the second two types is trivial, because the opening and
closing delimiters are different, as they are for WordPress. Hence:

[code lang="python"]  
\# Replace the maths delimiters  
line = line.replace('\\\\f{equation}','$')  
line = line.replace('\\\\f[','$')  
line = line.replace('\\\\f}','$')  
line = line.replace('\\\\f]','$')  
[/code]

does the trick nicely. Note we add an extra `\` to protect the `\` that
appears in the string we want to match. Without this, the `\f` would be
interpreted as the form-feed escape sequence.

For the in-line equations it's slightly more complex, because the start
and end delimiter in Doxygen are the same, but we need to replace them
with different start and end delimiters for WordPress to understand. We
go back to regular expressions:

[code lang="python"]  
\# Replace the inline maths delimiters  
for item in p1.finditer(line):  
istr = item.group()  
ostr = '$'+istr.strip('@f$')+'$'  
line = line.replace(istr,ostr)  
[/code]

We saw `p1` defined earlier as:

[code lang="python"]  
p1 = re.compile('@f\\$[^@]*@f\\$')  
[/code]

Here we are trying to match something that begins and ends with a
literal `@f$`, which we have to write as `@f$` because `$` is also a
special character in the regular expression language, but we want it to
be interpreted literally. In between we will allow any expression of any
length as long as it doesn't contain a `@` symbol. This is represented
by `[^@]*`. The rest should be self-explanatory.

Summary
-------

So that's a lengthy explanation of a fairly short and simple script (it
certainly took a lot longer to write...). It's also a fairly esoteric
use case I should think, so will probably be of use to all of 3 other
people if I'm lucky! The final, full script is reproduced below.

* * * * *

[code lang="python"]  
import sys  
import os  
import re

\#
-----------------------------------------------------------------------------

def checkfile(filename):

errmsg = []

filebase, fileext = os.path.splitext(filename)

if fileext != '.md':  
errmsg.append(filename+' is not Markdown')

if not os.path.isfile(filename):  
errmsg.append(filename+' does not exist or is not  
a file')

return errmsg

\#
-----------------------------------------------------------------------------

def processfile(filename,reffile='references.md'):

fi = open(filename,'r')  
fo = open(filename+'.txt','w')  
fr = open(reffile,'r')

p1 = re.compile('@f\\$[^@]*@f\\$')  
p2 = re.compile('@ref [^"]* "[^"]*"')

refnum = 1  
footnotes = []

for line in fi:

\# Some of the later changes insert "<" and ">" so do these  
\# as early as possible  
line = line.replace('<','&lt;')  
line = line.replace('>','&gt;')

\# Remove the table of contents special command  
line = line.replace('\\\\tableofcontents','')

\# Replace the Doxygen special commands for sections with  
\# Markdown  
if '\\section' in line:  
fields = line.split()  
line = '\# ' + ' '.join(fields[2:])  
if '\\subsection' in line:  
fields = line.split()  
line = '\#\# ' + ' '.join(fields[2:])  
if '\\subsubsection' in line:  
fields = line.split()  
line = '\#\#\# ' + ' '.join(fields[2:])

\# References  
\# Doxygen format is '@ref doxref "reference text"'  
\# Replace with an HTML link to a footnote '<a href="fn1">reference
text</a>'  
for item in p2.finditer(line):  
istr = item.group()  
refidstr = 'fn'+str(refnum)  
fields = istr.split()  
reftxt = " ".join(fields[2:]).strip('"')  
doxref = fields[1]  
fr.seek(0)  
for refline in fr:  
if doxref in refline:  
reffull = ' '.join(refline.strip().split()[3:])  
break  
ostr = '<a href="\#'+refidstr+'">'+reftxt+'</a>'  
line = line.replace(istr,ostr)  
footnotes.append('<a name="'+refidstr+'">'+reffull+'</a>')  
refnum += 1

\# Replace the maths delimiters  
line = line.replace('\\\\f{equation}','$')  
line = line.replace('\\\\f[','$')  
line = line.replace('\\\\f}','$')  
line = line.replace('\\\\f]','$')

\# Replace the inline maths delimiters  
for item in p1.finditer(line):  
istr = item.group()  
ostr = '$'+istr.strip('@f$')+'$'  
line = line.replace(istr,ostr)

fo.write(line+'\\n')

\# Write out the footnotes generated by processing the references  
fo.write('<hr>\\n')  
fo.write('<ol>\\n')  
for fn in footnotes:  
fo.write('<li>'+fn+'\\n')  
fo.write('</ol>\\n')

fi.close()  
fo.close()  
fr.close()

return

\#
-----------------------------------------------------------------------------

def processdox(filename,reffile):

errmsg = checkfile(filename)

if len(errmsg) == 0:  
processfile(filename,reffile=reffile)

return errmsg

\#
-----------------------------------------------------------------------------

if __name__ == "__main__":

args = sys.argv[1:]

reffile = '/default/path/to/references.md'

for arg in args:  
errmsg = processdox(arg,reffile)  
for msg in errmsg:  
print msg  
[/code]

