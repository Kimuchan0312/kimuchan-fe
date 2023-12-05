import React from "react";
import { Button } from "@mui/material";

function TestButtonPanel({ onBack, onSubmit, onNext }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Button
        className="button-panel"
        style={{ backgroundColor: "#D9D9D9", margin: "1rem" }}
        onClick={onBack}
      >
        Back
      </Button>
      <Button
        className="button-panel"
        style={{ backgroundColor: "#F4EEB6", margin: "1rem" }}
        onClick={onSubmit}
      >
        Submit
      </Button>
      <Button
        className="button-panel"
        style={{ backgroundColor: "#D1E3D3", margin: "1rem" }}
        onClick={onNext}
      >
        Next
      </Button>
    </div>
  );
}

export default TestButtonPanel;
