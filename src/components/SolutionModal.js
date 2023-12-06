import React from "react";
import { Modal, Box, Typography } from "@mui/material";

const SolutionModal = ({ open, onClose, questions }) => {
  console.log("Questions Data:", questions);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {questions && questions.length > 0 ? (
          questions.map((question, index) => (
            <div key={index}>
              <Typography variant="body1">
                {`Correct Answer for Question ${index + 1}: ${question.correctAnswer}`}
              </Typography>
            </div>
          ))
        ) : (
          <Typography variant="body1">No questions available</Typography>
        )}
      </Box>
    </Modal>
  );
};

export default SolutionModal;
