import { useState } from 'react';
import axios from 'axios';
import { BASE_URL, postStore } from '../services/services';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import Cookies from 'js-cookie';
import { logo_2 } from '../assets';

const CreateStore = ({ handleClick }) => {
  // Initialize state for submit button textContent
  const [message, setMessage] = useState({ text: true });
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalText, setModalText] = useState(null);

  const navigate = useNavigate();
  const tk = Cookies.get('_tksr');

  // Collect form data
  const [formData, setFormData] = useState({
    storeName: '',
    storeDomain: '',
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

  // console.log(postStore(store));

  async function formSubmit(e) {
    e.preventDefault();
    const store = {
      store_name: formData.storeName,
      store_domain: 'https://' + formData.storeDomain + '.myyetti.store',
    };

    try {
      setLoading(true);

      const res = await axios.post(`${BASE_URL}store/create_store`, store, 
      { headers: { Authorization: `Bearer ${tk}` } });

      setShowModal(true);
      setModalText('Store Created successfully. Navigating to Dashboard...');
      setTimeout(() => {
        setShowModal(false);
        navigate('/dashboard');
      }, 3000);
      console.log(res);
    } catch (err) {
      setShowModal(true);
      setModalText(err.response.data.message);
      setTimeout(() => {
        setShowModal(false);
      }, 3000);

      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className='w-full px-[15px] lg:w-[80%] mx-auto relative pt-[80px]'>
        <div className='py-5 absolute top-0 sm[320px]:hidden left-5 lg:-left-[100px]'>
          <a href='/' className='w-[50px] block'>
            <img src={logo_2} alt='Yetti Logo' />
          </a>
        </div>
        <div className='max-w-[400px] w-full mx-auto mb-20 mt-6'>
          {showModal && <Modal text={modalText} showModal={showModal} />}
          <h1 className='text-center text-[28px] mb-[15px] font-normal'>
            Create Store
          </h1>
          <form className='w-full' onSubmit={formSubmit}>
            <div className='mb-4 w-full'>
              <label htmlFor='storeName' className='w-full mb-3 ml-2'>
                Store name
              </label>
              <input
                type='text'
                name='storeName'
                value={formData.storeName}
                placeholder='Enter your store name'
                onChange={handleChange}
                className='w-full border border-brand-stroke rounded-lg p-3'
              />
            </div>

            <div className='w-full mb-4'>
              <label htmlFor='password' className='w-full mb-3 ml-2'>
                Store domain
              </label>
              <div className='w-full relative'>
                <input
                  type='text'
                  name='storeDomain'
                  value={formData.storeDomain}
                  placeholder='Your store name'
                  onChange={handleChange}
                  className='w-full border border-brand-stroke rounded-lg p-3'
                />
                <span className='absolute top-1/2 -translate-y-[50%] right-[12px] text-[14px] text-brand-gray'>
                  .myetti.store
                </span>
              </div>
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
            {message.text && (
              <p className={`${message.color} text-sm text-center`}>
                {message?.text}
              </p>
            )}
            <button
              type='submit'
              // onClick={() => handleClick("getStarted")}
              disabled={loading}
              className='w-full py-3 bg-brand-primary text-white font-normal rounded-lg hover:bg-brand-secondary transition-colors duration-500'
            >
              {loading ? 'Please wait...' : 'Create Store'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateStore;
