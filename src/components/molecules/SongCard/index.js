import { useState } from "react";
import "./styles.css";
import SelectButton from "../../atoms/SelectButton";

export const SongCard = (props) => {
  const [selected, setSelected] = useState(false);

  const isSelected = () => {
    setSelected(!selected);
    props.selectSong(); // function props
  };

  return (
      <tr className="song-area">
        <td className="album-img">
          <img src={props.image} className="song-img" alt={props.title}></img>
        </td>
        <td className="song-item title">{props.title}</td>
        <td className="song-item artist">{props.artist}</td>
        <td className="song-item album">{props.album}</td>
        {/* <td className="btn-area">{props.button}</td> */}
        <td>
          <SelectButton className="btn-area" type="button" onClick={isSelected}>
            {selected ? "deselect" : "select"}
          </SelectButton>
        </td>
      </tr>
  );
};
