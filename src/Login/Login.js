import React, { useContext, Component } from "react";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AppContext } from "../App/AppContext"; // Import the AppContext

class SignInForm extends Component {
  static contextType = AppContext;

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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;
      logIn({ email: user.email }); // Log in and store user in session
      alert(`You are logged in with email: ${email}`);
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
          <button type="submit">Sign In</button>
        </form>
      </div>
    );
  }
}

export default SignInForm;
