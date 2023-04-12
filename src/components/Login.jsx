import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { styles } from '../constants';
import { userLogin } from '../services/services';
import { UserContext } from '../context/UserContext';
import Modal from './Modal';

const Login = ({ handleClick }) => {
  // Initialize state for the login to enable user login
  // const { isLoggedIn, userLoggedIn, userLoggedOut } = useContext(LoginContext);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalText, setModalText] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const { onUserLogin } = useContext(UserContext);

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
      email: formData.email,
      password: formData.password,
    };
    e.preventDefault();
    setLoading(true);
    try {
      const response = await userLogin(user);

      if (!response.statusText === 'OK') return;

      if (response) {
        const token = response.data.data.access;

        const email = response.data.data.user.email;
        const user_id = response.data.data.user.user_id;
        const emailUrl = response.data.data.user.user_email_url;
        const emailVerify = response.data.data.user.user_is_active;
        const type = response.data.data.type;
        console.log(type);
        console.log(response);
        onUserLogin(token, email, user_id, emailUrl, emailVerify, type);

        if (response.data.data.user.has_store === false) {
          setLoading(false);
          setShowModal(true);
          setModalText('Login Success! Please create a store to continue');
          setTimeout(() => {
            setShowModal(false);
            handleClick('createStore');
          }, 3000);
          navigate('/dashboard');
        } else {
          setLoading(false);
          setShowModal(true);
          setModalText('Login Success! Please wait...');
          setTimeout(() => {
            setShowModal(false);

            navigate('/dashboard');
          }, 3000);
        }
      }
    } catch (err) {
      setLoading(false);
      if (err.response.data.email && err.response.data.password) {
        setLoading(false);
        setShowModal(true);
        setModalText('Field(s) cannot be empty!');
      } else if (err.code === 'ERR_NETWORK') {
        setLoading(false);
        setShowModal(true);
        setModalText('There might be a problem with your network connection!');
      } else if (err.response.status === 401) {
        setLoading(false);
        setShowModal(true);
        setModalText('Invalid login credentials');
      }
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
      console.log(err);
    }
  }

  return (
    <div className='max-w-[400px] w-full mx-auto'>
      {showModal && <Modal text={modalText} showModal={showModal} />}
      <h1 className='text-center text-[28px] mb-[40px] font-normal'>
        Login to your account
      </h1>
      <form className='w-full' onSubmit={formSubmit}>
        <div className='mb-4 w-full'>
          <label htmlFor='email' className='w-full mb-3 ml-2'>
            Email address
          </label>
          <input
            type='email'
            name='email'
            value={formData.value}
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
            value={formData.value}
            placeholder='Enter password'
            onChange={handleChange}
            className='w-full border border-brand-stroke rounded-lg p-3'
          />
        </div>
        <div className='w-full mb-4 flex gap-2 items-center'>
          <input
            type='checkbox'
            name='remember'
            id='remember'
            checked={formData.remember}
            onChange={handleChange}
          />
          <label htmlFor='remember'>Remember me</label>
        </div>
        <button disabled={loading} className={`${styles.button} w-full`}>
          {loading ? 'Please wait...' : 'Login to store'}
        </button>
        <div className='w-full flex justify-between items-center mt-2'>
          <button
            className='text-brand-gray font-normal text-[14px]'
            type='button'
            onClick={() => handleClick('forgotPassword')}
          >
            Forgot password?
          </button>

          <button
            className='text-brand-gray font-normal text-[14px]'
            type='button'
            onClick={() => {
              handleClick('signUp');
              navigate('/register');
            }}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
