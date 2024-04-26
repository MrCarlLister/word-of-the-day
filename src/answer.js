import { useState } from "react";
import Dictionary from "./dictionary.js";

// return todays answer
function Answer() {
  const [word, setWord] = useState(false);
  const words = Dictionary();

  function returnRandomWord() {
    if (!word) {
      const randomIndex = Math.floor(Math.random() * words.length);

      const randomWord = words[randomIndex];
      // const randomWord = "final";

      setWord(randomWord.toUpperCase().split(""));

      return word;
    } else {
      return word;
    }
  }

  return word;
}

export default Answer;
