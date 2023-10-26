import { Box, Typography, Card, CardContent, Link, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom"; // Import Link from React Router

function ReadingCard({ title, jlptLevel, content, id }) {
  return (
    <Card variant="outlined" sx={{ backgroundColor: "rgba(0, 0, 0, 0.05)", maxWidth: '600px', margin: 'auto' }}>
      <CardContent>
        {/* Title & JLPT Level as a Link */}
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
          <Link component={RouterLink} to={`reading-lessons/${id}`} variant="h4" color="textPrimary">
            {title}
          </Link>
          <Button
          variant="outlined"
          color="primary"
        >
          {jlptLevel}
        </Button>
        </Box>

        {/* Reading Lesson Content with "Read more" link */}
        <Typography variant="body1" color="textPrimary" paragraph>
          {content.substring(0, 200)}{/* Display the first 200 characters */}
        </Typography>
        <Link component={RouterLink} to={`reading-lessons/${id}`} color="primary">
          Read more
        </Link>
      </CardContent>
    </Card>
  );
}

export default ReadingCard;