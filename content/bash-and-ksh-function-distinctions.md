Title: Bash and Ksh function distinctions
Date: 2019-03-24 10:45
Category:  
Modified: 2019-03-24 10:45
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: published

# Bash and Ksh function distinctions


There are subtle differences in function declaration and behaviour between Bash
and Ksh.

## Function declaration

In Bash, functions can be declared:


```
    name () compound-command [redirection]
    function name [()] compound-command [redirection]
            This defines a function named name.  The reserved word function is
            optional.  If the function reserved word is supplied, the parentheses are
            optional.  The body of the function is the compound command
            compound-command ...
            ...  The exit status of a function definition is zero  unless  a
            syntax  error  occurs  or  a  readonly function with the same name already
            exists.  When executed, the exit status of a function is the exit status
            of the last command executed in the body.
```

and in ksh:


```
    function varname { list ;}
    varname () { list ;}
            Define  a  function  which  is referenced by varname.
            ... The body of the function is the list of commands between { and }.
```

In Bash, the `function` reserved word is optional, and if used, the `()`
brackets are optional; so it is possible to use either, or both.

In Ksh, you can use *either* the `function` reserved word, *or* the `()`
brackets, but not both.

Hence using either, *but not both*, will give a function declaration that works
in both Bash and Ksh.

All other things being equal, we might prefer the `function` style as being a
bit clearer and more explicit. However, all other things are not equal...

## Environment inheritance

While in Bash the two declaration styles (or three if you include the
Bash-only `function name () ...` style) are equivalent, in Ksh they have
different behaviours. I'm interested in particular in handling errors.

With the bracket style in Ksh, the function inherits its environment
from the caller, and causes the calling script to abort on an error
in the function.

```
    Functions defined with the name() syntax ... are executed in the caller's
    environment and share all variables and traps with the caller.  Errors within
    these function executions cause the script that contains them to abort.
```

I don't see the advertised behaviour in the case where there is an error in the
function execution; the calling script doesn't seem to abort by default.
Consider:

```bash
$ cat ksh_brackets
#!/bin/ksh

func1 () {
    grep foo bar
}

func1

echo "Return code from function = $?"
```

which gives:

```
$ ./ksh_brackets
grep: bar: No such file or directory
Return code from function = 2
```

However, if you introduce `set -e` into the calling script, of course then the
calling script aborts on the failure of the function:

```bash
$ cat ksh_brackets
#!/bin/ksh

set -e # Added

func1 () {
    grep foo bar
}

func1

echo "Return code from function = $?"
```

which gives:

```
$ ./ksh_brackets
grep: bar: No such file or directory
```

So far the behaviour will be the same if we switch to the alternative
`function ...` declaration style. As before, with `set -e`:

```bash
$ cat ksh_function
#!/bin/ksh

function func1 {
    grep foo bar
}

func1

echo "Return code from function = $?"
```
```
$ ./ksh_function
grep: bar: No such file or directory
Return code from function = 2
```

and similarly with `set -e`:

```bash
$ cat ksh_function
#!/bin/ksh

set -e # Added

function func1 {
    grep foo bar
}

func1

echo "Return code from function = $?"
```
```
$ ./ksh_function
grep: bar: No such file or directory
```

The distinction arises in the way the functions behave. Let's add a line to
the function's body, so we can see at what point control returns from the
function to the caller. Now, in the first bracket-style form:

```bash
$ cat ksh_brackets
#!/bin/ksh

set -e

func1 () {
    grep foo bar
    echo "Return code from grep = $?" # Added
}

func1

echo "Return code from function = $?"
```
```
$ ./ksh_brackets
grep: bar: No such file or directory
```

The function aborts immediately on the error, returns control to the calling
script, which in turn also aborts immediately. The function has inherited the
`set -e` behaviour from the caller.

In the alternative form:

```bash
cat ksh_function
#!/bin/ksh

set -e

function func1 {
    grep foo bar
    echo "Return code from grep = $?" # Added
}

func1

echo "Return code from function = $?"
```
```
$ ./ksh_function
grep: bar: No such file or directory
Return code from grep = 2
Return code from function = 0
```

The function has not inherited the `set -e` behaviour of the calling script,
and therefore doesn't abort on the error from `grep`; instead it completes
normally. The return code from a function is the exit status of the last
command in the function body, which in this case is the `echo` statement; since
this completes successfully, the return code of the function is 0, and the
calling script therefore also completes normally.

In Bash, both function-declaration types are the same, and both behave the way
the bracket-style declaration works in Ksh; that is, they inherit the `set -e`
behaviour from the caller.

```bash
$ cat bash_function
#!/bin/bash

set -e

function func1 {
    grep foo bar
    echo "Return code from grep = $?"
}

func1

echo "Return code from function = $?"
```

```bash
$ ./bash_function
grep: bar: No such file or directory
```

```bash
$ cat bash_brackets 
#!/bin/bash

set -e

func1 () {
    grep foo bar
    echo "Return code from grep = $?"
}

func1

echo "Return code from function = $?"
```

```bash
$ ./bash_brackets
grep: bar: No such file or directory
```

So the way to get equivalence between Bash and Ksh (in this respect, there
may still be other differences) is to use the bracket-style declaration:

```bash
name () {
    function_body
}
```

for functions.
