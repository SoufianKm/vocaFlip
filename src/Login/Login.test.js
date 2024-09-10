import React from "react";
import { shallow } from "enzyme";
import SignInForm from "./Login"; // Adjust path according to your project structure

describe("SignInForm Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SignInForm />);
  });

  it("renders without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should handle email input change", () => {
    const emailInput = wrapper.find('input[name="email"]');
    emailInput.simulate("change", {
      target: { name: "email", value: "test@example.com" },
    });
    expect(wrapper.state("email")).toEqual("test@example.com");
  });

  it("should handle password input change", () => {
    const passwordInput = wrapper.find('input[name="password"]');
    passwordInput.simulate("change", {
      target: { name: "password", value: "password123" },
    });
    expect(wrapper.state("password")).toEqual("password123");
  });

  it("should call handleOnSubmit on form submit", () => {
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), "handleOnSubmit");
    wrapper.instance().forceUpdate();
    wrapper.find("form").simulate("submit", { preventDefault() {} });
    expect(handleSubmitSpy).toHaveBeenCalled();
  });
});
