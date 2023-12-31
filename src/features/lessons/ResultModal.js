import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Paper } from '@mui/material';

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

export default function ResultModal({ userAnswers, correctAnswer, open, onClose }) {

    const correctAnswerString = Array.isArray(correctAnswer) ? String(correctAnswer[0]) : String(correctAnswer);

    return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper style={{ backgroundColor: "#F4E9F8", ...style }}>
        <Box sx={{ margin: 2}}>
          {userAnswers.map((answer, index) => (
            <div key={index}>
              <Typography variant="body1">Your answer for the Question is: {answer}</Typography>
              <Typography variant="body1" style={{ color: typeof answer === 'string' && answer === correctAnswerString ? 'green' : 'red' }}>
                {typeof answer === 'string' && answer === correctAnswerString ? 'Correct ✅' : 'Wrong ❌'}
              </Typography>
            </div>
          ))}
        </Box>
        </Paper>
      </Modal>
    );
  }