import React, { useState, useEffect } from "react";
export const ColorCoder = () => {
  const [color, setColor] = useState(null);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [colors, setColors] = useState(Array.from({ length: 3 }));
  const generateColors = () => {
    const randomColors = colors.map((color) => {
      const randomColor = Math.floor(Math.random() * 0xffffff).toString(16);
      return "#" + randomColor;
    });
    const randomIndex = Math.floor(Math.random() * 3);
    setColor(randomColors[randomIndex]);
    setColors(randomColors);
  };
  const checkAnswer = (answer) => {
    if (answer === color) {
      setMessage("Correct!");
    } else {
      setMessage("Incorrect!");
    }
    setShowMessage(true);
    setShowButton(true);
  };
  const playAgain = () => {
    generateColors();
    setShowMessage(false);
    setShowButton(false);
  };
  useEffect(() => {
    generateColors();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Color Codes</h1>
      <h2>{color}</h2>
      <h2>What color is this?</h2>
      <div style={{ display: "flex" }} data-testid="color-container">
        {colors.map((currentColor, index) => (
          <div
            key={index}
            data-testid={
              currentColor === color ? "correct-color" : "incorrect-color"
            }
            style={{
              backgroundColor: currentColor,
              width: "100px",
              height: "100px",
            }}
            onClick={() => checkAnswer(currentColor)}
          ></div>
        ))}
      </div>
      {showMessage && <h2>{message}</h2>}
      {showButton && <button onClick={playAgain}>Play Again</button>}
    </div>
  );
};
export default ColorCoder;
