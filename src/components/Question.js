import React from 'react';

function Question({ question, options }) {
  return (
    <div>
    <p>{question}</p>
    {options.map((option, index) => (
      <div key={index} style={{ marginBottom: '10px' }}>
        <label>
          <input type="radio" name={question} value={option} />
          {`${index + 1}. ${option}`}
        </label>
      </div>
    ))}
  </div>
  );
}

export default Question;
