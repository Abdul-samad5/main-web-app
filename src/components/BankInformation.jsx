import React, { useState } from 'react';
import { useEffect } from 'react';
import { styles } from '../constants';
import { BASE_URL } from '../services/services';
import axios from 'axios';
import Cookies from 'js-cookie';
import Modal from './Modal';

const BankInformation = () => {
  const [acctDetails, setAcctDetails] = useState(null);
  const [formDetails, setFormDetails] = useState({
    bankName: '',
    accoutNumber: 0,
    accountName: '',
  });
  const tk = Cookies.get('_tksr');
  // const { userData } = useContext(UserContext);
  const [added, setAdded] = useState(false);
  const [banks, setBanks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [showButton, setShowButton] = useState(null);

  function changeMessage(status) {
    if (status === 200 || status === 201) {
      setModalContent('Bank Information saved!');
    }
    if (status === 401) {
      setModalContent('Incorrect!');
    }
    if (status >= 400) {
      setModalContent(
        'There might be a problem with your Internet Connection! Please try again'
      );
    }
  }

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formDetails.accoutNumber.toString().length !== 10) {
      window.alert('Enter a valid account number!');
      return;
    }

    const data = {
      bank_name: formDetails.bankName,
      account_number: formDetails.accoutNumber,
      account_name: formDetails.accountName,
    };

    try {
      const res = await axios.post(
        `${BASE_URL}store_settings/bank_info/`,
        data,
        {
          headers: { Authorization: `Bearer ${tk}` },
        }
      );
      console.log(res);
      setAdded(false);
      setFormDetails({
        bankName: '',
        accoutNumber: '',
        accountName: '',
      });
      changeMessage(res.status);

      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 1000);
      if (!res.statusText === 'OK') return;
    } catch (error) {
      console.log(error);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 1000);
    }
  };

  async function fetchBankDetails() {
    try {
      // const res = await axios.get(`${BASE_URL}store_settings/bank_info/list`, {
      //     headers: { Authorization: `Bearer ${userData.access}` },
      // });
      const res = await axios.get(`${BASE_URL}store_settings/bank_info/list`, {
        headers: { Authorization: `Bearer ${tk}` },
      });
      console.log(res);
      setAcctDetails(res.data.data);
      if (!res.statusText === 'OK') return;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    axios
      .get(
        'https://raw.githubusercontent.com/tomiiide/nigerian-banks/master/banks.json'
      )
      .then((res) => {
        console.log(res);
        setBanks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchBankDetails();
  }, [added]);

  const handleDelete = async (id) => {
    try {
      // const res = await axios.delete(`${BASE_URL}store_settings/bank_info/delete/${id}`, {
      //     headers: { Authorization: `Bearer ${userData.access}` },
      // });
      const res = await axios.delete(
        `${BASE_URL}store_settings/bank_info/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${tk}` },
        }
      );
      console.log(res);
      // setAdded(false);
      setFormDetails({
        bankName: '',
        accoutNumber: '',
        accountName: '',
      });
      setAcctDetails(null);
      if (!res.statusText === 'OK') return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='px-10 py-10'>
      <button
        className={`${styles.button} w-auto float-right`}
        onClick={() => setAdded(!added)}
      >
        <p className='text-white text-xs w-auto'>New account</p>
      </button>
      <div className='py-20'>
        <div className='flex justify-between px-4 py-4 bg-gray-100 border-b border-black'>
          <p className='font-semibold text-lg text-black'>Bank name</p>
          <p className='font-semibold text-lg text-black'>Account number</p>
          <p className='font-semibold text-lg text-black'>Account name</p>
          <p className='font-semibold text-lg text-black invisible'>Action</p>
        </div>
        <div
          className={
            acctDetails === null ? 'hidden' : 'flex justify-between px-4 py-4'
          }
        >
          <p className='text-base text-black opacity-70'>
            {acctDetails?.bank_name}
          </p>
          <p className='text-base text-black opacity-70'>
            {acctDetails?.account_number}
          </p>
          <p className='text-base text-black opacity-70 relative left-8'>
            {acctDetails?.account_name}
          </p>
          <div
            className='my-auto flex hover:cursor-pointer group'
            onClick={() => handleDelete(acctDetails?.id)}
          >
            <p className='text-xs mx-2 group-hover:text-brand-secondary'>
              Delete bank details
            </p>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-3 h-3 group-hover:fill-brand-secondary fill-brand-primary hover:fill-brand-secondary'
              viewBox='0 0 448 512'
            >
              <path d='M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z' />
            </svg>
          </div>
        </div>
      </div>

      <div
        className={
          added
            ? 'h-full grid overflow-hidden place-content-center w-full top-0 right-0 left-0 bottom-0 z-30 outline-none fixed'
            : ' -translate-x-full hidden'
        }
      >
        <div className='mx-auto bg-white shadow-lg rounded lg:w-3/4 w-11/12 lg:h-[auto] h-auto py-7'>
          <div className='border-b border-gray-300 px-6 py-3 flex justify-between'>
            <h2 className='text-xl my-auto text-black opacity-60'>
              Add account details
            </h2>

            <div
              className='hover:cursor-pointer my-auto'
              onClick={() => setAdded(false)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-5 h-5 fill-gray-400 hover:fill-black'
                viewBox='0 0 320 512'
              >
                <path d='M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z' />
              </svg>
            </div>
          </div>

          <form onSubmit={handleSubmit} className='px-6 py-8'>
            <div className='my-4'>
              <label
                htmlFor='bankName'
                className='text-base text-black opacity-60 mb-3'
              >
                Bank Name
              </label>
              <select
                className={`${styles.inputBox} w-full`}
                name='bankName'
                id='bankName'
                onChange={handleChange}
              >
                <option disabled>Choose an option</option>
                {banks.map((bank, index) => {
                  return (
                    <option key={index} value={bank.name}>
                      {bank.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='my-6 lg:flex w-full'>
              <div className='lg:w-1/2 w-full lg:mr-2'>
                <label
                  htmlFor=''
                  className='text-base text-black opacity-60 mb-3'
                >
                  Account Number
                </label>
                <input
                  type='number'
                  onChange={handleChange}
                  maxLength='10'
                  minLength={'10'}
                  value={formDetails.accoutNumber}
                  placeholder='0123456789'
                  name='accoutNumber'
                  className={`${styles.inputBox} w-full px-3`}
                />
              </div>
              <div className='lg:w-1/2 w-full lg:ml-2'>
                <label
                  htmlFor=''
                  className='text-base text-black opacity-60 mb-3'
                >
                  Account Name
                </label>
                <input
                  type='text'
                  onChange={handleChange}
                  value={formDetails.accountName}
                  placeholder='Account name'
                  name='accountName'
                  className={`${styles.inputBox} w-full px-3`}
                />
              </div>
            </div>

            <button className={`${styles.button} w-auto`} type='submit'>
              Add bank account
            </button>
          </form>
        </div>
      </div>
      {showModal && <Modal text={modalContent} showButton={showButton} />}
    </div>
  );
};

export default BankInformation;
