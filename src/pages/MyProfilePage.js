import React from 'react';
import { Card, Typography, LinearProgress, Button } from '@mui/material';

const ProfileLessonProgress = ({ lesson }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2, p: 2 }}>
      <Typography variant="h6">{lesson.title}</Typography>
      <LinearProgress variant="determinate" value={lesson.progress} />
      <Typography variant="body2">Progress: {lesson.progress}%</Typography>
      {lesson.completed ? (
        <Button color="primary">Review Answers</Button>
      ) : (
        <Button color="secondary">Continue Lesson</Button>
      )}
    </Card>
  );
};

// Usage
const userLessons = [
  { title: "Lesson 1", progress: 100, completed: true },
  { title: "Lesson 2", progress: 60, completed: false },
];

const MyProfilePage = () => {
  return (
    <div>
      <Typography variant="h4">My Profile</Typography>
      {/* User info and other components */}
      {userLessons.map((lesson, index) => (
        <ProfileLessonProgress key={index} lesson={lesson} />
      ))}
    </div>
  );
};

export default MyProfilePage;
