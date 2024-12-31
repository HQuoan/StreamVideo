import { GoogleOAuthProvider } from "@react-oauth/google";
import HLSVideoPlayer from "./HLSVideoPlayer"; // assuming LoginPage is in the same directory

const App = () => {
  return (
    <GoogleOAuthProvider clientId="295971679778-j1518s3cr0f26mgi3d1ogcelfm4g2udr.apps.googleusercontent.com">
      <HLSVideoPlayer />
    </GoogleOAuthProvider>
  );
};

export default App;
