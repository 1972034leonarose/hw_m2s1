import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../redux/slices";
import HeadphonesIcon from "@mui/icons-material/Headphones";

function LandingPage() {
  const dispatch = useDispatch();
  const { token, isAuthorized, profile } = useSelector((state) => state.auth);
  let navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;

    if (!token && hash) {
      const temp = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      dispatch(setToken(temp));
    }
  }, []);

  const CLIENT_ID = "bfa3638f86ad48c1972f2b90b2f45ae7";
  const REDITECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPE = "playlist-modify-private";

  const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDITECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

  return (
    <div className="my-56 mx-24">
      <h1 className="text-5xl">welcome to</h1>
      <div className="flex items-center space-x-2">
        <span className="logo flex-col float-left">
          <HeadphonesIcon />
        </span>

        <h1 className="text-5xl font-bold py-3">playroll</h1>
      </div>

      <div className="flex space-x-4 mt-4">
        <a
          className="text-lg w-42 text-center bg-pink-600 hover:bg-pink-600/75 text-white font-bold mt-3 py-2 px-3 rounded"
          href={authUrl}
        >
          Authorize{" "}
        </a>

        {/* TODO: not authorized; do cursor warning maybe*/}
        <button
          className="text-lg w-42 text-center bg-pink-600 hover:bg-pink-600/75 text-white font-bold mt-3 py-2 px-3 rounded"
          onClick={() => {
            isAuthorized ? navigate("/home") : navigate("/");
          }}
        >
          Create Playlist
        </button>
        {/* test bugs */}
        {console.log(isAuthorized)}
        {console.log(`Profile: ${profile.display_name}`)}
      </div>
    </div>
  );
}

export default LandingPage;
