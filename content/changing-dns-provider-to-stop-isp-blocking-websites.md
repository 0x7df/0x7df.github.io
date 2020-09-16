Title: Changing DNS provider to stop ISP blocking websites
Date: 2020-09-16 23:47
Category:  
Modified: 2020-09-16 23:47
Tags: 
Slug: 
Author: 0x7df
Summary: 
Status: published

ISPs provide their own domain name services (DNSs) - the look-up tables that
map human-readable URLs to IP addresses. This means that they can
choose _not_ to include some entries. While this might be marketed as protection
against malicious sites, it is also the case that privacy and security websites
can be blocked, including VPN providers.

Some ISPs allow turning off their protection; see
<https://libertyshield.kayako.com/article/56-how-do-i-stop-or-remove-isp-blocking>
for examples. Some sites appear to remain blocked, however, after the ISPs
content control is turned off.

In this case, it's also possible though to use another, public DNS instead,
such as Google DNS.

On macOS, the DNS can be changed in System Preferences; see:
<https://support.apple.com/en-gb/guide/mac-help/mh14127/mac>. For Google DNS,
the DNS server IP addresses are 8.8.8.8 and 8.8.4.4; either address can be used
as a primary or a secondary DNS server. (See
<https://developers.google.com/speed/public-dns/docs/using>.)
