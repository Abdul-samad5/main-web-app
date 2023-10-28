import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styles } from '../constants';
import Modal from './Modal';
import axios from 'axios';
import { logo_2 } from '../assets';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from '../services/services';

const ResetPasswordConfirm = ( ) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalText, setModalText] = useState(null);
  const { id, token } = useParams();

  const [formData, setFormData] = useState({
    password: '',
    rePassword: false,
  });

  const navigate = useNavigate();

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

    let user = {
      password: formData.password,
    };
    
    setLoading(true);

    try {
        const res = await axios.post(`${BASE_URL}auth/reset-password-confirm/${id}/${token}`,
            user
        );
        console.log(res);
        if (!response.statusText === 'OK') return;
        
        setShowModal(true);
        setModalText('Your password has been changes succesfully!');
        setTimeout(() => {
            setShowModal(false);
            navigate('/login');
        }, 3000);
    } catch (err) {
        // setShowModal(true);
        // setModalText('Login Success! Please create a store to continue');
        // setTimeout(() => {
        //     setShowModal(false);
        // }, 3000);
        console.log(err);
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className='w-full px-[15px] lg:w-[80%] mx-auto relative pt-[80px]'>
      <div className='py-5 absolute top-0 sm[320px]:hidden left-5 lg:-left-[100px]'>
        <a href='/' className='w-[50px] block'>
          <img src={logo_2} alt='Yetti Logo' />
        </a>
      </div>
    
      <div className='max-w-[400px] w-full mx-auto'>
        {showModal && <Modal text={modalText} showModal={showModal} />}
        <h1 className='text-center text-[28px] mb-[40px] font-normal'>
          Confirn your new password
        </h1>
        <form className='w-full' onSubmit={formSubmit}>
          <div className='w-full mb-4'>
            <label htmlFor='password' className='w-full mb-3 ml-2'>
              Password
            </label>
            <input
              type='password'
              name='password'
              value={formData.password}
              placeholder='Enter password'
              onChange={handleChange}
              className='w-full border border-brand-stroke rounded-lg p-3'
            />
          </div>
          <div className='w-full mb-4'>
            <label htmlFor='password' className='w-full mb-3 ml-2'>
              Confirm password
            </label>
            <input
              type='password'
              name='rePassword'
              value={formData.rePassword}
              placeholder='Enter password'
              onChange={handleChange}
              className='w-full border border-brand-stroke rounded-lg p-3'
            />
          </div>

          <button disabled={loading} className={`${styles.button} w-full`}>
            {loading ? 'Please wait...' : 'Reset password'}
          </button>

          <div className='w-full flex justify-between items-center mt-2'>
            <Link to="/signUp">
                <button
                    className='text-brand-gray font-normal text-[14px]'
                    type='button'
                >
                    Register
                </button>
            </Link>

            <Link to="/login">
                <button
                    className='text-brand-gray font-normal text-[14px]'
                    type='button'
                >
                    Login
                </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
