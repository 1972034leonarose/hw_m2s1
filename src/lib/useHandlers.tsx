import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProfile, removeToken } from "../redux/authSlice";
import { setTracks } from "../redux/trackSlice";
import { getUser } from "./auth";
import { getTracks, createPlaylist, addToPlaylist } from "./fetchApi";

function useHandlers() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  let { token, profile } = useSelector((state: any) => state.auth);

  const handleProfile = async () => {
    const userData = await getUser(token);
    dispatch(setProfile(userData));
    // TODO: debug
    console.log(profile);
  };

  // TODO: searchParam passing incorrect
  const handleSearch = async (e: any) => {
      e.preventDefault();
      const trackData = await getTracks(token);
      dispatch(setTracks(trackData));
  }

//   const handlePlaylist = async (e) => {
//     e.preventDefault();
//     const playlistId = await createPlaylist();
//     // TODO: debug
//     console.log(playlistId);

//     await addToPlaylist(playlistId);
//   }; 

  const logout = () => {
    dispatch(removeToken());
    navigate("/");
  };

  return { handleProfile, handleSearch, logout };
}

export default useHandlers;
