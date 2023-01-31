import { useState } from "react";
import { postUser } from "../services/services";
import Modal from "./Modal";

const SignUp = ({ handleClick }) => {
  // Initialize state for submit button textContent
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [showButton, setShowButton] = useState(false);

  // Collect form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    accountType: "",
    agreeToTerms: false,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  async function formSubmit(e) {
    e.preventDefault();

    try {
      const res = await postUser(formData);
      console.log(res.data.message);
      if (!res.status === 201 || res.status === 200) return;

      if (formData.accountType === "seller") {
        setShowModal(true);
        setModalContent("Registration Successful! Please Check Your email");
        setTimeout(() => {
          setShowModal(false);
          handleClick("login");
        }, 5000);
      }
    } catch (err) {
      console.log(err);
    }
    setFormData({});
  }

  return (
    <div className="max-w-[400px] w-full mx-auto mb-20">
      {showModal && <Modal text={message} />}

      <h1 className="text-center text-[28px] mb-[15px] font-normal">
        Register
      </h1>

      <form className="w-full" onSubmit={formSubmit}>
        {/* <Modal /> */}
        <div className="mb-4 w-full">
          <label htmlFor="storeName" className="w-full mb-3 ml-2">
            Full name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            placeholder="Enter your full name"
            onChange={handleChange}
            className="w-full border border-brand-stroke rounded-lg p-3"
          />
        </div>
        <div className="mb-4 w-full">
          <label htmlFor="storeName" className="w-full mb-3 ml-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email address"
            onChange={handleChange}
            className="w-full border border-brand-stroke rounded-lg p-3"
          />
        </div>
        <div className="w-full mb-4">
          <label htmlFor="password" className="w-full mb-3 ml-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
            className="w-full border border-brand-stroke rounded-lg p-3"
          />
        </div>
        <div className="w-full mb-4">
          <label htmlFor="accountType" className="w-full mb-3 ml-2">
            Account Type
          </label>
          <select
            type="dropdown"
            name="accountType"
            value={formData.accountType}
            required
            onChange={handleChange}
            className="w-full border border-brand-stroke rounded-lg p-3"
          >
            <option value="">Please select</option>
            <option value="seller">Seller</option>
            <option value="buyer">Buyer</option>
          </select>
        </div>
        <div className="w-full mb-4 flex gap-2 items-center">
          <input
            type="checkbox"
            name="agreeToTerms"
            id="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
          />
          <label htmlFor="agreeToTerms">
            I agree to the{" "}
            <a href="/" className="text-brand-secondary">
              terms and conditions.
            </a>
          </label>
        </div>
        <button
          type="submit"
          // onClick={() => handleClick("getStarted")}
          className={`w-full py-3 bg-brand-primary text-white font-normal rounded-lg hover:bg-brand-secondary transition-colors duration-500`}
        >
          Register
        </button>
        <div className="w-full flex justify-between items-center mt-2">
          <p className="text-brand-gray font-normal text-[14px]">
            Already have an account?
          </p>
          <button
            className="text-brand-gray font-normal text-[14px]"
            type="button"
            onClick={() => handleClick("login")}
          >
            Login
          </button>
        </div>
      </form>
      {showModal && <Modal text={modalContent} s howButton={showButton} />}
    </div>
  );
};

export default SignUp;
