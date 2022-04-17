import axios from "axios";
import { useDispatch } from "react-redux";

const CLIENT_ID = "bfa3638f86ad48c1972f2b90b2f45ae7";
const REDIRECT_URI = "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPE = "playlist-modify-private";

const authorizeUser = () => {
  window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
};

const getUser = async (token) => {
  const url = "https://api.spotify.com/v1/me";
  const datas = await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      // dispatch(setProfile(res.data));
      return res.data;
    })
    .catch((e) => console.log(e));
    return datas;
};


export { authorizeUser, getUser };
