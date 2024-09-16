import React from "react";
import { shallow } from "enzyme";
import BodySection from "./BodySection";
import BodyLearning from "../BodyLearning/BodyLearning";
import Flashcards from "../Flashcard/Flashcards";
import Decks from "../Decks/Decks";
import { GiCardRandom } from "react-icons/gi";
import { PiCardsThreeFill } from "react-icons/pi";

jest.mock("../BodyLearning/BodyLearning", () => {
  return jest.fn(() => <div>Body Learning Mock</div>);
});
jest.mock("../Flashcard/Flashcards", () => {
  return jest.fn(() => <div>Flashcards Mock</div>);
});
jest.mock("../Decks/Decks", () => {
  return jest.fn(() => <div>Decks Mock</div>);
});

describe("BodySection Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BodySection />);
  });

  it("renders without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders start learning and my decks buttons", () => {
    expect(wrapper.find(GiCardRandom).exists()).toBe(true);
    expect(wrapper.find(PiCardsThreeFill).exists()).toBe(true);
    expect(wrapper.find('.spanTitle').at(0).text()).toBe("Start Learning");
    expect(wrapper.find('.spanTitle').at(1).text()).toBe("My Decks");
  });

  it("sets activeSection to 'startLearning' when Start Learning is clicked", () => {
    wrapper.find('.square').at(0).simulate('click');
    expect(wrapper.find(BodyLearning).exists()).toBe(true);
  });

  it("sets activeSection to 'myDecks' when My Decks is clicked", () => {
    wrapper.find('.square').at(1).simulate('click');
    expect(wrapper.find(Decks).exists()).toBe(true);
  });

  it("renders Flashcards when a deck is selected", () => {
    wrapper.setState({ activeSection: "myDecks", selectedDeck: { id: 1, title: "Test Deck" } });
    expect(wrapper.find(Flashcards).exists()).toBe(true);
  });

  it("renders Decks when no deck is selected", () => {
    wrapper.setState({ activeSection: "myDecks", selectedDeck: null });
    expect(wrapper.find(Decks).exists()).toBe(true);
  });
});
