import React, { Component } from "react";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

class SignInForm extends Component {
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
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert(`You are logged in with email: ${email} and password: ${password}`);
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
      <div className="form-container sign-in-container">
        <form onSubmit={this.handleOnSubmit}>
          <h1>Sign in</h1>
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
          <span>or use your account</span>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <a href="#">Forgot your password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>
    );
  }
}

export default SignInForm;
