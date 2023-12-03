import { Grid } from "@mui/material";
import TestCard from './TestCard';

function TestList({ tests }) {
  return (
    <Grid container spacing={2}>
      {tests.map(test => (
        <Grid item xs={12} sm={6} md={6} lg={6} key={test._id}>
          {/* Access jlptLevel inside readingLesson */}
          <TestCard 
            title={test.title} 
            jlptLevel={test.lessons[0].readingLesson.jlptLevel}
            content={test.lessons[0].readingLesson.content}
            id={test.lessons[0].readingLesson._id}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default TestList;
