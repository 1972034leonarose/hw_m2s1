import React, { useState } from "react";
// third-party
import { styled } from "@mui/material/styles";
import {TextField, InputProps} from "@mui/material";
// lib & store
import useHandlers from "../../lib/useHandlers";
import { setPlaylist } from "../../redux/trackSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

// custom styling
const CustomTextField = styled(TextField)<InputProps>(({ theme }) => ({
  borderRadius: 10,
  width: 220,
  marginBottom: theme.spacing(2),
  color: "#000000",
  backgroundColor: "#FFFFFF",
}));

export function PlaylistForm() {
  const { handlePlaylist } = useHandlers();
  const dispatch = useAppDispatch();

  const { playlist, selectedTracks } = useAppSelector(
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
    e.preventDefault();
    if (values.name.length > 9 && selectedTracks.length > 0) {
      handlePlaylist(values.name, values.description);
      dispatch(setPlaylist(true));
      alert("success");
    } else if (values.name.length > 9 && selectedTracks.length === 0) {
      handlePlaylist(values.name, values.description);
      dispatch(setPlaylist(true));
      alert("empty playlist success");
    } else {
      alert("length check");
    }
  };

  return (
    <div>
      <form className="px-4 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <CustomTextField
          id="name-field"
          name="name"
          type="text"
          placeholder="Playlist name"
          value={values.name}
          // helperText={
          //   values.name.length > 9 ? "" : "Must be at least 10 characters"
          // }
          onChange={handleChange}
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
      </form>
    </div>
  );
}
