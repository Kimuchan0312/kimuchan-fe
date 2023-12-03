import React, { useState, useEffect } from "react";
import { Box, CardContent, Chip, Typography, Grid } from "@mui/material";
import apiService from "../app/apiService";
import { useParams } from "react-router-dom";
import TestButtonPanel from "../components/TestButtonPanel";
import Question from "../components/Question"; // Ensure you import Question component
import TestCard from "../components/TestCard";

function TestDetailPage() {
  const { id } = useParams();
  const [test, setTest] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    apiService
      .get(`/api/v1/tests/${id}`)
      .then((response) => {
        setTest(response.data);
      })
      .catch((error) => {
        console.error("Error fetching test:", error);
      });
  }, [id]);

  const handleBack = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentLessonIndex < test.readingLessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const handleAnswerChange = (selectedOption, questionIndex) => {
    const key = `lesson-${currentLessonIndex}-question-${questionIndex}`;
    setUserAnswers({
      ...userAnswers,
      [key]: selectedOption,
    });
  };

  const handleSubmit = () => {
    const currentLessonQuestions =
      test.readingLessons[currentLessonIndex].questions;
    const allAnswered = currentLessonQuestions.every((_, index) => {
      const key = `lesson-${currentLessonIndex}-question-${index}`;
      return userAnswers[key] !== null && userAnswers[key] !== undefined;
    });

    if (!allAnswered) {
      setShowError(true);
    } else {
      setShowError(false);
      // Proceed with submission logic here
    }
  };

  return (
    <Box>
      {test ? (
        <>
          <Grid container spacing={3} sx={{ margin: "2rem" }}>
            <Grid item xs={6}>
              <CardContent sx={{ backgroundColor: "#FAF3E9" }}>
                <Chip
                  variant="outlined"
                  color="primary"
                  sx={{
                    padding: "10px 20px",
                    border: "1px solid #000",
                    backgroundColor: "#ECD3D3",
                    margin: "0.5rem",
                  }}
                  label={`JLPT ${test.readingLessons.jlptLevel} Reading Test`}
                />
                <Typography
                  variant="body1"
                  color="textPrimary"
                  paragraph
                  sx={{ whiteSpace: "pre-wrap" }}
                >
                  {test.content}
                </Typography>
              </CardContent>
            </Grid>

            <Grid item xs={6}>
              {test.readingLessons.length > 0 && (
                <Box mb={1}>
                  <TestCard
                    lesson={test.readingLessons[currentLessonIndex].lesson}
                    order={test.readingLessons[currentLessonIndex].order}
                  />
                </Box>
              )}
            </Grid>

            <Grid item xs={6}>
              {test.readingLessons[currentLessonIndex]?.questions.map(
                (questionData, index) => (
                  <Box key={index} mb={1}>
                    <Question
                      question={questionData.question}
                      options={questionData.options}
                      onUpdateAnswer={(selectedOption) =>
                        handleAnswerChange(selectedOption, index)
                      }
                    />
                  </Box>
                )
              )}
              <TestButtonPanel onBack={handleBack} onNext={handleNext} />
              {showError && (
                <div className="error-message">
                  Please answer all questions before submitting.
                </div>
              )}
              <button onClick={handleSubmit}>Submit</button>
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
}

export default TestDetailPage;
