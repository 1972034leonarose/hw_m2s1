import React from 'react'

export const PlaylistForm = (props) => {
  return (
    <div> 
        <div className="title">
            <input type="text" placeholder="title" onChange={props.input}></input>
        </div>
        <div className="description">
            <textarea placeholder="Description" onChange={props.description}></textarea>
        </div>
        <div>
          <button type="text" onClick={props.createPlaylist}>Create Playlist</button>
        </div>
    </div>
  )
}

