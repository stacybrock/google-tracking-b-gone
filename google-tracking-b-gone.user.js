// Google Tracking-B-Gone
// version 2.3
// Release Date: 2016-02-19
// https://greasyfork.org/en/scripts/1810-google-tracking-b-gone
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
// @version        2.3
// @description    Strips click tracking from Google search results
//
// @include        http://www.google.*
// @include        https://www.google.*
//
// @grant          none
// ==/UserScript==

var debug = false;

if (debug) { console.log("Google Tracking-B-Gone initialized."); }

var divMain = document.querySelector('div#main');
var sfdiv = document.querySelector('div#sfdiv');

var changeObserver = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    var resultsDiv = document.querySelector('#ires');
    if (resultsDiv) {
      doIt();
    }
  });
});
changeObserver.observe(divMain, { attributes: true, childList: true, characterData: true });
changeObserver.observe(sfdiv, { attributes: true, childList: true, characterData: true });


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
// http://wiki.greasespot.net/Code_snippets
function $x() {
  var x='',          // default values
      node=document,
      type=0,
      fix=true,
      i=0,
      toAr=function(xp){      // XPathResult to array
	var final=[], next;
	while(next=xp.iterateNext())
	  final.push(next);
	return final
      },
      cur;
  while (cur=arguments[i++])      // argument handler
    switch(typeof cur) {
      case "string":x+=(x=='') ? cur : " | " + cur;continue;
      case "number":type=cur;continue;
      case "object":node=cur;continue;
      case "boolean":fix=cur;continue;
    }
  if (fix) {      // array conversion logic
    if (type==6) type=4;
    if (type==7) type=5;
  }
  if (!/^\//.test(x)) x="//"+x;            // selection mistake helper
    if (node!=document && !/^\./.test(x)) x="."+x;  // context mistake helper
  var temp=document.evaluate(x,node,null,type,null); //evaluate!
  if (fix)
    switch(type) {                              // automatically return special type
      case 1:return temp.numberValue;
      case 2:return temp.stringValue;
      case 3:return temp.booleanValue;
      case 8:return temp.singleNodeValue;
      case 9:return temp.singleNodeValue;
    }
  return fix ? toAr(temp) : temp;
}
