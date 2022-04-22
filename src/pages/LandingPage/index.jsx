import React from "react";

// third-party
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HeadphonesIcon from "@mui/icons-material/Headphones";

// components
import { authorizeUser } from "../../lib/auth";
import useToken from "../../lib/useToken";
import NameLogo from "../../constants/logo";

function LandingPage() {
  let navigate = useNavigate();
  let token = useToken(); // use hook for authentication
  let { isAuthorized } = useSelector((state) => state.auth);

  return (
    <div className="my-56 mx-24">
      <section id="title">
        <h1 className="text-5xl">welcome to</h1>
        <div className="flex items-center space-x-2">
          <span className="logo flex-col float-left">
            <HeadphonesIcon fontSize="large" />
          </span>

          <h1 className="text-5xl font-bold py-3">playroll</h1>
        </div>
      </section>

      <section id="subheading">
        <h5 className="text-xl leading-normal mt-5 mb-5">
          by:&nbsp;<NameLogo symbol="🦁🌹"/>&nbsp; ft. Gigih
          
        </h5>
      </section>

      <section id="button-area">
        <div className="flex space-x-4 mt-4">
          <button
            className="text-lg w-42 text-center bg-pink-600 hover:bg-pink-600/75 text-white font-bold mt-3 py-2 px-3 rounded"
            onClick={authorizeUser}
          >
            authorize
          </button>

          <button
            className="text-center bg-pink-600 hover:bg-pink-600/75 text-white font-bold mt-3 py-2 px-3 rounded"
            onClick={() => {
              isAuthorized ? navigate("/home") : navigate("/");
            }}
          >
            create playlist
          </button>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
