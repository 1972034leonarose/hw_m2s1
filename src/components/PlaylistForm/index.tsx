import { useState } from "react";
import TextField from "@mui/material/TextField";
import useHandlers from "../../lib/useHandlers";

export const PlaylistForm = () => {
  const { handlePlaylist } = useHandlers();

  const defaultValues = {
    name: "",
    description: "",
  };

  const [values, setFormValues] = useState(defaultValues);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (values.name.length > 9) {
      handlePlaylist(values.name, values.description);
    }else{
      alert("wrong");
    }
  };

  return (
    <div>
      <form className="px-4 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <TextField
          id="name-field"
          name="name"
          type="text"
          placeholder="Playlist name"
          value={values.name}
          helperText={
            values.name.length > 9 ? "" : "Title must be at least 10 characters"
          }
          onChange={handleChange}
        />

        <TextField
          id="desc-field"
          name="description"
          type="text"
          placeholder="Give it a description"
          value={values.description}
          multiline
          rows={4}
          onChange={handleChange}
        />
        <div>
          <button className="text-sm font-bold bg-pink-600 hover:bg-pink-800 py-2 px-4 mt-3 rounded">
            create
          </button>
        </div>
      </form>
    </div>
  );
};
