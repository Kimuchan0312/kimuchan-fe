import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Paper } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 300,
  bgcolor: "background.paper",
  boxShadow: 20,
  marginLeft: 10,
  p: 4
};

export default function TestResultModal({
  userAnswersArray,
  questions,
  correctAnswer,
  open,
  onClose,
}) {
  const results = questions.map((question, index) => {
    const userAnswer = userAnswersArray[index];
    const correctAnswer = question.correctAnswer[0];
    const isCorrect = userAnswer === correctAnswer;
    return { userAnswer, correctAnswer, isCorrect };
  });

  console.log("Results:", results);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper style={{ backgroundColor: "#F4E9F8", ...style }}>
        <Box sx = {{ margin: 2 }}>
          {results.map((result, index) => (
            <div key={index}>
              <Typography variant="body1">
                Your answer for Question {index + 1} is: {result.userAnswer}
              </Typography>
              <Typography
                variant="body1"
                style={{ color: result.isCorrect ? "green" : "red" }}
              >
                {result.isCorrect
                  ? "Correct ✅"
                  : `Wrong ❌. Correct answer is: ${result.correctAnswer}`}
              </Typography>
            </div>
          ))}
        </Box>
      </Paper>
    </Modal>
  );
}
