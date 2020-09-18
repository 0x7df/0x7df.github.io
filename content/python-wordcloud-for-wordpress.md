Title: Python wordcloud for WordPress
Date: 2015-05-10 12:06
Updated:
Author: 0x7df
Category: Programming
Tags: api, html, python, twitter, wordcloud, wordpress, xml
Slug: python-wordcloud-for-wordpress
Status: published

There is a [Python](http://www.python.org) routine available on
[Github](https://github.com/) for creating a word cloud, created by
[Andreas Mueller](http://peekaboo-vision.blogspot.co.uk/):
<https://github.com/amueller/word_cloud>.

[A blog post
here](http://sebastianraschka.com/Articles/2014_twitter_wordcloud.html),
and [the Github repo that it goes
with](https://github.com/rasbt/datacollect) (both due to [Sebastien
Raschka](http://sebastianraschka.com/)), make it easy to use the
[Twitter API](https://dev.twitter.com/rest/public) to download your
[Twitter
timeline](https://support.twitter.com/articles/164083-what-s-a-twitter-timeline#)
(as a [CSV](http://en.wikipedia.org/wiki/Comma-separated_values) file),
and then use the word cloud script to produce a word cloud from it.

![my_twitter_wordcloud_1]({static}images/my_twitter_wordcloud_1.png?w=660)

To add something to this, I did the same thing with my
[WordPress](https://wordpress.com) blog posts. I didn't want to bother
fighting with the WordPress API, so I simply exported the blog contents
to an XML file, which WordPress allows you to do through the admin
interface (so you can archive your blog locally and/or transfer it into
a different blog). Hence, this really just ends up being about XML
parsing. Here is the source code:

    :::python
    #!/usr/bin/python
    
    from HTMLParser import HTMLParser  
    import xml.etree.ElementTree as ET  
    import matplotlib.pyplot as plt  
    from wordcloud import WordCloud, STOPWORDS
    
    # http://stackoverflow.com/questions/753052/strip-html-from-strings-in-python  
    class MLStripper(HTMLParser):  
        def __init__(self):  
            self.reset()  
            self.fed = []  
        def handle_data(self, d):  
            self.fed.append(d)  
        def get_data(self):  
            return ''.join(self.fed)
    
    tree = ET.parse('0x7df.wordpress.2015-04-25.xml')
    
    root = tree.getroot()
    
    postwords = []
    
    for child in root.iter():  
        if child.tag == 'item':  
            if child.find('{http://wordpress.org/export/1.2/}status').text == 'publish':  
                postbody = child.find('{http://purl.org/rss/1.0/modules/content/}encoded').text  
                s = MLStripper()  
                s.feed(postbody)  
                postwords += s.get_data().split()
    
    keywords = ' '.join([wd for wd in postwords  
        if 'http' not in wd and  
        'bg=' not in wd and  
        not wd.startswith('$') and  
        not wd.startswith('[') and  
        not wd.startswith('&')  
        ])
    
    wordcloud = WordCloud(  
        font_path='./SaucerBB.ttf',  
        stopwords=STOPWORDS,  
        background_color='black',  
        width=1800,  
        height=1800  
    ).generate(keywords)
    
    plt.imshow(wordcloud)  
    plt.axis('off')  
    plt.savefig('./my_wordpress_wordcloud_2.png', dpi=300)  
    plt.show()  

I used the standard library light-weight
`<a href="https://docs.python.org/2/library/xml.etree.elementtree.html" target="_blank">xml.etree.ElementTree</a>`
parser. I get the root of the [XML](http://en.wikipedia.org/wiki/XML)
document, and iterate over its children; this is recursive, so it
descends down the tree to all nodes. Whenever I encounter a node which
has the tag `item` (which contains the post information), I search
amongst its immediate children using the `find()` method, to find one
with tag `{http://wordpress.org/export/1.2/}status`, which contains the
status of the post, i.e. whether it's published, draft, etc. If it's
published (the text that the XML tag contains `== publish`), then I
search again using `find()` for the tag
`{http://purl.org/rss/1.0/modules/content/}encoded`, which contains the
blog post text. I put this in the `postbody` variable.

The next few lines use the `class` defined earlier on in the script -
`MLStripper()` - to strip out the [HTML](http://www.w3schools.com/html/)
tags from the blog post. (This came from
[StackOverflow](//stackoverflow.com/questions/753052/strip-html-from-strings-in-python).)
The rest of the script is essentially the same as [Raschka's code for
Twitter](http://sebastianraschka.com/Articles/2014_twitter_wordcloud.html),
tweaked a little where necessary.  
The result is:

![my_wordpress_wordcloud_2]({static}images/my_wordpress_wordcloud_21.png?w=660)

The font is called Saucer BB, from
[here](http://www.1001fonts.com/saucer-bb-font.html).

