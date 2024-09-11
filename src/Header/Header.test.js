import React from "react";
import Header from "./Header";
import { mount } from "enzyme";
import { StyleSheetTestUtils } from "aphrodite";
import { AppProvider } from "../App/AppContext"; // Ensure you import the AppProvider

beforeAll(() => {
  global.alert = jest.fn();
});

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  jest.restoreAllMocks();
});

describe("Header", () => {
  const renderHeader = (userValue) => {
    return mount(
      <AppProvider value={userValue}>
        <Header />
      </AppProvider>
    );
  };

  it("renders without crashing", () => {
    const userValue = {
      user: { isLoggedIn: false },
      logOut: jest.fn(),
    };

    const wrapper = renderHeader(userValue);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render img and h1 tags", () => {
    const userValue = {
      user: { isLoggedIn: false },
      logOut: jest.fn(),
    };

    const wrapper = renderHeader(userValue);
    expect(wrapper.find("img").length).toBe(1);
    expect(wrapper.find("h1").length).toBe(1);
  });

  it("should display user information when the user is logged in", () => {
    const logOutMock = jest.fn();
    const userValue = {
      user: {
        isLoggedIn: true,
        email: "testoop@me.com",
        photoURL: null, // or a valid URL
      },
      logOut: logOutMock,
    };

    const wrapper = renderHeader(userValue);

    // Check if the user info is displayed
    expect(wrapper.find("p").exists()).toBe(true); // Ensure the <p> exists
    expect(wrapper.find("p").text()).toBe("testoop@me.com"); // Check email display
    expect(wrapper.find("button").exists()).toBe(true); // Ensure the button exists
    expect(wrapper.find("button").text()).toBe("Log Out"); // Check Log Out button
    expect(wrapper.find("img").prop("src")).toBe(
      userValue.user.photoURL || expect.any(String)
    ); // Check profile image
  });

  it("should not display user information when the user is not logged in", () => {
    const userValue = {
      user: {
        isLoggedIn: false,
      },
      logOut: jest.fn(),
    };

    const wrapper = renderHeader(userValue);

    expect(wrapper.find("p").exists()).toBe(false); // No email should be displayed
    expect(wrapper.find("button").exists()).toBe(false); // No Log Out button should be displayed
  });

  it("should call logOut function when Log Out button is clicked", () => {
    const logOutMock = jest.fn();
    const userValue = {
      user: {
        isLoggedIn: true,
        email: "test@example.com",
      },
      logOut: logOutMock,
    };

    const wrapper = renderHeader(userValue);

    // Debugging: Check the rendered output
    console.log(wrapper.debug());

    // Ensure the button is rendered
    expect(wrapper.find("button").exists()).toBe(true); // Check if the button exists

    wrapper.find("button").simulate("click"); // Simulate click on Log Out button

    expect(logOutMock).toHaveBeenCalled(); // Check if logOut was called
    expect(window.alert).toHaveBeenCalledWith(
      "You have successfully logged out."
    ); // Check if alert was called
  });
});
