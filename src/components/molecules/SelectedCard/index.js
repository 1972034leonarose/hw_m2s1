import './styles.css';

export const SelectedCard = (props) => {
    return (
        <div className="song-area">
            <img src={props.image} className="song-img" alt={props.title}></img>
            <div className="song-details">
                <div className="song-item title">{props.title}</div>
                <div className="song-item artist">{props.artist}</div>
                <div className="song-item album">{props.album}</div>
            </div>
        </div>
    )
}