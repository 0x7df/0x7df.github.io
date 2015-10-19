Title: Connecting Twitter and Pocket using Python
Date: 
Category: programming 
Modified: 
Tags: python, api, twitter, pocket 
Slug: 
Author: 0x7df
Summary: 
Status: draft

[am]: http://adilmoujahid.com/posts/2014/07/twitter-analytics/
[Tweepy]: http://tweepy.readthedocs.org
[Pandas]: http://pandas.pydata.org/
[Matplotlib]: http://matplotlib.org
[Python]: https://python.org 

[This][am] blog post gives an intro to connecting to the Twitter Streaming
API using the [Python][] library [Tweepy][]. There are two Python routines:
one to connect to Twitter and download relevant tweets to a file, and a
second to post-process the file using [Pandas][] and create some graphs
using [Matplotlib][].

[regex]: https://en.wikipedia.org/wiki/Regular_expression

In particular the scripts use [regular expressions][regex] to identify tweets
that contain links, where those tweets have previously been filtered by
keywords such as 'python', 'javascript', 'tutorial', etc.

[Pocket]: http://getpocket.com
[Pocket API]: http://getpocket.com/developer/

I liked the idea of extracting these links automatically, and thought about
going a step further and collecting those links in [Pocket][], using the
[Pocket API][].

None of this required the tweets to be written to a file first, so I adapted
the scripts to do everything in real time rather than post-processing, and
Pandas wasn't required.

[python-pocket]: https://github.com/tapanpandita/pocket
[pocket-eg]: https://w.wol.ph/2013/09/18/batch-adding-data-to-pocket/

The script needs to connect to the Pocket account using previously retrieved
credentials. It uses [pocket][python-pocket], another Python library for
connecting to the Pocket API; an example of its use is [here][pocket-eg].

    with open('pocket_api_key.txt') as fileHandle:
        (pckt_consumer_key, pckt_access_token, redirect_uri) = \
            [item.strip('\n') for item in fileHandle.readlines()]
            
    if __name__ == '__main__':
        # Pocket authentication
        pocket_instance = pocket.Pocket(pckt_consumer_key, pckt_access_token)

Next, it connects to the Twitter Streaming API using 
the `filter` method, which returns only tweets that contain certain pre-defined
keywords. This is straight from [the original post][am].

    from tweepy.streaming import StreamListener
    from tweepy import OAuthHandler
    from tweepy import Stream
    
    # Read the Twitter API key data from a file (not in the repository)
    with open('twitter_api_key.txt') as fileHandle:
        (access_token, access_token_secret, consumer_key, consumer_secret) = \
            [item.strip('\n') for item in fileHandle.readlines()]
             
    # Set the keywords to filter the Twitter stream for
    keywords = ['python', 'javascript', 'fortran', 'bash', 'linux', 'css',
                'jquery', 'api', 'git', 'vim', 'julia']
    
    # This is a basic listener that prints received tweets to stdout
    # Over-ride the tweepy.Stream listener to provide methods
    class StdOutListener(StreamListener):
      
        """Create stream listener class for Twitter Streaming API."""
         
        def on_data(self, data):
            """Process individual tweet."""
            myrespond(data)
            return True
             
        def on_error(self, status):
            """Handle error from Twitter Streaming API."""
            print status
            if status == 420:
                return False
            return False
            
    if __name__ == "__main__":
    
            # Handle Twitter authentication and connection to Twitter Streaming API
            listener = StdOutListener()
            auth = OAuthHandler(consumer_key, consumer_secret)
            auth.set_access_token(access_token, access_token_secret)
            stream = Stream(auth, listener)
             
            # Filter Twitter stream according to keywords
            stream.filter(track=keywords)

Each tweet is processed by the function `myrespond()`, which looks for tweets that also
contain the word 'tutorial', and extracts the link if there is one.

    def getdata(tweet, key):
        """Get dictionary value given key."""
        try:
            val = tweet[key]
        except KeyError:
            return ''
        return val
         
    def word_in_text(word, text):
        """Search for work in text string."""
        if re.search(word.lower(), text.lower()):
            return True
        return False
         
    def extract_link(text):
        """Extract link from tweet or return null string."""
        regex = r'https?:..[^\s<>"]+|www\.[^\s<>"]+'
        match = re.search(regex, text)
        if match:
            return match.group()
        return ''
         
    def myrespond(data):
        """Respond to relevant tweet."""
        tweet = json.loads(data)
        lang = getdata(tweet, 'lang')
        if lang == 'en':
            text = getdata(tweet, 'text')
            link = extract_link(text)
            if word_in_text('tutorial', text) and link != '':
                print text
                print link
                print pocket_instance.add(url=link)
                print "-----------------------------------------------------------"

The `myrespond()` function uses the `json` library to turn the JSON-format data
containing the tweet into a Python dictionary, then another function `getdata`
to access individual data items; if the language is English, then the text of
the tweet is extracted and the `re` library used to return the link. Finally,
the Pocket API is used to add the link to Pocket.

There's probably some sophistication that could be added to this to ensure
better quality links are identified; I could, for example, use my own tweets
and blog posts as a reference corpus, and test the similarity of tweets
to the text in my corpus; and then only add links that have a similarity score
above some threshold.

[GitHub]: https://github.com

The full code is on [GitHub][], at https://github.com/0x7df/twitter2pocket.
