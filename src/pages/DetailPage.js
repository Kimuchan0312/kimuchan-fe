import React, { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import MainHeader from "../layouts/MainHeader";
import ReadingCard from "../components/ReadingCard";
import Questions from "../components/Questions";
import apiService from "../app/apiService";
import { useParams } from "react-router-dom"; // Import useParams

function DetailPage() {
  const { id } = useParams(); // Use the useParams hook to access the "id" route parameter
  const [readingLesson, setReadingLesson] = useState(null);

  useEffect(() => {
    apiService.get(`/api/v1/reading-lessons/${id}`) 
      .then((response) => {
        setReadingLesson(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reading lesson:", error);
      });
  }, [id]); 

  return (
    <Box>
      <MainHeader />
      <Stack spacing={4} alignItems="center" justifyContent="center">
            <ReadingCard
              title={readingLesson.title}
              jlptLevel={readingLesson.jlptLevel}
              content={readingLesson.content}
            />
            <Questions questionsData={readingLesson.questions} />
      </Stack>
    </Box>
  );
}

export default DetailPage;
