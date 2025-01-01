import { useEffect, useState } from "react";

// videoUrl = https://cdn.cineworld.io.vn/225661_small.mp4
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
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInN1YiI6IjQ5ODZmNTNjLWEyZGItNGI3MS04MGRmLTQwNGJjYWQ1NDEzYSIsIm5hbWUiOiJBZG1pbiIsIkF2YXRhciI6Imh0dHBzOi8vY2luZXdvcmxkczMuczMuYXAtc291dGhlYXN0LTIuYW1hem9uYXdzLmNvbS91c2VyX2F2YXRhcnMvNDk4NmY1M2MtYTJkYi00YjcxLTgwZGYtNDA0YmNhZDU0MTNhIiwicm9sZSI6IkFETUlOIiwibmJmIjoxNzM1NzAyODkwLCJleHAiOjE3MzYzMDc2OTAsImlhdCI6MTczNTcwMjg5MCwiaXNzIjoiY2luZXdvcmxkLWF1dGgtYXBpIiwiYXVkIjoiY2luZXdvcmxkLWNsaWVudCJ9.ETmrhiNUKgxCSK6D59GyOXdTQaGUWUvKpgRxPAjPwFA",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch signed cookies");
      }

      const cookies = await response.json();
      setSignedCookies(cookies); // Thiết lập signed cookies
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
        console.warn("No signed cookies available. Please refresh or wait.");
        return;
      }

      console.log("Loading MP4 video...");
      video.src = videoUrl; // Set video source

      // Lắng nghe sự kiện loadedmetadata
      video.addEventListener("loadedmetadata", () => {
        console.log("Metadata loaded, starting playback...");
        video.play(); // Play video khi metadata đã tải
      });

      // Lắng nghe sự kiện error
      video.addEventListener("error", () => {
        console.error(
          `Error loading video from URL: ${videoUrl}. Please check the URL or network connection.`
        );
      });
    } catch (error) {
      console.error("Error loading MP4 video:", error);
    }
  };

  // useEffect để gọi fetchSignedCookies ngay khi component được mount lần đầu
  useEffect(() => {
    fetchSignedCookies();
  }, []); // Gọi chỉ một lần khi component được render lần đầu tiên

  // useEffect để load video khi signedCookies đã có giá trị
  useEffect(() => {
    if (signedCookies) {
      loadMP4Video(); // Chỉ load video khi signedCookies có giá trị
    }
  }, [signedCookies]); // Mỗi khi signedCookies thay đổi, gọi loadMP4Video

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
