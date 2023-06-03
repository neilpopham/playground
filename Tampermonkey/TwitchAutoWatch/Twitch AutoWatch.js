// ==UserScript==
// @name         Twitch Stream Auto-Watch
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Auto-Watches a stream that just started.
// @author       @Synthetic
// @license      MIT
// @match        https://www.twitch.tv/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitch.tv
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function() {
    'use strict';

    // The current version
    const VERSION = 0.1;

    // Page element selectors


    const onMutate = function(mutationsList) {
        mutationsList.forEach(mutation => {

        })
    };

    console.log('Loaded at', new Date());


    var observer = new MutationObserver(onMutate);
    observer.observe(document.body, {childList: true, subtree: true});
})();
