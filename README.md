# Brightcove Player - autoHeight Plugin
A plugin to automatically set the player height according to a video's aspect ratio

# Usage
Add to your player, either through the Studio, Player Management API, or on-page.

[script src="//example.com/plugins/autoHeight.js"][/script]

Initialise with the plugin name "autoHeight", with blank brackets: {} in the Studio plugin config, or in page like this:

[script]videojs('player').autoHeight();[/script]

# Release notes
v1.3, 2015-02-03: now follows brightcove plugin guidelines, fully portable

v1.2, 2015-02-02: no longer dependent on embed code video id

v1.1, 2015-02-02: added window.onresize functionality to make it responsive   

v1.0, 2015-02-01: relies on data-video-id to be set in the player embed code

# Requirements
Requires the Brightcove Player, built upon the Video JS open-source player, available at [videojs.com](http://videojs.com).

Plugin provided as-is and is not supported by Brightcove in any way, shape or form.