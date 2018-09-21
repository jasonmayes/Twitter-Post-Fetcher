/**
 * How to use TwitterFetcher's fetch function:
 *
 * @function fetch(object) Fetches the Twitter content according to
 *     the parameters specified in object.
 *
 * @param object {Object} An object containing case sensitive key-value pairs
 *     of properties below.
 *
 * You may specify at minimum the following required properties:
 *
 * @param object.id {string} DEPRECATED due to Twitter Change. DO NOT USE THIS ANY MORE. The ID of the Twitter widget you
 *     wish to grab data from (see above for how to generate this number).
 * @param object.domId {string} The ID of the DOM element you want
 *     to write results to.
 *
 * 
 * Along with at least one of these:
 * 
 * @param object.profile {Object} An object containing a refernece to the
 *     screen name we wish to grab tweets for. Should be like this:
 *     {"screenName": 'jason_mayes'}
 * 
 * @param object.likes {Object} An object containing a refernece to the
 *     screen name we wish to grab likes for. Should be like this:
 *     {"screenName": 'jason_mayes'}
 * 
 * @param object.list {Object} An object containing a refernece to the
 *     screen name we wish to grab list for. Should be like this:
 *     {"listSlug": 'inspiration', "screenName": 'jason_mayes'}
 *
 * 
 * You may also specify one or more of the following optional properties
 *     if you desire:
 *
 * @param object.maxTweets [int] The maximum number of tweets you want
 *     to return. Must be a number between 1 and 20. Default value is 20.
 * @param object.enableLinks [boolean] Set false if you don't want
 *     urls and hashtags to be hyperlinked.
 * @param object.showUser [boolean] Set false if you don't want user
 *     photo / name for tweet to show.
 * @param object.showTime [boolean] Set false if you don't want time of tweet
 *     to show.
 * @param object.dateFunction [function] A function you can specify
 *     to format date/time of tweet however you like. This function takes
 *     a JavaScript date as a parameter and returns a String representation
 *     of that date.
 * @param object.showRetweet [boolean] Set false if you don't want retweets
 *     to show.
 * @param object.customCallback [function] A function you can specify
 *     to call when data are ready. It also passes data to this function
 *     to manipulate them yourself before outputting. If you specify
 *     this parameter you must output data yourself!
 * @param object.showInteraction [boolean] Set false if you don't want links
 *     for reply, retweet and favourite to show.
 * @param object.showImages [boolean] Set true if you want images from tweet
 *     to show.
 * @param object.linksInNewWindow [boolean] Set false if you don't want links
 *     to open in new window.
 * @param object.lang [string] The abbreviation of the language you want to use
 *     for Twitter phrases like "posted on" or "time ago". Default value
 *     is "en" (English).
 * @param object.showPermalinks [boolean] Set false if you don't want time
 *     to be permalinked.
 * @param object.dataOnly [boolean] Set true if you want the argument passed
 *     to the customCallback to be an Array of Objects containing data
 *     instead of an Array of HTML Strings
 */


/**************************************************************************
 * NEW: These first examples no longer need the Widget ID to work.
 *************************************************************************/
var configList = {
  "list": {"listSlug": 'inspiration', "screenName": 'jason_mayes'},
  "domId": 'exampleList',
  "maxTweets": 5,
  "enableLinks": true, 
  "showUser": true,
  "showTime": true,
  "showImages": true,
  "lang": 'en'
};
twitterFetcher.fetch(configList);


var configProfile = {
  "profile": {"screenName": 'jason_mayes'},
  "domId": 'exampleProfile',
  "maxTweets": 3,
  "enableLinks": true, 
  "showUser": true,
  "showTime": true,
  "showImages": true,
  "lang": 'en'
};
twitterFetcher.fetch(configProfile);


var configLikes = {
  "likes": {"screenName": 'jason_mayes'},
  "domId": 'exampleLikes',
  "maxTweets": 3,
  "enableLinks": true, 
  "showUser": true,
  "showTime": true,
  "showImages": true,
  "lang": 'en'
};
twitterFetcher.fetch(configLikes);


/**************************************************************************
 * NOTE: DO NOT USE THE BELOW! These are here just for historical reasons 
 * now. Widget IDs no longer work/supported.
 *************************************************************************/

// ##### Simple example 1 #####
// A simple example to get my latest tweet and write to a HTML element with
// id "example1". Also automatically hyperlinks URLS and user mentions and
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
// English language.
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


// ##### Simple example 3 #####
// A simple example to get latest 5 tweets for #API tag and shows any images
// attached to tweets.
var config3 = {
  "id": '502160051226681344',
  "domId": 'example3',
  "maxTweets": 5,
  "enableLinks": true,
  "showImages": true
};
twitterFetcher.fetch(config3);


// ##### Advanced example #####
// An advance example to get latest 5 posts using hashtag #API and write to a
// HTML element with id "tweets2" without showing user details and using a
// custom format to display the date/time of the post, and does not show
// retweets.
var config4 = {
  "id": '345690956013633536',
  "domId": 'example4',
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

twitterFetcher.fetch(config4);


// ##### Advanced example 2 #####
// Similar as previous, except this time we pass a custom function to render the
// tweets ourself! Useful if you need to know exactly when data has returned or
// if you need full control over the output.

var config5 = {
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
    var element = document.getElementById('example5');
    var html = '<ul>';
    while(n < x) {
      html += '<li>' + tweets[n] + '</li>';
      n++;
    }
    html += '</ul>';
    element.innerHTML = html;
}

twitterFetcher.fetch(config5);


// ##### Advanced example #####
// An advance example to get latest 3 posts using hashtag #API and write to a
// HTML element with id "example6" without showing user details and using an
// alternative custom format with moment.js to display the age of the post,
// and does not show retweets.
var config6 = {
  "id": '345690956013633536',
  "domId": 'example6',
  "maxTweets": 3,
  "enableLinks": true,
  "showUser": false,
  "showTime": true,
  "dateFunction": momentDateFormatter,
  "showRetweet": false
};

// For advanced example which allows you to customize how tweet time is
// formatted you simply define a function which takes a JavaScript date and
// optional text representation of data as parameters and returns a string!
// See http://www.w3schools.com/jsref/jsref_obj_date.asp for properties
// of a Date object.
//
// The advantage of using the date string is that internally
// twitterFetcher discards the timezone in favor of cross-browser
// support. If you need the timezone, you can use something like
// Moment.js to parse the original date string and maintain the
// timezone.
function momentDateFormatter(date, dateString) {
  return moment(dateString).fromNow();
}

twitterFetcher.fetch(config6);


// ##### CommonJS example (e.g. Browserify) #####
// The result of this example is identical to example 1, but it's meant for
// usage through Browserify or compatible bundler.
/*
var fetcher = require('twitter-fetcher'); //debowerify may be needed
var config7 = {
  "id": '345170787868762112',
  "domId": 'example1',
  "maxTweets": 1,
  "enableLinks": true
};
fetcher.fetch(config7);
*/

// ##### AMD example (e.g. Require.js) #####
// The result of this example is identical to example 1, but it's meant for
// usage with Require.js or similar loader.
/*
require(['twitter-fetcher'], function (fetcher) {
  var config7 = {
    "id": '345170787868762112',
    "domId": 'example1',
    "maxTweets": 1,
    "enableLinks": true
  };
  fetcher.fetch(config7);
});
*/


// ##### Advanced example 3 #####
// An advance example to get data in Objects, instead of HTML Strings,
// to populate a template for example.

var config8 = {
  "id": '502160051226681344',
  "dataOnly": true,
  "customCallback": populateTpl
};

twitterFetcher.fetch(config8);

function populateTpl(tweets){
  var element = document.getElementById('example8');
  var html = '<ul>';
  for (var i = 0, lgth = tweets.length; i < lgth ; i++) {
    var tweetObject = tweets[i];
    html += '<li>'
      + (tweetObject.image ? '<div class="tweet-img"><img src="'+tweetObject.image+'" /></div>' : '')
      + '<p class="tweet-content">' + tweetObject.tweet + '</p>'
      + '<p class="tweet-infos">Posted on the ' + tweetObject.time + ', by ' + tweetObject.author + '</p>'
      + '<p class="tweet-link"><a href="' + tweetObject.permalinkURL + '">Link</a></p>'
    + '</li>';
  }
  html += '</ul>';
  element.innerHTML = html;
}
