import './App.css';
import Data from './data/Sample';
import { SongCard } from './components/SongCard/index';

function App() {

  console.log(Data);

  return (
    <div>
    <h1>Make a Playlist!</h1>

      {/* From git source */}
      <SongCard image={Data.album.images[0].url} title={Data.name} artist={Data.album.artists[0].name} album={Data.album.name} />

      </div>
  );
}

export default App;
