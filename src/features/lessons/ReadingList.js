import ReadingCard from './ReadingCard';
import { Grid } from "@mui/material";

function ReadingList( {readingLessons} ) {
  return (
    <Grid container spacing={2}>
      {readingLessons.map(lesson => (
        <Grid item xs={12} sm={6} md={6} lg={6} key={lesson._id}>
          <ReadingCard 
            title={lesson.title} 
            jlptLevel={lesson.jlptLevel}
            content={lesson.content}
            id={lesson._id}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default ReadingList;
