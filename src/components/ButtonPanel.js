import React from 'react';
import '../components/ButtonPanel.css';

function ButtonPanel({ onReview, onSubmit, onSolution }) {
  return (
    <div>
      <button className="button-panel" style={{backgroundColor: "#D9D9D9"}} onClick={onSubmit}>Submit</button>
      <button className="button-panel" style={{backgroundColor: "#F4EEB6"}} onClick={onReview}>Review</button>
      <button className="button-panel" style={{backgroundColor: "#D1E3D3"}} onClick={onSolution}>Solution</button>
    </div>
  );
}

export default ButtonPanel;
