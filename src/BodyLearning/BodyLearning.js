import React, { useRef, useState } from "react";
import { css, StyleSheet } from "aphrodite";
import { TbCardsFilled } from "react-icons/tb"; // Import edit and delete icons
import {
  initializeCarouselState,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleMouseLeave,
} from "../utils/utils"; // Adjust the import path as necessary

export default function BodyLearning({ decks }) {
  if (decks.length === 0) {
    return <p>No decks available for learning. Please create a deck.</p>;
  }

  const groupedDecks = decks.reduce((acc, deck) => {
    acc[deck.secondLanguage] = acc[deck.secondLanguage] || [];
    acc[deck.secondLanguage].push(deck);
    return acc;
  }, {});

  const carouselRefs = useRef([]);
  const [isDragging, setIsDragging] = useState([]);
  const [startX, setStartX] = useState([]);
  const [scrollLeft, setScrollLeft] = useState([]);

  return (
    <div className={css(styles.bodyContainer)}>
      <h2>Available Decks</h2>
      {Object.entries(groupedDecks).map(([language, decks], carouselIndex) => (
        <div
          key={(language, carouselIndex)}
          className={css(styles.languageGroup)}
        >
          <h3>{language}</h3>
          <div
            className={`${css(styles.carousel)} ${
              isDragging[carouselIndex] ? css(styles.grabbing) : ""
            }`} // Add grabbing style conditionally
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
            onMouseLeave={() => handleMouseLeave(setIsDragging, carouselIndex)}
          >
            {decks.map((deck, index) => (
              <div key={index} className={css(styles.deckItem)}>
                <TbCardsFilled className={css(styles.deckIcon)} />
                <p className={css(styles.deckTitle)}>{deck.title}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
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
    cursor: "grab",
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
  },
  grabbing: {
    cursor: "grabbing",
  },
  languageGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
});
