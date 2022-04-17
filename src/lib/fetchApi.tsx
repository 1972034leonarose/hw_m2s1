import axios from "axios";

// get tracks being searched
const getTracks = async (token: string) => {
  const url = "https://api.spotify.com/v1/search";
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      // TODO: incorrect when passing searchParam
      q: "abcdefu",
      type: "track",
      scope: "playlist-modify-private",
    },
  });
  return response.data.tracks.items;
};

// create playlist
const createPlaylist = async (title: string, description: string, token: string, profile: any) => {
  const url = `https://api.spotify.com/v1/users/${profile.id}/playlists`;
  const response = await axios.post(
    url,
    {
      name: title,
      description: description,
      public: false,
      collaborative: false,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.id;
};

// add selected songs to created playlist
const addToPlaylist = async (playlistId: string, token: string, songData: any) => {
  const response = await axios
    .post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      songData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
};

// TODO: playlist funcs unused atm
export { getTracks, createPlaylist, addToPlaylist };
