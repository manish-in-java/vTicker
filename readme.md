# jQuery vertical news ticker plugin
------------------------------------

This is a modification to the original jQuery vertical news ticker implemented by JugBit.  For the original plugin and licensing details, please refer to the original author's website at http://www.jugbit.com/jquery-vticker-vertical-news-ticker/.

Compared to the original plugin, this version allows the ticker animation to be controlled manually.  Users can navigate backward and forward and pause-resume the ticker animation.

If you like this project and use it for any of your applications, please consider supporting the original author by making a donation from their website.


# Pre-requisites
----------------

jQuery version 1.2 or higher.  Tested up to jQuery version 1.7.1.


# Options
---------

This plugin supports the following options (shown with their default values):

    var defaults = {
        speed : 700,
        interval : 4000,
        items : 3,
        animation : '',
        mousePause : true,
        height : 0,
        next : null,
        previous : null,
        pause : null,
        resume : null,
        direction : 'up',
        isPaused : false,
        debug : false,
        onChange : null,
        onPause : null,
        onResume : null
    };

 * **speed** - speed of scrolling animation, in milliseconds (default 700)
 * **interval** - wait time between scrolling, in milliseconds (default 4000)
 * **items** - number of items to show at a time (default 3)
 * **animation** - animation to be used for scrolling. To fade in/fade out use 'fade'
 * **mousePause** - whether stop scrolling on mouse over (default true)
 * **height** - vTicker container height. Also disables all items auto height calculation. It is usable to remove gaps between items. (default 0 – it means off)
 * **next** - jQuery selector for a DOM element that can be clicked for scrolling to the next item
 * **previous** - jQuery selector for a DOM element that can be clicked for scrolling to the previous item
 * **pause** - jQuery selector for a DOM element that can be clicked to pause (ongoing) scrolling
 * **resume** - jQuery selector for a DOM element that can be clicked to resume (paused) scrolling
 * **direction** - direction of scroll. Values are 'up' and 'down'. (default 'up')
 * **isPaused** - whether the animation is paused when the plugin first loads (default false)
 * **debug** - whether debugging messages should be printed (default false)
 * **onChange** - callback function to call when a new item is scrolled into view
 * **onPause** - callback function to call when the animation is paused
 * **onResume** - callback function to call when the animation resumes


# Usage
-------

### Starting the ticker

Apply the plugin on a `div` element containing a `ul` element using:

    jQuery("#ticker").vTicker();

A full example is shown below:

    <!DOCTYPE html>
    <html>
        <head>
            <title>jQuery vertical news ticker</title>
            <script src="http://code.jquery.com/jquery-1.8.2.min.js" text="text/javascript"></script>
            <script src="https://raw.github.com/manish-in-java/vTicker/master/jquery.vticker.js" text="text/javascript"></script>
            <script>
                jQuery(document).ready(function() {
                    jQuery("#ticker").vTicker();
                });
            </script>
            <style>
                body, html {
                    color: #333;
                    font-family: Tahoma;
                    font-size: 24px;
                    height: 100%;
                    width: 100%;
                }
            </style>
        </head>
        <body>
            <div id="ticker">
                <ul>
                    <li>Sunday</li>
                    <li>Monday</li>
                    <li>Tuesday</li>
                    <li>Wednesday</li>
                    <li>Thursday</li>
                    <li>Friday</li>
                    <li>Saturday</li>
                </ul>
            </div>
        </body>
    </html>

### Next, previous, pause and resume

It is possible to manually scroll the ticker forward or backward.  It is also possible to pause the ticker and resume a paused ticker.

Any DOM element can be used to control the ticker manually.  For each of the manual operations to be supported, a jQuery DOM element selector must be passed to the plugin when initializing it.  For example:


    jQuery("#ticker").vTicker({ next : "#next" });

signifies that the DOM element with the id `next` be used to manually scroll the ticker in the forward direction.  Similarly,

    jQuery("#ticker").vTicker({ next : "#next", previous : "#previous", pause : "#pause", resume : "#resume" });

signifies that the DOM elements with ids `next`, `previous`, `pause` and `resume` be used to manually scroll the ticker forward, scroll it backward, pause the ticker and resume the ticker, respectively.

A full example is shown below:

    <!DOCTYPE html>
    <html>
        <head>
            <title>jQuery vertical news ticker</title>
            <script src="http://code.jquery.com/jquery-1.8.2.min.js" text="text/javascript"></script>
            <script src="https://raw.github.com/manish-in-java/vTicker/master/jquery.vticker.js" text="text/javascript"></script>
            <script>
                jQuery(document).ready(function() {
                    jQuery("#ticker").vTicker({ 
                        items : 1,
                        mousePause : false,
                        next : "#next",
                        previous : "#previous",
                        pause : "#pause",
                        resume : "#resume"
                    });
                });
            </script>
            <style>
                body, html {
                    color: #333;
                    font-family: Tahoma;
                    font-size: 24px;
                    height: 100%;
                    width: 100%;
                }
                #tickerControls>img {
                    cursor: pointer;
                }
            </style>
        </head>
        <body>
            <div id="ticker">
                <ul>
                    <li>Sunday</li>
                    <li>Monday</li>
                    <li>Tuesday</li>
                    <li>Wednesday</li>
                    <li>Thursday</li>
                    <li>Friday</li>
                    <li>Saturday</li>
                </ul>
            </div>
            <div id="tickerControls">
                <img alt="Previous" id="previous" src="http://icons.iconarchive.com/icons/visualpharm/must-have/16/Previous-icon.png" title="Previous" />
                <img alt="Next" id="next" src="http://icons.iconarchive.com/icons/visualpharm/must-have/16/Next-icon.png" title="Next" />
                <img alt="Pause" id="pause" src="http://icons.iconarchive.com/icons/visualpharm/must-have/16/Pause-icon.png" title="Pause" />
                <img alt="Resume" id="resume" src="http://icons.iconarchive.com/icons/visualpharm/must-have/16/Play-icon.png" title="Resume" />
            </div>
        </body>
    </html>

### Callbacks

The plugin also notifies of any changes to its state.  The following initialization options are supported to configure callback functions:

 * **onChange** - function to call after a new item has finished scrolling into view
 * **onPause** - function to call when the animation is paused
 * **onResume** - function to call when the animation resumes

For example,

    jQuery("#ticker").vTicker({ onChange : onTick });

signifies that whenever the ticker moves forward or backward, a function called `onTick` should be called.