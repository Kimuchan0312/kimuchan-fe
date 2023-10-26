import React from 'react';
import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';

function Question({ questionText, answers }) {
  const [value, setValue] = React.useState(''); // to store the selected option

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {questionText}
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup value={value} onChange={handleChange}>
          {answers.map((answer, index) => (
            <FormControlLabel
              key={index}
              value={answer}
              control={<Radio />}
              label={answer}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

function Questions({ questionsData }) {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Test
      </Typography>
      {questionsData.map((q, index) => (
        <Question key={index} questionText={q.question} answers={q.options} />
      ))}
    </Box>
  );
}

export default Questions;
