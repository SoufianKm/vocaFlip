import React from "react";
import Header from "./Header";
import { shallow, mount } from "enzyme";
import { StyleSheetTestUtils } from "aphrodite";
import { AppContext, user, logOut } from "../App/AppContext";

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  jest.restoreAllMocks();
});

describe("Header", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Header />);
  });

  it("renders without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should render img and h1 tags", () => {
    expect(wrapper.find("img").length).toBe(1);
    expect(wrapper.find("h1").length).toBe(1);
  });
});