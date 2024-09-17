import React, { useRef, useState } from "react";
import { StyleSheet, css } from "aphrodite";
import BodyLearning from "../BodyLearning/BodyLearning";
import { PiCardsThreeFill } from "react-icons/pi";
import { GiCardRandom } from "react-icons/gi";
import Flashcards from "../Flashcard/Flashcards";
import Decks from "../Decks/Decks";

const BodySection = () => {
  const [activeSection, setActiveSection] = useState("startLearning");
  const [decks, setDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [flashcards, setFlashcards] = useState([]); // State to hold flashcards

  return (
    <div className={css(styles.container)}>
      <div className={css(styles.leftContainer)}>
        <div
          className={`${css(styles.square)} ${
            activeSection === "startLearning" ? css(styles.active) : ""
          }`}
          onClick={() => setActiveSection("startLearning")}
        >
          <GiCardRandom className={css(styles.icon)} />
          <span className={css(styles.spanTitle)}>Start Learning</span>
        </div>
        <div
          className={`${css(styles.square)} ${
            activeSection === "myDecks" ? css(styles.active) : ""
          }`}
          onClick={() => setActiveSection("myDecks")}
        >
          <PiCardsThreeFill className={css(styles.icon)} />
          <span className={css(styles.spanTitle)}>My Decks</span>
        </div>
      </div>
      <div
        className={css(styles.rightContainer)}
        style={{
          justifyContent: decks.length === 0 ? "center" : "flex-start",
        }}
      >
        {activeSection === "startLearning" && (
          <BodyLearning decks={decks} flashcards={flashcards} />
        )}

        {activeSection === "myDecks" &&
          (selectedDeck ? (
            <Flashcards
              selectedDeck={selectedDeck}
              setSelectedDeck={setSelectedDeck}
              flashcards={flashcards}
              setFlashcards={setFlashcards}
            />
          ) : (
            <Decks
              selectedDeck={selectedDeck}
              setSelectedDeck={setSelectedDeck}
              decks={decks}
              setDecks={setDecks}
            />
          ))}
      </div>
    </div>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    minHeight: "100vh", // Full height
  },
  leftContainer: {
    flex: "0 0 20%",
    backgroundColor: "#f8f9fa",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "20px",
  },
  rightContainer: {
    flex: 1,
    padding: "20px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    minHeight: "100vh",
    width: "80%",
  },
  square: {
    width: "150px",
    height: "150px",
    backgroundColor: "#e0e0e0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
    cursor: "pointer",
    textAlign: "center",
    borderRadius: "10px",
  },
  spanTitle: {
    fontSize: "14px",
    fontWeight: "600",
  },
  active: {
    backgroundColor: "#6c757d",
    color: "#fff",
  },
  icon: {
    fontSize: "5rem",
  },
});

export default BodySection;
