import React, { useRef, useState } from "react";
import { css, StyleSheet } from "aphrodite";
import { TbCardsFilled } from "react-icons/tb";
import {
  initializeCarouselState,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleMouseLeave,
} from "../utils/utils"; // Adjust the import path as necessary
import DeckSelectorAndFlashcards from "../Flashcard/DeckSelectorAndFlashcards";

export default function BodyLearning({ decks, flashcards }) {
  if (decks.length === 0) {
    return <p>No decks available for learning. Please create a deck.</p>;
  }

  // Group decks by second language
  const groupedDecks = decks.reduce((acc, deck) => {
    acc[deck.secondLanguage] = acc[deck.secondLanguage] || [];
    acc[deck.secondLanguage].push(deck);
    return acc;
  }, {});

  const carouselRefs = useRef([]);
  const [isDragging, setIsDragging] = useState([]);
  const [startX, setStartX] = useState([]);
  const [scrollLeft, setScrollLeft] = useState([]);
  const [activeDeckForFlashcards, setActiveDeckForFlashcards] = useState(null);

  // Handle deck selection
  const handleDeckSelect = (deck) => {
    // Count flashcards for the selected deck
    const flashcardsCount = flashcards.filter(
      (card) => card.deckId === deck.id
    ).length;

    // Show alert and block selection if no flashcards exist for the deck
    if (flashcardsCount === 0) {
      alert("No flashcards exist for this deck.");
      return;
    }

    setActiveDeckForFlashcards(deck); // Set the selected deck
  };

  return (
    <div className={css(styles.bodyContainer)}>
      {activeDeckForFlashcards ? ( // Check if a deck is selected
        <DeckSelectorAndFlashcards
          deck={activeDeckForFlashcards}
          flashcards={flashcards}
          setActiveDeckForFlashcards={setActiveDeckForFlashcards}
        /> // Pass the selected deck to DeckFlashcards
      ) : (
        <>
          <h2>Available Decks</h2>
          {Object.entries(groupedDecks).map(
            ([language, decks], carouselIndex) => (
              <div
                key={(language, carouselIndex)}
                className={css(styles.languageGroup)}
              >
                <h3>{language}</h3>
                <div
                  className={css(styles.carousel)}
                  ref={(el) => (carouselRefs.current[carouselIndex] = el)}
                  onMouseDown={(e) =>
                    handleMouseDown(
                      e,
                      carouselIndex,
                      carouselRefs,
                      setIsDragging,
                      setStartX,
                      setScrollLeft,
                      initializeCarouselState
                    )
                  }
                  onMouseMove={(e) =>
                    handleMouseMove(
                      e,
                      carouselIndex,
                      isDragging,
                      startX,
                      carouselRefs,
                      scrollLeft
                    )
                  }
                  onMouseUp={() => handleMouseUp(setIsDragging, carouselIndex)}
                  onMouseLeave={() =>
                    handleMouseLeave(setIsDragging, carouselIndex)
                  }
                >
                  {decks.map((deck, index) => {
                    // Count flashcards for the current deck
                    const flashcardsCount = flashcards.filter(
                      (card) => card.deckId === deck.id
                    ).length;
                    return (
                      <div
                        key={index}
                        className={css(styles.deckItem)}
                        onClick={() => handleDeckSelect(deck)} // Set the selected deck on click
                      >
                        <p className={css(styles.deckTitle)}>{deck.title}</p>
                        <div className={css(styles.flashcardsCountContainer)}>
                          <p className={css(styles.flashcardsCount)}>
                            {flashcardsCount}
                            {/* Display the count of flashcards */}
                          </p>
                          <TbCardsFilled className={css(styles.deckIcon)} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
}

// Styles
const styles = StyleSheet.create({
  bodyContainer: {
    width: "100%",
  },
  carousel: {
    display: "flex",
    overflow: "hidden",
    cursor: "pointer",
    padding: "10px 0px",
    userSelect: "none",
    width: "-webkit-fill-available",
  },
  deckItem: {
    minWidth: "150px",
    height: "150px",
    backgroundColor: "#219ebc",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "10px",
    borderRadius: "10px",
  },
  deckIcon: {
    fontSize: "2.4rem",
  },
  deckTitle: {
    fontSize: "1.4em",
    fontWeight: "700",
  },
  languageGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  flashcardsCountContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center,",
  },
  flashcardsCount: {
    margin: "0.3rem",
    fontSize: "20px",
    alignContent: "center",
  },
});
