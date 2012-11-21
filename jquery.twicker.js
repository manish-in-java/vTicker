/*
 * ! Twitter Ticker 1.0.0 - jQuery Plugin
 * 
 * Pulls public Twitter feeds for a specified Twitter user and displays them as
 * vertically scrolling news ticker items.
 * 
 * This plugin is made available under the terms of the MIT license.  The full
 * license terms are given below.  This plugin is free for anyone to use, in
 * all types of software (even commercial).  The author bears no liability
 * arising out of the use of this plugin.  The use of this plugin is entirely at
 * the discretion and risk of the person or organization using this plugin.
 *
 * Copyright (C) 2012
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function($) {
    var defaults = {
        animation : "",
        debug : false,
        direction : 'up',
        excludeReplies : true,
        handle : "twitter",
        height : 0,
        includeRetweets : false,
        interval : 4000,
        isPaused : false,
        items : 3,
        maxItems : 20,
        mousePause : true,
        next : null,
        pause : null,
        previous : null,
        resume : null,
        speed : 700,
        url : "http://api.twitter.com/1/statuses/user_timeline.json",
        onChange : null,
        onLoad : null,
        onPause : null,
        onResume : null
    };
    var methods = {
        error : function(options, status, error) {
            if (options.debug) {
                console.log("Unable to load tweets for screen name [" + options.handle + "] due to error [" + error + "].  HTTP status code was " + status + ".");
            }
        },
        init : function(obj, options) {
            $.ajax({
                type : 'GET',
                dataType : 'jsonp',
                url : options.url,
                data : {
                    screen_name : options.handle,
                    include_rts : options.includeRetweets,
                    exclude_replies : options.excludeReplies,
                    count : options.maxItems
                },
                success : function(data) {
                    methods.show(obj, options, data);

                    if (typeof (options.onLoad) === "function") {
                        options.onLoad(obj);
                    }
                },
                error : function(request, status, error) {
                    methods.error(options, status, error);
                }
            });
        },
        show : function(obj, options, tweets) {
            if (options.debug) {
                console.log("Received tweets for screen name [" + options.handle + "].");
            }

            var ticker = obj.children("ul");
            for (index in tweets) {
                ticker.append("<li>" + tweets[index].text.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href='$1'>$1</a>")
                        + "</li>");
            }

            obj.vTicker(options);
        }
    };
    jQuery.fn.twicker = function(options) {
        return this.each(function() {
            methods.init($(this), $.extend(defaults, options));
        });
    }
})(jQuery);
