export const SearchBar = (props) => {
  return (
    <form className="flex px-4" onSubmit={props.onSubmit}>
      <input
        className="text-sm shadow appearance-none border rounded w-64 py-2 px-3 mt-3 text-gray-700 h-11 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Search for a song"
        onChange={props.onChange}
      ></input>

      {/* TODO: make into atom */}
      <button
        className="text-sm font-bold bg-pink-600 hover:bg-pink-800 py-2 px-4 mt-3 ml-5 rounded"
        type="submit"
        onClick={props.onClick}
      >
        search
      </button>
    </form>
  );
};
