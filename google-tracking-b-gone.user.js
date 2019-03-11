// Google Tracking-B-Gone
// version 3.0
// Release Date: 2019-03-11
// https://greasyfork.org/en/scripts/1810-google-tracking-b-gone
// https://github.com/stacybrock/google-tracking-b-gone
//
// ===== INSTRUCTIONS =====
//
// This is a Tampermonkey user script.
//
// To use this script, get Tampermonkey: https://tampermonkey.net
// After you've installed it, come back to this page. A dialog box will
// appear asking you if you want to install this script.
//
// To uninstall, open the Tampermonkey dashboard and click the delete
// icon next to "Google Tracking-B-Gone" in the list of installed
// scripts.
//
//
// ==UserScript==
// @name           Google Tracking-B-Gone
// @namespace      http://notoriety.org
// @version        3.0
// @description    Strips click tracking from Google search results
//
// @include        http://www.google.*
// @include        https://www.google.*
//
// @grant          none
// ==/UserScript==

var debug = false;

debug && console.log("Google Tracking-B-Gone initialized.");

var checkMutation = function(mutation) {
  var target = mutation.target;
  if (target && target.nodeName.toLowerCase() === 'a') {
    cleanLink(target);
  } else if (target instanceof Element) {
    target.querySelectorAll('a').forEach(cleanLink);
  }
};

var changeObserver = new MutationObserver(function(mutations) {
  if (mutations.target) {
    checkMutation(mutations);
  } else {
    mutations.forEach && mutations.forEach(checkMutation);
  }
});
changeObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['href']
});

var blockEvent = function (event) {
  event.stopPropagation();
};

function cleanLink(link) {
  debug && console.log("cleanLink() called...");
  link.onmousedown = link.onmouseup = link.onmouseenter = link.onmousemove =
      link.ondbclick = link.onclick = link.oncontextmenu = blockEvent;
}
