Title: Sending emails automatically with the Gmail API
Date: 2020-09-19 17:13
Category:  
Modified: 2020-09-19 17:13
Tags: api, gmail, python 
Slug: 
Author: 0x7df
Summary: 
Status: draft

The "quickstart" documentation for the Gmail API (using Python) is here:
<https://developers.google.com/gmail/api/quickstart/python>.

Install the Python API libraries (for me, in a Conda environment):

    :::bash
    conda create -n google-api PYTHON=3 pip google-api-python-client \
        google-auth-httplib2 google-auth-oauthlib

    conda activate google-api

The example `quickstart.py` file is provided by Google in a GitHub repo:

    curl -o quickstart.py \
        https://raw.githubusercontent.com/gsuitedevs/python-samples/master/gmail/quickstart/quickstart.py


