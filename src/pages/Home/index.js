import { useState, useEffect } from "react";
import "../../App.css";
import "./styles.css";

// third-party
import { useSelector } from "react-redux";

// components & lib
import useHandlers from "../../lib/useHandlers";
import { SearchBar } from "../../components/molecules/SearchBar";
import { SongCard } from "../../components/molecules/SongCard/index";
import { PlaylistForm } from "../../components/molecules/PlaylistForm/index";

function Home() {
  const { handleProfile, handleSearch, handlePlaylist, logout } = useHandlers();

  let { token, profile } = useSelector((state) => state.auth);
  let { tracks, selectedTracks } = useSelector((state) => state.track);

  const [searchParam, setSearchParam] = useState("");
  const [submitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    handleProfile();
  }, [token]);

  // map tracks that's being searched
  const mapTracks = tracks.map((track) => (
    <SongCard
      key={track.uri}
      image={track.album.images[2].url}
      title={track.name}
      artist={track.artists[0].name}
      album={track.album.name}
      trackUri={track.uri}
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
              // input={(e) => setTitle(e.target.value)}
              // description={(e) => setDescription(e.target.value)}
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
          <button onClick={() => console.log(profile)}>Profile</button>
          <button onClick={getPlaylist}>View Playlist</button>
        </div>

        <div className="content-area flex-1 overflow-y-auto">
          <div className="my-7 mx-7">
            <SearchBar
              onSubmit={handleSearch}
              onChange={(e) => {
                setSearchParam(e.target.value);
              }}
              value={searchParam}
              onClick={isClicked}
            />
          </div>

          <h1 className="font-bold mx-11 text-2xl">
            select songs to add to your playlist !
          </h1>

          {submitted ? <div className="track-area">{mapTracks}</div> : null}
        </div>
      </div>
    </>
  );
}

export default Home;
