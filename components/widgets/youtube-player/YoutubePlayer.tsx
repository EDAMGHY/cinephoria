import { WebView, WebViewProps } from "react-native-webview";
import { useRef } from "react";
import { Dimensions, View } from "react-native";

const { width } = Dimensions.get("window");
const height = width * (9 / 16); // or whatever aspect ratio you want

export const YoutubePlayer = ({ videoId }: { videoId: string }) => {
  const webRef = useRef<WebView>(null);
  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webRef}
        style={{ width: "100%", height }}
        originWhitelist={["*"]}
        javaScriptEnabled
        domStorageEnabled
        allowsFullscreenVideo={false}
        allowsInlineMediaPlayback
        scalesPageToFit={false}
        mediaPlaybackRequiresUserAction={false}
        // source={{
        //   html: '<h1 style="color:black;text-align:center">Hello world</h1>',
        // }}

        source={{ html: buildHTML(videoId) }}
      />
    </View>
  );
};

const buildIFrame = (videoId: string) => `
    <!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
    <div id="player"></div>

    <script>
      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '100%',
          width: '100%',
          videoId: '${videoId}',
          playerVars: {
            'playsinline': 1,
            'autoplay': 0,
            'controls': 1,
          },
          events: {
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }
    </script>
        `;

export const buildHTML = (videoId: string) => `
        <!DOCTYPE html>
        <html>
          <head>${iFrameStyle} </head>
          <body>${buildIFrame(videoId)}</body>
        </html>
        `;

const iFrameStyle = `
  <style>
    html {
      overflow-y: hidden;
      overflow-x: hidden;
      height: 100%;
    }
    body {
      background-color: black;
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
    }
  </style>
`;
