import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Typography, Container } from "@mui/material";

function NotFoundPage() {
  return (
    <Container sx={{ display: "flex", height: "100%", alignItems: "center" }}>
      <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
        <Typography variant="h4" paragraph>
          Page not found!
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: "1rem" }}>
          Sorry, we couldn’t find the page you requested.
        </Typography>
        <Button to="/" variant="contained" component={RouterLink} sx={{
              backgroundColor: "#ECD3D3",
              "&:hover": { backgroundColor: "#ECD3E1" },
              color: '#000'
            }}>
          Go to Home
        </Button>
      </Box>
    </Container>
  );
}
export default NotFoundPage;