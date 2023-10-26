import React, { useState, useEffect } from "react";
import { Box, CardContent, Chip, Typography } from "@mui/material";
import Question from "../components/Question";
import apiService from "../app/apiService";
import { useParams } from "react-router-dom";
import ButtonPanel from "../components/ButtonPanel";
import { Grid } from "@mui/material";

function DetailPage() {
  const { id } = useParams();
  const [readingLesson, setReadingLesson] = useState(null);

  useEffect(() => {
    apiService
      .get(`/api/v1/reading-lessons/${id}`)
      .then((response) => {
        setReadingLesson(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reading lesson:", error);
      });
  }, [id]);

  return (
    <Box>
      <Grid container spacing={5} margin={1}>
        {readingLesson ? (
          <>
            <Grid item xs={6} sx={{display: "flex", alignItems: "center"}}>
              <CardContent sx={{backgroundColor: "#FAF3E9"}}>
                <Chip
                  variant="outlined"
                  color="primary"
                  sx={{ padding: "10px 20px", border: "1px solid #000", bgColor: "#ECD3D3"}}
                  label={readingLesson.jlptLevel}
                />
                <Typography variant="body1" color="textPrimary" paragraph>
                  {readingLesson.content}
                </Typography>
              </CardContent>
            </Grid>

            <Grid item xs={6}  sx={{display: "flex", alignItems: "center"}}>
              {readingLesson.questions.map((questionData, index) => (
                <Question
                  key={index}
                  question={questionData.question}
                  options={questionData.options}
                />
              ))}
              <ButtonPanel
                onSubmit={() => console.log("Submitted")}
                onReview={() => console.log("Review")}
                onSolution={() => console.log("Solution")}
              />
            </Grid>
          </>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Grid>
    </Box>
  );
}

export default DetailPage;
