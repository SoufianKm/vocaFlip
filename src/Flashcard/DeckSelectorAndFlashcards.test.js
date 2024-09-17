import React from "react";
import { shallow } from "enzyme";
import DeckFlashcards from "./DeckSelectorAndFlashcards"; // Adjust the import path as necessary
import { HiArrowLeft } from "react-icons/hi";

describe("DeckFlashcards Component", () => {
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
      <DeckFlashcards
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
    const backButton = wrapper.find(".backButton");
    expect(backButton.exists()).toBe(true);
    expect(backButton.find(HiArrowLeft).length).toBe(1);
  });

  it("should call setActiveDeckForFlashcards with null when back button is clicked", () => {
    const backButton = wrapper.find(".backButton");
    backButton.simulate("click");
    expect(setActiveDeckForFlashcards).toHaveBeenCalledWith(null);
  });

  it("should display the correct number of flashcards for the current deck", () => {
    const flashcards = wrapper.find(".carouselFlashcardsItem");
    expect(flashcards.length).toBe(2); // Only 2 flashcards with deckId = 1
  });

  it("should flip the card when clicked", () => {
    const firstCard = wrapper.find(".carouselFlashcardsItem").at(0);
    firstCard.simulate("click");

    const updatedWrapper = wrapper.update(); // Trigger re-render
    const cardInner = updatedWrapper.find(".cardInner").at(0);

    expect(cardInner.hasClass("flipped")).toBe(true); // Check if card is flipped
  });

  it("should not flip other cards when one is clicked", () => {
    const firstCard = wrapper.find(".carouselFlashcardsItem").at(0);
    firstCard.simulate("click");

    const secondCard = wrapper.find(".carouselFlashcardsItem").at(1);
    expect(secondCard.find(".cardInner").hasClass("flipped")).toBe(false);
  });

  it("should display 'No flashcards exist for this deck.' if no flashcards are available", () => {
    const emptyWrapper = shallow(
      <DeckFlashcards
        deck={mockDeck}
        flashcards={[]}
        setActiveDeckForFlashcards={setActiveDeckForFlashcards}
      />
    );
    expect(emptyWrapper.text()).toContain("No flashcards exist for this deck.");
  });
});
