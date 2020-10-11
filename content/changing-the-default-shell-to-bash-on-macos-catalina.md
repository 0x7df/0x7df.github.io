Title: Changing the default shell to Bash on macOS Catalina
Date: 2020-10-11 14:15
Category:
Modified: 2020-10-11 14:17
Tags:
Slug:
Author: 0x7df
Summary:
Status: published

# Changing the default shell to the system Bash

The default shell on macOS Catalina was changed to Zsh.

To change back to Bash, use the `chpass` command:

    :::bash
    > which chpass
    /usr/bin/chpass

Note that instructions elsewhere might say `chsh`, but the programs are identical:

    :::bash
    diff -s /usr/bin/chpass /usr/bin/chsh
    Files /usr/bin/chsh and /usr/bin/chpass are identical

(so is `chfn`).

The standard shells that `chpass` will allow users to change to (or from),
without root permission, are those listed in `/etc/shells`.

To change:

    :::bash
    chsh -s /bin/bash

Then any new terminals will use Bash instead of Zsh.

On macOS a consequence of this change is that the following message is printed
every time `bash` is invoked:

    :::text
    The default interactive shell is now zsh.
    To update your account to use zsh, please run `chsh -s /bin/zsh`.
    For more details, please visit https://support.apple.com/kb/HT208050.

This can be suppressed by adding:

    :::bash
    export BASH_SILENCE_DEPRECATION_WARNING=1

to `~/.bash_profile`.

# Changing the default shell to Homebrew-installed Bash

The system Bash is old:

    :::bash
    > /bin/bash --version
    GNU bash, version 3.2.57(1)-release (x86_64-apple-darwin19)
    Copyright (C) 2007 Free Software Foundation, Inc.

but it is possible to install an up-to-date version of Bash using Homebrew,
and then default to that.

To do this:

    :::bash
    brew install bash

The new Homebrew-installed `bash` is in `/usr/local/bin`, which comes before
`/bin` in `$PATH`, and therefore takes precedence over the system Bash. So now:

    :::bash
    bash --version

yields:

    :::text
    GNU bash, version 5.0.18(1)-release (x86_64-apple-darwin19.5.0)
    ...

which is the newer version installed by Homebrew. However, the _default_ shell
is still the system Bash:

    :::bash
    > echo $BASH_VERSION
    3.2.57(1)-release

The procedure for changing the default shell is as above, except that the new
Homebrew-managed shell is not on the "approved" list in `/etc/shells`, so a
user (other than root) can't switch to it. Add it first with:

    :::bash
    sudo sh -c "echo /usr/local/bin/bash >> /etc/shells"
    chsh -s /usr/local/bin/bash

Note that the `echo` command is run in a subshell so that the file re-
direction works. (Or you could do `echo /usr/local/bin/bash | sudo tee -a
/etc/shells`.)

