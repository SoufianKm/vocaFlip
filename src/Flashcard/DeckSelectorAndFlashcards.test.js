import React from "react";
import { shallow } from "enzyme";
import DeckSelectorAndFlashcards from "./DeckSelectorAndFlashcards"; // Adjust the import path as necessary
import { HiArrowLeft } from "react-icons/hi";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper for testing

describe("DeckSelectorAndFlashcards Component", () => {
  const mockDeck = { id: 1, title: "Test Deck" };
  const mockFlashcards = [
    { id: 1, deckId: 1, frontText: "Front 1", backText: "Back 1" },
    { id: 2, deckId: 1, frontText: "Front 2", backText: "Back 2" },
    { id: 3, deckId: 2, frontText: "Front 3", backText: "Back 3" }, // Not in the current deck
  ];
  const setActiveDeckForFlashcards = jest.fn();

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <DeckSelectorAndFlashcards
        deck={mockDeck}
        flashcards={mockFlashcards}
        setActiveDeckForFlashcards={setActiveDeckForFlashcards}
      />
    );
  });

  it("should render without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should display the back button", () => {
    const backButton = wrapper.find(`.${wrapper.find("backButton").prop("className")}`);
    expect(backButton.exists()).toBe(true);
    expect(backButton.find(HiArrowLeft).length).toBe(1);
  });

  it("should call setActiveDeckForFlashcards with null when back button is clicked", () => {
    const backButton = wrapper.find(`.${wrapper.find("backButton").prop("className")}`);
    backButton.simulate("click");
    expect(setActiveDeckForFlashcards).toHaveBeenCalledWith(null);
  });

  it("should display the correct number of flashcards for the current deck", () => {
    const flashcards = wrapper.find(SwiperSlide);
    expect(flashcards.length).toBe(2); // Only 2 flashcards with deckId = 1
  });

  it("should flip the card when clicked", () => {
    const firstCard = wrapper.find(SwiperSlide).at(0);
    firstCard.simulate("click");

    const updatedWrapper = wrapper.update(); // Trigger re-render
    const cardInner = updatedWrapper.find(`.${updatedWrapper.find("cardInner").prop("className")}`).at(0);

    expect(cardInner.hasClass("flipped")).toBe(true); // Check if card is flipped
  });

  it("should not flip other cards when one is clicked", () => {
    const firstCard = wrapper.find(SwiperSlide).at(0);
    firstCard.simulate("click");

    const secondCard = wrapper.find(SwiperSlide).at(1);
    expect(secondCard.find(`.${wrapper.find("cardInner").prop("className")}`).hasClass("flipped")).toBe(false);
  });

  it("should display 'No flashcards exist for this deck.' if no flashcards are available", () => {
    const emptyWrapper = shallow(
      <DeckSelectorAndFlashcards
        deck={mockDeck}
        flashcards={[]}
        setActiveDeckForFlashcards={setActiveDeckForFlashcards}
      />
    );
    expect(emptyWrapper.text()).toContain("No flashcards exist for this deck.");
  });

  it("should update the current card index on slide change", () => {
    const swiper = wrapper.find(Swiper);
    swiper.simulate("slideChange", { activeIndex: 1 });
    expect(wrapper.find(SwiperSlide).at(1).prop("className")).toContain("activeCard");
  });

  it("should track viewed cards correctly when sliding", () => {
    const swiper = wrapper.find(Swiper);
    swiper.simulate("slideChange", { activeIndex: 1 });

    expect(wrapper.state("viewedCards")).toContain(1);
  });

  it("should conditionally render buttons when the card is flipped", () => {
    wrapper.find(SwiperSlide).at(0).simulate("click");

    const updatedWrapper = wrapper.update();
    expect(updatedWrapper.find("button").length).toBe(3); // 3 buttons: I know it, No idea, Not sure
  });
});
