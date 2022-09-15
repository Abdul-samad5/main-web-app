import { useState } from "react";
import { logo_2 } from "../assets";
import { Login, GetStarted, ResetPassword } from "../components";

const Register = () => {
  // Initialize state for the login, forgotPassword, and createStore.
  const [getStarted, setGetStarted] = useState({
    login: true,
    forgotPassword: false,
    createStore: false,
  });

  // Logic to display toggle the state of the three components in order to conditionally render Login, forgotPassword, createStore
  const keys = ["login", "forgotPassword", "createStore"];
  function handleGetStarted(current) {
    setGetStarted(() => {
      // Loop over the keys array defined above and create an object where all the value is set to false.
      const obj = keys.reduce((acc, cur) => {
        return { ...acc, [cur]: false };
      }, {});

      // Set the value of current to true. Current is passed from a child component.
      obj[current] = true;

      // Return the object as the new state.
      return obj;
    });
  }

  return (
    <div className="w-[70%] mx-auto">
      <div className="py-5">
        <a href="/" className="w-[50px] block">
          <img src={logo_2} alt="Yetti Logo" />
        </a>
      </div>
      {getStarted.login && <Login handleClick={handleGetStarted} />}
      {getStarted.forgotPassword && <ResetPassword handleClick={handleGetStarted} />}
      {getStarted.createStore && <GetStarted handleClick={handleGetStarted} />}
    </div>
  );
};

export default Register;
