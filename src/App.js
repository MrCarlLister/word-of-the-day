import "./styles.css";
import Row from "./row.js";
// import Answer from "./answer.js";
import Dictionary from "./dictionary.js";
import React, { useEffect, useState } from "react";

function Board() {
  const [boardComplete, setBoardComplete] = useState([]);
  const [theBoard, setTheBoard] = useState([]);
  const [theBoardState, setTheBoardState] = useState([]);
  const [rowLetters, setRowLetters] = useState([]);
  const [dailyWord, setDailyWord] = useState([]);

  function resetBoard() {
    setBoardComplete([]);
    setTheBoard([]);
    setTheBoardState([]);
    setRowLetters([]);
    setDailyWord([]);
  }

  function setAnswer() {
    setDailyWord((e) => {
      if (e.length === 0) {
        const words = Dictionary();
        const randomIndex = Math.floor(Math.random() * words.length);
        const randomWord = words[randomIndex];
        return randomWord.toUpperCase().split("");
      } else {
        return e;
      }
    });
  }

  function checkWordCorrect() {
    const answer = dailyWord;

    const rowResult = [];
    let noCorrect = 0;
    let squareClass;
    let exists;

    if (theBoardState.length == 4) {
      setBoardComplete((r) => {
        return [...r, true];
      });
    }

    rowLetters.map((letter, i) => {
      squareClass = "active-incorrect";
      exists = answer.includes(letter);

      if (exists) {
        squareClass = "active-almost";
      }

      if (answer[i] == letter) {
        squareClass = "active-correct";
        noCorrect = noCorrect + 1;
      }

      rowResult.push(squareClass);
    });

    if (noCorrect == 5) {
      setBoardComplete((r) => {
        return [[true], [true]];
      });
    }

    setTheBoardState((r) => {
      return [...r, rowResult];
    });
  }

  // Event handler for keyup events
  const handleKeyUp = (event) => {
    const key = event.key;
    const isLetter = /^[a-zA-Z]$/.test(key);

    if (key === "Backspace") {
      // Remove the last letter if present
      if (rowLetters.length >= 0) {
        setRowLetters((prevLetters) => prevLetters.slice(0, -1));
      }
    } else if (isLetter) {
      setRowLetters((x) => {
        if (x.length < 5) {
          return [...x, key.toUpperCase()];
        }
        return x;
      });
    }

    if (key == "Enter") {
      setTheBoard((r) => {
        if (rowLetters.length === 5) {
          setRowLetters([]);
          return [...r, rowLetters];
        } else {
          return r;
        }
      });

      if (rowLetters.length === 5) {
        checkWordCorrect();
      }
    }
  };

  // Attach event listener to the document when the component mounts
  useEffect(() => {
    // Add the event listener to the document
    document.addEventListener("keyup", handleKeyUp);
    setAnswer();
    console.log(dailyWord);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [rowLetters, boardComplete]); // Empty dependency array ensures effect runs once on mount and cleanup on unmount

  return (
    <div className="wrap">
      <div className={`overlay ${boardComplete[0] ? "active" : ""}`}>
        <h2 className="overlay-headline">{`${
          boardComplete[1] ? "That's right 🎉 you got it!" : "Ran out of tries"
        }`}</h2>
        <button onClick={resetBoard}>Play again?</button>
      </div>
      <h2 className="headline">Guess the word</h2>
      <div className="board">
        {theBoard.map((row, index) => (
          <Row key={index} letters={row} active={theBoardState[index]} />
        ))}
        <Row letters={rowLetters} />
      </div>
    </div>
  );
}

export default Board;
