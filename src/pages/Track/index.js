import "App.css";
import datas from "data/Sample";
import { SongCard } from "components/SongCard/index";

function Track() {
  console.log(datas);
  const trackList = datas.map((data, id) => (
    <SongCard
      key={id}
      image={data.album.images[0].url}
      title={data.name}
      artist={data.album.artists[0].name}
      album={data.album.name}
    />
  ));

  return (
    <div className="container">
      <h1>Your Playlist</h1>
      <button className="btn-select">Select</button>
      <table className="song-list">
        <tbody>
          <tr>
            <th className="album-img">Title</th>
            <th className="song-item title"></th>
            <th className="song-item artist">Artist</th>
            <th className="song-item album">Album</th>
          </tr>
        </tbody>
        {trackList}
      </table>
    </div>
  );
}

export default Track;
