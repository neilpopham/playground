// ==UserScript==
// @name         Twitch Drop Auto-Claim
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Auto-Claims drops, while attempting to evade bot detection and claim quickly.
// @author       @Synthetic
// @license      MIT
// @match        https://www.twitch.tv/inventory
// @match        https://www.twitch.tv/drops/inventory
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitch.tv
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function() {
    'use strict';

    // The current version
    const VERSION = 0.3;

    // Page element selectors
    const PROGRESS_BAR = 'div[data-a-target="tw-progress-bar-animation"]';
    const CLAIM_DROP = 'button.ScCoreButton-sc-ocjdkq-0.ScCoreButtonPrimary-sc-ocjdkq-1.dNGoHt.hdAxZi';

    const THIRTY_RATE = 18;
    const MIN_REFRESH = 1800;

    const setTimer = (refresh) => {
        console.log('Setting refresh of', refresh, 'seconds');
        window.setTimeout(() => { window.location.reload(); }, refresh * 1000);
    }

    const claimDrop = () => {
        if (document.querySelector(CLAIM_DROP)) {
            document.querySelector(CLAIM_DROP).click();
            return true;
        }
        return false;
    }

    const onMutate = function(mutationsList) {
        mutationsList.forEach(mutation => {
            if (refresh == null) {
                const progress = document.querySelectorAll(PROGRESS_BAR);
                if (progress.length) {
                    clearTimeout(timeout);
                    var p = 0;
                    for (var i = 0; i < progress.length; i++) {
                        p = Math.max(p, progress[i].getAttribute('value'));
                    }
                    console.log('Progress', p);
                    if (p == 100) {
                        if (claimDrop()) {
                            console.log('Drop claimed!');
                            p = 0;
                            refresh = THIRTY_RATE * 100;
                            base = (new Date()).getTime();
                            start = 0;
                        } else {
                            refresh = THIRTY_RATE;
                        }
                    } else {
                        var rate;
                        if (previous) {
                            var increase = p - start;
                            rate = increase < 1 ? THIRTY_RATE : Math.ceil(interval / increase);
                        } else {
                            rate = THIRTY_RATE;
                            start = p;
                        }
                        console.log('Rate', rate);
                        refresh = Math.min((100 - p) * rate, MIN_REFRESH);
                        console.log('Refresh', refresh);
                    }
                    GM_setValue(
                        'previous',
                        JSON.stringify({
                            base: base,
                            start: start,
                            timestamp: (new Date()).getTime(),
                            progress: p,
                            version: VERSION
                        })
                    );
                    setTimer(refresh);
                }
            }
        })
    };

    console.log('Loaded at', new Date());

    var timeout;
    var refresh = null;
    var interval;
    var base;
    var start;
    var previous = GM_getValue('previous');

    if (previous) {
        previous = JSON.parse(previous);
        base = previous.base;
        start = previous.start;
        if (typeof start == 'undefined') {
            previous = false;
            console.log('Welcome to v0.2');
        } else if (typeof previous.version == 'undefined') {
            previous = false;
            console.log('Welcome to v0.3');
        } else {
            console.log('Last seen', new Date(previous.timestamp));
            console.log('First read', new Date(base));
            interval = ((new Date()).getTime() - base) / 1000;
            console.log('Interval', Math.round(interval));
            if (interval > 15000) {
                previous = false;
                console.log('Interval is too large');
            }
        }

    }

    if (!previous) {
        console.log('No relevant read');
        base = (new Date()).getTime();
        start = 0;
    }

    timeout = window.setTimeout(
        () => {
            GM_setValue('previous', false);
            setTimer(100 * THIRTY_RATE);
        },
        10000
    );

    var observer = new MutationObserver(onMutate);
    observer.observe(document.body, {childList: true, subtree: true});
})();
