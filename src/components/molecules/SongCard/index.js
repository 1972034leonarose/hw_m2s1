import "./styles.css";
import SelectButton from "../../atoms/SelectButton";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTracks } from "../../../redux/trackSlice";

export function SongCard(props) {
  const dispatch = useDispatch();
  let { selectedTracks } = useSelector((state) => state.track);

  const handleSelect = (trackUri) => {
    if (selectedTracks.includes(trackUri)) {
      dispatch(
        setSelectedTracks(selectedTracks.filter((track) => track !== trackUri))
      );
    } else {
      dispatch(setSelectedTracks([...selectedTracks, trackUri]));
    }
  };

  return (
    <div className="song-area">
      <div className="album-img">
        <img src={props.image} className="song-img" alt={props.title} />
      </div>
      <div className="song-details">
        <div className="song-item title">
          <p>{props.title}</p>
        </div>
        <div className="song-item artist">
          <p>{props.artist}</p>
        </div>
        <div className="song-item album">
          <p>{props.album}</p>
        </div>
        <div>
          <SelectButton
            className="btn-area"
            type="button"
            onClick={() => handleSelect(props.trackUri)}
          >
            {selectedTracks.includes(props.trackUri) ? "deselect" : "select"}
          </SelectButton>
        </div>
      </div>
    </div>
  );
}
