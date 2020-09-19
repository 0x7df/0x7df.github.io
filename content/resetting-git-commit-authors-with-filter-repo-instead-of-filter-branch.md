Title: Resetting Git commit authors with filter-repo (instead of filter-branch)
Date: 2020-09-19 12:02
Category:  
Modified: 2020-09-19 12:02
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: published



To re-write the history of a Git repository in a significant way, the
`filter-branch` command is available (NB for more minor modifications, the
manual `rebase -i` command might be a better approach).

For example, to change an email address in the Git history, this command can be
run:

    :::bash
    git filter-branch --env-filter '
    CORRECT_NAME=""
    CORRECT_EMAIL=""
    OLD_EMAIL=""
    if [[ "${GIT_COMMITTER_EMAIL}" == "${OLD_EMAIL}" ]] ; then
      export GIT_COMMITTER_NAME="${CORRECT_NAME}"
      export GIT_COMMITTER_EMAIL="${CORRECT_EMAIL}"
    fi
    if [[ "${GIT_AUTHOR_EMAIL}" == "${OLD_EMAIL}" ]] ; then
      export GIT_AUTHOR_NAME="${CORRECT_NAME}"
      export GIT_AUTHOR_EMAIL="${CORRECT_EMAIL}"
    fi
    ' -f --tag-name-filter cat -- --branches --tag

where the values assigned to `CORRECT_NAME`, `CORRECT_EMAIL`, AND `OLD_EMAIL`
need to be filled in. Thanks to this
[SO Q](https://stackoverflow.com/questions/4981126/how-to-amend-several-commits-in-git-to-change-author).

However, on running this with recent versions of Git, the following warning is
issued:

    :::text
    WARNING: git-filter-branch has a glut of gotchas generating mangled history
    	 rewrites.  Hit Ctrl-C before proceeding to abort, then use an
    	 alternative filtering tool such as 'git filter-repo'
    	 (https://github.com/newren/git-filter-repo/) instead.  See the
    	 filter-branch manual page for more details; to squelch this warning,
    	 set FILTER_BRANCH_SQUELCH_WARNING=1.
    Proceeding with filter-branch...

The command still works as expected (in this specific case), but
[the recommendation now from the Git project is to use an alternative](
https://git-scm.com/docs/git-filter-branch#_warning), such as [`git
filter-repo`](https://github.com/newren/git-filter-repo) (note that this is
third-party software, not part of Git).

## Installing git-filter-branch

As third-party software, this needs to be installed; there are various ways to
do this (see [INSTALL.md](https://github.com/newren/git-filter-repo/blob/main/INSTALL.md)),
but for basic usage all that is required is to have the single Python script
`git-filter-branch` somewhere on the `$PATH`. E.g.:

    :::bash
    cd ~/Projects
    git clone https://github.com/newren/git-filter-repo.git
    cd git-filter-repo
    git checkout v2.28.0 # Or the latest release at the time, see output of
                         # `git tag -n`

    cd ~/bin
    ln -s ~/Projects/git-filter-repo ./

## Alternative to the above `filter-branch` command:

According to the
[documentation's cheat sheet](https://github.com/newren/git-filter-repo/blob/main/Documentation/converting-from-filter-branch.md#cheat-sheet-conversion-of-examples-from-the-filter-branch-manpage),
the replacement for the particular `filter-branch` command above is to run:

    :::bash
    git filter-repo --use-mailmap

after creating a file `.mailmap` that contains a line:

    :::text
    <new-email-address@new.com> <old-email-address@old.com>

where *the angled brackets must be included*.

## Problem

This did the resetting of commit authors when I tested it, but in my case left
the repository in a state where running any Git command gave the error:

    :::text
    fatal: replace depth too high for object 07f50764b2a36db6e825879872c736959b061df7

According to
[this SO Q/A](https://stackoverflow.com/questions/47839542/failed-git-replace-replace-depth-too-high-for-object),
replacement objects can be deleted, like so:

    :::bash
    git replace -d 07f50764b2a36db6e825879872c736959b061df7

which didn't seem to have any side-effects. There were many replacements (as
listed by):

    :::bash
    git replace -l

so I deleted them all using:

    :::bash
    for HASHID in $(git replace -l) ; do
        git replace -d "${HASHID}"
    done

which had the desired effect.
