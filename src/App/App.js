import React, { useContext } from "react";
import "./App.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SignInForm from "../Login/Login";
import SignUpForm from "../SignUp/SignUp";
import { StyleSheet, css } from "aphrodite";
import { AppProvider, AppContext } from "./AppContext"; // Import AppContext
import BodySection from "../BodySection/BodySection"; // Import the Decks component

// MainContainer component to handle the conditional rendering
function MainContainer({ type, handleOnClick }) {
  const { user } = useContext(AppContext); // Access the user from context

  // If the user is not logged in, display the Sign In / Sign Up forms
  if (!user.isLoggedIn) {
    const containerClass =
      "container " + (type === "signUp" ? "right-panel-active" : "");

    return (
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us, please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If the user is logged in, display the flashcards section
  return <BodySection />;
}

// Main App component
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "signIn", // Set default to "signIn"
    };
  }

  // Toggle between SignIn and SignUp
  handleOnClick = (text) => {
    if (text !== this.state.type) {
      this.setState({ type: text });
    }
  };

  render() {
    return (
      <AppProvider>
        <div className="App">
          <div className={css(styles.appHeader)}>
            <Header />
          </div>
          {/* Render the MainContainer component */}
          <MainContainer
            type={this.state.type}
            handleOnClick={this.handleOnClick}
          />
          <div className={css(styles.appFooter)}>
            <Footer />
          </div>
        </div>
      </AppProvider>
    );
  }
}

// Aphrodite styles
const styles = StyleSheet.create({
  appFooter: {
    borderTop: "5px solid",
    borderImage: "linear-gradient(to right, #219ebc, #023047) 1 0 0 0",
    display: "flex",
    justifyContent: "center",
    fontStyle: "italic",
  },
  appHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottom: "5px solid",
    borderImage: "linear-gradient(to right, #219ebc, #023047) 0 0 1 0",
    padding: "20px",
  },
});

export default App;
