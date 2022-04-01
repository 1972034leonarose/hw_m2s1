import 'components/SongCard/styles.css';

export const SongCard = (props) => {
  return (
      <tr className="song-area">
        <td className="album-img">
          <img src={props.image} className="song-img" alt={props.title}></img>
        </td>
        <td className="song-item title">{props.title}</td>
        <td className="song-item artist">{props.artist}</td>
        <td className="song-item album">{props.album}</td>
        <td className="btn-area">{props.button}</td>
      </tr>
  );
};
