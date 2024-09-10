import React, { Component } from "react";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
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
    const { name, email, password } = this.state;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert(
        `You are signed up with name: ${name}, email: ${email}, and password: ${password}`
      );
    } catch (err) {
      console.log(err);
    }

    // Reset the form fields
    this.setState({
      name: "",
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
          {/* <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Name"
          /> */}
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
