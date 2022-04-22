import React from "react";
// third-party
import { styled } from "@mui/material/styles";
import {
  Button,
  ButtonProps,
  Menu,
  MenuProps,
  MenuItem,
  Divider,
  Avatar,
  IconButton,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// lib & store
import { useAppSelector } from "../../redux/store";
import useHandlers from "../../lib/useHandlers";

// mui custom styling
const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 10,
    marginTop: theme.spacing(1),
    minWidth: 180,
    backgroundColor: "#1C1C1C",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "2px 0",
    },
    "& .MuiMenuItem-root": {
      "&:hover": {
        backgroundColor: "rgba(32, 32, 32, .9)",
      },
    },
  },
}));

const ProfileButton = styled(Button)<ButtonProps>(() => ({
  backgroundColor: "#1C1C1C",
  "&:hover": {
    backgroundColor: "rgba(27, 27, 27, .5)",
  },
}));

export function ProfileMenu() {
  const { profile } = useAppSelector((state: any) => state.auth);
  const { logout } = useHandlers();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <ProfileButton
        id="profile-area"
        aria-controls={open ? "profile-area" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <IconButton>
          <Avatar
            alt="profile-picture"
            src={
              profile.images !== undefined
                ? profile.images[0].url
                : "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n"
            }
            sx={{ width: 36, height: 36, border: 0, objectFit: "cover" }} // cropped avatar
          />
        </IconButton>
      </ProfileButton>
      <StyledMenu
        id="profile-dropdown"
        MenuListProps={{
          "aria-labelledby": "profile-area",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          {profile.display_name}
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={logout} disableRipple>
          logout
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
      </StyledMenu>
    </div>
  );
}
