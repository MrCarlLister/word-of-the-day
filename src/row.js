import Square from "./square.js";
import React, { useEffect } from "react";

export default function Row({ letters, active }) {
  // Initialize the letters array to an empty array if it's null or undefined
  const lettersArray = letters || [];
  const activeArray = active || [];

  // Initialize an array to hold the rendered Square components
  const squareComponents = [];

  // Iterate through the lettersArray using a for loop
  for (let i = 0; i < 5; i++) {
    let squareClass = "";

    squareComponents.push(
      <Square key={i} letter={lettersArray[i]} active={activeArray[i]} />
    );
  }

  return <div className="row">{squareComponents}</div>;
}
