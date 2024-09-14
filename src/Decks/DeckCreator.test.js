import React from "react";
import { shallow } from "enzyme";
import DeckCreator from "./DeckCreator";

describe("DeckCreator Component", () => {
  let wrapper;
  const onCancelMock = jest.fn();
  const onSubmitMock = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<DeckCreator onCancel={onCancelMock} onSubmit={onSubmitMock} />);
  });

  it("renders without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("initially has empty title, firstLanguage, and secondLanguage states", () => {
    expect(wrapper.find('input[type="text"]').prop("value")).toBe("");
    expect(wrapper.find('select').at(0).prop("value")).toBe("");
    expect(wrapper.find('select').at(1).prop("value")).toBe("");
  });

  it("updates title state when input changes", () => {
    wrapper.find('input[type="text"]').simulate("change", { target: { value: "New Deck" } });
    expect(wrapper.find('input[type="text"]').prop("value")).toBe("New Deck");
  });

  it("updates firstLanguage state when first select changes", () => {
    wrapper.find('select').at(0).simulate("change", { target: { value: "English" } });
    expect(wrapper.find('select').at(0).prop("value")).toBe("English");
  });

  it("updates secondLanguage state when second select changes", () => {
    wrapper.find('select').at(1).simulate("change", { target: { value: "Spanish" } });
    expect(wrapper.find('select').at(1).prop("value")).toBe("Spanish");
  });

  it("prevents submission if firstLanguage and secondLanguage are the same", () => {
    wrapper.find('input[type="text"]').simulate("change", { target: { value: "My Deck" } });
    wrapper.find('select').at(0).simulate("change", { target: { value: "English" } });
    wrapper.find('select').at(1).simulate("change", { target: { value: "English" } });

    wrapper.find("form").simulate("submit", { preventDefault: jest.fn() });
    expect(onSubmitMock).not.toHaveBeenCalled();
  });

  it("calls onSubmit with correct data when form is valid", () => {
    wrapper.find('input[type="text"]').simulate("change", { target: { value: "My Deck" } });
    wrapper.find('select').at(0).simulate("change", { target: { value: "English" } });
    wrapper.find('select').at(1).simulate("change", { target: { value: "Spanish" } });

    wrapper.find("form").simulate("submit", { preventDefault: jest.fn() });
    expect(onSubmitMock).toHaveBeenCalledWith({
      title: "My Deck",
      firstLanguage: "English",
      secondLanguage: "Spanish",
    });
  });

  it("calls onCancel when cancel button is clicked", () => {
    wrapper.find('button[type="button"]').simulate("click");
    expect(onCancelMock).toHaveBeenCalled();
  });
});
