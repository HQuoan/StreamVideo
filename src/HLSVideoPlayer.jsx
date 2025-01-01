import { useEffect, useState } from "react";

const MP4VideoPlayer = ({ videoUrl }) => {
  const apiUrl =
    "https://cineworld.io.vn:7001/api/servers/generate-signed-cookie";

  const [signedCookies, setSignedCookies] = useState(null);

  const fetchSignedCookies = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInN1YiI6IjQ5ODZmNTNjLWEyZGItNGI3MS04MGRmLTQwNGJjYWQ1NDEzYSIsIm5hbWUiOiJBZG1pbiIsIkF2YXRhciI6Imh0dHBzOi8vY2luZXdvcmxkczMuczMuYXAtc291dGhlYXN0LTIuYW1hem9uYXdzLmNvbS91c2VyX2F2YXRhcnMvNDk4NmY1M2MtYTJkYi00YjcxLTgwZGYtNDA0YmNhZDU0MTNhIiwicm9sZSI6IkFETUlOIiwibmJmIjoxNzM1NzAyODkwLCJleHAiOjE3MzYzMDc2OTAsImlhdCI6MTczNTcwMjg5MCwiaXNzIjoiY2luZXdvcmxkLWF1dGgtYXBpIiwiYXVkIjoiY2luZXdvcmxkLWNsaWVudCJ9.ETmrhiNUKgxCSK6D59GyOXdTQaGUWUvKpgRxPAjPwFA",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch signed cookies");
      }

      const cookies = await response.json();
      setSignedCookies(cookies);
    } catch (error) {
      console.error("Error fetching signed cookies:", error);
    }
  };

  const loadMP4Video = () => {
    const video = document.getElementById("mp4-video");

    try {
      if (!signedCookies) {
        console.warn("No signed cookies available. Please refresh or wait.");
        return;
      }

      video.src = videoUrl;

      video.addEventListener("loadedmetadata", () => {
        video.play();
      });

      video.addEventListener("error", () => {
        console.error(
          `Error loading video from URL: ${videoUrl}. Please check the URL or network connection.`
        );
      });
    } catch (error) {
      console.error("Error loading MP4 video:", error);
    }
  };

  useEffect(() => {
    fetchSignedCookies();
  }, []);

  useEffect(() => {
    if (signedCookies) {
      loadMP4Video();
    }
  }, [signedCookies]);

  return (
    <div id="player-container" style={styles.container}>
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
    backgroundColor: "#000", // Màu nền của trình phát video
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "700px",
    margin: "auto",
  },
  video: {
    borderRadius: "10px",
    width: "100%",
    outline: "none",
  },
};

export default MP4VideoPlayer;
