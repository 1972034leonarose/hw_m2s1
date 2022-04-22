// contains authorization constants

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = window.location.href;
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPE = "playlist-modify-private";

const authorizeUser = () => {
  window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
};

export { authorizeUser };
