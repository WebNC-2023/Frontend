import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h4" sx={{ my: 2 }}>
              Page Not Found
            </Typography>
            <Typography variant="h6">
              We couldn't find the page you're looking for.
            </Typography>
            <Link to="/home-page">
              <Button
                variant="contained"
                sx={{
                  mt: 5,
                  bgcolor: "#5175e0",
                  "&:hover": {
                    bgcolor: "#5175e0",
                  },
                }}
              >
                Back Home
              </Button>
            </Link>
          </Grid>
          <Grid xs={6}>
            <img
              src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
              alt=""
              width={500}
              height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
