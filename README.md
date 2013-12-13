mIPyex
======

My IPython notebook extensions (a.k.a. mIPyex).

How to use it...

Just put the `custom` folder inside your `.ipython/{your_profile}/static` directory

*NOTE*:

To use the tweet_me extension you need to install the PTT twitter library:

`pip install twitter`

and authorize it to use your twitter account:

`twitter` or `twitter authorize` at the command line.

And do not forget to modified the custom.js accordingly:

`tweet_me.parameters('/home/{your_username}/.ipython/{your_profile}/static/custom/tweet_me');`

*NOTE*: After the release of IPython 2.0, I will use the new `nbextensions` folder inside
the `.ipython` directory, but I will also keep this configuration for people using v1.1.

That's all for now...

Cheers.

Damián
