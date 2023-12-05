import React, { useState, useEffect } from "react";
import { Box, CardContent, Chip, Typography, Grid, Alert } from "@mui/material";
import apiService from "../app/apiService";
import TestButtonPanel from "../components/TestButtonPanel";
import Question from "../components/Question";
import { useParams } from "react-router-dom";
import ResultModal from "../components/ResultModal";

function TestDetailPage() {
  const { id } = useParams();
  const [test, setTest] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [userAnswersArray, setUserAnswersArray] = useState([]);
  const [showError, setShowError] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentLessonQuestions, setCurrentLessonQuestions] = useState([]);

  useEffect(() => {
    apiService
      .get(`/api/v1/tests/${id}`)
      .then((response) => {
        setTest(response.data);
        const answers = response.data.lessons.flatMap((lesson) =>
          lesson.readingLesson.questions.map(
            (question) => question.correctAnswer[0]
          )
        );

        setCorrectAnswer(answers);
        setCurrentLessonQuestions(response.data.lessons[currentLessonIndex].readingLesson.questions);
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
    console.log("User Answers:", userAnswers);
    const allAnswered = currentLessonQuestions.every((_, index) => {
      const key = `lesson-${currentLessonIndex}-question-${index}`;
      return userAnswers[key] !== null && userAnswers[key] !== undefined;
    });
    const userAnswersArray = Object.values(userAnswers);
    if (!allAnswered) {
      setShowError(true);
    } else {
      setShowError(false);
    }
    console.log("User Answers:", userAnswersArray);

  const results = currentLessonQuestions.map((question, index) => {
    const userAnswer = userAnswersArray[index];
    const correctAnswer = question.correctAnswer[0];
    const isCorrect = userAnswer === correctAnswer;
    return { userAnswer, correctAnswer, isCorrect };
  });

  console.log("Results:", results);
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
              <Grid item xs={12}>
                <TestButtonPanel
                  onBack={handleBack}
                  onSubmit={handleSubmit}
                  onNext={handleNext}
                />
                {showError && (
                  <Alert severity="error">
                    Please answer all questions before submitting.
                  </Alert>
                )}
              </Grid>
              <Grid item xs={6}>
                <ResultModal
                  userAnswersArray={userAnswersArray}
                  userAnswers={userAnswers}
                  correctAnswer={correctAnswer}
                  open={open}
                  onClose={() => setOpen(false)}
                />
              </Grid>
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
