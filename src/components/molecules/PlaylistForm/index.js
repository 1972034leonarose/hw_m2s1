import React from "react";

export const PlaylistForm = (props) => {
  return (
    <div>
      <form className="px-4 pt-6 pb-8 mb-4">
        <input
          className="text-sm shadow appearance-none border rounded w-48 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Title"
          value={props.title}
          onChange={props.input}
          required
        ></input>
        <textarea
          className="text-sm shadow appearance-none border rounded w-48 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-3"
          placeholder="Description"
          onChange={props.description}
          required
        ></textarea>
        <div>
          <button className="text-sm font-bold bg-pink-600 hover:bg-pink-800 py-2 px-4 mt-3 rounded" type="text" onClick={props.createPlaylist}>
            create
          </button>
        </div>
      </form>
      
      
    </div>
  );
};
