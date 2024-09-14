import React from "react";
import { render, screen } from "@testing-library/react";
import StartLearningSection from "./BodyLearning";

test("displays message if no decks are available", () => {
  render(<StartLearningSection decks={[]} />);
  
  expect(screen.getByText(/No decks available for learning/i)).toBeInTheDocument();
});

test("displays grouped decks by language", () => {
  const decks = [
    { title: "Deck 1", firstLanguage: "English", secondLanguage: "Spanish" },
    { title: "Deck 2", firstLanguage: "English", secondLanguage: "Spanish" },
  ];
  render(<StartLearningSection decks={decks} />);
  
  expect(screen.getByText("Spanish")).toBeInTheDocument();
  expect(screen.getByText("Deck 1 (English - Spanish)")).toBeInTheDocument();
});
