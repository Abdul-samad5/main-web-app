import { useState } from 'react';
import { postUser } from '../services/services';
import Modal from './Modal';
import { Link, useNavigate } from 'react-router-dom';
import { isArray } from 'lodash';

import { text } from 'body-parser';

const SignUp = ({ handleClick }) => {
  const navigate = useNavigate();
  // Initialize state for submit button textContent
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalText] = useState(null);
  const [submitForm, setSubmitForm] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const alertState = {
    bgColor: '',
    text: '',
    textColor: '',
  };

  const [alert, setAlert] = useState(alertState);

  // Collect form data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    accountType: '',
    agreeToTerms: false,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  }

  async function formSubmit(e) {
    e.preventDefault();
    const user = {
      email: formData.email,
      full_name: formData.fullName,
      password: formData.password,
      user_type: formData.accountType,
    };
    // if (!user) {
    //   return;
    // }
    if (!formData.agreeToTerms) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return;
    }
    try {
      setLoading(true);
      const res = await postUser(user);
      console.log(res.data.message);
      console.log(res);
      if (!res.status === 201 || res.status === 200) return;
      setShowModal(true);
      setModalText('Registration Successful!Navigating to the Login Page...');

      setTimeout(() => {
        setShowModal(false);
      }, 3000);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setLoading(false);
      if (
        err.response.data.email &&
        err.response.data.full_name &&
        err.response.data.password
      ) {
        setShowModal(true);
        setModalText('Field(s) cannot be empty!');
      } else if (err.code === 'ERR_NETWORK') {
        setShowModal(true);
        setModalText('There might be a problem with your network connection!');
      }
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
      console.log(err);
    }
  }

  return (
    <div className='max-w-[400px] w-full mx-auto mb-20'>
      {showModal && <Modal text={modalContent} showModal={showModal} />}

      <h1 className='text-center text-[28px] mb-[15px] font-normal'>
        Register
      </h1>

      {showAlert && (
        <div className='bg-red-300 p-2 rounded'>
          <p className='text-center '>
            please make sure to read and agree to the terms and conditions
          </p>
        </div>
      )}

      <form className='w-full' onSubmit={formSubmit}>
        {/* <Modal /> */}
        <div className='mb-4 w-full'>
          <label htmlFor='storeName' className='w-full mb-3 ml-2'>
            Full name
          </label>
          <input
            type='text'
            name='fullName'
            value={formData.fullName}
            placeholder='Enter your full name'
            onChange={handleChange}
            className='w-full border border-brand-stroke rounded-lg p-3'
          />
        </div>
        <div className='mb-4 w-full'>
          <label htmlFor='storeName' className='w-full mb-3 ml-2'>
            Email
          </label>
          <input
            type='email'
            name='email'
            value={formData.email}
            placeholder='Enter your email address'
            onChange={handleChange}
            className='w-full border border-brand-stroke rounded-lg p-3'
          />
        </div>
        <div className='w-full mb-4'>
          <label htmlFor='password' className='w-full mb-3 ml-2'>
            Password
          </label>
          <input
            type='password'
            name='password'
            value={formData.password}
            placeholder='Password'
            onChange={handleChange}
            className='w-full border border-brand-stroke rounded-lg p-3'
          />
        </div>
        <div className='w-full mb-4'>
          <label htmlFor='accountType' className='w-full mb-3 ml-2'>
            Account Type
          </label>
          <select
            type='dropdown'
            name='accountType'
            value={formData.accountType}
            required
            onChange={handleChange}
            className='w-full border border-brand-stroke rounded-lg p-3'
          >
            <option value=''>Please select</option>
            <option value='seller'>Seller</option>
            <option value='buyer'>Buyer</option>
          </select>
        </div>
        <div className='w-full mb-4 flex gap-2 items-center'>
          <input
            type='checkbox'
            name='agreeToTerms'
            id='agreeToTerms'
            checked={formData.agreeToTerms}
            onChange={handleChange}
          />
          <label htmlFor='agreeToTerms'>
            I agree to the{' '}
            <a href='/' className='text-brand-secondary'>
              terms and conditions.
            </a>
          </label>
        </div>
        <button
          type='submit'
          // onClick={() => handleClick("getStarted")}
          className={`w-full py-3 bg-brand-primary text-white font-normal rounded-lg hover:bg-brand-secondary transition-colors duration-500`}
        >
          {loading ? 'Please wait...' : 'Register'}
        </button>
        <div className='w-full flex justify-between items-center mt-2'>
          <p className='text-brand-gray font-normal text-[14px]'>
            Already have an account?
          </p>

          <button
            className='text-brand-gray font-normal text-[14px]'
            type='button'
            onClick={() => handleClick('login')}
          >
            Login
          </button>
        </div>
      </form>
      {showModal && <Modal text={modalContent} />}
    </div>
  );
};

export default SignUp;
