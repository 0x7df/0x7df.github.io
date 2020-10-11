Title: Using tmux over ssh in iTerm2
Date: 2020-10-11 14:50
Category:
Modified: 2020-10-11 14:50
Tags:
Slug:
Author: 0x7df
Summary:
Status: published

I want to be able to open multiple terminal windows on my laptop with an
SSH connection to a remote machine. This setup combining [iTerm2](https://iterm2.com)
and [tmux](https://tmuxguide.readthedocs.io) seems to work. Note that iTerms2 has
built-in tmux integration, which is what allows this to work (i.e. it isn't
possible in the native Terminal app on macOS).

Both need to be installed:

    :::bash
    brew install tmux
    brew cask install iterm2

(iTerm2 is installed from a Cask as it's distributed as a binary; Homebrew
knows to add it to Launchpad.)

Then in iTerm2, `ssh` to the remote machine using the following:

    :::bash
    ssh -t <user>@<remote> 'tmux -CC new -A -s <name>'

(documented
[here](https://gitlab.com/gnachman/iterm2/-/wikis/tmux-Integration-Best-Practices)
.) The `-s <name>` option gives the tmux session a name, and the `-A` flag
makes tmux reattach to the named session if it already exists; this means the
same command can be used whether creating a new or attaching to an existing
session. (More on detaching and attaching to sessions below.) You might need
to add `-u` to force tmux to be in UTF-8 mode, depending on the remote system.

A new iTerm2 window opens locally containing a session on the remote
machine `<remote>`.

The key thing now is, if you open a new window from the 'Shell -> New Window'
menu, or using the `Cmd`+`N` shortcut, the new window is connected to the
remote machine automatically. These are proper windows, in the sense of being able
to move them around on the desktop independently of each other (the usual
meaning of 'window') rather than in the sense usually meant in the context of
tmux. With tmux, while you can open multiple 'windows' you can usually only
see one at a time within the single desktop window.

## Detaching and re-attaching

As is standard with tmux, you can 'detach' the session running on the remote
machine, such that it continues running in the background, even if you log out
of the remote. The you can re-attach after logging back in again. This means
you can continue where you left off if you move from one local client to
another, or just if your SSH connection is lost.

With the tmux integration in iTerm2, if you've opened multiple windows,
then after re-attaching to a session, the original windows re-open.
(In ordinary tmux, re-attaching to a session restores the _tmux_ windows and
panes, and picks up where you left off, but as before, all this will be in the
same single desktop window.)

To detach a session, return to the original iTerm2 window where you ran the
`ssh` command. There will be a menu, like this:

    :::text
    ** tmux mode started **

    Command Menu
    ----------------------------
    esc    Detach cleanly.
      X    Force-quit tmux mode.
      L    Toggle logging.
      C    Run tmux command.

Pressing `Esc` here will detach the tmux session and give the following:

    :::text
    Detaching...
    Detached
    Connection to tems closed.

The SSH connection will be closed. Now run the command:

    :::text
    ssh -t <user>@<remote> 'tmux -CC new -A -s <name>'

again, and the connection will be re-established, with the original windows
re-opened, so you can carry on where you left off.

You don't have to manually detach the session; if the SSH connection is lost,
you lose your network connection, or whatever, you can still re-run the
command and re-attach to the tmux session.

## Burying the original iTerm2 session

Once your remote session is established, the original iTerm2 session where you
ran the `ssh ...` command is fairly redundant; above we showed that you can
return to that session to access the tmux menu that allows you to detach.
However, you can also detach from the iTerm2 menu bar ('Shell -> tmux ->
Detach') or the keyboard shortcut `^`+`Shift`+`Cmd`+`D`. iTerm2 allows you
therefore to 'bury' that session so it's not cluttering up your desktop. Go to
'Session -> Bury Session' in that session's menu bar, or use the keyboard
shortcut `Opt`+`Shift`+`Cmd`+`B`. You can 'dig up' buried sessions from the
'Session -> Buried Sessions' menu. You can also set the default behaviour of
tmux to always bury these sessions, in 'iTerm2 -> Preferences -> General ->
tmux'.
