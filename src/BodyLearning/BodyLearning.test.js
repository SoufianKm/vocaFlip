import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BodyLearning from "./BodyLearning";

test("displays message if no decks are available", () => {
  render(<BodyLearning decks={[]} flashcards={[]} />);
  
  expect(screen.getByText(/No decks available for learning/i)).toBeInTheDocument();
});

test("displays grouped decks by language", () => {
  const decks = [
    { id: 1, title: "Deck 1", firstLanguage: "English", secondLanguage: "Spanish" },
    { id: 2, title: "Deck 2", firstLanguage: "English", secondLanguage: "Spanish" },
  ];
  render(<BodyLearning decks={decks} flashcards={[]} />);
  
  expect(screen.getByText("Spanish")).toBeInTheDocument();
  expect(screen.getByText("Deck 1")).toBeInTheDocument();
  expect(screen.getByText("Deck 2")).toBeInTheDocument();
});

test("shows alert if deck has no flashcards", () => {
  const decks = [{ id: 1, title: "Deck 1", secondLanguage: "Spanish" }];
  const flashcards = []; // No flashcards

  // Mock the alert function
  window.alert = jest.fn();

  render(<BodyLearning decks={decks} flashcards={flashcards} />);
  
  const deckItem = screen.getByText("Deck 1");
  fireEvent.click(deckItem); // Simulate deck selection

  expect(window.alert).toHaveBeenCalledWith("No flashcards exist for this deck.");
});

test("displays flashcard count for each deck", () => {
  const decks = [
    { id: 1, title: "Deck 1", secondLanguage: "Spanish" },
    { id: 2, title: "Deck 2", secondLanguage: "Spanish" },
  ];
  const flashcards = [
    { id: 1, deckId: 1, question: "Question 1", answer: "Answer 1" },
    { id: 2, deckId: 1, question: "Question 2", answer: "Answer 2" },
    { id: 3, deckId: 2, question: "Question 3", answer: "Answer 3" },
  ];

  render(<BodyLearning decks={decks} flashcards={flashcards} />);
  
  expect(screen.getByText("2")).toBeInTheDocument(); // Deck 1 has 2 flashcards
  expect(screen.getByText("1")).toBeInTheDocument(); // Deck 2 has 1 flashcard
});
