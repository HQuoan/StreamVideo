import { useEffect, useState } from "react";
import MP4VideoPlayer from "./HLSVideoPlayer";

const App = () => {
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const videoUrlParam = queryParams.get("url");

    if (videoUrlParam) {
      const fullVideoUrl = `https://${videoUrlParam}`;
      setVideoUrl(fullVideoUrl);
    } else {
      console.error("Missing or invalid 'url' parameter in query string");
    }
  }, []);

  return (
    <div style={styles.appContainer}>
      <div style={styles.contentContainer}>
        <h1 style={styles.header}>CineWorld Video Player</h1>
        {videoUrl ? (
          <MP4VideoPlayer videoUrl={videoUrl} />
        ) : (
          <p style={styles.loadingText}>Loading video...</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  appContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#000", // Màu nền tối
    margin: 0,
  },
  contentContainer: {
    textAlign: "center",
    color: "#ffffff", // Màu chữ trắng
  },
  header: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  loadingText: {
    fontSize: "1.2rem",
    color: "#bbbbbb",
  },
};

export default App;
