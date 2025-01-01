// import VideoPlayer from "./VideoPlayer"; // assuming LoginPage is in the same directory
import MP4VideoPlayer from "./HLSVideoPlayer"; // assuming LoginPage is in the same directory

const App = () => {
  const videoUrl = "https://cineworld.io.vn/225661_small.mp4";

  return (
    <div>
      <MP4VideoPlayer videoUrl={videoUrl} />
    </div>
  );
};

export default App;
