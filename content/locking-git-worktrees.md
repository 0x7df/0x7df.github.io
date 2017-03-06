Title: Locking Git worktrees
Date: 2017-03-06 23:08
Category:  
Modified: 2017-03-06 23:08
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: published

Git worktrees provide a way of separating the worktree for a given branch -
i.e. the project working files that are being version controlled - from the
.git directory containing Git's system files. The worktree can be stored
anywhere, and Git keeps a reference to it in the .git directory (in
the `.git/worktrees/<branchame>` directory.)

Worktrees can be safely deleted when finished with, as long as all important
changes have been committed. However, when you delete a worktree directory, the
references remain. If you try to create a new worktree for the same branch, Git
issues an error message because it checks for this reference metadata, rather
than for the actual worktree itself. Under normal circumstances this metadata
remains only until Git does its regular garbage collection, or you run `git
worktree prune`. At that point Git cleans up references to any worktrees that
it can't find, and thence you can create a new worktree without the error.

This is a problem if you store worktrees on removable media, or on local
disks whilst using multiple machines (with a network-accessible .git). It's
possible to unintentionally clean up references in the .git dir to worktrees
that haven't been deleted, but are just on currently-unmounted disks. To avoid
this you can protect the worktree by adding a file called `locked` in the .git
directory for the branch (e.g. `.git/worktrees/<branchname>/locked`). The
content of this file is unimportant, but it's not a bad idea to describe the
reason for locking the branch.

The side effect is of course that worktree metadata doesn't get cleaned up for
worktrees that have been deleted; it's a good idea to get into the habit of
deleting the `locked` file when deleting a worktree, until a there's a built-in
`git worktree remove` command to look after this automatically.

