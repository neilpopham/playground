// ==UserScript==
// @name         Twitch Drop Auto-Claim
// @namespace    https://greasyfork.org/en/users/1077259-synthetic
// @version      0.5
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
    const VERSION = 0.5;

    // Page element selectors
    const PROGRESS_BAR = 'div[data-a-target="tw-progress-bar-animation"]';
    const CLAIM_DROP = 'button.ScCoreButton-sc-ocjdkq-0.ScCoreButtonPrimary-sc-ocjdkq-1.dNGoHt.hdAxZi';

    // Handy constants
    const NOW = (new Date()).getTime();

    /**
     * The rate to use if none can be calculated, in seconds.
     *
     * The rate is used to calculate the next refresh,
     * and is defined as the time taken to progress 1%.
     */
    const THIRTY_RATE = 18; // seconds

    /**
     * The maximum time before the next refresh, in seconds.
     *
     * We don't want to calculate too early, as the longer the timeframe
     * we have the more accurate the rate calculation will be.
     * We also don't want to trigger the bot by refreshing too much.
     */
    const MAX_REFRESH = 1800; // seconds

    /**
     * The maximum age of a previous read, in seconds.
     *
     * If we find a previous read but it's too old we just ignore it,
     * as it is unlikely to be relevant to this drop.
     */
    const THRESHOLD = 15000; // seconds

    /**
     * A buffer to add to the final refresh to ensure we have hit 100%, in seconds.
     *
     * As we try to accurately calculate the time required to reach 100% we may fall just short.
     * This buffer is used to try to ensure we are just over rather than just under.
     */
    const TIME_BUFFER = 10; // seconds

    /**
     * Retrieves stored data
     *
     * @return object|boolean
     */
    const getPrevious = () => {
        var previous = GM_getValue('previous');
        if (typeof previous == 'undefined' || previous == false) {
            return false;
        }
        try {
            previous = JSON.parse(previous);
        } catch (e) {
            return false;
        }
        if (typeof previous.version == 'undefined') {
            previous.version = typeof previous.start == 'undefined' ? 0.1 : 0.2;
        }
        if (previous.version == 0.1) {
            return false;
        }
        if (previous.version < 0.4) {
            previous = {
                base: {
                    time: previous.base,
                    progress: previous.start,
                    offset: 0.5,
                },
                last: {
                    time: previous.timestamp,
                    progress: previous.progress,
                    expected: null,
                },
                version: VERSION
            };
        }
        return previous;
    };

    /**
     * Converts a calculated progress rate into a fixed value (30m, 45m, 1hr, 2r, 3hr, 4hr).
     *
     * @param  integer rate The calculated rate.
     * @return integer      The fixed rate.
     */
    const fixedRate = (rate) => {
        var diff = 10000;
        var fixed = THIRTY_RATE;
        [18, 27, 36, 72, 108, 144].forEach((r) => {
            if (Math.abs(rate - r) < diff) {
                diff = Math.abs(rate - r);
                fixed = r;
            }
        });
        return fixed;
    };

    /**
     * Sets the timer to refresh the page.
     *
     * @param  integer refresh The number of seconds to wait before refreshing.
     * @return void
     */
    const setTimer = (refresh) => {
        console.log('Setting refresh of', refresh, 'seconds');
        window.setTimeout(
            () => {
                window.location.reload();
            },
            refresh * 1000
        );
    };

    /**
     * Clicks the Claim button.
     *
     * @return boolean
     */
    const claimDrop = () => {
        if (document.querySelector(CLAIM_DROP)) {
            document.querySelector(CLAIM_DROP).click();
            return true;
        }
        return false;
    };

    /**
     * Runs when the dom updates, used to gain access to the progress bars, when they finally load.
     * Contains all the code to calculate refresh
     *
     * @param  array mutationsList The list of mutations.
     * @return void
     */
    const onMutate = function(mutationsList) {
        mutationsList.forEach(mutation => {
            if (refresh != null) {
                return;
            }
            const nodes = document.querySelectorAll(PROGRESS_BAR);
            if (!nodes.length) {
                return;
            }
            clearTimeout(timeout);
            var progress = 0;
            for (var i = 0; i < nodes.length; i++) {
                progress = Math.max(progress, nodes[i].getAttribute('value'));
            }
            console.log('Progress', progress);
            if (progress == 100) {
                if (claimDrop()) {
                    console.log('Drop claimed!');
                    refresh = THIRTY_RATE * 100;
                    progress = 0;
                } else {
                    refresh = THIRTY_RATE;
                }
            } else {
                var rate;
                if (previous) {
                    const increase = {
                        base: progress - previous.base.progress,
                        last: progress - previous.last.progress,
                    }
                    if (increase.last < 1) {
                        previous = false;
                    } else {
                        rate = fixedRate(Math.ceil(interval.base / increase.base));
                        if (previous.last.expected) {
                            console.log('Expected increase of', previous.last.expected, '%');
                            console.log('Actual increase is', increase.last, '%')
                            if (previous.last.expected == increase.last) {
                                var diff = Math.floor((rate * previous.base.offset) * 1000);
                                previous.base.time -= diff;
                            }
                            previous.base.offset /= 2;
                            if (previous.base.offset < 0.01) {
                                previous.base.offset = 0;
                            }
                        }
                    }
                }
                if (!previous) {
                    rate = THIRTY_RATE;
                    previous = {
                        base: {
                            time: NOW,
                            progress: progress,
                            offset: 0.5,
                        },
                        last: {
                            time: null,
                            progress: null,
                            expected: null,
                        },
                        version: VERSION
                    };
                }

                console.log('Rate', rate);
                refresh = (100 - progress) * rate;

                previous.last.expected = null;
                if (previous) {
                    if (refresh < MAX_REFRESH) {
                        var p = Math.min(100, previous.base.progress + (interval.base / rate));
                        refresh = Math.ceil((100 - p) * rate) + TIME_BUFFER;
                        console.log('Accurate progress', p);
                    } else if (previous.base.offset > 0) {
                        previous.last.expected = Math.floor(MAX_REFRESH / rate);
                        refresh = (previous.last.expected * rate) - Math.floor(rate * previous.base.offset);
                    } else {
                        refresh = MAX_REFRESH;
                    }
                }

                console.log('Refresh', refresh);
            }

            if (progress == 0) {
                previous.base = {
                    time: NOW,
                    progress: 0,
                    offset: 0,
                };
                previous.last.expected = null;
            }

            previous.last.time = NOW;
            previous.last.progress = progress;
            previous.last.rate = rate;

            GM_setValue('previous', JSON.stringify(previous));
            setTimer(refresh);
        });
    };

    console.log('Loaded at', new Date());

    var timeout;
    var refresh = null;
    var interval;
    var previous = getPrevious();

    if (previous) {
        console.log('Baseline', new Date(previous.base.time));
        console.log('Last seen', new Date(previous.last.time));
        interval = {
            base: (NOW - previous.base.time) / 1000,
            last: (NOW - previous.last.time) / 1000
        }
        console.log('Interval', Math.round(interval.base));
        if (interval.base > THRESHOLD || interval.last > MAX_REFRESH + 10) {
            previous = false;
            console.log('Interval is too large');
        }
    }

    if (!previous) {
        console.log('No relevant read');
    }

    // If we can't find a progress bar after 10s this will set a refesh
    timeout = window.setTimeout(
        () => {
            GM_setValue('previous', false);
            setTimer(100 * THIRTY_RATE);
        },
        10000
    );

    var observer = new MutationObserver(onMutate);
    observer.observe(document.body, { childList: true, subtree: true });

})();
