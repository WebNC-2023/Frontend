import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
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
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack
              justifyContent="center"
              alignItems={{ xs: "center", md: "start" }}
            >
              <Typography variant="h1">404</Typography>
              <Typography variant="h4" sx={{ my: 2 }}>
                Page Not Found
              </Typography>
              <Typography variant="h6">
                We couldn't find the page you're looking for.
              </Typography>
              <Link to="/">
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
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img
                src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
                alt="404"
                width={500}
                height={250}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
