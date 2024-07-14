// Wait for the page to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Shaka Player
    initPlayer();
});

function initPlayer() {
    // Install built-in polyfills to patch browser incompatibilities
    shaka.polyfill.installAll();

    // Check if the browser supports Shaka Player
    if (shaka.Player.isBrowserSupported()) {
        // Get a reference to the video element
        var video = document.getElementById('video');
        
        // Create a Shaka Player instance
        var player = new shaka.Player(video);

        // Attach player to the window for debugging purposes
        window.player = player;

        // Listen for error events
        player.addEventListener('error', onErrorEvent);

        // Try to load the M3U8 stream
        player.load('https://d2q8p4pe5spbak.cloudfront.net/bpk-tv/9XM/9XM.isml/index.m3u8').then(function() {
            console.log('The video has been loaded successfully');
        }).catch(onError);
    } else {
        console.error('Browser not supported!');
    }
}

function onErrorEvent(event) {
    // Extract the shaka.util.Error object from the event
    onError(event.detail);
}

function onError(error) {
    // Log the error to the console
    console.error('Error code', error.code, 'object', error);
}
