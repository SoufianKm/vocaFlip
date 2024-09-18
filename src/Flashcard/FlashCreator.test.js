import React from "react";
import { shallow } from "enzyme";
import FlashcardCreator from "./FlashcardCreator";

describe("FlashcardCreator Component", () => {
  let wrapper;
  let onSubmitMock;

  beforeEach(() => {
    onSubmitMock = jest.fn(); // Mock the onSubmit function
    wrapper = shallow(<FlashcardCreator onSubmit={onSubmitMock} />);
  });

  it("renders without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("initially has empty input fields", () => {
    expect(wrapper.find('input[type="text"]').at(0).props().value).toBe("");
    expect(wrapper.find('input[type="text"]').at(1).props().value).toBe("");
  });

  it("updates the frontText state when typing in the front input field", () => {
    wrapper
      .find('input[type="text"]')
      .at(0)
      .simulate("change", { target: { value: "Front of card" } });
    expect(wrapper.find('input[type="text"]').at(0).prop("value")).toBe(
      "Front of card"
    );
  });

  it("updates the backText state when typing in the back input field", () => {
    wrapper
      .find('input[type="text"]')
      .at(1)
      .simulate("change", { target: { value: "Back of card" } });
    expect(wrapper.find('input[type="text"]').at(1).prop("value")).toBe(
      "Back of card"
    );
  });

  it("calls onSubmit with the correct data when form is submitted", () => {
    wrapper
      .find('input[type="text"]')
      .at(0)
      .simulate("change", { target: { value: "Front of card" } });
    wrapper
      .find('input[type="text"]')
      .at(1)
      .simulate("change", { target: { value: "Back of card" } });

    wrapper.find("form").simulate("submit", { preventDefault: () => {} });

    expect(onSubmitMock).toHaveBeenCalledWith({
      frontText: "Front of card",
      backText: "Back of card",
    });
  });

  it("resets the input fields after submitting", () => {
    wrapper
      .find('input[type="text"]')
      .at(0)
      .simulate("change", { target: { value: "Front of card" } });
    wrapper
      .find('input[type="text"]')
      .at(1)
      .simulate("change", { target: { value: "Back of card" } });

    wrapper.find("form").simulate("submit", { preventDefault: () => {} });

    expect(wrapper.find('input[type="text"]').at(0).prop("value")).toBe("");
    expect(wrapper.find('input[type="text"]').at(1).prop("value")).toBe("");
  });

  it("sets input fields when initialData is provided", () => {
    const initialData = { frontText: "Initial Front", backText: "Initial Back" };
    wrapper.setProps({ initialData });

    expect(wrapper.find('input[type="text"]').at(0).props().value).toBe("Initial Front");
    expect(wrapper.find('input[type="text"]').at(1).props().value).toBe("Initial Back");
  });

  it("updates the button text to 'Update Flashcard' when initialData is provided", () => {
    const initialData = { frontText: "Initial Front", backText: "Initial Back" };
    wrapper.setProps({ initialData });

    expect(wrapper.find("button").text()).toBe("Update Flashcard");
  });

  it("updates the button text to 'Add Flashcard' when initialData is not provided", () => {
    expect(wrapper.find("button").text()).toBe("Add Flashcard");
  });
});
