Title: Grep, regex and sed inline replace on multiple files
Date: 2018-05-25 09:53
Author: 0x7df
Category: Uncategorized
Slug: 
Status: published
Tags: bash, computing, linux, programming

I'm importing WordPress blog posts into [Pelican](https://blog.getpelican.com/), in which I'm using the
[render-math plugin](https://github.com/getpelican/pelican-plugins/tree/master/render_math). This expects in-line equations to be delimited by single
dollar signs, and displayed equations to be delimited by double dollar signs,
e.g.:

<pre> ...an example in-line equation is $E = mc^2$, which ... </pre>

and:

<pre>... the following equation:

$$ F = ma $$

is displayed as a paragraph...</pre>

However, the original WordPress articles use `\$latex` as the opening
delimiter, and `\$` as the closing delimiter, for both in-line and displayed
maths. Additionally, the WordPress equations also contain the strings `&s=1`
and `$bg=ffffff` after the maths but before the closing delimiter; these were
to set the font size and the background colour, respectively.

Therefore, a bit of mucking about with `grep`, `sed`, and regular
expressions was required to get the equations to display in Pelican.

## Regular expressions and `grep`

To begin with, look at the basic regular expression syntax
needed to pick out the `\$latex`, `\$`, `&s=1` and `&bg=ffffff` strings.

First:

    :::bash
    grep '\\$[latex]\{5\}' $(find ./content -name "*.md")

Here, the last part - `$(find ./content -name "*.md")` - is just using the find
command to get all the files in the content directory (which is where all the
MarkDown-format article files are stored), which have file-names ending in
`.md`, (which is the default suffix for MarkDown); 
grep command is operating on this list, which allows grep to operate on all the files individually.

The important bit is the regular expression - `\\$[latex]\{5\}`. Matching
backslashes is slightly tricky, because backslash is a special character for grep and
many other tools. Special characters like backslash therefore need to be
preceded by a particular special character that tells grep to treat the
following character as itself, rather than as the special character it would
usually be treated as. This is called "escaping" the special character. The
special character that does this is - the backslash! That is, `\\` is needed to match
a literal backslash in a regular expression.

The next character is the dollar sign, which can be left alone. This is odd,
because the dollar sign is also a special character in regular expressions, so it ought to be escaped
by preceding it with a backslash. (Indeed, if we do, the command works equally
well.) However, the dollar sign is used to match the end of a line; the fact
that in this regular expression there are further characters to match (namely
the `[latex]\{5\}` bit), means it can't be interpreted as the end-of-line
special character. `grep` is clever enough to infer from the
context that the dollar sign here is intended to match itself, and not to be
interpreted as a special character.

Moving on, we see `[latex]\{5\}`. The square brackets define a range of
characters to match; in this case it should be thought of as the list of
characters l, a, t, e and x, rather than the string "latex". This part alone
would match any *single* letter from this set. The following part - `\{5\}` -
indicates that the preceding character (i.e. the `[latex]` part) should be
matched five times. Therefore the combination of these matches any
five-character string composed from the letters l, a, t, e and x. Clearly this
would match strings other than "latex" - e.g. "altex", "lllll", "xetal",
etc. - but these are sufficiently unlikely that this form of syntax is
good enough. In fact, the more general `[a-z]\{5\}`, which would match any
five-character string composed of the lower case letters, would probably 
work just fine.

So, now we have our regular expression for the opening delimiter, but it does not distinguish between
in-line and displayed mathematics, which need different delimiters in the
output format we're converting to. Probably the simplest way to do this is to identify any equation that's
on a line of its own as a displayed equation, and any other equation as
inline. This means that opening delimiters that appear at the start of a line
are probably associated with a displayed equation, so can replaced with `$$`.
To match only instances at the start of a line, we add a caret symbol to the
start of the regular expression.

    :::bash
    grep '^\\$[latex]\{5\}' $(find content -name "*.md")

## Search and replace with `sed`

So far we've used grep which lists the matches; this was useful just to
work out and test the regex. Now we have that right, we need to switch to `sed`
- stream editor - to do the search and replace. The sed syntax is:

    :::bash
    sed s/string1/string2/g inputfile > outputfile

The runs sed with the script `s/string1/string2/g`, which tells sed to
substitute (because of the starting `s`) the string `string1` with the
replacement `string2`, and to do it globally (due to the ending `g`), i.e. to
replace all instances in `inputfile`, rather than just the first one that's
encountered. By default `sed` prints its output to standard out, which we
redirect to `outputfile`. However, we want to edit the files inline, rather
than create a new set of files, and redirecting `sed` output to the same file
that is being processed is not recommended. To edit inline, the `-i` switch is
added, giving in general:

    :::bash
    sed -i s/string1/string2/g inputfile

or in our case:

    :::bash
    sed -i s/'^\\$[latex]\{5\}'/'$$'/g inputfile

The final step in building this up is to take care of the fact that I want to
do this with dozens of files, and I don't want to do it manually. I could
write a script that loops over the files, but it's easier to use the `xargs`
command:

    :::bash
    find content -name *.md | xargs sed -i s/'^\\$[latex]\{5\}'/'$$'/g

Here the output of the find command, which is a list of the files that
were found, is piped to the xargs command, which takes the list passed to it
and applies the commands that come after it to each member of the list.

## More of the same

The next command replaces the WordPress-style closing delimiters - `\$` - *that appear at the end of
a line* (and which are therefore most likely to be associated with displayed rather than
in-line equations), with `$$`.

    :::bash
    find content -name *.md | xargs sed -i s/'\\\$$'/'$$'/g

The difference here is that we have now had to escape the dollar sign - `\$`
rather than just `$` - because we have added a final `$` which is the special
character to match the end of a line.
