import React, { useState, useEffect } from 'react';
import ReadingCard from './ReadingCard';
import { Grid } from "@mui/material";
import apiService from '../app/apiService';

function ReadingList( id ) {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    apiService.get('/api/v1/reading-lessons')
      .then(response => setLessons(response.data))
      .catch(error => console.error('Error fetching lessons:', error));
  }, []);

  return (
    <Grid container spacing={2}>
      {lessons.map(lesson => (
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
