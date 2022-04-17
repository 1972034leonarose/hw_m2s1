import React from "react";

// third-party
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeadphonesIcon from "@mui/icons-material/Headphones";

// components
import { authorizeUser } from "../../lib/auth";
import useToken from "../../lib/useToken";

function LandingPage() {
  let navigate = useNavigate();
  let { token } = useToken();
  let { isAuthorized, profile } = useSelector((state) => state.auth);

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
        <button
          className="text-lg w-42 text-center bg-pink-600 hover:bg-pink-600/75 text-white font-bold mt-3 py-2 px-3 rounded"
          onClick={authorizeUser}
        >
          Authorize
        </button>

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
        {console.log(token)}
        {console.log(isAuthorized)}
        {console.log(profile)}

      </div>
    </div>
  );
}

export default LandingPage;
