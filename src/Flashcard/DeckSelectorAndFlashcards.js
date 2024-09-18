import React, { useState } from "react";
import { css, StyleSheet } from "aphrodite";
import { HiArrowLeft } from "react-icons/hi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules"; // Correct import for modules

function DeckSelectorAndFlashcards({
  deck,
  flashcards,
  setActiveDeckForFlashcards,
}) {
  const [flippedCards, setFlippedCards] = useState({});
  const [currentCardIndex, setCurrentCardIndex] = useState(0); // Track current card index
  const [viewedCards, setViewedCards] = useState(new Set()); // Track viewed cards
  const [swipedCount, setSwipedCount] = useState(0); // Track the number of swiped cards

  // Handle back button click
  const handleBackToSection = () => {
    setActiveDeckForFlashcards(null);
  };

  // Handle card click and flip only if it's the active card
  const handleCardClick = (index) => {
    if (index === currentCardIndex) {
      setFlippedCards((prev) => ({
        ...prev,
        [index]: !prev[index],
      }));
    }
  };

  // Handle slide change and manage viewed cards set
  const handleSlideChange = (swiper) => {
    const newIndex = swiper.activeIndex;

    // Only update swiped count if moving to a new card (not revisiting)
    if (!viewedCards.has(newIndex)) {
      setViewedCards((prevViewed) => {
        const updatedViewed = new Set(prevViewed);
        updatedViewed.add(newIndex);
        return updatedViewed;
      });
    }
    setSwipedCount(newIndex);
    setCurrentCardIndex(newIndex);
  };

  // Handle previous slide: Decrement swiped count if revisiting a previous card
  const handleSlidePrevTransition = (swiper) => {
    const newIndex = swiper.activeIndex;

    if (viewedCards.has(newIndex)) {
      setViewedCards((prevViewed) => {
        const updatedViewed = new Set(prevViewed);
        updatedViewed.delete(newIndex);
        return updatedViewed;
      });
    }
  };

  return (
    <div className={css(styles.flashcardSection)}>
      <div className={css(styles.backButton)} onClick={handleBackToSection}>
        <HiArrowLeft className={css(styles.arrowIcon)} />
        <span>Back</span>
      </div>

      {/* Display swiped count */}
      <div className={css(styles.swipeCount)}>
        {swipedCount + 1}/{flashcards.length}
      </div>
      <div className={css(styles.customProgressBarContainer)}>
        <div
          className={css(styles.customProgressBarFill)}
          style={{ width: `${((swipedCount + 1) / flashcards.length) * 100}%` }} // Dynamic progress fill width
        />
      </div>
      {flashcards.length === 0 ? (
        <p>No flashcards exist for this deck.</p>
      ) : (
        <div className={css(styles.flashcardsContainer)}>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={false}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            navigation={{
              clickable: true,
            }}
            pagination={{
              el: ".swiper-pagination-progressbar", // Progress bar pagination element
              type: "progressbar",
            }}
            onSlideChange={handleSlideChange} // Update current card index and track viewed cards
            onSlidePrevTransitionStart={handleSlidePrevTransition} // Handle decrement when going to previous cards
            modules={[EffectCoverflow, Pagination, Navigation]} // Ensure correct module usage
            className={`${css(
              styles.swiperContainer
            )} "swiper_container swiperButtonPrev swiperButtonNex"`}
          >
            {flashcards
              .filter((card) => card.deckId === deck.id)
              .map((card, index) => (
                <SwiperSlide
                  key={index}
                  className={css(styles.carouselFlashcardsItem)}
                  onClick={() => handleCardClick(index)}
                >
                  <div
                    className={`${css(styles.cardInner)} ${
                      flippedCards[index] ? css(styles.flipped) : ""
                    } ${
                      index === currentCardIndex ? css(styles.activeCard) : ""
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
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      )}

      {/* Conditionally render buttons if the active card is flipped */}
      {flippedCards[currentCardIndex] && (
        <div className={css(styles.buttonContainer)}>
          <button
            className={css(styles.answerButton, styles.knowButton)}
            onClick={() => console.log("I know it")}
          >
            I know it
          </button>
          <button
            className={css(styles.answerButton, styles.noIdeaButton)}
            onClick={() => console.log("No idea")}
          >
            No idea
          </button>
          <button
            className={css(styles.answerButton, styles.notSureButton)}
            onClick={() => console.log("Not sure")}
          >
            Not sure
          </button>
        </div>
      )}
    </div>
  );
}

// Styles
const styles = StyleSheet.create({
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
    marginBottom: "20px",
  },
  swipeCount: {
    fontSize: "18px",
    marginBottom: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
  flashcardsContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "1rem",
  },
  carouselFlashcardsItem: {
    minWidth: "200px",
    height: "300px",
    perspective: "1000px",
    cursor: "pointer",
    width: "auto",
  },
  cardInner: {
    position: "relative",
    width: "100%",
    height: "100%",
    transformStyle: "preserve-3d",
    transition: "transform 0.6s",
  },
  flipped: {
    transform: "rotateY(180deg)",
  },
  activeCard: {
    cursor: "pointer", // Active cards can be flipped
  },
  cardFront: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#023047",
    color: "#fff",
    borderRadius: "10px",
    fontSize: "18px",
    backfaceVisibility: "hidden",
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
    transform: "rotateY(180deg)",
    backfaceVisibility: "hidden",
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
  swiperContainer: {
    padding: "30px 0px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    marginTop: "20px",
  },
  answerButton: {
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    color: "#fff",
  },
  knowButton: {
    backgroundColor: "#28a745",
  },
  noIdeaButton: {
    backgroundColor: "#dc3545",
  },
  notSureButton: {
    backgroundColor: "#ffc107",
  },
  customProgressBarContainer: {
    width: "100%",
    height: "20px", // Adjust the height of the progress bar
    backgroundColor: "#e0e0e0", // Background color for the progress bar track
    borderRadius: "25px !important",
    marginBottom: "1.6rem",
  },
  customProgressBarFill: {
    height: "100%",
    backgroundColor: "#023047", // Color of the filled progress bar
    transition: "width 0.3s ease", // Smooth transition for the progress bar
    borderRadius: "25px !important",
  },
});

export default DeckSelectorAndFlashcards;
