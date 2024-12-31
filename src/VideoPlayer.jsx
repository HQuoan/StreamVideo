import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const VideoPlayer = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource('/video1_360.m3u8'); // Đường dẫn tới file .m3u8 trong thư mục public
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
      });

      return () => {
        hls.destroy();
      };
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = '/video1_360.m3u8'; // Dành cho Safari
      videoRef.current.addEventListener('loadedmetadata', () => {
        videoRef.current.play();
      });
    }
  }, []);

  return (
    <div>
      <video ref={videoRef} controls style={{ width: '100%' }}></video>
    </div>
  );
};

export default VideoPlayer;
