import { useState } from 'react';
import { logo_2 } from '../assets';
import {
  Login,
  SignUp,
  ResetPassword,
  GetStarted,
  CreateStore,
} from '../components';

const Register = () => {
  // Initialize state for the login, forgotPassword, and createStore to determine the component to show.
  const [getStarted, setGetStarted] = useState({
    login: false,
    forgotPassword: false,
    signUp: true,
    createStore: false,
    getStarted: false,
  });

  // Logic to display toggle the state of the three components in order to conditionally render Login, forgotPassword, createStore
  const keys = ['login', 'forgotPassword', 'createStore', 'signUp'];
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
    <div className='w-full px-[15px] lg:w-[80%] mx-auto relative'>
      
      {getStarted.login && <Login handleClick={handleGetStarted} />}
      {getStarted.forgotPassword && (
        <ResetPassword handleClick={handleGetStarted} />
      )}
      {getStarted.signUp && <SignUp handleClick={handleGetStarted} />}
      {getStarted.createStore && <CreateStore handleClick={handleGetStarted} />}
      {getStarted.getStarted && <GetStarted handleClick={handleGetStarted} />}
    </div>
  );
};

export default Register;
