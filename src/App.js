import React, { useState } from "react";
import "./App.css";
import { app } from "./firebaseConfig";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function App() {
  const [data, setData] = useState({});
  let auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const handleInput = (event) => {
    // setting value in email and password at a same time, that is y using array
    let newInput = { [event.target.name]: event.target.value };
    setData({ ...data, ...newInput });
  };

  const handleSubmit = (event) => {
    // TO SIGNUP
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        console.log(response.user);
      })
      .catch((err) => {
        alert(err.message);
      });

    // TO LOGIN
    // signInWithEmailAndPassword(auth, data.email, data.password)
    //   .then((response) => {
    //     console.log(response.user);
    //   })
    //   .catch((err) => {
    //     alert(err.message);
    //   });
  };

  // SIGNUP WITH GOOGLE
  const handleSignupGoogle = (event) => {
    signInWithPopup(auth, googleProvider)
      .then((response) => {
        console.log(response.user);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="App">
      <input
        name="email"
        type="email"
        placeholder="Enter email"
        onChange={(event) => handleInput(event)}
      />
      <input
        name="password"
        type="password"
        placeholder="Enter password"
        onChange={(event) => handleInput(event)}
      />
      <button onClick={handleSubmit}>Signup</button>
      <button onClick={handleSignupGoogle}>Sign up with Google</button>
    </div>
  );
}

export default App;
