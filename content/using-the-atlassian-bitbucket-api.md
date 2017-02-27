Title: Using the Atlassian Bitbucket API
Date: 2017-02-27 14:39
Category: Programming
Modified: 2017-02-27 14:39
Tags: bitbucket, api, bash, atlassian, curl
Slug: 
Author: 0x7df
Summary: 
Status: published

A few pointers / examples for using the Bitbucket Server API (the API syntax
for Bitbucket Cloud might differ in some cases).

## API authentication

Accessing Bitbucket through its API using curl requires username/password
authentication. Using:

    :::bash
    curl -u <username>:<password> ...

is no good in a script if the script is intended to be used by several people.
Just:

    :::bash
    curl -u <username> ...

is better, as the password is then requested by curl and can be entered
by the user at the command line. However, the password is requested each time
curl is used in the script, which makes it irritating if there are several
calls in the script. The
solution is to record the password in a 'netrc' file, and then point curl to
this. If the file is called `.netrc` and stored in the user's home directory,
then the `-n` / `--netrc` option can be used. The syntax of the file is:

    machine <host.domain.com> login <username> password <password>

The same `.netrc` file can hold lines for multiple hosts, so it would be fine
to add a line for Bitbucket to an existing `.netrc` or to create it if it
didn't already exist. However to keep it simpler I chose to create a dedicated
netrc file and point to it with the `--netrc-file` option (available in curl
from 7.21.5 onwards), which allows an arbitrary path/name for the netrc file.

## SSH key

If access to Bibucket via SSH is required, then the user needs to add an SSH
key to their account. Using the API, we can do:

    :::bash
    curl --netrc-file "$NETRC_FILE" -o json.tmp "${URL}/ssh/1.0/keys"

to get any SSH keys already associated with the user's Bitbucket account,
where we have stored the full path to the authentication file discussed above
in the variable `$NETRC_FILE`, and the URL to the Bitbucket server in `$URL`.
The data returned by the API call gets stored in a file called `json.tmp`.

We can pretty-print the JSON data returned by the Bitbucket API using:

    :::bash
    cat json.tmp | python -m json.tool
    
from which it's easy to extract the SSH key returned and match it against the
user's SSH key(s) in `${HOME}/.ssh`.
    
If there's no match, then we can take an existing key (or create one with
`ssh-keygen`) and post it using:

    :::bash
    curl --netrc-file "$NETRC_FILE" -i -H "Content-Type:application/json" \
         -X POST --data '{"text": "'"${SSH_KEY}"'"}' "${URL}/ssh/1.0/keys"

Here we have already stored the SSH key we want to post in the `$SSH_KEY`
variable. The `-i` flag includes the HTTP header in the output, and the `-H`
option includes the argument that follows it as an extra header in the request
that curl sends. The `-X` option is used to specify that curl should use the
'POST' method; this is actually redundant since the use of `--data` implies
use of a 'POST' request.

(As an aside, the annoying:

    X11 forwarding request failed on channel 0

message when using SSH can be suppressed by adding:

    Host <URL> [<URL> ...]
      ForwardX11 no

to the `$HOME/.ssh/config` file.)

## Forking a repository

To check whether a repository `$REPO_NAME` exists in `$USER`'s personal space:

    :::bash
    curl --netrc-file \
         "$NETRC_FILE" "${URL}/api/1.0/projects/~${USER}/repos/${REPO_NAME}" \
         | grep "\"name\":\"${REPO_NAME}\""

and to create a user fork of a Bitbucket repository `$REPO_NAME` under project
`$PROJECT`:

    :::bash
    curl --netrc-file "$NETRC_FILE" -X POST -H "Content-Type:application/json"
         --data '{}' "${URL}/api/1.0/projects/${PROJECT}/repos/${REPO_NAME}"

## Changing repository permissions and settings

Changing permissions can also be done via the API:

    :::bash
    curl --netrc-file "$NETRC_FILE" -X PUT \
         "${URL}/api/1.0/projects/~${USER}/repos/${REPO_NAME}/permissions/groups?permission=REPO_READ&name=${USER_NAME}"

In this example a repository `$REPO_NAME` in `$USER`'s personal space has had
read permission added for `$USER_NAME` (which could also be the name of a
group defined on Bitbucket).

An example of changing a setting:

    :::bash
    curl --netrc-file "$NETRC_FILE" -X POST  -H "Content-Type:application/json" \
         --data '{"type":"fast-forward-only","matcher":{"id":"*","type":{"id":"PATTERN"}}}' \
         "${URL}/branch-permissions/2.0/projects/~${USER}/repos/${REPO_NAME}/restrictions"

Here we've added protection against re-writing history to all branches. In
the web interface to Bitbucket we would do this in 'Settings' / 'Branch
permissions' by clicking the 'Add permissions' button. We can add permissions
to a specific branch, a 'branch pattern' (which allows the use of wildcards),
or according to the branching model. The `"matcher"` key in the data posted to
the API specifies that we want to use the 'branch pattern' mode of specifying
branches, and that we want the branch pattern itself to be '*' - i.e. we want
to apply the permission to all branches in the repository. The permission
itself is 'fast-forward-only', which corresponds to 'Prevent rewriting
history'.
