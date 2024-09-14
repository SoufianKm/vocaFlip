import React from "react";
import { shallow, mount } from "enzyme";
import BodySection from "../BodySection"; // Adjust the path if necessary
import DeckCreator from "../Decks/DeckCreator";
import BodyLearning from "../BodyLearning/BodyLearning";

describe("BodySection Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BodySection />);
  });

  it("should render without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should display 'Start Learning' section by default", () => {
    expect(wrapper.find(BodyLearning).exists()).toBe(true);
  });

  it("should switch to 'My Decks' when 'My Decks' square is clicked", () => {
    wrapper.find(".square").at(1).simulate("click"); // Click on the second square (My Decks)
    expect(wrapper.find(".deckContainer").exists()).toBe(true);
  });

  it("should open the deck creation modal when 'Create First Deck +' button is clicked", () => {
    // First, simulate clicking on 'My Decks' section to ensure we are there
    wrapper.find(".square").at(1).simulate("click");

    // Click the 'Create First Deck +' button
    wrapper.find(".createDeckButton").simulate("click");

    // DeckCreator component should be in the modal
    expect(wrapper.find(DeckCreator).exists()).toBe(true);
  });

  it("should close the deck creation modal when onCancel is called", () => {
    wrapper.find(".square").at(1).simulate("click");
    wrapper.find(".createDeckButton").simulate("click");

    // Call the onCancel prop passed to DeckCreator
    wrapper.find(DeckCreator).prop("onCancel")();

    // DeckCreator should no longer be in the modal
    expect(wrapper.find(DeckCreator).exists()).toBe(false);
  });

  it("should add a deck when handleCreateDeck is called", () => {
    wrapper.find(".square").at(1).simulate("click"); // Switch to 'My Decks'

    const newDeck = {
      title: "Test Deck",
      firstLanguage: "English",
      secondLanguage: "French",
    };

    const instance = wrapper.instance(); // Access the component instance

    instance.handleCreateDeck(newDeck); // Call the method directly

    // Check if the deck is added in state
    expect(instance.state.decks.length).toBe(1);
    expect(instance.state.decks[0].title).toBe("Test Deck");
  });

  it("should delete a deck when handleDelete is called", () => {
    wrapper = mount(<BodySection />); // Using mount to manipulate DOM for handleDelete

    const newDeck = {
      id: 1,
      title: "Test Deck",
      firstLanguage: "English",
      secondLanguage: "French",
    };

    // Manually set a deck in state for the test
    wrapper.setState({ decks: [newDeck] });

    const instance = wrapper.instance();
    instance.handleDelete(1); // Call delete on the deck with id 1

    // Ensure the deck is removed
    expect(wrapper.state().decks.length).toBe(0);
  });

  it("should update a deck when handleUpdateDeck is called", () => {
    wrapper = mount(<BodySection />); // Mount for accessing instance methods

    const existingDeck = {
      id: 1,
      title: "Old Deck",
      firstLanguage: "English",
      secondLanguage: "French",
    };

    wrapper.setState({ decks: [existingDeck], selectedDeck: existingDeck, isModalOpen: true });

    const updatedDeck = {
      id: 1,
      title: "Updated Deck",
      firstLanguage: "English",
      secondLanguage: "French",
    };

    const instance = wrapper.instance();
    instance.handleUpdateDeck(updatedDeck); // Call the update function

    // Check if the deck is updated in state
    expect(wrapper.state().decks[0].title).toBe("Updated Deck");
  });
});
