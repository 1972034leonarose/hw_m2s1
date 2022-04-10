import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../redux/slices";

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
    <div className="py-3">
      <h1 className="text-5xl">welcome to</h1>
      <h1 className="text-5xl font-bold py-3">playroll</h1>
      <br />
      <a href={authUrl}>Authorize </a>
      <button
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
  );
}

export default LandingPage;
