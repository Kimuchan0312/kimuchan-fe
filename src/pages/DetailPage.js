import React, { useState, useEffect } from "react";
import { Box, CardContent, Chip, Typography, Grid } from "@mui/material";
import Question from "../components/Question";
import apiService from "../app/apiService";
import ButtonPanel from "../components/ButtonPanel";
import ResultModal from "../components/ResultModal";
import { useParams } from "react-router-dom";

function DetailPage() {
  const { id } = useParams();
  const [readingLesson, setReadingLesson] = useState(null);
  const [open, setOpen] = useState(false); // React.useState is not necessary here
  const [userAnswers, setUserAnswers] = useState([]); // Initialize as an empty array
  const [correctAnswer, setCorrectAnswer] = useState([]);

  useEffect(() => {
    apiService
      .get(`/api/v1/reading-lessons/${id}`)
      .then((response) => {
        setReadingLesson(response.data);
        const answers = response.data.questions.map(
          (question) => question.correctAnswer
        );
        setCorrectAnswer(answers);
      })
      .catch((error) => {
        console.error("Error fetching reading lesson:", error);
      });
  }, [id]);

  const handleAnswerSelection = (selectedOption, index) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[index] = selectedOption;
    setUserAnswers(newUserAnswers);
  };

  const handleOpenSubmit = () => {
    setOpen(true);
  };

  return (
    <Box>
      {readingLesson ? (
        <>
          <Grid container spacing={3} sx={{margin: '2rem'}}>
            <Grid item xs={6}>
              <CardContent sx={{ backgroundColor: "#FAF3E9" }}>
                <Chip
                  variant="outlined"
                  color="primary"
                  sx={{
                    padding: "10px 20px",
                    border: "1px solid #000",
                    backgroundColor: "#ECD3D3",
                    margin: '0.5rem'
                  }}
                  label={readingLesson.jlptLevel}
                />
                <Typography
                  variant="body1"
                  color="textPrimary"
                  paragraph
                  sx={{ whiteSpace: "pre-wrap" }}
                >
                  {readingLesson.content}
                </Typography>
              </CardContent>
            </Grid>

            <Grid item xs={6}>
              {readingLesson.questions.map((questionData, index) => (
                <Box key={index} mb={1}>
                  <Question
                    question={questionData.question}
                    options={questionData.options}
                    onUpdateAnswer={(selectedOption) =>
                      handleAnswerSelection(selectedOption, index)
                    }
                  />
                </Box>
              ))}
              <Grid item xs={12}>
                <ButtonPanel
                  onSubmit={() => handleOpenSubmit()}
                  onReview={() => console.log("Review")}
                  onSolution={() => console.log("Solution")}
                />
              </Grid>
              <Grid item xs={6}>
                <ResultModal
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

export default DetailPage;
