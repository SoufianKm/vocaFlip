import React, { useRef, useState } from "react";
import { StyleSheet, css } from "aphrodite";
import DeckCreator from "../Decks/DeckCreator";
import { TbCardsFilled, TbEdit, TbTrash } from "react-icons/tb"; // Import edit and delete icons
import {
  initializeCarouselState,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleMouseLeave,
  Modal,
} from "../utils/utils"; // Adjust the import path as necessary

function Decks({ decks, setDecks, selectedDeck, setSelectedDeck }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creatingDeck, setCreatingDeck] = useState(false);
  const [deckToEdit, setDeckToEdit] = useState(false);

  const handleCreateDeck = (newDeck) => {
    // Check if the deck already exists
    const deckExists = decks.some(
      (deck) =>
        deck.title === newDeck.title &&
        deck.firstLanguage === newDeck.firstLanguage &&
        deck.secondLanguage === newDeck.secondLanguage
    );

    if (deckExists) {
      alert("A similar deck already exists!");
      return; // Prevent deck creation
    }

    // If no duplicate, add the new deck with a unique ID
    const deckWithId = { ...newDeck, id: Date.now() }; // Assign a unique ID

    setDecks([...decks, deckWithId]); // Add new deck to state
    setCreatingDeck(false); // Close the modal or creation form
  };

  const handleDelete = (deckId) => {
    setDecks(decks.filter((deck) => deck.id !== deckId)); // Remove the deck by id
  };

  const handleEdit = (deck) => {
    setIsModalOpen(true); // Open the edit modal
    setDeckToEdit(deck);
  };

  const handleUpdateDeck = (updatedDeck) => {
    setDecks(
      decks.map((deck) => (deck.id === updatedDeck.id ? updatedDeck : deck))
    );
    setIsModalOpen(false); // Close the modal after updating
  };

  const handleDeckSelect = (deck) => {
    setSelectedDeck(deck);
    // Load flashcards for the selected deck if you have that logic
  };

  const carouselRefs = useRef([]);
  const [isDragging, setIsDragging] = useState([]);
  const [startX, setStartX] = useState([]);
  const [scrollLeft, setScrollLeft] = useState([]);
  return (
    <div className={css(styles.deckContainer)}>
      {decks.length === 0 ? (
        <div>
          <p>No decks available.</p>
          <button
            className={css(styles.createDeckButton)}
            onClick={() => setCreatingDeck(true)}
          >
            Create First Deck +
          </button>
        </div>
      ) : (
        <div>
          {Object.entries(
            decks.reduce((acc, deck) => {
              acc[deck.secondLanguage] = acc[deck.secondLanguage] || [];
              acc[deck.secondLanguage].push(deck);
              return acc;
            }, {})
          ).map(([language, groupedDecks], carouselIndex) => (
            <div key={language} className={css(styles.languageGroup)}>
              <h3>{language}</h3>
              <div key={carouselIndex} className={css(styles.decksList)}>
                <button
                  className={css(styles.createDeckButton)}
                  onClick={() => setCreatingDeck(true)}
                >
                  Create New Deck +
                </button>
                <div
                  className={css(styles.carousel)} // Add grabbing style conditionally
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
                  {groupedDecks.map((deck, index) => (
                    <div key={index} className={css(styles.carouselItem)}>
                      <TbCardsFilled
                        className={css(styles.deckIcon)}
                        onClick={() => handleDeckSelect(deck)}
                      />
                      <p
                        className={css(styles.deckTitle)}
                        onClick={() => handleDeckSelect(deck)}
                      >
                        {deck.title}
                      </p>
                      <div className={css(styles.iconContainer)}>
                        <TbEdit
                          className={css(styles.iconAction)}
                          onClick={() => handleEdit(deck)}
                        />
                        <TbTrash
                          className={css(styles.iconAction)}
                          onClick={() => handleDelete(deck.id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        className={css(styles.circleButton)}
        onClick={() => setCreatingDeck(true)}
      >
        <i className="fas fa-plus"></i>
      </button>

      {creatingDeck && (
        <Modal onClose={() => setCreatingDeck(false)}>
          <DeckCreator
            onCancel={() => setCreatingDeck(false)}
            onSubmit={handleCreateDeck}
          />
        </Modal>
      )}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateDeck({
                ...deckToEdit,
                title: e.target.deckName.value,
              });
            }}
          >
            <label>Edit Deck Name:</label>
            <input
              type="text"
              name="deckName"
              defaultValue={deckToEdit?.title || ""}
            />
            <button type="submit">Save</button>
          </form>
        </Modal>
      )}
    </div>
  );
}

// Styles
const styles = StyleSheet.create({
  createDeckButton: {
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    marginRight: "15px",
    width: "200px",
    height: "150px",
  },
  deckContainer: {
    width: "100%",
    textAlign: "center",
  },
  languageGroup: {
    margin: "20px 0",
    textAlign: "start",
  },
  deckItem: {
    margin: "10px 0",
  },
  circleButton: {
    border: "10px",
    boxSizing: "border-box",
    display: "inline-block",
    cursor: "pointer",
    textDecoration: "none",
    margin: "0px",
    padding: "0px",
    outline: "none",
    fontSize: "inherit",
    fontWeight: "inherit",
    verticalAlign: "bottom",
    backgroundColor: "#ffb703",
    transition: "450ms cubic-bezier(0.23, 1, 0.32, 1)",
    height: "56px",
    width: "56px",
    overflow: "hidden",
    borderRadius: "50%",
    textAlign: "center",
    position: "fixed",
    bottom: "20px",
    right: "20px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
  },
  decksList: {
    display: "flex",
    alignItems: "center",
  },
  carousel: {
    display: "flex",
    overflow: "hidden",
    padding: "10px 0px",
    userSelect: "none",
    width: "80% !important",
  },
  carouselItem: {
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
    cursor: "pointer",
  },
  deckTitle: {
    fontSize: "1.4em",
    cursor: "pointer",
    maxWidth: "120px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: "5px 0px",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "60px",
  },
  iconAction: {
    cursor: "pointer",
    color: "white",
    ":hover": {
      color: "yellow",
    },
  },
});

export default Decks;
