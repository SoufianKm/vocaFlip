import React, { useEffect, useState } from "react";
import { StyleSheet, css } from "aphrodite";

const FlashcardCreator = ({ onSubmit, initialData, onCancel }) => {
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");

  // Effect to set the initial data when editing
  useEffect(() => {
    if (initialData) {
      setFrontText(initialData.frontText);
      setBackText(initialData.backText);
    } else {
      // Clear the form when there is no initialData (i.e. adding a new card)
      setFrontText("");
      setBackText("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ frontText, backText });
    setFrontText(""); // Clear the input field
    setBackText(""); // Clear the input field
  };

  const handleCancel = () => {
    setFrontText(""); // Clear the input field
    setBackText(""); // Clear the input field
    onCancel(); // Close the modal
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
      <div>
        <button type="submit">
          {initialData ? "Update Flashcard" : "Add Flashcard"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className={css(styles.buttonsCancel)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

const styles = StyleSheet.create({
  buttonsCancel: {
    marginLeft: "5px",
  },
});

export default FlashcardCreator;
