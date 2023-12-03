import React, { useEffect, useState } from 'react';
import { Card, Typography, LinearProgress} from '@mui/material';

import axios from 'axios';

const MyProfilePage = () => {
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    // Replace with your API endpoint
    axios.get('/api/user/test-results')
      .then(response => {
        setTestResults(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the test results', error);
      });
  }, []);

const JlptTestResults = ({ lesson }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2, p: 2 }}>
      <Typography variant="h6">Average Score: </Typography>
      <LinearProgress variant="determinate" value={lesson.score} />
      <Typography variant="body2">Average Time: {lesson.time}%</Typography>
      {testResults.map((result, index) => (
        <div key={index}>
          <p>Test Date: {result.date}</p>
          <p>Score: {result.score}</p>
          <p>Time Taken: {result.time}</p>
          <button onClick={() => {/* Function to view answer sheet */}}>
            View Answer Sheet
          </button>
        </div>
      ))}
    </Card>
  );
};
}

export default MyProfilePage;
