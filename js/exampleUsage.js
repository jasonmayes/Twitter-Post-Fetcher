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
 * How to use fetch function:
 * @param {string} Your Twitter widget ID.
 * @param {string} The ID of the DOM element you want to write results to.
 * @param {int} Optional - the maximum number of tweets you want returned. Must
 *     be a number between 1 and 20.
 * @param {boolean} Optional - set true if you want urls and hash
       tags to be hyperlinked!
 * @param {boolean} Optional - Set false if you don't want user photo /
 *     name for tweet to show.
 * @param {boolean} Optional - Set false if you don't want time of tweet
 *     to show.
 * @param {function/string} Optional - A function you can specify to format
 *     tweet date/time however you like. This function takes a JavaScript date
 *     as a parameter and returns a String representation of that date.
 *     Alternatively you may specify the string 'default' to leave it with
 *     Twitter's default renderings.
 * @param {boolean} Optional - Show retweets or not. Set false to not show.
 * @param {function/string} Optional - A function to call when data is ready. It
 *     also passes the data to this function should you wish to manipulate it
 *     yourself before outputting. If you specify this parameter you  must
 *     output data yourself!
 * @param {boolean} Optional - Show links for reply, retweet, favourite. Set
 *     false to not show.
 */

// ##### Simple example 1 #####
// A simple example to get my latest tweet and write to a HTML element with
// id "tweets". Also automatically hyperlinks URLS and user mentions and
// hashtags.
twitterFetcher.fetch('345170787868762112', 'example1', 1, true);


// ##### Simple example 2 #####
// A simple example to get my latest 5 of my favourite tweets and write to a
// HTML element with id "talk". Also automatically hyperlinks URLS and user
// mentions and hashtags but does not display time of post.
twitterFetcher.fetch('347099293930377217', 'example2', 5, true, true, false);


// ##### Advanced example #####
// An advance example to get latest 5 posts using hashtag #API and write to a
// HTML element with id "tweets2" without showing user details and using a
// custom format to display the date/time of the post, and does not show
// retweets.
twitterFetcher.fetch('345690956013633536', 'example3', 3, true, false, true,
    dateFormatter, false);

// For advanced example which allows you to customize how tweet time is
// formatted you simply define a function which takes a JavaScript date as a
// parameter and returns a string!
// See http://www.w3schools.com/jsref/jsref_obj_date.asp for properties
// of a Date object.
function dateFormatter(date) {
  return date.toTimeString();
}


// ##### Advanced example 2 #####
// Similar as previous, except this time we pass a custom function to render the
// tweets ourself! Useful if you need to know exactly when data has returned or
// if you need full control over the output.
twitterFetcher.fetch('345690956013633536', '', 3, true, true, true, '', false,
    handleTweets, false);

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