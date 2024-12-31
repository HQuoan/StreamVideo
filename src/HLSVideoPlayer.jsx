import { useEffect } from "react";
import Hls from "hls.js";

const HLSVideoPlayer = () => {
  const videoUrl =
    "https://dot-s3-demo.s3.ap-southeast-2.amazonaws.com/assets/video1/HLS/video1_360.m3u8"; // Đường dẫn tới video HLS

  // Hàm load video HLS
  const loadHLSVideo = async () => {
    const video = document.getElementById("hls-video");

    try {
      // Kiểm tra hỗ trợ HLS
      if (Hls.isSupported()) {
        console.log("HLS.js is supported. Initializing player...");
        const hls = new Hls();

        // Thêm xử lý lỗi nếu gặp lỗi 403
        hls.on(Hls.Events.ERROR, (event, data) => {
          if (
            data.type === Hls.ErrorTypes.NETWORK_ERROR &&
            data.response?.code === 403
          ) {
            console.error(
              "403 Forbidden: Check signed cookies or CloudFront configuration."
            );
          } else {
            console.error("HLS.js error:", data);
          }
        });

        // Load video source
        hls.loadSource(videoUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log("Manifest loaded, starting playback...");
          video.play();
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        console.log("Native HLS supported. Loading video...");
        video.src = videoUrl;
        video.addEventListener("loadedmetadata", () => {
          video.play();
        });
      } else {
        console.error(
          "HLS.js is not supported, and native HLS is unavailable."
        );
      }
    } catch (error) {
      console.error("Error loading HLS video:", error);
    }
  };

  useEffect(() => {
    loadHLSVideo();
  }, []);

  return (
    <div id="player-container" style={styles.container}>
      <h1>HLS Video Player</h1>
      <video
        id="hls-video"
        controls
        width="640"
        height="360"
        style={styles.video}></video>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
  },
  video: {
    maxWidth: "100%",
    height: "auto",
  },
};

export default HLSVideoPlayer;
