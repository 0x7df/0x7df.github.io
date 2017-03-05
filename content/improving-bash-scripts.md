Title: Improving Bash scripts
Date: 2017-03-05 11:44
Category:  
Modified: 2017-03-05 11:44
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: published

I've been working on improving my Bash scripting recently, working
systematically through the [Advanced Bash-Scripting Guide](
http://www.tldp.org/LDP/abs/abs-guide.pdf) for things I didn't know and for
good practices that I haven't systematically applied.

Here are a few of the things it motivated me to apply across all my Bash
scripts.

## Finding shell scripts

All my scripts already consistently used a sha-bang, which made them easy to
find:

    :::bash
    find ~/Code -type f -not -path "*/.git/*" -print0 \
        | xargs -0 grep -Il "^[ ]*\#\!/[^\#\!]*sh"

The `find` command searches for all files in the `~/Code` directory (filtering
out any that are inside a `.git` directory) and passes the resulting list to
`xargs`, which runs the `grep` command on each result.

The `-print0` and `-0`
arguments to `find` and `xargs` are designed to work with each other to protect
against whitespace or other dodgy characters in pathnames that `xargs` would
split on. The former causes `find` to separate the list of pathnames that it
produces with a special null character, and the latter causes `xargs` to split
the list on that same character rather than on the usual characters, like
whitespace.

The `-I` and `-l` flags to `grep` tell it to ignore binary files, and to print
out the name of the matched file, rather than the matching line, respectively.

The regular expression matches strings of the form `#!/`...`sh`, where the
middle part represented here by ... can consist of any number of characters
other than `#` or `!`. This allows it to match various forms of sha-bang, such
as:

    :::bash
    #!/bin/bash
    #!/bin/ksh
    #!/bin/sh
    #!/usr/bin/env bash

Note also that only cases where the sha-bang is preceded by zero or more spaces
are matched, to prevent, for example, `this is a sha-bang: #!/bin/bash` from
being matched.

Once I had the list of scripts, I looped over the resulting list and `grep`ped
for the following desirable features.

## Error-checking with `set`

A few of my scripts used `set -e` or `set -u`, depending on whether some
problem had cropped up while I was developing or debugging them that using
those commands helped me solve. However I decided it was time to get into the
habit of using them systematically across all my scripts, and to start using
`pipefail` as well. Hence I added:

    :::bash
    set -eu
    set -o pipefail

to the top of all scripts that didn't already have them. If a script fails
because of an error in a pipe, no information is printed; but:

    :::bash
    echo ${PIPESTATUS[*]}

will show the return codes of each command in the pipe; irritatingly, this
works only in Bash and not in Korn shell scripts. (There is an equivalent
`$pipestatus` variable in Z shell.)

## Extended test command

I was inconsistently mixing the standard `test` command:

    :::bash
    [ ... ]

and the extended version, originally introduced in Korn shell and later ported
to Bash:

    :::bash
    [[ ... ]]

The latter has a few advantages.

Quoting variables within `[[ ... ]]` isn't necessary. `[` is a command
and what follows are arguments to that command; if a variable in a
comparison is unset, e.g.:

    :::bash
    a=
    [ $a -lt $b ]

then `[` sees only two arguments, and therefore complains that `-lt` is not
a permissible operator for what it thinks is a two-argument form of the
command. Quoting ensures that the correct number of arguments is seen by
test. However, this isn't the case with `[[ .. ]]` constructs.

The `&&` and `||` logical operators can be used, e.g.:

    :::bash
    [[ $a == $b && $c == $d ]]
    [[ $a == $b || $c == $d ]]

The `<` and `>` relational operators work without being escaped:

    :::bash
    [[ $a < $b ]]
    [ "$a" \< "$b" ]

but remember of course that these are text comparisons, so:

    :::bash
    [[ 9 > 54 ]]   # Returns true
    [[ 9 -gt 54 ]] # Returns false

The extended test command implements the `=~` regular-expression match:

    :::bash
    [[ foobar =~ bar ]]

It should be noted tht file globbing and word splitting do not take place in
the extended test command. From the Advanced Bash-Scripting Guide (attributed
to Stephane Chazelas):

    :::bash
    [[ $a == z* ]]   # True if $a starts with a "z" (pattern matching).
    [[ $a == "z*" ]] # True if $a is equal to z* (literal matching).
    [ $a == z* ]     # File globbing and word splitting take place.
    [ "$a" == "z*" ] # True if $a is equal to z* (literal matching).

## Explicit typing

In Bash, either `declare` or its synonym `typeset` can be used to specify the
type of variables. I prefer `typeset`, as it's also recognised by the Korn
shell:

    :::bash
    typeset -i integer_variable
    typeset -r constant

The `-r` form has the alternative `readonly`, but using the `typeset` form also
gives some consistency since `typeset` has other uses, such as declaring
arrays:

    :::bash
    typeset -a an_array # Prior to Bash v4
    typeset -A an_array # Bash v4 and Korn shell

as well as allowing multiple attributes to be declared at once:

    :::bash
    typeset -ir integer_constant

and attributes to be removed:

    :::bash
    typeset +r variable # No longer read-only

and finally in functions to define the variable scope to be local to
the function:

    :::bash
    typeset local_variable

The variable is local whether or not other arguments (e.g. `-i`, `-r`, etc.)
are supplied. Note that a variable inside a function declared with `readonly`
is *not* local, whereas if declared with `typeset -r` it is - this is another
reason to use `typeset -r` over `readonly`, since it's good practice to make
variables local by default.

## Conclusion

This is just scratching the surface of 'advanced' Bash scripting tips for
defensive programming. More later.
