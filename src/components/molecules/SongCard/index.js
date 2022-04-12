import React from "react";
import "./styles.css";
import SelectButton from "../../atoms/SelectButton";

export function SongCard(props) {
  const isSelected = () => {
    props.selectSong(); // function props
  };

  return (
    <div className="song-area">
      <div className="album-img">
        <img src={props.image} className="song-img" alt={props.title} />
      </div>
      <div className="song-details">
        <div className="song-item title"><p>{props.title}</p></div>
        <div className="song-item artist"><p>{props.artist}</p></div>
        <div className="song-item album"><p>{props.album}</p></div>
        <div>
          <SelectButton className="btn-area" type="button" onClick={isSelected}>
            {props.isSelected ? "deselect" : "select"}
          </SelectButton>
        </div>
      </div>
    </div>
  );
}
