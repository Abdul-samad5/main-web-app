import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../services/services";
import Modal from "./Modal";

const ResetPassword = ({ handleClick }) => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [loading, setLoading] = useState(false);

  // const tk = Cookies.get

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
      const res = await axios.post(`${BASE_URL}auth/reset-password/${formData.email}`);
      if (!res.statusText === 'OK') return;
      console.log(res);
      
      setShowModal(true);
      setModalContent("A mail has been sent to your email. Check your email to reset password.");
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
      
    } catch(error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="max-w-[400px] w-full mx-auto">
        <h1 className="text-center text-[28px] mb-[40px] font-normal">
          Reset Password
        </h1>
        <form className="w-full" onSubmit={formSubmit}>
          <div className="mb-4 w-full">
            <label htmlFor="email" className="w-full mb-3 ml-2">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={formData.value}
              placeholder="Enter your email address"
              onChange={handleChange}
              className="w-full border border-brand-stroke rounded-lg p-3"
            />
          </div>
          <p className="text-brand-gray text-[12px] font-normal leading-[1.5] mb-10">
            A link with a code will be sent to the email provided above to enable
            a password reset.
          </p>
          <button type="submit" className="w-full py-3 bg-brand-primary text-white font-normal rounded-lg hover:bg-brand-secondary transition-colors duration-500">
            {loading ? "Processing..." : "Get password reset link"}
          </button>
          <div className="w-full flex justify-between items-center mt-2">
            <button
              type="button"
              className="text-brand-gray font-normal text-[14px]"
              onClick={() => handleClick("login")}
            >
              Back to Login
            </button>
            <button
              className="text-brand-gray font-normal text-[14px]"
              type="button"
              onClick={() => handleClick("signUp")}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
      {showModal && <Modal text={modalContent} showModal={showModal} />}
    </>
    
  );
};

export default ResetPassword;
