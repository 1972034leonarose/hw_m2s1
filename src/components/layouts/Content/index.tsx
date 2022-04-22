import { Container, Box } from "@mui/material";
import { useAppSelector } from "../../../redux/store";

export default function Content(children: any) {
  const { tracks } = useAppSelector((state: any) => state.track);

  return (
    <Container
      style={{
        minWidth: "100%",
        height: "100vh",
      }}
    >
      {children}
      {/* {(tracks.length < 1) ? (
        <Box
          px={{ xs: 3, sm: 10 }}
          py={{ xs: 5, sm: 10 }}
          bgcolor="text.secondary"
          color="white"
        >
          <Container maxWidth="lg">
            <Box
              textAlign="center"
              pt={{ xs: 5, sm: 10 }}
              pb={{ xs: 5, sm: 0 }}
            >
              Material UI Workshop &reg; {new Date().getFullYear()}
            </Box>
          </Container>
        </Box>
      ) : 
        {children}
      } */}
    </Container>
  );
}
