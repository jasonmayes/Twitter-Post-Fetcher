/*
* ### HOW TO CREATE A VALID ID TO USE: ###
* Go to www.twitter.com and sign in as normal, go to your settings page.
* Go to "Widgets" on the left hand side.
* Create a new widget for what you need eg "user time line" or "search" etc.
* Feel free to check "exclude replies" if you don't want replies in results.
* Now go back to settings page, and then go back to widgets page, you should
* see the widget you just created. Click edit.
* Now look at the URL in your web browser, you will see a long number like this:
* 345735908357048478
* Use this as your ID below instead!
*/

/**
 * How to use TwitterFetcher's fetch function:
 * @param {Object} An object containing at minimum the following two properties:
 * id {string} The ID of the Twitter widget you wish to grab data from
 *    (see above for how to generate this number).
 * domId {string} The ID of the DOM element you want to write results to.
 *
 * You may then also specify the following (case sensitive) properties if you
 * desire:
 *
 * maxTweets {int} Optional - the maximum number of tweets you want returned.
 *     Must be a number between 1 and 20.
 * enableLinks {boolean} Optional - set true if you want urls and hash tags to
 *     be hyperlinked!
 * showUser {boolean} Optional - Set false if you don't want user photo / name
 *     for tweet to show.
 * showTime {boolean} Optional - Set false if you don't want time of tweet
 *     to show.
 * dateFunction {function/string} Optional - A function you can specify to
 *     format tweet date/time however you like. This function takes a JavaScript
 *     date as a parameter and returns a String representation of that date.
 * showRetweet {boolean} Optional - Show retweets or not. Set false to not show.
 * customCallback {function/string} Optional - A function to call when data is
 *     ready. It also passes the data to this function should you wish to
 *     manipulate it yourself before outputting. If you specify this parameter
 *     you must output data yourself!
 * showInteraction {boolean} Optional - Show links for reply, retweet,
 *     favourite. Set false to not show.
 */

// ##### Simple example 1 #####
// A simple example to get my latest tweet and write to a HTML element with
// id "tweets". Also automatically hyperlinks URLS and user mentions and
// hashtags.
var config1 = {
  "id": '345170787868762112',
  "domId": 'example1',
  "maxTweets": 1,
  "enableLinks": true
};
twitterFetcher.fetch(config1);


// ##### Simple example 2 #####
// A simple example to get my latest 5 of my favourite tweets and write to a
// HTML element with id "talk". Also automatically hyperlinks URLS and user
// mentions and hashtags but does not display time of post. We also make the
// request to Twitter specifiying we would like results where possible in
// English language (eg for Twitter phrases like "posted on" or "time ago").
var config2 = {
  "id": '347099293930377217',
  "domId": 'example2',
  "maxTweets": 5,
  "enableLinks": true, 
  "showUser": true,
  "showTime": true,
  "lang": 'en'
};
twitterFetcher.fetch(config2);


// ##### Advanced example #####
// An advance example to get latest 5 posts using hashtag #API and write to a
// HTML element with id "tweets2" without showing user details and using a
// custom format to display the date/time of the post, and does not show
// retweets.
var config3 = {
  "id": '345690956013633536',
  "domId": 'example3',
  "maxTweets": 3,
  "enableLinks": true,
  "showUser": false,
  "showTime": true,
  "dateFunction": dateFormatter,
  "showRetweet": false
};

// For advanced example which allows you to customize how tweet time is
// formatted you simply define a function which takes a JavaScript date as a
// parameter and returns a string!
// See http://www.w3schools.com/jsref/jsref_obj_date.asp for properties
// of a Date object.
function dateFormatter(date) {
  return date.toTimeString();
}

twitterFetcher.fetch(config3);


// ##### Advanced example 2 #####
// Similar as previous, except this time we pass a custom function to render the
// tweets ourself! Useful if you need to know exactly when data has returned or
// if you need full control over the output.

var config4 = {
  "id": '345690956013633536',
  "domId": '',
  "maxTweets": 3,
  "enableLinks": true,
  "showUser": true,
  "showTime": true,
  "dateFunction": '',
  "showRetweet": false,
  "customCallback": handleTweets,
  "showInteraction": false
};

function handleTweets(tweets){
    var x = tweets.length;
    var n = 0;
    var element = document.getElementById('example4');
    var html = '<ul>';
    while(n < x) {
      html += '<li>' + tweets[n] + '</li>';
      n++;
    }
    html += '</ul>';
    element.innerHTML = html;
}

twitterFetcher.fetch(config4);
