// Google Tracking-B-Gone
// version 2.4
// Release Date: 2017-04-19
// https://greasyfork.org/en/scripts/1810-google-tracking-b-gone
// https://github.com/stacybrock/google-tracking-b-gone
//
// ===== INSTRUCTIONS =====
//
// This is a Greasemonkey user script.
//
// To use this script, get Greasemonkey: http://www.greasespot.net
// After you've installed it, come back to this page. A dialog box will
// appear asking you if you want to install this script.
//
// To uninstall, go to Tools->Greasemonkey->Manage User Scripts, select
// "Google Tracking-B-Gone" from the list on the left, and click
// Uninstall.
//
//
// ==UserScript==
// @name           Google Tracking-B-Gone
// @namespace      http://notoriety.org
// @version        2.4
// @description    Strips click tracking from Google search results
//
// @include        http://www.google.*
// @include        https://www.google.*
//
// @grant          none
// ==/UserScript==

var debug = false;

if (debug) { console.log("Google Tracking-B-Gone initialized."); }

var changeObserver = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if ((mutation.target.nodeName == 'BODY' && mutation.target.attributes.getNamedItem('id').value == 'gsr') ||
        (mutation.target.nodeName == 'DIV' && mutation.target.attributes.getNamedItem('id').value == 'taw')) {
      doIt();
    }
  });
});
changeObserver.observe(document.documentElement, { childList: true, subtree: true });


function doIt() {
  if (debug) { console.log("doIt() called..."); }
  var resultLinks = $x("//a[@onmousedown]", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
  resultLinks.forEach(function(link) {  // loop over links
    if (link.getAttribute('onmousedown')) {
      link.removeAttribute('onmousedown');
    }
  });

  resultLinks = $x("//a");
  resultLinks.forEach(function(link) {  // loop over links
    var oldLink = link.href;
    if (/^http:\/\/www.google.co/.test(oldLink) || /^https:\/\/encrypted.google.co/.test(oldLink)) {
      var matches = /url\?(url|q)=(.+?)&/.exec(oldLink);
      if (matches != null) {
        link.href = unescape(matches[2]);
      }
    } else if ((/pdf$/i).test(oldLink)) {
      link.href = oldLink;
    }
  });
}


// XPath helper, from
// https://wiki.greasespot.net/XPath_Helper
function $x() {
  var x='';
  var node=document;
  var type=0;
  var fix=true;
  var i=0;
  var cur;

  function toArray(xp) {
    var final=[], next;
    while (next=xp.iterateNext()) {
      final.push(next);
    }
    return final;
  }

  while (cur=arguments[i++]) {
    switch (typeof cur) {
      case "string": x+=(x=='') ? cur : " | " + cur; continue;
      case "number": type=cur; continue;
      case "object": node=cur; continue;
      case "boolean": fix=cur; continue;
    }
  }

  if (fix) {
    if (type==6) type=4;
    if (type==7) type=5;
  }

  // selection mistake helper
  if (!/^\//.test(x)) x="//"+x;

  // context mistake helper
  if (node!=document && !/^\./.test(x)) x="."+x;

  var result=document.evaluate(x, node, null, type, null);
  if (fix) {
    // automatically return special type
    switch (type) {
      case 1: return result.numberValue;
      case 2: return result.stringValue;
      case 3: return result.booleanValue;
      case 8:
      case 9: return result.singleNodeValue;
    }
  }

  return fix ? toArray(result) : result;
}
