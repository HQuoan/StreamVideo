import { useEffect, useState } from "react";
import MP4VideoPlayer from "./HLSVideoPlayer";

const App = () => {
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    // Lấy tham số từ URL của trình duyệt
    const path = window.location.pathname;
    const baseDomain = path.slice(1);

    if (baseDomain) {
      const fullVideoUrl = `https://${baseDomain}`;
      setVideoUrl(fullVideoUrl);
    } else {
      console.error("Invalid URL format");
    }
  }, []); // Chạy một lần khi component được mount

  return (
    <div>
      {videoUrl ? (
        <MP4VideoPlayer videoUrl={videoUrl} />
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default App;
