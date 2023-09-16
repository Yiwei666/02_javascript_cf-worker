<!DOCTYPE html>
<html>
<head>
    <title>Random Video Player</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #000; /* 将背景颜色改为灰黑色 */
        }

        #videoContainer {
            /* Max width to ensure video does not overflow on larger screens */
            max-width: 800px;
            /* Add more styles here if needed */
        }
    </style>
</head>
<body>
    <div id="videoContainer">
        <video id="videoPlayer" width="100%" height="100%" controls autoplay>
            <!-- Placeholder source, will be replaced with the first video URL -->
            <source id="videoSource" src="" type="video/mp4">
        </video>
    </div>

    <script>
        // Function to fetch the video list from the API
        function fetchVideoList() {
            return fetch('https://chaye.one/videos')
                .then(response => response.json())
                .catch(error => {
                    console.error('Error fetching video list:', error);
                    return [];
                });
        }

        // Function to set a new random video source and play it
        function playRandomVideo(videoList) {
            // Get a random video from the list
            const randomVideoIndex = Math.floor(Math.random() * videoList.length);
            const randomVideoName = videoList[randomVideoIndex];

            // Build the video URL
            const videoUrl = `https://chaye.one/videos/${randomVideoName}`;

            // Set the new video source and play it
            const videoPlayer = document.getElementById('videoPlayer');
            const videoSource = document.getElementById('videoSource');
            videoSource.setAttribute('src', videoUrl);
            videoPlayer.load();

            // After the video has loaded, get its natural width and height
            videoPlayer.addEventListener('loadedmetadata', () => {
                const naturalWidth = videoPlayer.videoWidth;
                const naturalHeight = videoPlayer.videoHeight;

                // Check screen size and set video dimensions accordingly
                const screenWidth = window.innerWidth;
                const screenHeight = window.innerHeight;
                if (screenWidth < screenHeight) {
                    // On mobile (height > width)
                    videoPlayer.style.width = '680px'; // Set width for mobile screens
                    videoPlayer.style.height = 'auto'; // Height will adjust automatically
                } else {
                    // On desktop (height < width)
                    const aspectRatio = naturalWidth / naturalHeight; // Calculate the aspect ratio

                    if (aspectRatio > 1) {
                        videoPlayer.style.width = '600px'; // Set width for desktop screens with a higher aspect ratio
                        videoPlayer.style.height = 'auto'; // Height will adjust automatically
                    } else {
                        videoPlayer.style.width = '360px'; // Set width for desktop screens with a lower aspect ratio
                        videoPlayer.style.height = 'auto'; // Height will adjust automatically
                    }
                }

                // Play the video
                videoPlayer.play();
            });
        }

        // Function to initialize the video player
        function initializeVideoPlayer() {
            fetchVideoList()
                .then(videoList => {
                    if (videoList.length > 0) {
                        // Add event listener to play the next random video when the current one ends
                        const videoPlayer = document.getElementById('videoPlayer');
                        videoPlayer.addEventListener('ended', () => playRandomVideo(videoList));

                        // Start playing the first random video
                        playRandomVideo(videoList);
                    } else {
                        console.error('No videos found.');
                    }
                });
        }

        // Call the function to initialize the video player
        initializeVideoPlayer();
    </script>
</body>
</html>
