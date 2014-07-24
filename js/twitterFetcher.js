/******************************************************************************
*  #### Twitter Post Fetcher v10.0 ####
*  Coded by Jason Mayes 2013. A present to all the developers out there.
*  www.jasonmayes.com
*  Please keep this disclaimer with my code if you use / modify it. Thanks. :-)
*  Got feedback or questions, ask here:
*  http://www.jasonmayes.com/projects/twitterApi/
*  Updates will be posted to this site.
******************************************************************************/
var twitterFetcher = function() {
  var domNode = '';
  var maxTweets = 20;
  var parseLinks = true;
  var queue = [];
  var inProgress = false;
  var printTime = true;
  var printUser = true;
  var formatterFunction = null;
  var supportsClassName = true;
  var showRts = true;
  var customCallbackFunction = null;
  var showInteractionLinks = true;

  function handleTweets(tweets){
    if (customCallbackFunction == null) {
      var x = tweets.length;
      var n = 0;
      var element = document.getElementById(domNode);
      var html = '<ul>';
      while(n < x) {
        html += '<li>' + tweets[n] + '</li>';
        n++;
      }
      html += '</ul>';
      element.innerHTML = html;
    } else {
      customCallbackFunction(tweets);
    }
  }

  function strip(data) {
    return data.replace(/<b[^>]*>(.*?)<\/b>/gi, function(a,s){return s;})
        .replace(/class=".*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi,
        '');
  }

  function getElementsByClassName (node, classname) {
    var a = [];
    var regex = new RegExp('(^| )' + classname + '( |$)');
    var elems = node.getElementsByTagName('*');
    for (var i = 0, j = elems.length; i < j; i++) {
        if(regex.test(elems[i].className)){
          a.push(elems[i]);
        }
    }
    return a;
  };

  return {
    fetch: function(id, domId, maxNumberOfTweets, enableLinks, showUser,
        showTime, dateFunction, showRetweet, customCallback, showInteraction) {
      if (maxNumberOfTweets === undefined) {
        maxNumberOfTweets = 20;
      }
      if (enableLinks === undefined) {
        parseLinks = true;
      }
      if (showUser === undefined) {
        showUser = true;
      }
      if (showTime === undefined) {
        showTime = true;
      }
      if (dateFunction === undefined) {
        dateFunction = 'default';
      }
      if (showRetweet === undefined) {
        showRetweet = true;
      }
      if (customCallback === undefined) {
        customCallback = null;
      }
      if (showInteraction === undefined) {
        showInteraction = true;
      }
      if (inProgress) {
        queue.push({"id":id, "domId":domId, "maxTweets":maxNumberOfTweets,
            "enableLinks":enableLinks, "showUser":showUser,
            "showTime":showTime, "dateFunction":dateFunction,
            "showRt":showRetweet, "customCallback":customCallback,
            "showInteraction": showInteraction});
      } else {
        inProgress = true;
        domNode = domId;

        maxTweets = maxNumberOfTweets;
        parseLinks = enableLinks;
        printUser = showUser;
        printTime = showTime;
        showRts = showRetweet;
        formatterFunction = dateFunction;
        customCallbackFunction = customCallback;
        showInteractionLinks = showInteraction;
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//cdn.syndication.twimg.com/widgets/timelines/' +
            id + '?&lang=en&callback=twitterFetcher.callback&' +
            'suppress_response_codes=true&rnd=' + Math.random();
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    },

    callback: function(data) {
      var div = document.createElement("div");
      div.innerHTML = data.body;
      if (typeof(div.getElementsByClassName) === 'undefined') {
         supportsClassName = false;
      }

      var tweets = [];
      var authors = [];
      var times = [];
      var rts = [];
      var tids = [];
      var x = 0;

      if (supportsClassName) {
        var tmp = div.getElementsByClassName('tweet');
        while (x < tmp.length) {
          if (tmp[x].getElementsByClassName('retweet-credit').length > 0) {
            rts.push(true);
          } else {
            rts.push(false);
          }
          if (!rts[x] || rts[x] && showRts) {
            tweets.push(tmp[x].getElementsByClassName('e-entry-title')[0]);
            tids.push(tmp[x].getAttribute('data-tweet-id'));
            authors.push(tmp[x].getElementsByClassName('p-author')[0]);
            times.push(tmp[x].getElementsByClassName('dt-updated')[0]);
          }
          x++;
        }
      } else {
        var tmp = getElementsByClassName(div, 'tweet');
        while (x < tmp.length) {
          tweets.push(getElementsByClassName(tmp[x], 'e-entry-title')[0]);
          tids.push(tmp[x].getAttribute('data-tweet-id'));
          authors.push(getElementsByClassName(tmp[x], 'p-author')[0]);
          times.push(getElementsByClassName(tmp[x], 'dt-updated')[0]);
          if (getElementsByClassName(tmp[x], 'retweet-credit').length > 0) {
            rts.push(true);
          } else {
            rts.push(false);
          }
          x++;
        }
      }

      if (tweets.length > maxTweets) {
        tweets.splice(maxTweets, (tweets.length - maxTweets));
        authors.splice(maxTweets, (authors.length - maxTweets));
        times.splice(maxTweets, (times.length - maxTweets));
        rts.splice(maxTweets, (rts.length - maxTweets));
      }

      var arrayTweets = [];
      var x = tweets.length;
      var n = 0;
      while(n < x) {
        if (typeof(formatterFunction) !== 'string') {
          var newDate = new Date(times[n].getAttribute('datetime')
              .replace(/-/g,'/').replace('T', ' ').split('+')[0]);
          var dateString = formatterFunction(newDate);
          times[n].setAttribute('aria-label', dateString);

          if (tweets[n].innerText) {
            // IE hack.
            if (supportsClassName) {
              times[n].innerText = dateString;
            } else {
              var h = document.createElement('p');
              var t = document.createTextNode(dateString);
              h.appendChild(t);
              h.setAttribute('aria-label', dateString);
              times[n] = h;
            }
          } else {
            times[n].textContent = dateString;
          }
        }
        var op = '';
        if (parseLinks) {
          if (printUser) {
            op += '<div class="user">' + strip(authors[n].innerHTML) +
                '</div>';
          }
          op += '<p class="tweet">' + strip(tweets[n].innerHTML) + '</p>';
          if (printTime) {
            op += '<p class="timePosted">' +
                times[n].getAttribute('aria-label') + '</p>';
          }
        } else {
          if (tweets[n].innerText) {
            if (printUser) {
              op += '<p class="user">' + authors[n].innerText + '</p>';
            }
            op += '<p class="tweet">' +  tweets[n].innerText + '</p>';
            if (printTime) {
              op += '<p class="timePosted">' + times[n].innerText + '</p>';
            }

          } else {
            if (printUser) {
              op += '<p class="user">' + authors[n].textContent + '</p>';
            }
            op += '<p class="tweet">' +  tweets[n].textContent + '</p>';
            if (printTime) {
              op += '<p class="timePosted">' + times[n].textContent + '</p>';
            }
          }
        }
        if (showInteractionLinks) {
          op += '<p class="interact"><a href="https://twitter.com/intent/' +
              'tweet?in_reply_to=' + tids[n] + '" class="twitter_reply_icon">' +
              'Reply</a><a href="https://twitter.com/intent/retweet?tweet_id=' +
              tids[n] + '" class="twitter_retweet_icon">Retweet</a>' +
              '<a href="https://twitter.com/intent/favorite?tweet_id=' +
              tids[n] + '" class="twitter_fav_icon">Favorite</a></p>';
        }
        arrayTweets.push(op);
        n++;
      }
      handleTweets(arrayTweets);
      inProgress = false;
      if (queue.length > 0) {
        twitterFetcher.fetch(queue[0].id, queue[0].domId, queue[0].maxTweets,
            queue[0].enableLinks, queue[0].showUser, queue[0].showTime,
            queue[0].dateFunction, queue[0].showRt, queue[0].customCallback,
            queue[0].showInteraction);
        queue.splice(0,1);
      }
    }
  }
}();