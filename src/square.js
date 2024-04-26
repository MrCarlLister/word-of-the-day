import React, { useState } from "react";

export default function Square({ letter, active }) {
  //   const [letter, setLetter] = useState(null);

  const className = `box ${active ? active : ""}`;

  return (
    <span type="text" className={className}>
      {letter}
    </span>
  );
}
