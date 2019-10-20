# Google Tracking-B-Gone

A greasemonkey script to strip click tracking from Google search results.

## Background

Google's search results page wraps a gateway (i.e. tracking) URL around the links to individual results. An annoying side effect is that you can't copy and paste links directly out of search results. This userscript fixes that problem.

## greasyfork.org

https://greasyfork.org/en/scripts/1810-google-tracking-b-gone

## Source Code and Bug Reports

https://github.com/stacybrock/google-tracking-b-gone

Please report any issues via the [GitHub issue tracker](https://github.com/stacybrock/google-tracking-b-gone/issues).

## Changelog

* 2019.10.20 - version 3.1 - Fix issue with Cached, More, and other links. (Thanks to [@dicktyr](https://github.com/dicktyr) for writing this fix!)
* 2019.03.11 - version 3.0 - Rewrite to catch and neutralize all click events attached to links.
* 2017.04.19 - version 2.4 - Updated due to changes to the search results page. (Thanks to Nothing4You for the bug report.)
* 2016.02.19 - version 2.3 - Improved handling of incremental search results; streamlined script performance; fixed borked PDF results (thanks Connor Behan for the bug report); removed code for (now defunct) real-time search.
* 2014.02.28 - version 2.2.1 - Attempt to fix a rare unreproducible bug; add @version and update @include.
* 2010.11.27 - version 2.1 - Added support for Google SSL. (Thanks to anonymous for the bug report.)
* 2010.11.24 - version 2.0 - Rewrite in response to search result page changes. (Thanks to rimmington for bug report.)
* 2010.06.27 - version 1.7 - Fixed bug with URL encoded links. (Thanks to Yomi for the bug report)
* 2010.03.29 - version 1.6 - Fixed secondary links.
* 2009.12.09 - version 1.5 - Fix for "q=" type search result pages.
* 2009.12.09 - version 1.4 - Big changes due to Google's latest feature bloats: fade in and real-time search results.
* 2009.10.09 - version 1.3 - Fixed broken shopping result links, added support for secondary links (Thanks to uncajesse for the bug report.)
* 2009.05.06 - version 1.2 - Added support for cached, featured, and sitelink links. (Thanks, Prez, for the bug report.)
* 2009.04.26 - version 1.1 - Damn it, Google, make up your mind!
* 2009.04.22 - version 1.0 - Initial release.
