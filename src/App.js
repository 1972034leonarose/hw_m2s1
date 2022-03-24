import './App.css';
import Data from './data/Sample';
import Songs from './data/Sample2';
import bear from './img/bear.jpeg';
import cat from './img/cat.jpeg';
import gift from './img/gift.jpeg';
import { SongCard } from './components/SongCard/index';

function App() {

  console.log(Data);

  return (
    <div>
    <h1>Make a Playlist!</h1>

      {/* From git source */}
      <SongCard image={Data.album.images[0].url} title={Data.name} artist={Data.album.artists[0].name} album={Data.album.name} />

      {/* My own data */}
      <SongCard image={bear} title={Songs[0].title} artist={Songs[0].artist} album={Songs[0].album} />

      <SongCard image={cat} title={Songs[1].title} artist={Songs[1].artist} album={Songs[1].album} />

      <SongCard image={gift} title={Songs[2].title} artist={Songs[2].artist} album={Songs[2].album} />
      </div>
  );
}

export default App;
