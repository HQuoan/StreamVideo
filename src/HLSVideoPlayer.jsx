import { useEffect } from "react";
import Hls from "hls.js";

const HLSVideoPlayer = () => {
  const videoUrl =
    "https://cdn.cineworld.io.vn/assets/video1/HLS/video1_360.m3u8";
  const apiUrl =
    "https://cineworld.io.vn:7001/api/servers/generate-signed-cookie";

  // Hàm lấy signed cookies trước
  const fetchSignedCookies = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInN1YiI6IjQ5ODZmNTNjLWEyZGItNGI3MS04MGRmLTQwNGJjYWQ1NDEzYSIsIm5hbWUiOiJBZG1pbiIsIkF2YXRhciI6IiIsInJvbGUiOiJBRE1JTiIsIm5iZiI6MTczNTU4MTY3NiwiZXhwIjoxNzM2MTg2NDc2LCJpYXQiOjE3MzU1ODE2NzYsImlzcyI6ImNpbmV3b3JsZC1hdXRoLWFwaSIsImF1ZCI6ImNpbmV3b3JsZC1jbGllbnQifQ.ca7-GCMHzgiEF_ZU35RNWDZbc4N7zUSX0o9iFypTu7k", // JWT token truyền cứng
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch signed cookies");
      }
      console.log(
        "Signed cookies fetched successfully:",
        await response.json()
      );
    } catch (error) {
      console.error("Error fetching signed cookies:", error);
      throw error;
    }
  };

  // Hàm load video HLS
  const loadHLSVideo = async () => {
    const video = document.getElementById("hls-video");

    try {
      // Fetch signed cookies trước khi tải video
      await fetchSignedCookies();

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

        // Load video source với fetch để gửi cookie
        const response = await fetch(videoUrl, {
          method: "GET",
          credentials: "include", // Quan trọng để gửi cookie
        });

        if (!response.ok) {
          throw new Error("Failed to load video source");
        }

        const videoBlob = await response.blob();
        const videoObjectUrl = URL.createObjectURL(videoBlob);
        video.src = videoObjectUrl;

        video.addEventListener("loadedmetadata", () => {
          console.log("Video loaded, starting playback...");
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
    const initPlayer = async () => {
      try {
        await loadHLSVideo();
      } catch (error) {
        console.error("Initialization failed:", error);
      }
    };

    initPlayer();
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
