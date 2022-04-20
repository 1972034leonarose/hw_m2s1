import useHandlers from "../../lib/useHandlers";

interface PlaylistProps {
  title: string;
  changeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeDescription: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PlaylistForm = (props: PlaylistProps) => {
  const { handlePlaylist } = useHandlers();

  return (
    <div>
      <form className="px-4 pt-6 pb-8 mb-4" onSubmit={handlePlaylist}>
        <input
          className="text-sm shadow appearance-none border rounded w-48 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Title"
          value={props.title}
          id="title"
          name="title"
          onChange={props.changeTitle}
          required
        ></input>
        <input
          type="text"
          className="text-sm shadow appearance-none border rounded w-48 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-3"
          placeholder="Description"
          id="description"
          name="description"
          onChange={props.changeDescription}
          required
        ></input>
        <div>
          <button
            className="text-sm font-bold bg-pink-600 hover:bg-pink-800 py-2 px-4 mt-3 rounded"
            // onClick={props.createPlaylist}
          >
            create
          </button>
        </div>
      </form>
    </div>
  );
};
