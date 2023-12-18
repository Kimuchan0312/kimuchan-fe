import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Link,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function TestCard({ title, order, id, jlptLevel, content }) {
  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={2}
        >
          <Link
            component={RouterLink}
            to={`/test/${id}`}
            variant="h4"
            color="textPrimary"
            sx={{
              textDecoration: "none",
              "&:hover": {
                backgroundColor: "primary.light",
              },
            }}
          >
            {title}
          </Link>
          <Button variant="outlined" color="primary">
            {jlptLevel}
          </Button>
        </Box>

        <Typography variant="body1" color="textPrimary" paragraph>
          {content.substring(0, 100)}...
        </Typography>
        <Button component={RouterLink} to={`/test/${id}`} color="primary">
          Read more
        </Button>
      </CardContent>
    </Card>
  );
}

export default TestCard;
