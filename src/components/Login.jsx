import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { styles } from "../constants";
import { userLogin } from "../services/services";
import Modal from "./Modal";
import { logo_2 } from "../assets";

const Login = ({ handleClick }) => {
  // Initialize state for the login to enable user login
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
    }
    if (status >= 400) {
      setModalContent(
        "There might be a problem with your Internet Connection! Please try again"
      );
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
    const user = {
      email: formData.email,
      password: formData.password,
    };
    e.preventDefault();
    setLoading(true);
    try {
      const response = await userLogin(user);
      console.log(response);
      if (!response.statusText === "OK") return;

      if (response) {
        const token = response.data.data.access;

        const email = response.data.data.user.email;
        const user_id = response.data.data.user.user_id;
        const has_store = response.data.data.user.has_store;
        onUserLogin(token, email, user_id);

        if (has_store === false) {
          changeMessage(response.status);
          setShowModal(true);
          setTimeout(() => {
            setShowModal(false);
          }, 3000);
          handleClick("createStore");
        } else {
          changeMessage(response.status);
          setShowModal(true);
          setTimeout(() => {
            setShowModal(false);
          }, 3000);
            navigate("/dashboard");
        }
      }
    } catch (err) {
      setLoading(false);
      changeMessage(err.response.status);
      console.log(err);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    }
  }

  return (
    <div className="w-full px-[15px] lg:w-[80%] mx-auto relative pt-[80px] ">
      <div className="py-5 absolute top-0 sm[320px]:hidden left-5 lg:-left-[100px]">
          <a href="/" className="w-[50px] block">
            <img src={logo_2} alt="Yetti Logo" />
          </a>
      </div>
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
          <button
            className={`${styles.button}`}
            disabled={loading ? true : false}
          >
            {loading && (
              <svg className="animate-spin spin h-5 w-5 mr-3" viewBox="0 0 50 50">
                <circle
                  className="path"
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  strokeWidth="5"
                ></circle>
              </svg>
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
            <Link to="/register">
              <button
                className="text-brand-gray font-normal text-[14px]"
                type="button">
                Register
              </button>
            </Link>
          </div>
        </form>
        {showModal && <Modal text={modalContent} showButton={showButton} />}
      </div>
    </div>
  );
};

export default Login;
