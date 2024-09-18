import React, { useEffect, useState } from "react";

const FlashcardCreator = ({ onSubmit, initialData }) => {
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");

  // Effect to set the initial data when editing
  useEffect(() => {
    if (initialData) {
      setFrontText(initialData.frontText);
      setBackText(initialData.backText);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ frontText, backText });
    setFrontText(""); // Clear the input field
    setBackText(""); // Clear the input field
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
      <button type="submit">
        {initialData ? "Update Flashcard" : "Add Flashcard"}
      </button>
    </form>
  );
};

export default FlashcardCreator;
