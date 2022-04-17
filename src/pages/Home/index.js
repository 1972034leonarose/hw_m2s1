import { useState, useEffect } from "react";
import "../../App.css";
import "./styles.css";

// third-party
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

// redux-states
import { setTracks } from "../../redux/trackSlice";

// components & lib
import useHandlers from "../../lib/useHandlers";
import { SearchBar } from "../../components/molecules/SearchBar";
import { SongCard } from "../../components/molecules/SongCard/index";
import { PlaylistForm } from "../../components/molecules/PlaylistForm/index";

function Home() {
  const dispatch = useDispatch();
  const { handleProfile, handleSearch, logout } = useHandlers();

  let { token, isAuthorized, profile } = useSelector((state) => state.auth);
  let { tracks } = useSelector((state) => state.track);

  const [searchParam, setSearchParam] = useState("");
  const [submitted, setIsSubmitted] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [selectedTracks, setSelectedTracks] = useState([]);

  // to display selected tracks
  useEffect(() => {
    if (!submitted) {
      const tempSelectedSong = tracks.filter((searchValue) =>
        selectedTracks.includes(searchValue.uri)
      );
      dispatch(setTracks(tempSelectedSong));
    }
  }, [selectedTracks]);

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
    const uris = selectedTracks;
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
    if (selectedTracks.includes(trackUri)) {
      setSelectedTracks((previous) =>
        previous.filter((track) => track !== trackUri)
      );
    } else {
      setSelectedTracks((previous) => [...previous, trackUri]);
    }
    console.log("playlist:");
    console.log(selectedTracks);
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
      isSelected={selectedTracks.includes(track.uri)}
    />
  ));

  const getPlaylist = () => {
    console.log(selectedTracks);
  };
  
  const isClicked = () => setIsSubmitted(true);

  return (
    <>
      <div className="container flex-1 flex">
        <div className="sidebar flex-col bg-zinc-800 w-64 h-screen sticky overflow-y-auto">
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

          {/* TODO: tailwind to bottom */}
          <div className="grid grid-cols-1">
            <button
              className="text-s w-50 text-center bg-pink-600 hover:bg-pink-600/75 text-white font-bold mt-3 mx-4 py-2 px-4 rounded"
              onClick={logout}
            >
              logout
            </button>
          </div>

          {/* TODO: debug test elements; delete later */}
          <button onClick={handleProfile}>Profile</button>
          <button onClick={getPlaylist}>View Playlist</button>
        </div>

        <div className="content-area flex-1 overflow-y-auto">
          <div className="my-7 mx-7">
            <SearchBar
              onSubmit={handleSearch}
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
          {submitted ? <div className="track-area">{mapTracks}</div> : null}
        </div>
      </div>
    </>
  );
}

export default Home;
