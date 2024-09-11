import React from "react";
import { mount } from "enzyme"; // Using mount for full rendering
import App from "./App";
import { AppProvider } from "./AppContext"; // Ensure AppContext is properly imported
import { StyleSheetTestUtils } from "aphrodite";

// Mock the AppContext to simulate user login status
const mockContextValue = {
  user: { isLoggedIn: false },
};

describe("<App />", () => {
  let wrapper;

  beforeEach(() => {
    // Suppress style injection for tests
    StyleSheetTestUtils.suppressStyleInjection();
    wrapper = mount(
      <AppProvider value={mockContextValue}>
        <App />
      </AppProvider>
    );
  });

  afterEach(() => {
    // Clear the buffer and resume style injection
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    wrapper.unmount(); // Clean up after tests
  });

  test("renders without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  test("initial state type should be 'signIn'", () => {
    // Check that the initial type is "signIn"
    expect(wrapper.find("MainContainer").props().type).toEqual("signIn");
  });

  test("should update state type to 'signUp' when clicking sign-up button", () => {
    wrapper.find("#signUp").simulate("click");
    expect(wrapper.find("MainContainer").props().type).toEqual("signUp");
  });

  test("should update state type to 'signIn' when clicking sign-in button", () => {
    // First change to sign-up, then back to sign-in
    wrapper.find("#signUp").simulate("click");
    wrapper.find("#signIn").simulate("click");
    expect(wrapper.find("MainContainer").props().type).toEqual("signIn");
  });

  it("should display SignIn/SignUp forms when user is not logged in", () => {
    const mainContainer = wrapper.find("MainContainer");
    expect(mainContainer.find("SignInForm").exists()).toBe(true);
    expect(mainContainer.find("SignUpForm").exists()).toBe(true);
  });

  it("should display the flashcards section when the user is logged in", () => {
    const loggedInContextValue = {
      user: { isLoggedIn: true },
    };

    // Re-mount the component with logged-in user
    const wrapperWithLoggedInUser = mount(
      <AppProvider value={loggedInContextValue}>
        <App />
      </AppProvider>
    );

    const mainContainer = wrapperWithLoggedInUser.find("MainContainer");

    // Check that there is only one h1 element with the expected text
    const h1Elements = mainContainer.find("h1");
    expect(h1Elements).toHaveLength(1); // Ensure there is exactly one h1
    expect(h1Elements.at(0).text()).toBe("Welcome to the Flashcards Section!"); // Check text

    // Ensure that SignInForm and SignUpForm are not rendered
    expect(mainContainer.find("SignInForm").exists()).toBe(false);
    expect(mainContainer.find("SignUpForm").exists()).toBe(false);

    wrapperWithLoggedInUser.unmount(); // Clean up after test
  });
  
});
