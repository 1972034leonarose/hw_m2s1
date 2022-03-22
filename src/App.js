import './App.css';
import Data from './data/Sample';
import Songs from './data/Sample2';
import bear from './img/bear.jpeg';
import cat from './img/cat.jpeg';
import gift from './img/gift.jpeg';


function App() {

  console.log(Data);

  return (
    <div>
    <h1>Make a Playlist!</h1>

    <div className="song-area">
      <img src={Data.album.images[1].url} className="song-img" alt="Bohemian Rhapsody"></img>
      <div className="song-item title">{Data.name}</div>
      <div className="song-item artist">{Data.album.artists[0].name}</div>
      <div className="song-item album">{Data.album.name}</div>

      <button className="btn-select-b">Select</button>
    </div>

    {/* extra data */}
    <div className="song-area">
      <img src={bear} className="song-img" alt="Bears"></img>
      <div className="song-item title">{Songs[0].title}</div>
      <div className="song-item artist">{Songs[0].artist}</div>
      <div className="song-item album">{Songs[0].album}</div>

      <button className="btn-select">Select</button>
    </div>

    <div className="song-area">
      <img src={cat} className="song-img" alt="Kit Kat"></img>
      <div className="song-item title">{Songs[1].title}</div>
      <div className="song-item artist">{Songs[1].artist}</div>
      <div className="song-item album">{Songs[1].album}</div>

      <button className="btn-select">Select</button>
    </div>

    <div className="song-area">
      <img src={gift} className="song-img" alt="Cats"></img>
      <div className="song-item title">{Songs[2].title}</div>
      <div className="song-item artist">{Songs[2].artist}</div>
      <div className="song-item album">{Songs[2].album}</div>

      <button className="btn-select">Select</button>
    </div>


   
    </div>
  );
}

export default App;
