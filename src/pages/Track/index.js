import React, { useState, useEffect } from "react";
import "../../App.css";
import axios from "axios";
import { SongCard } from "../../components/molecules/SongCard/index";
import { PlaylistForm } from "../../components/molecules/PlaylistForm/index";

/**
 * to-do:
 * add tailwind
 * select buttons dont change accordingly, but selected data stored
 * local storage ga perlu?
 */

function Track() {
  const CLIENT_ID = "bfa3638f86ad48c1972f2b90b2f45ae7";
  const REDITECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPE = "playlist-modify-private";

  const [token, setToken] = useState("");

  const [searchParam, setSearchParam] = useState("");
  const [tracks, setTracks] = useState([]);

  const [selected, isSelected] = useState(false);

  const [submitted, setIsSubmitted] = useState(false);
  const [playlist, setPlaylist] = useState([]); // to store what's been selected

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [profile, setProfile] = useState([]);

  // ===================  USE EFFECTS ====================
  // to authorize
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

  // to display selected tracks ?
  useEffect(() => {
    if (!submitted) {
      const tempSelectedSong = tracks.filter((searchValue) =>
        playlist.includes(searchValue.uri)
      );
      setTracks(tempSelectedSong);
    }
  }, [playlist]);

  // to clear token / local storage
  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };
  // ===================  end USE EFFECTS ====================

  // ===================  USER DETAILS ====================
  const getUser = async () => {
    const fetchedProfile = await axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((e) => console.log(e));
    setProfile(fetchedProfile);
    console.log(fetchedProfile);
  };
  // =================== end USER DETAILS ====================

  const createPlaylist = async () => {
    const userId = profile.id;
    console.log(userId);
    // make the playlist
    const response = await axios.post(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        name: title,
        description: description,
        public: false,
        collaborative: false,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // .then((resp) => {
    //   // add the tracks to the playlist
    //   const playlistId = resp.id;
    //   console.log(`playlistId: ${playlistId}`);
    //   console.log(playlist);
    //   const uris = playlist;
    //   const playlistTracks = async () => {
    //     await axios.post(
    //       `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    //       {
    //         uris: JSON.stringify(uris),
    //       },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     );
    //     console.log(uris)
    //   };
    //   return playlistTracks;
    // })
    console.log("response:");
    console.log(response);
    return response.data.id;
  };

  const addToPlaylist = async (playlistId) => {
    const uris = playlist;
    console.log(token);
    const data = JSON.stringify({ uris });

    await axios
      .post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        return res.data;
      });
  };

  const handlePlaylist = async (e) => {
    e.preventDefault();
    const playlistId = await createPlaylist();
    console.log(playlistId);

    await addToPlaylist(playlistId);
  };

  // song = track.uri
  // how to store all data related to track.uri
  // maybe extend with .data.results ?????
  const handleSelect = (song) => {
    if (playlist.includes(song)) {
      const removed = playlist.filter((track) => track !== song);
      setPlaylist(removed);
    } else {
      setPlaylist([...playlist, song]);
    }
    console.log("playlist:");
    console.log(playlist);
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
          scope: "playlist-modify-private",
        },
      })
      .then((response) => {
        // setSearchStatus(true);
        // const tempSelectedSong = searchResult.filter((searchResult) =>
        //   selectedSongUri.includes(searchResult.uri)
        // );
        // const tempSearchResult = response.data.tracks.items.filter(
        //   (searchResult) => !selectedSongUri.includes(searchResult.uri)
        // );
        // console.log(tempSearchResult);
        // console.log(tempSelectedSong);
        // setSearchResult([...tempSelectedSong, ...tempSearchResult]);

        response ? setIsSubmitted(true) : setIsSubmitted(false);
        console.log(submitted);
        return response.data.tracks.items;
      })
      .catch((e) => console.log(e));

    console.log(datas);
    setTracks(datas);
  };

  // map tracks that is being searched
  const mapTracks = tracks.map((track) => (
    <SongCard
      key={track.uri} // use uri as identifier
      image={track.album.images[2].url}
      title={track.name}
      artist={track.artists[0].name}
      album={track.album.name}
      selectSong={() => handleSelect(track.uri)}
    />
  ));

  const getPlaylist = () => {
    console.log(playlist);
  };

  return (
    <>
      <div className="container">
        {token ? (
          <form onSubmit={getTracks}>
            <input
              type="text"
              placeholder="Search for a song"
              onChange={(e) => {
                setSearchParam(e.target.value);
              }}
            ></input>
            <button type="submit" onClick={isClicked}>
              Search
            </button>
          </form>
        ) : (
          <h2> You're not logged in </h2>
        )}

        {!token ? (
          <div className="btn-login">
            <a
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDITECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
            >
              Login
            </a>
          </div>
        ) : (
          <button className="btn-logout" onClick={logout}>
            Logout
          </button>
        )}

        {token && (
          <PlaylistForm
            input={(e) => setTitle(e.target.value)}
            description={(e) => setDescription(e.target.value)}
            createPlaylist={handlePlaylist}
          />
        )}

        {token && <button onClick={getUser}>Profile</button>}
        {token && <button onClick={getPlaylist}>View Playlist</button>}

        <>
          <br />
          <br />
          {submitted ? (
            <table>
              <tbody>{mapTracks}</tbody>
            </table>
          ) : null}
        </>
      </div>
    </>
  );
}

export default Track;
