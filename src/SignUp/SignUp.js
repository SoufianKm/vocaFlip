import React, { Component } from "react";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AppContext } from "../App/AppContext"; // Import the AppContext

class SignUpForm extends Component {
  static contextType = AppContext; // Set context

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (evt) => {
    const { name, value } = evt.target;
    this.setState({
      [name]: value,
    });
  };

  handleOnSubmit = async (evt) => {
    evt.preventDefault();
    const { email, password } = this.state;
    const { logIn } = this.context; // Get the logIn function from context

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;
      logIn({ email: user.email }); // Log in and store user in session
    } catch (err) {
      console.log(err);
    }

    // Reset the form fields
    this.setState({
      email: "",
      password: "",
    });
  };

  render() {
    return (
      <div className="form-container sign-up-container">
        <form onSubmit={this.handleOnSubmit}>
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="#" className="social">
              <i className="fab fa-github" />
            </a>
            <a href="#" className="social">
              <i className="fab fa-linkedin-in" />
            </a>
          </div>
          <span>or use your email for registration</span>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="Password"
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
