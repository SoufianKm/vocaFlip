import React from "react";
import { shallow } from "enzyme";
import SignUpForm from "./SignUp"; // Adjust the path as necessary

describe("SignUpForm Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SignUpForm />);
  });

  it("renders without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  // it("should handle name input change", () => {
  //   const nameInput = wrapper.find('input[name="name"]');
  //   nameInput.simulate("change", {
  //     target: { name: "name", value: "John Doe" },
  //   });
  //   expect(wrapper.state("name")).toEqual("John Doe");
  // });

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
    wrapper.instance().forceUpdate(); // Re-render component with spy
    wrapper.find("form").simulate("submit", { preventDefault() {} });
    expect(handleSubmitSpy).toHaveBeenCalled();
  });
});
