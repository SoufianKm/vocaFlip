import React, { useState } from "react";

const FlashcardCreator = ({ onSubmit }) => {
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ frontText, backText });
    setFrontText("");
    setBackText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Front:</label>
      <input
        type="text"
        value={frontText}
        onChange={(e) => setFrontText(e.target.value)}
        required
      />
      <label>Back:</label>
      <input
        type="text"
        value={backText}
        onChange={(e) => setBackText(e.target.value)}
        required
      />
      <button type="submit">Add Flashcard</button>
    </form>
  );
};

export default FlashcardCreator;
