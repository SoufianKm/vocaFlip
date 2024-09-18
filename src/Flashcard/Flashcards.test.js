import React from "react";
import { shallow } from "enzyme";
import Flashcards from "./Flashcards";
import FlashcardCreator from "../Flashcard/FlashcardCreator";
import { Modal } from "../utils/utils"; // Adjust the import path if necessary
import { HiArrowLeft } from "react-icons/hi";

jest.mock("../Flashcard/FlashcardCreator", () => {
  return jest.fn(() => <div>Flashcard Creator Mock</div>);
});

describe("Flashcards Component", () => {
  let wrapper;
  let setSelectedDeckMock;
  let setFlashcardsMock;
  const selectedDeck = { id: 1, title: "Test Deck" };
  const flashcards = [
    { id: 1, frontText: "Front 1", backText: "Back 1", deckId: 1 },
    { id: 2, frontText: "Front 2", backText: "Back 2", deckId: 1 },
  ];

  beforeEach(() => {
    setSelectedDeckMock = jest.fn();
    setFlashcardsMock = jest.fn();
    wrapper = shallow(
      <Flashcards
        selectedDeck={selectedDeck}
        setSelectedDeck={setSelectedDeckMock}
        flashcards={flashcards}
        setFlashcards={setFlashcardsMock}
      />
    );
  });

  it("renders without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("displays the selected deck title", () => {
    expect(wrapper.find("h2").text()).toBe("Flashcards for Test Deck");
  });

  it("renders Flashcard Creator button", () => {
    expect(wrapper.find('button').text()).toBe("Add Flashcard");
  });

  it("displays a message when no flashcards exist", () => {
    wrapper.setProps({ flashcards: [] });
    expect(wrapper.find("p").text()).toBe("No flashcards exist for this deck.");
  });

  it("renders flashcards correctly", () => {
    expect(wrapper.find("li").length).toBe(2); // Two flashcards
    expect(wrapper.find("li").at(0).find("strong").text()).toBe("Front 1");
    expect(wrapper.find("li").at(1).find("strong").text()).toBe("Front 2");
  });

  it("calls setSelectedDeck with null when back button is clicked", () => {
    wrapper.find('.backButton').simulate('click');
    expect(setSelectedDeckMock).toHaveBeenCalledWith(null);
  });

  it("opens the Flashcard Creator modal when button is clicked", () => {
    wrapper.find('button').simulate('click');
    expect(wrapper.find(Modal).exists()).toBe(true);
  });

  it("calls handleAddFlashcard and closes the modal when a new flashcard is added", () => {
    wrapper.setState({ isFlashcardModalOpen: true }); // Open the modal
    const newFlashcard = { frontText: "New Front", backText: "New Back" };

    // Simulate adding a flashcard
    wrapper.instance().handleAddFlashcard(newFlashcard);

    expect(setFlashcardsMock).toHaveBeenCalledWith([
      ...flashcards,
      { ...newFlashcard, deckId: selectedDeck.id, id: expect.any(Number) }, // Unique ID check
    ]);
    expect(wrapper.state("isFlashcardModalOpen")).toBe(false);
  });

  it("calls handleAddFlashcard and updates existing flashcard", () => {
    const updatedFlashcard = { frontText: "Updated Front", backText: "Updated Back" };
    wrapper.setState({ editingFlashcard: flashcards[0], isFlashcardModalOpen: true });

    // Simulate updating a flashcard
    wrapper.instance().handleAddFlashcard(updatedFlashcard);

    expect(setFlashcardsMock).toHaveBeenCalledWith([
      { id: 1, frontText: "Updated Front", backText: "Updated Back", deckId: 1 },
      flashcards[1],
    ]);
    expect(wrapper.state("isFlashcardModalOpen")).toBe(false);
  });

  it("toggles card flip state on click", () => {
    wrapper.find("li").at(0).simulate("click");
    expect(wrapper.state("flippedCards")[0]).toBe(true);

    // Click again to toggle back
    wrapper.find("li").at(0).simulate("click");
    expect(wrapper.state("flippedCards")[0]).toBe(false);
  });

  it("opens the modal for editing a flashcard", () => {
    wrapper.find("li").at(0).find("TbEdit").simulate("click");
    expect(wrapper.state("editingFlashcard")).toEqual(flashcards[0]);
    expect(wrapper.state("isFlashcardModalOpen")).toBe(true);
  });

  it("deletes a flashcard and updates state", () => {
    wrapper.find("li").at(0).find("TbTrash").simulate("click");
    expect(setFlashcardsMock).toHaveBeenCalledWith([flashcards[1]]);
  });

  it("closes the modal when the onClose prop is called", () => {
    wrapper.setState({ isFlashcardModalOpen: true });
    wrapper.find(Modal).prop('onClose')();
    expect(wrapper.state("isFlashcardModalOpen")).toBe(false);
  });
});
