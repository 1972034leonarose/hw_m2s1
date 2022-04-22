import React, { useState, useEffect } from "react";
import "../../App.css";
import "./styles.css";
// third-party
import { useSelector } from "react-redux";
// components & lib
import useHandlers from "../../lib/useHandlers";
import misc from "../../lib/misc";
import { SearchBar } from "../../components/SearchBar";
import { SongCard } from "../../components/SongCard";
import { PlaylistForm } from "../../components/PlaylistForm";
import { ProfileMenu } from "../../components/ProfileMenu";

function Home() {
  const { handleProfile } = useHandlers();
  const { convertDuration } = misc();

  let { tracks } = useSelector((state) => state.track);

  const [submitted, setIsSubmitted] = useState(false);

  // set user profile
  useEffect(() => {
    handleProfile();
  }, []);

  // map tracks that's being searched
  const mapTracks = tracks.map((track) => (
    <SongCard
      key={track.uri}
      imageUrl={track.album.images[2].url}
      title={track.name}
      artist={track.artists[0].name}
      duration={convertDuration(track.duration_ms)}
      trackUri={track.uri}
    />
  ));

  const isClicked = () => setIsSubmitted(true);

  return (
    <>
      <div className="container flex-1 flex">
        <section id="sidebar">
          <div className="sidebar flex-col bg-zinc-800 w-64 h-screen sticky overflow-y-auto">
            <h1 className="logo text-4xl font-bold pl-4 pt-10">playroll</h1>
            <br />
            <p className="text-2xl font-bold pl-4 pt-10">create a playlist</p>

            <div>
              <PlaylistForm />
            </div>
          </div>
        </section>

        <div className="content-area flex-1 overflow-y-auto">
          <header>
            <div className="header flex flex-auto justify-between w-full">
              <div className="flex-auto my-7 mx-7">
                <SearchBar onClick={isClicked} />
              </div>

              <div className="flex-end my-7 mx-7">
                <ProfileMenu />
              </div>
            </div>
          </header>

          <section id="content">
            <h1 className="font-bold mx-11 text-2xl">
              select songs to add to your playlist !
            </h1>

            {submitted ? <div className="track-area">{mapTracks}</div> : null}
          </section>
          
        </div>
      </div>
    </>
  );
}

export default Home;
