import React, { useEffect, useMemo } from "react";
import "./App.css";

import { generateParagraph } from "./helpers/generateParagraph";

const isLetter = /^[a-z ]$/;

function App() {
  const paragraph = useMemo(() => generateParagraph(), []);

  const [typed, setTyped] = React.useState("");
  const [result, setResult] = React.useState(0);
  const [startTime, setStartTime] = React.useState(0);

  useEffect(() => {
    if (paragraph.length === typed.length) {
      const endTime = new Date().getTime();

      const difference = Math.round(
        paragraph.split(" ").length / ((endTime - startTime) / 1000 / 60),
      );

      setResult(difference);
    }
  }, [typed, paragraph, startTime, result]);

  const onChangeInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const word = e.key.toLowerCase();

    if (typed.length === 0) setStartTime(new Date().getTime());

    if (isLetter.test(word)) {
      return setTyped(typed + word);
    }

    if (word === "backspace") {
      return setTyped(typed.slice(0, -1));
    }
  };

  return (
    <div className="App">
      {result > 0 && <span className="result">words per minute: {result}</span>}
      <p className="text">
        {paragraph.split("").map((el, index) => (
          <span
            key={index}
            className={`${
              !typed[index]
                ? "#444"
                : paragraph[index] === typed[index]
                ? "correct"
                : "incorrect"
            }`}
          >
            {el}
          </span>
        ))}
      </p>
      <input
        autoFocus
        type="text"
        className="input"
        onKeyDown={onChangeInput}
      />
    </div>
  );
}

export default App;
