import React, { useRef, useState } from "react";
import { css, StyleSheet } from "aphrodite";
import { HiArrowLeft } from "react-icons/hi"; // Import the left arrow icon
import {
  initializeCarouselState,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleMouseLeave,
} from "../utils/utils"; // Adjust the import path as necessary

function DeckSelectorAndFlashcards({ deck, flashcards, setActiveDeckForFlashcards }) {
  const [flippedCards, setFlippedCards] = useState({}); // State to track which cards are flipped
  const carouselRefs = useRef([]);
  const [isDragging, setIsDragging] = useState([]);
  const [startX, setStartX] = useState([]);
  const [scrollLeft, setScrollLeft] = useState([]);

  const handleBackToSection = () => {
    setActiveDeckForFlashcards(null); // Reset selected deck to go back to the BodySection
  };

  const handleCardClick = (index) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle flip state for the clicked card
    }));
  };
  return (
    <div className={css(styles.flashcardSection)}>
      <div className={css(styles.backButton)} onClick={handleBackToSection}>
        <HiArrowLeft className={css(styles.arrowIcon)} />
        <span>Back</span>
      </div>

      {flashcards.length === 0 ? (
        <p>No flashcards exist for this deck.</p>
      ) : (
        <div className={css(styles.flashcardsContainer)}>
          <ul
            className={css(styles.carouselFlashcards)} // Add grabbing style conditionally
            ref={(el) => (carouselRefs.current[0] = el)}
            onMouseDown={(e) =>
              handleMouseDown(
                e,
                0,
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
                0,
                isDragging,
                startX,
                carouselRefs,
                scrollLeft
              )
            }
            onMouseUp={() => handleMouseUp(setIsDragging, 0)}
            onMouseLeave={() => handleMouseLeave(setIsDragging, 0)}
          >
            {flashcards
              .filter((card) => card.deckId === deck.id)
              .map((card, index) => (
                <li
                  key={index}
                  className={css(styles.carouselFlashcardsItem)}
                  onClick={() => handleCardClick(index)}
                >
                  <div
                    className={`${css(styles.cardInner)} ${
                      flippedCards[index] ? css(styles.flipped) : ""
                    }`}
                  >
                    <div className={css(styles.cardFront)}>
                      <strong className={css(styles.strong)}>
                        {card.frontText}
                      </strong>
                    </div>
                    <div className={css(styles.cardBack)}>
                      <strong className={css(styles.strong)}>
                        {card.backText}
                      </strong>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Styles
const styles = StyleSheet.create({
  grabbing: {
    cursor: "grabbing",
  },
  backButton: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    marginBottom: "20px",
    width: "100%",
  },
  arrowIcon: {
    fontSize: "24px",
    marginRight: "8px",
  },
  flashcardSection: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  flashcardsContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "1rem",
  },
  carouselFlashcards: {
    listStyleType: "none",
    display: "flex",
    overflow: "hidden",
    cursor: "grab",
    userSelect: "none",
  },
  carouselFlashcardsItem: {
    minWidth: "200px",
    height: "300px",
    marginRight: "20px",
    perspective: "1000px", // Enables 3D flip effect
    cursor: "pointer",
    padding: "20px 0px",
  },
  cardInner: {
    position: "relative",
    width: "100%",
    height: "100%",
    transformStyle: "preserve-3d", // Enable 3D space
    transition: "transform 0.6s", // Smooth transition for flipping
  },
  flipped: {
    transform: "rotateY(180deg)", // Flip the card when this class is added
  },
  cardFront: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "10px",
    fontSize: "18px",
    backfaceVisibility: "hidden", // Ensures text is not flipped
  },
  cardBack: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffc107",
    color: "#fff",
    borderRadius: "10px",
    fontSize: "18px",
    transform: "rotateY(180deg)", // Back side is initially rotated
    backfaceVisibility: "hidden", // Ensures text is not flipped
  },
  strong: {
    fontSize: "1.2rem",
    wordWrap: "break-word",
    width: "80%",
    padding: "20px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

export default DeckSelectorAndFlashcards;
