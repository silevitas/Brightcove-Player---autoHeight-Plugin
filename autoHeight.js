// (c)2015 Si Levitas
// Plugin provided as-is and is not supported by Brightcove in any way, shape or form.

// v1.3 - 2015-02-03: now follows brightcove plugin guidelines, fully portable
// v1.2 - 2015-02-02: no longer dependent on embed code video id
// v1.1 - 2015-02-02: added resize listener for responsive sizing
// v1.0 - 2015-02-01: initial release

// Add to the player, initialise with plugin name "autoHeight", and empty brackets for json options, {}.

videojs.plugin('autoHeight', function(){
	videojs.log("AutoHeight Plugin loaded!");
	
	var player = this;

	// Wait for video to be loaded
	player.on("loadedmetadata", function(){
		// What's currently loaded?
		var id = player.mediainfo.id;	
		// Access the videoDTO from the mediainfo object
		var MP4Renditions = player.mediainfo.sources.filter(function (el) {
			return (el.src != null && el.container == 'MP4');
		});
		// Sort by width, largest first
		MP4Renditions.sort(function (a, b){
			if (a.width > b.width) {
				return -1;
			}
			if (a.width < b.width) {
				return 1;
			}
			return 0;
		});
		// Pull out largest rendition (less rounding on the ratio calculation)
		// For example: 400 x 244 = 0.56 (a 640px width player would be 358.4, rounded down to 358)
		// But 1280 x 720 = 0.5625 (a 640px width player would be exactly 360, maintaining a widescreen ratio of 16:9)
		// Divide the height by the width 
		var ratio = MP4Renditions[0].height / MP4Renditions[0].width;
		// Trigger resize
		resize();
		// Resize put into a function so that it can be called on window resize (to make it responsive)
		function resize() {
			videojs.log("Resize triggered...");
			// Get player width
			var playerWidth = player.el().offsetWidth;
			videojs.log("Current Player Width: " + playerWidth);
			// Calculate the appropriate height by multiplying the width by the ratio calculated above
			var playerHeight = Math.round(playerWidth * ratio);
			videojs.log("Calculated Player Height: " + playerHeight);
			// Set the player height (specify pixels to be valid HTML5)
			player.height(playerHeight);
		};
		// Trigger the resize function when the window size changes
		window.addEventListener('resize', function(event){
			resize();	
		});
	});
});