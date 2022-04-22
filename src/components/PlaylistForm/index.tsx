import React, { useState } from "react";
// third-party
import { styled } from "@mui/material/styles";
import { TextField, InputProps, Stack } from "@mui/material";
// lib & store
import useHandlers from "../../lib/useHandlers";
import { setPlaylist } from "../../redux/trackSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

// mui custom styling
const CustomTextField = styled(TextField)<InputProps>(({ theme }) => ({
  borderRadius: 10,
  width: 220,
  fontSize: 10,
  marginBottom: theme.spacing(2),
  color: "#000000",
  backgroundColor: "#FFFFFF",
}));

export function PlaylistForm() {
  const { handlePlaylist } = useHandlers();
  const dispatch = useAppDispatch();
  const [nameError, setNameError] = useState(false);

  const { selectedTracks } = useAppSelector(
    (state: any) => state.track
  );

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
    setNameError(false);
    e.preventDefault();
    if (values.name.length > 9 && selectedTracks.length > 0) {
      handlePlaylist(values.name, values.description);
      dispatch(setPlaylist(true));
      alert("Playlist is on the roll!");
    } else if (values.name.length > 9 && selectedTracks.length === 0) {
      handlePlaylist(values.name, values.description);
      dispatch(setPlaylist(true));
      alert("Empty playlist on the roll!");
    } else {
      setNameError(true);
      alert("Name must be at least 10 characters");
    }
  };

  return (
    <div>
      <p className="text-2xl font-bold pl-4 pt-10">create a playlist</p>

      <form className="px-4 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <CustomTextField
            id="name-field"
            name="name"
            type="text"
            placeholder="Playlist name"
            value={values.name}
            // helperText={"Must be at least 10 characters"}
            onChange={handleChange}
            error={nameError}
            required
          />

          <CustomTextField
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
        </Stack>
      </form>
    </div>
  );
}
