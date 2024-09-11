import React from "react";
import { shallow, mount } from "enzyme";
import Footer from "./Footer";
import { AppProvider } from "../App/AppContext"; // Import your context provider
import { getFullYear, getFooterCopy } from "../utils/utils";

describe("<Footer />", () => {
  it("should render without crashing", () => {
    const wrapper = shallow(
      <AppProvider>
        <Footer />
      </AppProvider>
    );
    expect(wrapper.exists()).toEqual(true);
  });

  it("should render the text Copyright when user is not logged in", () => {
    const wrapper = mount(
      <AppProvider value={{ user: { isLoggedIn: false } }}>
        <Footer />
      </AppProvider>
    );

    expect(wrapper.text()).toEqual(
      `Copyright ${getFullYear()} - ${getFooterCopy(false)}`
    );
  });

  it("should render the 'Contact us' link when user is logged in", () => {
    const wrapper = mount(
      <AppProvider value={{ user: { isLoggedIn: true } }}>
        <Footer />
      </AppProvider>
    );

    expect(wrapper.find("a").text()).toEqual("Contact us");
  });

  it("should render a link when the user is logged in", () => {
    const wrapper = mount(
      <AppProvider value={{ user: { isLoggedIn: true } }}>
        <Footer />
      </AppProvider>
    );

    expect(wrapper.find("a").exists()).toBe(true);
  });
});
