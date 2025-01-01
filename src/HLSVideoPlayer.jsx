import { useEffect, useState } from "react";

const MP4VideoPlayer = ({ videoUrl }) => {
  const apiUrl =
    "https://cineworld.io.vn:7001/api/servers/generate-signed-cookie";

  const [signedCookies, setSignedCookies] = useState(null);

  // Hàm lấy signed cookies từ API
  const fetchSignedCookies = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInN1YiI6IjQ5ODZmNTNjLWEyZGItNGI3MS04MGRmLTQwNGJjYWQ1NDEzYSIsIm5hbWUiOiJBZG1pbiIsIkF2YXRhciI6Imh0dHBzOi8vY2luZXdvcmxkczMuczMuYXAtc291dGhlYXN0LTIuYW1hem9uYXdzLmNvbS91c2VyX2F2YXRhcnMvNDk4NmY1M2MtYTJkYi00YjcxLTgwZGYtNDA0YmNhZDU0MTNhIiwicm9sZSI6IkFETUlOIiwibmJmIjoxNzM1NzAyODkwLCJleHAiOjE3MzYzMDc2OTAsImlhdCI6MTczNTcwMjg5MCwiaXNzIjoiY2luZXdvcmxkLWF1dGgtYXBpIiwiYXVkIjoiY2luZXdvcmxkLWNsaWVudCJ9.ETmrhiNUKgxCSK6D59GyOXdTQaGUWUvKpgRxPAjPwFA", // JWT token truyền cứng
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch signed cookies");
      }

      const cookies = await response.json();
      setSignedCookies(cookies);
      console.log("Signed cookies fetched successfully:", cookies);
    } catch (error) {
      console.error("Error fetching signed cookies:", error);
    }
  };

  // Hàm load video MP4
  const loadMP4Video = () => {
    const video = document.getElementById("mp4-video");

    try {
      if (!signedCookies) {
        throw new Error("No signed cookies available.");
      }

      console.log("Loading MP4 video...");
      video.src = videoUrl;
      video.addEventListener("loadedmetadata", () => {
        console.log("Metadata loaded, starting playback...");
        video.play();
      });
    } catch (error) {
      console.error("Error loading MP4 video:", error);
    }
  };

  useEffect(() => {
    const initPlayer = async () => {
      try {
        await fetchSignedCookies();
        loadMP4Video();
      } catch (error) {
        console.error("Initialization failed:", error);
      }
    };

    initPlayer();
  }, [signedCookies, videoUrl]);

  return (
    <div id="player-container" style={styles.container}>
      <h1>MP4 Video Player</h1>
      <video
        id="mp4-video"
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

export default MP4VideoPlayer;
