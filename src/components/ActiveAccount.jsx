import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../services/services";
import Modal from "./Modal";
import { logo_2 } from "../assets";
import { useNavigate } from "react-router-dom";

const ActiveAccount = ({ handleClick }) => {
  const [formData, setFormData] = useState({
    token: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(() => {
      return {
        [name]: value,
      };
    });
  }

  async function formSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.get(`${BASE_URL}auth/activate-account/${formData.token}`);
      if (!res.statusText === 'OK') return;
      console.log(res);
      
      setShowModal(true);
      setModalContent("Your account has been activated. Please proceed to login...");
      setTimeout(() => {
        setShowModal(false);
        navigate("/login");
      }, 3000);
      
    } catch(error) {
      console.log(error);
      setShowModal(true);
      setModalText(error.response.data.message);
      setTimeout(() => {
        setShowModal(false);
      }, 3000);

    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className='w-full px-[15px] mt-6 lg:w-[80%] mx-auto relative pt-[80px]'>
        <div className='py-5 absolute top-0 sm[320px]:hidden left-5 lg:-left-[100px]'>
          <a href='/' className='w-[50px] block'>
            <img src={logo_2} alt='Yetti Logo' />
          </a>
        </div>
        <div className="max-w-[400px] w-full mx-auto mt-10">
          <h1 className="text-center text-[28px] mb-[40px] font-normal">
            Activate account
          </h1>
          <form className="w-full" onSubmit={formSubmit}>
            <div className="mb-4 w-full">
              <label htmlFor="email" className="w-full mb-3 ml-2">
                Token
              </label>
              <input
                type="text"
                name="token"
                value={formData.token}
                placeholder="Enter your email address"
                onChange={handleChange}
                className="w-full border border-brand-stroke rounded-lg p-3"
              />
            </div>
            <p className="text-brand-gray text-[12px] font-normal leading-[1.5] mb-10">
              A code/token has been sent to your email address. Enter it above to enable the activation of your account.
            </p>
            <button type="submit" className="w-full py-3 bg-brand-primary text-white font-normal rounded-lg hover:bg-brand-secondary transition-colors duration-500">
              {loading ? "Processing..." : "Activate account"}
            </button>
            {/* <div className="w-full flex justify-between items-center mt-2">
              <button
                type="button"
                className="text-brand-gray font-normal text-[14px] cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Back to Login
              </button>
              <button
                className="text-brand-gray font-normal text-[14px] cursor-pointer"
                type="button"
                onClick={() => navigate("/signUp")}
              >
                Sign Up
              </button>
            </div> */}
          </form>
        </div>
        {showModal && <Modal text={modalContent} showModal={showModal} />}
      </div>
    </>
  );
};

export default ActiveAccount;
