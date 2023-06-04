// ==UserScript==
// @name         Twitch Stream Auto-Watch
// @namespace    https://greasyfork.org/en/users/1077259-synthetic
// @version      0.1
// @description  Auto-Watches a stream that is offline on load, as soon as it goes online.
// @author       @Synthetic
// @license      MIT
// @match        https://www.twitch.tv/*
// @exclude      https://www.twitch.tv/inventory
// @exclude      https://www.twitch.tv/drops/inventory
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitch.tv
// ==/UserScript==

(function() {
    'use strict';

    // The current version
    const VERSION = 0.1;

    // Page element selectors
    const STATUS_OFFLINE = 'div.channel-status-info--offline';
    const STATUS_LIVE = 'div.channel-status-info--live';
    const WATCH_NOW = '[data-a-target="home-live-overlay-button"]';

    /**
     * Clicks the Claim button.
     *
     * @return boolean     
     */
    const clickWatch = () => {
        if (document.querySelector(WATCH_NOW)) {
            document.querySelector(WATCH_NOW).click();
            return true;
        }
        return false;
    };    

    const onMutate = function(mutationsList) {
        mutationsList.forEach(mutation => {
            const offline = document.querySelectorAll(STATUS_OFFLINE);
            if (offline.length) {
                clearTimeout(timeout);
            }            
            const online = document.querySelectorAll(STATUS_LIVE);
            if (online.length) {
                if (clickWatch()) {
                    observer.disconnect();
                }
            }
        })
    };

    console.log('Loaded at', new Date());

    var timeout = window.setTimeout(
        () => {
            observer.disconnect();
        },
        10000
    );    

    var observer = new MutationObserver(onMutate);
    observer.observe(document.body, { childList: true, subtree: true });
    
})();

/*
BEFORE CHANNEL LIVE

<div class="Layout-sc-1xcs6mc-0 dyQMib"><div class="Layout-sc-1xcs6mc-0 dDjFoM channel-status-info channel-status-info--offline"><p class="CoreText-sc-1txzju1-0 jiQuvm">Offline</p></div></div>

<div class="Layout-sc-1xcs6mc-0 dDjFoM channel-status-info channel-status-info--offline"><p class="CoreText-sc-1txzju1-0 jiQuvm">Offline</p></div>

document.querySelectorAll('.channel-status-info');

NOTIFICATIONS ON
<p class="CoreText-sc-1txzju1-0 cvIbSB">You will be notified when RocketLeagueMENA is live</p>

NOTIFICATIONS OFF
<div data-a-target="tw-core-button-label-text" class="Layout-sc-1xcs6mc-0 phMMp">Turn on Notifications</div>


AFTER LIVE

<div class="Layout-sc-1xcs6mc-0 dDjFoM channel-status-info channel-status-info--live"><p class="CoreText-sc-1txzju1-0 jiQuvm">Live Now</p></div>

<div class="Layout-sc-1xcs6mc-0"><span class="CoreText-sc-1txzju1-0 hfMGmo"><div class="Layout-sc-1xcs6mc-0 kPXfEJ"><a data-a-target="home-live-overlay-button" class="ScCoreLink-sc-16kq0mq-0 jSrrlW tw-link" href="/rocketleaguemena">Watch now with&nbsp;<span class="ScAnimatedNumber-sc-1iib0w9-0 gPFBFp">2K</span>&nbsp;viewers</a></div></span></div>


*/