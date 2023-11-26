import React from 'react';
import '../components/ButtonPanel.css';
import { Button } from '@mui/material';

function ButtonPanel({ onReview, onSubmit, onSolution }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Button className="button-panel" style={{backgroundColor: "#D9D9D9", margin: "1rem"}} onClick={onSubmit}>Submit</Button>
      <Button className="button-panel" style={{backgroundColor: "#F4EEB6", margin: "1rem"}} onClick={onReview}>Review</Button>
      <Button className="button-panel" style={{backgroundColor: "#D1E3D3", margin: "1rem"}} onClick={onSolution}>Solution</Button>
    </div>
  );
}

export default ButtonPanel;
