import React from "react";
import "./styles.css";
import SelectButton from "../../atoms/SelectButton";

export function SongCard(props) {
  const isSelected = () => {
    props.selectSong(); // function props
  };

  return (
    <tr className="song-area">
      <td className="album-img">
          <img src={props.image} className="song-img" alt={props.title} />
        </td>
      <td className="song-item title">{props.title}</td>
      <td className="song-item artist">{props.artist}</td>
      <td className="song-item album">{props.album}</td>
      <td>
          <SelectButton className="btn-area" type="button" onClick={isSelected}>
            {props.isSelected ? "deselect" : "select"}
          </SelectButton>
        </td>
    </tr>
  );
}
