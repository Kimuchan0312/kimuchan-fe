import React, { useState, useEffect } from "react";
import {
  Box,
  CardContent,
  Chip,
  Typography,
  Grid,
  Button,
  Alert,
} from "@mui/material";
import apiService from "../app/apiService";
import TestButtonPanel from "../components/TestButtonPanel";
import Question from "../components/Question";
import TestCard from "../components/TestCard";
import { useParams } from "react-router-dom";

function TestDetailPage() {
  const { id } = useParams();
  const [test, setTest] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showError, setShowError] = useState(false);
  // const [correctAnswer, setCorrectAnswer] = useState([]);

  useEffect(() => {
    apiService
      .get(`/api/v1/tests/${id}`)
      .then((response) => {
        setTest(response.data);

        // // Extract correct answers from the questions array
        // const answers = response.data.lessons.flatMap((lesson) =>
        //   lesson.readingLesson.questions.map(
        //     (question) => question.correctAnswer[0]
        //   )
        // );

        // setCorrectAnswer(answers);
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
    if (currentLessonIndex < test.lessons.length - 1) {
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
      test.lessons[currentLessonIndex].readingLesson.questions;
    const allAnswered = currentLessonQuestions.every((_, index) => {
      const key = `lesson-${currentLessonIndex}-question-${index}`;
      return userAnswers[key] !== null && userAnswers[key] !== undefined;
    });

    if (!allAnswered) {
      setShowError(true);
    } else {
      setShowError(false);
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
                  label={`JLPT Reading Test`}
                />
                <Typography
                  variant="body1"
                  color="textPrimary"
                  paragraph
                  sx={{ whiteSpace: "pre-wrap" }}
                >
                  {test.lessons[currentLessonIndex].readingLesson.content}
                </Typography>
              </CardContent>
            </Grid>

            <Grid item xs={6}>
              {test && test.readingLesson && test.readingLesson.length > 0 && (
                <Box mb={1}>
                  <TestCard
                    title={test.lessons[currentLessonIndex].readingLesson.title}
                    order={test.lessons[currentLessonIndex].order}
                    id={test.lessons[currentLessonIndex].id}
                    jlptLevel={
                      test.lessons[currentLessonIndex].readingLesson.jlptLevel
                    }
                    content={
                      test.lessons[currentLessonIndex].readingLesson.content
                    }
                    currentLessonIndex={currentLessonIndex}
                  />
                </Box>
              )}
            </Grid>

            <Grid item xs={6}>
              {test.lessons[currentLessonIndex].readingLesson.questions.map(
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
                <Alert severity="error">
                  Please answer all questions before submitting.
                </Alert>
              )}
              <Button onClick={handleSubmit}>Submit</Button>
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
