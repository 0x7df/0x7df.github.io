#!/usr/bin/env bash

cd "$(dirname "${BASH_SOURCE}")";

git pull origin;

function doIt() {
    ln -fs ${PWD}/content/blog        ${HOME}/bin/
    ln -fs ${PWD}/content/publishPost ${HOME}/bin/
    conda env create -f environment.yml
}

if [ "$1" == "--force" -o "$1" == "-f" ]; then
	doIt;
else
	read -p "This may overwrite existing files in your home directory. Are you sure? (y/n) " -n 1;
	echo "";
	if [[ $REPLY =~ ^[Yy]$ ]]; then
		doIt;
	fi;
fi;
unset doIt;
