import { useAppDispatch, useAppSelector } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { setProfile, removeToken } from "../redux/authSlice";
import { setTracks, setPlaylist } from "../redux/trackSlice";
import { getTracks, createPlaylist, addToPlaylist, getUser } from "./fetchApi";

function useHandlers() {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  let { token, profile } = useAppSelector((state: any) => state.auth);
  let { selectedTracks } = useAppSelector((state: any) => state.track);

  const handleProfile = async () => {
    const userData = await getUser(token);
    dispatch(setProfile(userData));
  };

  const handleSearch = async (e: any) => {
    e.preventDefault();
    const searchParam = e.target.searchParam.value;
    console.log(`q: ${searchParam}`);
    console.log(token);
    const trackData = await getTracks(token, searchParam);
    dispatch(setTracks(trackData));
  };

  const handlePlaylist = async (title: string, description: string) => {
    console.log(token);
    console.log(`profile: ${profile}`);
    const playlistId = await createPlaylist(title, description, token, profile);
    
    if(playlistId !== ""){
      dispatch(setPlaylist(true));
    }
    // TODO: debug
    console.log(`pId: ${playlistId}`);
    console.log(`selectedsongs: ${selectedTracks}`);

    await addToPlaylist(playlistId, token, selectedTracks);
  };

  const logout = () => {
    dispatch(removeToken());
    navigate("/");
  };

  return { handleProfile, handleSearch, handlePlaylist, logout };
}

export default useHandlers;
