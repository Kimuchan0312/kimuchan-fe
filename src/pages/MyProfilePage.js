import React, { useEffect, useState } from 'react';
import { Card, Typography, LinearProgress } from '@mui/material';
import axios from 'axios';

const JlptTestResults = ({ lesson }) => {
  // Assuming lesson.score and lesson.time are properties of the lesson object
  return (
    <Card variant="outlined" sx={{ mb: 2, p: 2 }}>
      <Typography variant="h6">Average Score: </Typography>
      <LinearProgress variant="determinate" value={lesson.score} />
      <Typography variant="body2">Average Time: {lesson.time}%</Typography>
      {lesson.testResults.map((result, index) => (
        <div key={index}>
          <p>Test Date: {result.date}</p>
          <p>Score: {result.score}</p>
          <p>Time Taken: {result.time}</p>
        </div>
      ))}
    </Card>
  );
};

const MyProfilePage = () => {
  const [setTestResults] = useState([]);

  useEffect(() => {
    // Replace with your API endpoint
    axios.get('/api/user/test-results')
      .then(response => {
        setTestResults(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the test results', error);
      });
  }, [setTestResults]);

  const lesson = {
    score: 75,
    time: 50,
    testResults: [
      { date: '2023-01-01', score: 80, time: 45 },
      { date: '2023-01-05', score: 70, time: 55 },
    ],
  };

  return (
    <div>
      <JlptTestResults lesson={lesson} />
    </div>
  );
};

export default MyProfilePage;
