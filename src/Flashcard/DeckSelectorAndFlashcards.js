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

  const handleBackToSection = () => {
    setActiveDeckForFlashcards(null);
  };

  const handleCardClick = (index) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
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
});

export default DeckSelectorAndFlashcards;
