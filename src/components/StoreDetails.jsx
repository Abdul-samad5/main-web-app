import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { styles } from '../constants/index';
import { BASE_URL, updateStore, getStoreInfo } from '../services/services';
import Cookies from 'js-cookie';
import Modal from './Modal';

const StoreDetails = () => {
  const [storeDetails, setStoreDetails] = useState({
    storeName: '',
    tagLine: '',
    storeDesc: '',
    storeLogo: '',
    storeCurrency: 'Naira',
    storeEmail: '',
    storeContactNumber: '',
  });
  let storeId;
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const tk = Cookies.get('_tksr');
  const id = Cookies.get('_id');

  function changeMessage(status) {
    if (status === 200 || status === 201) {
      setModalContent('Settings saved!');
    }
    if (status === 401) {
      setModalContent('Email or Password Incorrect!');
    }
    if (status >= 400) {
      setModalContent(
        'There might be a problem with your Internet Connection! Please try again'
      );
    }
  }

  const saveSettings = async () => {
    let formDetails = {
      store_name: storeDetails.storeName,
      tag_line: storeDetails.tagLine,
      store_description: storeDetails.storeDesc,
      store_logo: storeDetails.storeLogo,
      store_currency: storeDetails.storeCurrency,
      store_email: storeDetails.storeEmail,
      store_phone_number: storeDetails.storeContactNumber,
    };

    setLoading(true);

    try {
      // const res = await axios.patch(
      //   `${BASE_URL}store_settings/store/update/`,
      //   formDetails,
      //   { headers: { Authorization: `Bearer ${tk}` } }
      // );

      const res = await axios.post(
        `${BASE_URL}store_settings/store`,
        formDetails,
        { headers: { Authorization: `Bearer ${tk}` } }
      );
      // console.log(storeId);
      // if (storeId) {
      //   res = await axios.put(
      //     `${BASE_URL}store_settings/store/update/`,
      //     formDetails,
      //     { headers: { Authorization: `Bearer ${tk}` } }
      //   );
      //   console.log(storeId);
      // } else {
      //   res = await axios.post(`${BASE_URL}store_settings/store`, formDetails, {
      //     headers: { Authorization: `Bearer ${tk}` },
      //   });
      // }

      // if (res.response.data.code === 'user_inactive') {
      //   setModalContent(res.response.data.details);
      // }

      if (!res.statusText === 'OK') return;

      setShowModal(true);
      setModalContent("Details Saved");
      setTimeout(() => {
        setShowModal(false);
      }, 2000);

      makeEmpty();

    } catch (error) {
      console.log(error);

      setShowModal(true);
      setModalContent(error.response.data.message);
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
      
    } finally {
      setLoading(false);
    }
  };

  function makeEmpty() {
    setStoreDetails((prev) => {
      return {
        ...prev,
        store_name: '',
        tag_line: '',
        store_description: '',
        store_logo: '',
        store_currency: 'Naira',
        store_email: '',
        store_phone_number: '',
      };
    });
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setStoreDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSelectedImage = (event) => {
    const file = event.target.files[0];
    const formInfo = new FormData();
    formInfo.append('file', file);
    formInfo.append('upload_preset', 'images');

    async function uploadImg() {
      try {
        const res = await axios.post(
          'https://api.Cloudinary.com/v1_1/doqnvybu5/upload',
          formInfo
        );
        if (!res) {
          setLoading(true);
          return;
        } else {
          setLoading(false);
          const imageUri = res.data.secure_url;
          setStoreDetails((prev) => {
            return {
              ...prev,
              storeLogo: imageUri,
            };
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    uploadImg();
  };

  function handleSubmit(event) {
    event.preventDefault();
    saveSettings();
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${BASE_URL}store_settings/store_details`,
          { headers: { Authorization: `Bearer ${tk}` } }
        );
        if (response) {
          const data = response.data.data;
          // const store_name = response.data["Store Details"].length === 0 ? "" : response.data["Store Details"][0].store_name;
          // const store_email = response.data["Email"];
          setStoreDetails((prev) => {
            return {
              ...prev,
              storeName: data.store_name,
              storeEmail: data.store_email,
              tagLine: data.tag_line,
              storeDesc: data.store_description,
              storeLogo: data.store_logo,
              storeCurrency: 'Naira',
              storeContactNumber: data.store_phone_number,
            };
          });
          storeId = data.id;
          console.log(storeId);
        }
        // console.log(response);
        if (!response.statusText === 'OK') return;
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="mt-6">
      <p className={`${styles.componentHeader}`}>Store Settings</p>
      <div className='overflow-hidden w-full shadow-2xl flex align-center justify-center'>
        <form
          className='rounded shadow-2xl w-full lg:pl-10 px-3 lg:pr-3 py-3 mx-auto my-auto h-auto'
          onSubmit={handleSubmit}
        >
          <p className='text-sm text-brand-primary'>Store details</p>

          <div className='my-5 lg:flex lg:jusfity-between'>
            <span className='lg:w-1/2 block w-full lg:my-0 my-4'>
              <p className='mb-1'>Store name</p>
              <input
                placeholder='Michelline'
                onChange={handleChange}
                value={storeDetails.storeName}
                className={`${styles.inputBox} px-3 lg:w-11/12 w-full`}
                type='text'
                name='storeName'
              />
            </span>

            <span className='lg:w-1/2 w-full block lg:my-0 my-4'>
              <p className='mb-1'>Tag line</p>
              <input
                className={`${styles.inputBox} px-3 lg:w-11/12 w-full`}
                onChange={handleChange}
                value={storeDetails.tagLine}
                type='text'
                name='tagLine'
              />
            </span>
          </div>

          <div className='my-6 lg:flex lg:jusfity-between'>
            <span className='lg:w-1/2 w-full block'>
              <p className='mb-1'>Short description</p>
              <textarea
                placeholder='Enter your business description here...'
                maxLength='100'
                className='border border-slate-200 rounded-lg lg:w-11/12 w-full px-5 py-3 h-40 resize-none placeholder-slate-300'
                name='storeDesc'
                value={storeDetails.storeDesc}
                onChange={handleChange}
              />

              <div className='relative flex left-3/4 bottom-10'>
                <span className='text-xs text-slate-300'>
                  {storeDetails.storeDesc === null
                    ? 0
                    : storeDetails.storeDesc?.length}
                </span>
                <span className='text-xs text-slate-300'>/100</span>
              </div>
            </span>

            <span className='lg:w-1/2 w-full'>
              <p className='mb-1'>Store logo</p>
              <input
                type='file'
                id='image-selector'
                className='invisible hidden'
                accept='image/*'
                onChange={handleSelectedImage}
              ></input>
              <label
                htmlFor='image-selector'
                className={
                  storeDetails.storeLogo === '' ||
                  storeDetails.storeLogo === null
                    ? 'border border-dotted border-slate-300 text-slate-300 h-40 pt-16 block lg:w-11/12 w-full text-center rounded-lg text-sm'
                    : 'hidden'
                }
              >
                Choose Image
              </label>

              <img
                src={storeDetails.storeLogo}
                className={
                  storeDetails.storeLogo === '' ||
                  storeDetails.storeLogo === null
                    ? 'hidden'
                    : 'border border-dotted border-slate-300 text-slate-300 h-40 block lg:w-11/12 w-full text-center rounded-lg text-sm'
                }
              />
            </span>
          </div>

          <div className='lg:flex lg:justify-between my-6'>
            <span className='lg:w-1/3 w-full block lg:my-0 my-3'>
              <p className='mb-1'>Store currency</p>
              {/* <select
                name="storeCurrency"
                className={`${styles.inputBox} px-3 w-11/12`}
                value={storeDetails.storeCurrency}
                onChange={handleChange}
              >
                <option>Nigerian naira</option>
              </select> */}
              <input
                // placeholder="Nigerian"
                onChange={handleChange}
                disabled={true}
                value={storeDetails.storeCurrency}
                className={`${styles.inputBox} px-3 lg:w-11/12 w-full`}
                type='text'
                name='storeCurrency'
              />
            </span>

            <span className='lg:w-1/3 w-full block lg:my-0 my-3'>
              <p className='mb-1'>Store email</p>
              <input
                placeholder='Enter store email'
                name='storeEmail'
                className={`${styles.inputBox} px-3 lg:w-11/12 w-full`}
                value={storeDetails.storeEmail}
                onChange={handleChange}
                type='text'
              />
            </span>

            <span className='lg:w-1/3 w-full block lg:my-0 my-3'>
              <p className='mb-1'>Store contact number</p>
              <input
                placeholder='Enter store contact number'
                name='storeContactNumber'
                className={`${styles.inputBox} px-3 lg:w-11/12 w-full`}
                type='text'
                value={storeDetails.storeContactNumber}
                onChange={handleChange}
              />
            </span>
          </div>

          <div className='w-full flex justify-center mx-auto'>
            <button type='submit' className={`${styles.button} lg:w-11/12 w-full ${loading ? "disabled:bg-gray disabled:cursor-not-allowed" : ""}`} disabled={loading}>
              {loading ? "Saving..." : "Save settings"}
            </button>
          </div>
        </form>
        {showModal && <Modal text={modalContent} showModal={showModal} />}
      </div>
    </div>
  );
};

export default StoreDetails;
