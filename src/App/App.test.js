import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import { StyleSheetTestUtils } from "aphrodite";

describe("<App />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
    // Suppress style injection for tests
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    // Clear the buffer and resume style injection
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  test("renders without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should have initial state type as 'signIn'", () => {
    expect(wrapper.state("type")).toEqual("signIn");
  });

  it("should update state type to 'signUp' when clicking sign up button", () => {
    wrapper.find("#signUp").simulate("click");
    expect(wrapper.state("type")).toEqual("signUp");
  });

  it("should update state type to 'signIn' when clicking sign in button", () => {
    // Change the state to 'signUp' first
    wrapper.setState({ type: "signUp" });
    wrapper.find("#signIn").simulate("click");
    expect(wrapper.state("type")).toEqual("signIn");
  });
});

