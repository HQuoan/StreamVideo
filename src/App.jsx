import { useEffect, useState } from "react";
import MP4VideoPlayer from "./HLSVideoPlayerhuy";

const App = () => {
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    // Lấy tham số `url` từ query string của URL
    const queryParams = new URLSearchParams(window.location.search);
    const videoUrlParam = queryParams.get("url");

    if (videoUrlParam) {
      const fullVideoUrl = `https://${videoUrlParam}`;
      setVideoUrl(fullVideoUrl);
    } else {
      console.error("Missing or invalid 'url' parameter in query string");
    }
  }, []); // Chạy một lần khi component được mount

  return (
    <div>
      <h1>url: {videoUrl}</h1>
      <div>
      {videoUrl ? (
        <MP4VideoPlayer videoUrl={videoUrl} />
      ) : (
        <p>Loading video...</p>
      )}
    </div>
    </div>
  );
};

export default App;
