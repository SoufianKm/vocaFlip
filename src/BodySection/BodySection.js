import React, { useRef, useState } from "react";
import { StyleSheet, css } from "aphrodite";
import DeckCreator from "../Decks/DeckCreator";
import BodyLearning from "../BodyLearning/BodyLearning";
import { PiCardsThreeFill } from "react-icons/pi";
import { TbCardsFilled } from "react-icons/tb";
import { GiCardRandom } from "react-icons/gi";

// Modal component for displaying content
const Modal = ({ children, onClose }) => {
  return (
    <div className={css(styles.modalBackdrop)} onClick={onClose}>
      <div
        className={css(styles.modalContent)}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

// Decks component
const BodySection = () => {
  const [activeSection, setActiveSection] = useState("startLearning");
  const [decks, setDecks] = useState([]);
  const [creatingDeck, setCreatingDeck] = useState(false);

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

  // If no duplicate, add the new deck
    setDecks([...decks, newDeck]);
    setCreatingDeck(false);
  };

  const carouselRefs = useRef([]);
  const [isDragging, setIsDragging] = useState([]);
  const [startX, setStartX] = useState([]);
  const [scrollLeft, setScrollLeft] = useState([]);

  // Initialize state for each carousel
  const initializeCarouselState = (index) => {
    setIsDragging((prev) => {
      const newArr = [...prev];
      newArr[index] = false;
      return newArr;
    });
    setStartX((prev) => {
      const newArr = [...prev];
      newArr[index] = 0;
      return newArr;
    });
    setScrollLeft((prev) => {
      const newArr = [...prev];
      newArr[index] = 0;
      return newArr;
    });
  };

  // Handle mouse down event for each carousel
  const handleMouseDown = (e, index) => {
    initializeCarouselState(index); // Initialize state if it's not set
    setIsDragging((prev) => {
      const newArr = [...prev];
      newArr[index] = true;
      return newArr;
    });
    setStartX((prev) => {
      const newArr = [...prev];
      newArr[index] = e.pageX - carouselRefs.current[index].offsetLeft;
      return newArr;
    });
    setScrollLeft((prev) => {
      const newArr = [...prev];
      newArr[index] = carouselRefs.current[index].scrollLeft;
      return newArr;
    });
  };

  // Handle mouse move event for each carousel
  const handleMouseMove = (e, index) => {
    if (!isDragging[index]) return; // Only move when dragging is active for the specific carousel
    const x = e.pageX - carouselRefs.current[index].offsetLeft;
    const walk = (x - startX[index]) * 2; // Adjust scroll speed
    carouselRefs.current[index].scrollLeft = scrollLeft[index] - walk;
  };

  const handleMouseUp = (index) => {
    setIsDragging((prev) => {
      const newArr = [...prev];
      newArr[index] = false;
      return newArr;
    });
  };

  const handleMouseLeave = (index) => {
    setIsDragging((prev) => {
      const newArr = [...prev];
      newArr[index] = false;
      return newArr;
    });
  };

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
        {activeSection === "startLearning" && <BodyLearning decks={decks} />}

        {activeSection === "myDecks" && (
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
                        className={`${css(styles.carousel)} ${
                          isDragging[carouselIndex] ? css(styles.grabbing) : ""
                        }`} // Add grabbing style conditionally
                        ref={(el) => (carouselRefs.current[carouselIndex] = el)}
                        onMouseDown={(e) => handleMouseDown(e, carouselIndex)}
                        onMouseMove={(e) => handleMouseMove(e, carouselIndex)}
                        onMouseUp={() => handleMouseUp(carouselIndex)}
                        onMouseLeave={() => handleMouseLeave(carouselIndex)}
                      >
                        {groupedDecks.map((deck, index) => (
                          <div key={index} className={css(styles.carouselItem)}>
                            <TbCardsFilled className={css(styles.deckIcon)} />
                            <p className={css(styles.deckTitle)}>
                              {deck.title}
                            </p>
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
          </div>
        )}
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
  modalBackdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "500px",
    width: "100%",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
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
    fontFamily: "Roboto, sans-serif",
    cursor: "pointer",
    textDecoration: "none",
    margin: "0px",
    padding: "0px",
    outline: "none",
    fontSize: "inherit",
    fontWeight: "inherit",
    position: "relative",
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
    cursor: "pointer",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
  },
  decksList: {
    display: "flex",
    alignItems: "center",
  },
  carousel: {
    display: "flex",
    overflow: "hidden",
    cursor: "grab",
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
  },
  deckTitle: {
    fontSize: "1.4em",
  },
  grabbing: {
    cursor: "grabbing",
  },
});

export default BodySection;
