import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

export default function TestResultModal({ userAnswersArray, questions, correctAnswer, open, onClose }) {
    const results = questions.map((question, index) => {
        const userAnswer = userAnswersArray[index];
        const correctAnswer = question.correctAnswer[0];
        const isCorrect = userAnswer === correctAnswer;
        return { userAnswer, correctAnswer, isCorrect };
      });
    
      console.log('Results:', results);
    
      return (
        <Modal
          open={open}
          onClose={onClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {results.map((result, index) => (
              <div key={index}>
                <Typography variant="body1">Your answer for Question {index + 1} is: {result.userAnswer}</Typography>
                <Typography variant="body1" style={{ color: result.isCorrect ? 'green' : 'red' }}>
                  {result.isCorrect ? 'Correct ✅' : `Wrong ❌. Correct answer: ${result.correctAnswer}`}
                </Typography>
              </div>
            ))}
          </Box>
        </Modal>
      );
    };