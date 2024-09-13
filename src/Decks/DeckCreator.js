import React, { useState } from "react";
import { css, StyleSheet } from "aphrodite";

const languages = ["English", "Spanish", "French", "German", "Chinese"];

export default function DeckCreator({ onCancel, onSubmit }) {
  const [title, setTitle] = useState("");
  const [firstLanguage, setFirstLanguage] = useState("");
  const [secondLanguage, setSecondLanguage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the first and second language are different
    if (firstLanguage === secondLanguage) {
      alert(
        "The language you would like to learn should be different from the language you already know."
      );
      return;
    }

    // Proceed with form submission if all fields are valid
    if (title && firstLanguage && secondLanguage) {
      onSubmit({ title, firstLanguage, secondLanguage });
    }
  };

  return (
    <form className={css(styles.form)} onSubmit={handleSubmit}>
      <h3>Create a New Deck</h3>
      <input
        type="text"
        placeholder="Deck Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <div className={css(styles.row)}>
        <select
          className={css(styles.select)}
          value={firstLanguage}
          onChange={(e) => setFirstLanguage(e.target.value)}
          required
        >
          <option value="">I knew the language</option>
          {languages.map((lang, index) => (
            <option key={index} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <select
          className={css(styles.select)}
          value={secondLanguage}
          onChange={(e) => setSecondLanguage(e.target.value)}
          required
        >
          <option value="">I would like to learn</option>
          {languages.map((lang, index) => (
            <option key={index} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
      <div className={css(styles.row)}>
        <button type="submit">Create Deck</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

// Styles
const styles = StyleSheet.create({
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
    width: "100%",
  },
  formButtons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  row: {
    margin: "15px 0px",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  select: {
    appearance: "none",
    fontSize: "1rem",
    padding: "0.5em 3em 0.5em 0.5em",
    backgroundColor: "#fff",
    border: "1px solid #caced1",
    borderRadius: "0.25rem",
    color: "#000",
    cursor: "pointer",
  },
});
