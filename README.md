Twitter-Post-Fetcher
====================

Allows you to get your tweets displaying on your website using JavaScript, without using new Twitter 1.1 API 

Further information and project page: http://jasonmayes.com/projects/twitterApi/

Latest version: 17.0.0 - ensure you are using the latest version to avoid issues!

## Why does this exist?

Recently I was quite frustrated to find out that the old API on Twitter was depreciated and the overhead in setting up a system to perform OAUTH just to get my already publicly available tweets was too damn high (see https://dev.twitter.com/discussions/11564).

Even worse I couldn't find any simple solutions for JavaScript. All code examples were server side. So after much thinking I invented the following solution. It makes use of the over bloated widgets Twitter gives us to put on our sites, cuts out all the nonsense (and non semantic markup), and returns to you your raw tweet text so you can do with it as you please and style it how you want on your own website - like it should be. Instructions on how to get it working with your tweets are in the code comments, just do what it says! Enjoy!

## Browser support

All popular browsers supported. Chrome, Firefox, Safari, Opera, Internet Explorer 7, 8 and 9.
![Browser Support](http://jasonmayes.com/projects/twitterApi/browsers.jpg "Browser Support")

## Examples

Please read comments in JavaScript for examples on how to use and how to generate a widget id to use with the component - it is really easy! Here are some examples on CodePen:

* Regular usage: http://codepen.io/jasonmayes/pen/Ioype
* 3D Twitter Cube: http://codepen.io/jasonmayes/pen/rDyqj

## Key changes / features

* UPDATE 1: First version released!
* UPDATE 2: Due to popular demand, you can now specify how many tweets you want returned which can be any number between 1 and 20, as the third parameter to the function call :-) Let me know if you have any other requests below.
* UPDATE 3: Due to even more requests, solution now gets recent tweets for user, favourite tweets, list tweets, or hashtag search
* UPDATE 4: Script now handles writing HTML to an element with an ID of your choice making it even simpler to use and allows you to queue up many requests so you can have many items on the same page doing different things eg one might show recent posts with a specific hashtag, whilst the other shows your latest 5 tweets.
* UPDATE 5: Script now supports grabbing who posted the tweet, their profile photo, and link to profile. Also adds the time they posted at the end. All customizable with CSS to look how you want.
* UPDATE 6: You can now specify a custom date formatting function to format the twitter post date however you wish! See comments for how to use.
* UPDATE 7: Now supports IE 7, 8 and 9, Firefox, Chrome, Safari and Opera.
* UPDATE 8: You can now not show retweets via a new parameter in function call. See comments in code.
* UPDATE 9: Now supports a custom function callback when data is ready allowing you to have full control over its output.
* UPDATE 10: Now supports Replying / Retweeting / Favouriting.
* UPDATE 11: Now includes option to render a tweet's image.
* UPDATE 13: CommonJS (e.g. Browserify) and AMD (e.g. Require.js) are now supported. See the new examples at the bottom of [exampleUsage.js](js/exampleUsage.js#L200)

## Got suggestions? Feedback? Feature requests? Tell me!

At time of writing I have made over 132 changes, and many are the result of feature requests from people like you! I want to help all the developers out there get tweets on their sites once again - with ease, as it should be. Talk to me: Via [Google+](https://plus.google.com/u/0/+JasonMayes/posts/j65ntqa5Qd3), [twitter](http://www.twitter.com/jason_mayes), or my [website](http://www.jasonmayes.com/).

## Disclaimer

This is by no means an official solution - it is something I created to solve a problem I had, and has now grown in to a full component. Twitter may change its system in such a way to cause this to stop working. I of course will try my best to adapt to any changes and all future versions of this code shall be posted here, on this site. I suggest you check back regularly for any updates. This is however the only solution I know of to date to get public data from Twitter without using the new 1.1 API which otherwise requires OAUTH tokens with every request and is a lot harder to set up. Lets keep it simple!

Feel free to use in your own projects. I only ask you keep any disclaimers with my code (even if code is modified / minified) so others can find the original source should they wish to get updates or support. 
A link back / social media shout out is always appreciated to help others discover it but not required :-)

With that out of the way, I hope you enjoy this component, and that it makes your life a bit easier. Jason Mayes

## Notes

If you need IE8 support - ensure you do not set a non block level element as the target to render into. Use a DIV or similar instead. See http://msdn.microsoft.com/en-us/library/ie/ms533897(v=vs.85).aspx This is due to browser, not Twitter Fetcher.

## Buy me a beer

It takes time to maintain the component and respond to all your requests. If this has saved you time, or maybe even a client, then some beer money is always appreciated :-) Hit the link on the right of this page:
http://jasonmayes.com/projects/twitterApi/
