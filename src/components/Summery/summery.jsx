import React from "react";
//css
import "./summery.css";

const Summery = ({ score, lightMode }) => {
  return (
    <div
      className="summery"
      style={{
        backgroundColor: lightMode ? "#282c34" : "white",
        color: lightMode ? "white" : "black",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2>Score Summery</h2>
      <h1 style={{ color: "green" }}>{score()} / 3</h1>
    </div>
  );
};

export default Summery;
