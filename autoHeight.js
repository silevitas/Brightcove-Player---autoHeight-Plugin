// (c)2015 Si Levitas
// Plugin provided as-is and is not supported by Brightcove in any way, shape or form.
// v1.1, 2015-02-02: added window.onresize functionality to make it responsive
// v1.0, 2015-02-01: relies on data-video-id to be set in the player embed code


// This fixes a limitation in IE9, where if the console isn't open on page load, any attempts to log to the console breaks the script
if (!window.console) console = {log: function() {}};
console.log("AutoHeight Plugin loaded!");

var player = videojs('player');
player.ready(function(){
	// Get the video ID from the embed code
	var id = player.options()['data-video-id'];
	// Access the videoDTO from the source object
	player.catalog.getVideo(id, function(error, data) {
		// console.log(data.sources);
		// Return only valid sources
		var MP4Renditions = data.sources.filter(function (el) {
			return (el.src != null);
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
		// Largest rendition (less rounding on the ratio calculation)
		// For example: 400 x 244 = 0.56 (a 640px width player would be 358.4, rounded down to 358)
		// But 1280 x 720 = 0.5625 (a 640px width player would be exactly 360, maintaining a widescreen ratio of 16:9)
		console.log(MP4Renditions[1]);
		// Divide the height by the width 
		var ratio = MP4Renditions[1].height / MP4Renditions[1].width;
		// Trigger resize
		resize();
		// Resize put into a function so that it can be called on window resize (to make it responsive)
		function resize() {
			console.log("Resize triggered...");
			// Get the player's on-page width
			var playerWidth = document.getElementById('player').offsetWidth;
			console.log("Current Player Width: " + playerWidth);
			// Calculate the appropriate height by multiplying the width by the ratio calculated above
			var playerHeight = Math.round(playerWidth * ratio);
			console.log("Calculated Player Height: " + playerHeight);
			// Set the player height (specify pixels to be valid HTML5)
			document.getElementById('player').style.height = (playerHeight+"px");
		}
		// Trigger the resize function when the window size changes
		window.addEventListener('resize', function(event){
  			resize();	
		});
	});
});