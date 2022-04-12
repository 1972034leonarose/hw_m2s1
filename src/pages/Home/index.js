import React, { useState, useEffect } from "react";
import "../../App.css";
import "./styles.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { removeToken, setProfile } from "../../redux/slices";

import { SearchBar } from "../../components/molecules/SearchBar";
import LandingPage from "../LandingPage";
import { SongCard } from "../../components/molecules/SongCard/index";
import { PlaylistForm } from "../../components/molecules/PlaylistForm/index";

/**
 * to-do:
 * add tailwind
 * length check on form
 * logout route
 * page refresh langsung ke logout
 */

function Home() {
  const dispatch = useDispatch();
  let { token, isAuthorized, profile } = useSelector((state) => state.auth);

  const [searchParam, setSearchParam] = useState("");
  const [tracks, setTracks] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]); 
  const [submitted, setIsSubmitted] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // to display selected tracks 
  useEffect(() => {
    if (!submitted) {
      const tempSelectedSong = tracks.filter((searchValue) =>
        selectedSongs.includes(searchValue.uri)
      );
      setTracks(tempSelectedSong);
    }
  }, [selectedSongs]);

  // to clear token
  const logout = () => {
    dispatch(removeToken());
    window.localStorage.removeItem("token");
  };

  // ===================  USER DETAILS ====================
  const getUser = async () => {
    await axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setProfile(res.data));
      })
      .catch((e) => console.log(e));
  };
  // =================== end USER DETAILS ====================

  const createPlaylist = async () => {
    // make the playlist
    const response = await axios.post(
      `https://api.spotify.com/v1/users/${profile.id}/playlists`,
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
    console.log("response:");
    console.log(response);
    return response.data.id;
  };

  const addToPlaylist = async (playlistId) => {
    const uris = selectedSongs;
    console.log(token);
    const data = JSON.stringify({ uris });

    await axios
      .post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
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

  const handleSelect = (trackUri) => {
    if (selectedSongs.includes(trackUri)) {
      setSelectedSongs(previous => previous.filter((track) => track !== trackUri));
    } else {
      setSelectedSongs(previous => [...previous, trackUri]);
    }
    console.log("playlist:");
    console.log(selectedSongs);
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
      key={track.uri} 
      image={track.album.images[2].url}
      title={track.name}
      artist={track.artists[0].name}
      album={track.album.name}
      selectSong={() => handleSelect(track.uri)}
      isSelected={selectedSongs.includes(track.uri)}
    />
  ));

  const getPlaylist = () => {
    console.log(selectedSongs);
  };

  return (
    <>
      <div className="container flex-1 flex">
          <div className="sidebar flex-col h-screen bg-zinc-800 w-64 overflow-y-auto">
            <h1 className="logo text-4xl font-bold pl-4 pt-10">playroll</h1>
            <br />
            <p className="text-2xl font-bold pl-4 pt-10">create a playlist</p>
            <div>
              <PlaylistForm
                input={(e) => setTitle(e.target.value)}
                description={(e) => setDescription(e.target.value)}
                createPlaylist={handlePlaylist}
              />
            </div>

            {/* TODO: tailwind */}
            <button
              className="btn-logout ml-4 mt-20 align-baseline"
              onClick={logout}
            >
              Logout
            </button>

            {/* TODO: debug test elements; delete later */}
           <button onClick={getUser}>Profile</button>
            <button onClick={getPlaylist}>View Playlist</button>
          </div>
        
          <div className="content-area flex-1 overflow-y-auto">
            <div className="my-7 mx-7">
              <SearchBar
                onSubmit={getTracks}
                onChange={(e) => {
                  setSearchParam(e.target.value);
                }}
                onClick={isClicked}
              />
            </div>

            <h1 className="font-bold mx-11 text-2xl">
              select songs to add to your playlist !
            </h1>

            {/* TODO: tailwind */}
            {submitted ? (
            <div className="track-area">
              {mapTracks}
            </div>
          ) : null}
          
          </div>
          {/* test bugs */}
          {console.log(isAuthorized)}
      </div>
    </>
  );
}

export default Home;
