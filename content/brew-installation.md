Title: Brew installation
Date: 2020-10-11 14:40
Category:
Modified: 2020-10-11 14:40
Tags:
Slug:
Author: 0x7df
Summary:
Status: published

On a fresh Mac out of the box, `git` is apparently available:

    :::bash
    > which git
    /usr/bin/git

but not actually:

    :::bash
    > git --version
    xcode-select: note: no developer tools were found at
    '/Applications/Xcode.app', requesting install. Choose an option in the
    dialog to download the command line developer tools.

I would prefer to have as much as possible managed by `brew`, so a prerequisite
task is to installing anything is to install `brew`. This is done by:

    :::bash
    /bin/bash -c"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/master.install.sh)"

which installs a bunch of stuff in `/usr/local/`. (NB `/usr/local/` was
previously empty.)

In the process of installing `brew`, the very same Command Line Tools as were
required above for Git to start working were downloaded anyway. Homebrew
itself requires either the Command Line Tools for Xcode, or the full Xcode
application (or both), for some formulae (because these give access to a
compiler, Make, etc.). So, if not already available, the Command Line Tools
for Xcode are automatically downloaded and installed by the Homebrew installer.

These are located in `/Library/Developer/CommandLineTools`.

After this process, `/usr/local/` is populated with a bunch of
Homebrew-specific folders:

    :::text
    /usr/local/Caskroom
    /usr/local/Cellar
    /usr/local/Frameworks
    /usr/local/Homebrew

as well as various general standard Unix names (that were created by
Homebrew):

    :::text
    /usr/local/bin
    /usr/local/etc
    /usr/local/include
    /usr/local/lib
    /usr/local/opt
    /usr/local/sbin
    /usr/local/share
    /usr/local/var

Most are empty to start with and will be popoulated by Homebrew when packages
are installed.

The exceptions are:

- `/usr/local/Homebrew` - this contains the cloned Git repository of Homebrew
  itself, cloned from `https://github.com/Homebrew/brew`.
- `/usr/local/bin` - contains a symlink `brew` linking back to
  `/usr/local/Homebrew/bin/brew`. rhis is the primary executable run when you
  type `brew` (because as standard `/usr/local/bin` is on the `$PATH`.

Inside `usr/local/Homebrew` is also `Library`, which (according to its README):

> contains all the code run by the official `brew` and `brew cask` commands in
> `Homebrew` and all formulae (package descriptions) in taps (repositories
> containing formulae) in `Taps` subdirectories.

and within this are folders `Homebrew`, which contains what is presumably the
main source code of Homebrew, and `Taps`, which will contain repositories of
formulae.

Under this `Taps` folder, we initially have only a `homebrew/homebrew-core`
repository of formulae. This is a separate Git repo cloned from
<https://github.com/Homebrew/homebrew-core>,
which contans inside its `Formula` directory many Ruby
scripts - these are the formulae that describe how a package should
be installed. For example, in here is `git.rb`, which begins:

    :::ruby
    class Git < Formula
      desc "Distributed revision control system"
      homepage "https://git-scm.com"
      url ...
      sha256 ...
      license ...
      head ...

      ...

      depends_on "gettext"
      depends_on "pcre2"

      ...

After the Homebrew installation has completed, we can verify that the Xcode
Command Line Tools have been installed with:

    :::bash
    > xcode-select -p
    /Library/Developer/CommandLineTools

and that Homebrew recognises them:

    :::bash
    > brew config
    ...
    CLT: 12.0.0.0.1.1599194153
    Xcode: N/A

Now, as a side-effect of this, Git works:

    :::bash
    > git --version
    git version 2.24.3 (Apple Git-128)

Note however, that it's the Apple version of Git that has come with the Xcode
CLT, not Homebrew's version.

Now, when I do:

    :::bash
    brew install git

Homebrew reports an updated tap (`homebrew/core`), indicating that the Git
repository at `/usr/local/Homebrew/Library/Taps/homebrew/homebrew-core` has
been updated; and one Formula having been updated; then, the two dependencies
we saw above (`gettext` and `pcre2`) are installed, before `git` itself is
installed. As a result, there are new folders for each of these dependencies in
`/usr/local/Cellar`, and a number of symlinks in `/usr/local/bin` pointing back
to them.

Now - after opening a new terminal at least - I get the following:

    :::bash
    > which git
    /usr/local/bin/git

and:

    :::bash
    > git --version
    git version 2.28.0

