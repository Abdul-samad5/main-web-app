import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { UserContext } from "../context/UserContext";
import { styles } from "../constants";
import { userLogin } from "../services/services";
import Modal from "./Modal";

const Login = ({ handleClick }) => {
  // Initialize state for the login to enable user login
  const { userLoggedIn } = useContext(LoginContext);
  const { onUserLogin } = useContext(UserContext);

  const [message, setMessage] = useState({ text: true });
  const [loading, setLoading] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  function changeMessage(status) {
    if (status === 200 || status === 201) {
      setModalContent("Login Successful! Please wait");
    }
    if (status === 401) {
      setModalContent("Email or Password Incorrect!");
      return;
    }
    if (status >= 400) {
      setModalContent(
        "There might be a problem with your Internet Connection! Please try again"
      );
      return;
    }
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
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
    changeMessage(true);
    setLoading(true);
    try {
      const response = await userLogin(formData);

      const token = response.data.data.access;
      setLoading(false);
      onUserLogin(token);
      navigate("dashboard");
    } catch (err) {
      changeMessage(err.response.status);
      console.log(err);
      setShowModal(true);
      // setTimeout(() => {
      //   setShowModal(false);
      // }, 2000);
      setLoading(false);
    }
  }

  return (
    <div className="max-w-[400px] w-full mx-auto">
      <h1 className="text-center text-[28px] mb-[40px] font-normal">
        Login to your account
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
        <div className="w-full mb-4">
          <label htmlFor="password" className="w-full mb-3 ml-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.value}
            placeholder="Enter password"
            onChange={handleChange}
            className="w-full border border-brand-stroke rounded-lg p-3"
          />
        </div>
        <div className="w-full mb-4 flex gap-2 items-center">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            checked={formData.remember}
            onChange={handleChange}
          />
          <label htmlFor="remember">Remember me</label>
        </div>
        {message.text && (
          <p className={`${message.color} text-sm text-center`}>
            {message?.text}
          </p>
        )}
        <button className={`${styles.button}`}>
          {loading && (
            <svg
              className="animate-spin h-5 w-5 mr-3"
              viewBox="0 0 24 24"
            ></svg>
          )}
          {loading ? "Processing..." : "Login to account"}
        </button>
        <div className="w-full flex justify-between items-center mt-2">
          <button
            type="button"
            className="text-brand-gray font-normal text-[14px]"
            onClick={() => handleClick("forgotPassword")}
          >
            Forgot password?
          </button>
          <button
            className="text-brand-gray font-normal text-[14px]"
            type="button"
            onClick={() => handleClick("signUp")}
          >
            Register
          </button>
        </div>
      </form>
      {showModal && <Modal text={modalContent} showButton={showButton} />}
    </div>
  );
};

export default Login;
