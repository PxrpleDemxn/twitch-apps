import { Button } from "@radix-ui/themes";

const TwitchLogin = () => {
  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
  const SCOPES = import.meta.env.VITE_SCOPES;

  const handleLogin = () => {
    const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPES}`;

    window.location.href = authUrl;
  };

  return <Button onClick={handleLogin}>Log in with Twitch</Button>;
};

export default TwitchLogin;
