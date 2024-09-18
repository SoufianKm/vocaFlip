import React from "react";
import { shallow } from "enzyme";
import Decks from "./Decks";
import DeckCreator from "../Decks/DeckCreator";
import { Modal } from "../utils/utils";
import { TbEdit, TbTrash } from "react-icons/tb";

describe("Decks Component", () => {
  let wrapper;
  let setDecksMock;
  let setSelectedDeckMock;
  let setFlashcardsMock;
  const mockDecks = [
    {
      id: 1,
      title: "English to Spanish",
      firstLanguage: "English",
      secondLanguage: "Spanish",
    },
    {
      id: 2,
      title: "French to German",
      firstLanguage: "French",
      secondLanguage: "German",
    },
  ];

  beforeEach(() => {
    setDecksMock = jest.fn();
    setSelectedDeckMock = jest.fn();
    setFlashcardsMock = jest.fn();
    wrapper = shallow(
      <Decks
        decks={mockDecks}
        setDecks={setDecksMock}
        selectedDeck={null}
        setSelectedDeck={setSelectedDeckMock}
        flashcards={[]}
        setFlashcards={setFlashcardsMock}
      />
    );
  });

  it("renders without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("displays 'No decks available' when decks array is empty", () => {
    wrapper.setProps({ decks: [] });
    expect(wrapper.find("p").text()).toBe("No decks available.");
  });

  it("displays decks grouped by secondLanguage", () => {
    expect(wrapper.find("h3").at(0).text()).toBe("Spanish");
    expect(wrapper.find("h3").at(1).text()).toBe("German");
  });

  it("opens the DeckCreator modal when 'Create First Deck' button is clicked", () => {
    wrapper.setProps({ decks: [] });
    wrapper.find("button").simulate("click");
    expect(wrapper.find(DeckCreator).exists()).toBe(true);
  });

  it("adds a new deck when DeckCreator onSubmit is called", () => {
    const newDeck = {
      title: "Chinese to French",
      firstLanguage: "Chinese",
      secondLanguage: "French",
    };

    wrapper.find(DeckCreator).prop("onSubmit")(newDeck);
    expect(setDecksMock).toHaveBeenCalledWith([
      ...mockDecks,
      expect.objectContaining(newDeck),
    ]);
  });

  it("prevents adding a duplicate deck", () => {
    const duplicateDeck = {
      title: "English to Spanish",
      firstLanguage: "English",
      secondLanguage: "Spanish",
    };

    window.alert = jest.fn(); // Mock the alert
    wrapper.find(DeckCreator).prop("onSubmit")(duplicateDeck);
    expect(setDecksMock).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith("A similar deck already exists!");
  });

  it("calls setSelectedDeck when a deck is clicked", () => {
    wrapper.find(".deckTitle").at(0).simulate("click");
    expect(setSelectedDeckMock).toHaveBeenCalledWith(mockDecks[0]);
  });

  it("deletes a deck when the delete button is clicked", () => {
    wrapper.find(TbTrash).at(0).simulate("click");
    expect(setDecksMock).toHaveBeenCalledWith([mockDecks[1]]); // Deck with id 1 is deleted
    expect(setFlashcardsMock).toHaveBeenCalledWith([]); // Ensure flashcards are filtered
  });

  it("opens the edit modal when the edit button is clicked", () => {
    wrapper.find(TbEdit).at(0).simulate("click");
    expect(wrapper.find(Modal).exists()).toBe(true);
    expect(wrapper.find('input[name="deckName"]').prop("defaultValue")).toBe(
      mockDecks[0].title
    );
  });

  it("updates the deck when edited in the modal", () => {
    wrapper.find(TbEdit).at(0).simulate("click");
    wrapper.find("form").simulate("submit", {
      preventDefault: jest.fn(),
      target: { deckName: { value: "Updated Deck" } },
    });

    expect(setDecksMock).toHaveBeenCalledWith([
      { ...mockDecks[0], title: "Updated Deck" },
      mockDecks[1],
    ]);
  });

  it("closes the modal after updating", () => {
    wrapper.find(TbEdit).at(0).simulate("click");
    wrapper.find("form").simulate("submit", {
      preventDefault: jest.fn(),
      target: { deckName: { value: "Updated Deck" } },
    });
    expect(wrapper.find(Modal).exists()).toBe(false);
  });

  it("does not open the edit modal if no deck is selected", () => {
    wrapper.setProps({ decks: [] });
    expect(wrapper.find(TbEdit).exists()).toBe(false);
  });
});
