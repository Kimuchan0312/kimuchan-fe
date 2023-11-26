import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React, { useState } from 'react';

function Question({ question, options, onUpdateAnswer }) {
  // Local state to hold the user's answer. Initialize with null.
  const [userAnswer, setUserAnswer] = useState(null);

  // Function to handle option change
  const handleOptionChange = (event) => {
    // Get the selected option
    const selectedOption = event.target.value;
    // Update the local state
    setUserAnswer(selectedOption);

    // Call the parent callback, if provided
    if (onUpdateAnswer) {
      onUpdateAnswer(selectedOption);
    }
  };
  
  return (
    <div style={{ marginBottom: '20px' }}>
    <FormControl component="fieldset">
      <div style={{ marginBottom: '10px' }}>
        <div>{question}</div>
        <RadioGroup value={userAnswer} onChange={handleOptionChange}>
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option}
              control={<Radio />}
              label={`${index + 1}. ${option}`}
            />
          ))}
        </RadioGroup>
      </div>
    </FormControl>
  </div>
);
}


export default Question;
