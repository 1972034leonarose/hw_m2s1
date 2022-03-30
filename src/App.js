import React, { useState, useEffect } from "react";
import "App.css";
import axios from "axios";
import Track from "pages/Track";

function App() {
  const CLIENT_ID = "bfa3638f86ad48c1972f2b90b2f45ae7";
  const REDITECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchParam, setSearchParam] = useState("");
  const [songs, setTracks] = useState([]);
  const [submitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  // to clear token / local storage
  const refresh = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const isClicked = () => setIsSubmitted(true);

  // call spotify API
  const callSpotifyApi = async (e) => {
    // prevent form from submitting itself
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchParam,
        type: "artist",
      },
    });
    setTracks(data.artists.items);
    console.log(data);
  };

  return (
    <div className="container">
      <h1>Home</h1>
      {!token ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDITECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          To Spotify Auth
        </a>
      ) : (
        <button onClick={refresh}>Refresh</button>
      )}

      {token ? (
        <form onSubmit={callSpotifyApi}>
          <input
            type="text"
            placeholder="Search for a song"
            onChange={(e) => setSearchParam(e.target.value)}
          ></input>
          <button type={"submit"} onClick={isClicked}>Search</button>
        </form>
      ) : (
        <h2> Not yet authorized </h2>
      )}

      {submitted ? <Track /> : null}

    </div>
  );
}

export default App;
