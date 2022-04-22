import React from "react";
import "./styles.css";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setSelectedTracks } from "../../redux/trackSlice";
import misc from "../../lib/misc";

interface SongProps {
  imageUrl: string;
  title: string;
  artist: string;
  duration: number;
  trackUri: string;
}

export function SongCard(props: SongProps) {
  const dispatch = useAppDispatch();
  const { useTestId } = misc();
  const testId = useTestId('songCard');
  const { selectedTracks } = useAppSelector((state: any) => state.track);

  const handleSelect = (trackUri: string) => {
    if (selectedTracks.includes(trackUri)) {
      dispatch(
        setSelectedTracks(
          selectedTracks.filter((track: any) => track !== trackUri)
        )
      );
    } else {
      dispatch(setSelectedTracks([...selectedTracks, trackUri]));
    }
  };

  return (
    <div {...testId} className="song-area">
      <div className="album-img">
        <img src={props.imageUrl} className="song-img" alt={props.title} />
      </div>
      <div className="song-details">
        <div className="song-item title">
          <p>{props.title}</p>
        </div>
        <div className="song-item artist">
          <p>{props.artist}</p>
        </div>
        <div className="song-item duration">
          <p>{props.duration}</p>
        </div>
        <div>
          <button
            className="text-sm w-20text-center bg-pink-600 hover:bg-pink-600/75 text-white font-bold mt-3 py-1 px-4 rounded"
            type="button"
            onClick={() => handleSelect(props.trackUri)}
          >
            {selectedTracks.includes(props.trackUri) ? "deselect" : "select"}
          </button>
        </div>
      </div>
    </div>
  );
}
