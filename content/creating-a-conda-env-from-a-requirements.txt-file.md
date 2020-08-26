Title: Creating a Conda env from a requirements.txt file
Date: 2020-08-26 18:18
Category:  
Modified: 2020-08-26 18:18
Tags: TIL Anaconda Python
Slug: 
Author: 0x7df
Summary: 
Status: published

First create a new environment, including `pip`:

```
conda create --name <new_env> pip
```

Then you can do the standard installation from the pre-existing
`requirements.txt` file:

```
conda activate <new_env>
pip install -r requirements.txt
```

(From [Datumorphism](http://datumorphism.com/til/programming/python/python-anaconda-install-requirements).)
