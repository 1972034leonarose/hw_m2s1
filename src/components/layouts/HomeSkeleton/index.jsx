import React, { useState } from "react";
import { useAppSelector } from "../../../redux/store";
import { Box, Typography, Divider, IconButton, Toolbar } from "@mui/material";
import { AppBar } from "../AppBar";
import { SideBar } from "../SideBar";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import { SearchBar } from "../../SearchBar";
import { ProfileMenu } from "../../ProfileMenu";
import { PlaylistForm } from "../../PlaylistForm";
import { SongCard } from "../../SongCard";
import misc from "../../../lib/misc";

export default function HomeSkeleton() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { convertDuration } = misc();
  let { tracks } = useAppSelector((state) => state.track);
  const [submitted, setIsSubmitted] = useState(false);

  // map tracks that's being searched
  const mapTracks = tracks.map((track) => (
    <SongCard
      key={track.uri}
      imageUrl={track.album.images[2].url}
      title={track.name}
      artist={track.artists[0].name}
      duration={convertDuration(track.duration_ms)}
      trackUri={track.uri}
    />
  ));

  const isClicked = () => setIsSubmitted(true);

  return (
    <section>
      <Box sx={{ display: "flex" }}>
        {/* App Bar consisting of search bar & profile */}
        <AppBar
          position="absolute"
          open={open}
          sx={{ bgcolor: "#1b1b1b", height: 80 }}
        >
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <HeadphonesIcon sx={{ mt: 2 }} />
            </IconButton>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <SearchBar onClick={isClicked} />
              <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}>
                <ProfileMenu />
              </Box>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Toggleable Sidebar for Playlist Form*/}
        <SideBar variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              px: [1],
              pt: 2,
              height: 80,
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <HeadphonesIcon sx={{ ml: 1 }} />
            </IconButton>

            <Typography
              component="h1"
              variant="h5"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              playroll
            </Typography>
          </Toolbar>
          <Divider />

          <PlaylistForm />
        </SideBar>
        <Box
          sx={{
            pt: 10,
            pr: 4,
            backgroundColor: "#1b1b1b",
            flexGrow: 1,
            height: "100vh",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {/* content */}
          {submitted ? (
            <div className="track-area">{mapTracks}</div>
          ) : (
            <div className="my-56 mx-24">
              <section id="title">
                <h1 className="text-5xl">search for songs to add!</h1>
              </section>
            </div>
          )}
        </Box>
      </Box>
    </section>
  );
}
