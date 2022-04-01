import React, { useState, useEffect } from "react";
import "App.css";
import axios from "axios";
import Track from "pages/Track";
import { SongCard } from "components/SongCard/index";

/**
 * to-do:
 * fix select buttons to change per tr
 * have selected songs appear when input field is cleared
 */

function App() {
  const CLIENT_ID = "bfa3638f86ad48c1972f2b90b2f45ae7";
  const REDITECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchParam, setSearchParam] = useState("");
  const [tracks, setTracks] = useState([]);
  const [submitted, setIsSubmitted] = useState(false);

  const [selected, setSelected] = useState("select");
  const [selectedId, setSelectedId] = useState(""); // to store id of what's been selected
  const [playlist, setPlaylist] = useState([]); // to store what's been selected

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

  const addToPlaylist = (song) => {
    setPlaylist([...playlist, song]); // song = tracks.id
    console.log("playlist:");
    console.log(playlist);
  };

  // to clear token / local storage
  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const isClicked = () => setIsSubmitted(true);

  // call spotify API
  const getTracks = async (e) => {
    e.preventDefault();
    const datas = await axios
      .get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchParam,
          type: "track",
        },
      })
      .then((response) => {
        response ? setIsSubmitted(true) : setIsSubmitted(false);
        console.log(submitted);
        return response.data.tracks.items;
      })
      .catch((e) => console.log(e));

    console.log(datas);
    setTracks(datas);
  };

  // TODO: utilize props ??
  const isSelected = (id) => {
    if (selected === "select") {
      setSelected("deselect");
    } else {
      setSelected("select");
    }
  };

  const mapTracks = tracks.map((song, id) => (
    <SongCard
      key={id}
      uri={song.uri}
      image={song.album.images[2].url}
      title={song.name}
      artist={song.artists[0].name}
      album={song.album.name}
      // TODO: recheck please
      button={
        <input
          type="submit"
          value={selected}
          onClick={() => {
            isSelected(tracks[id]);
            console.log(tracks[id]);
            addToPlaylist(tracks[id]);
          }}  
        />
      }
    />
  ));

  return (
    <>
      <div className="container">
        {!token ? (
          <div className="btn-login">
            <a
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDITECT_URI}&response_type=${RESPONSE_TYPE}`}
            >
              Login
            </a>
          </div>
        ) : (
          <button className="btn-logout" onClick={logout}>
            Logout
          </button>
        )}

        {token ? (
          <form onSubmit={getTracks}>
            <input
              type="text"
              placeholder="Search for a song"
              value={searchParam}
              onChange={(e) => {
                setSearchParam(e.target.value);
              }}
            ></input>
            <button type="submit" onClick={isClicked}>
              Search
            </button>
          </form>
        ) : (
          <h2> Not yet authorized </h2>
        )}
        <>
          <br />
          <br />
          {submitted ? tracks.map((song, id) => mapTracks) : null}
        </>
      </div>
    </>
  );
}

export default App;
