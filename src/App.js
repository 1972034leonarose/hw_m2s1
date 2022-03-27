import 'App.css';
import datas from 'data/Sample';
import { SongCard } from 'components/SongCard/index';

function App() {
  console.log(datas);
  const trackList = datas.map((data, id) => 
    <SongCard key={id} image={data.album.images[0].url} title={data.name} artist={data.album.artists[0].name} album={data.album.name} />
  );

  return (
    <div>
    <h1>Make a Playlist!</h1>
      {trackList};
      </div>
  );
}

export default App;
