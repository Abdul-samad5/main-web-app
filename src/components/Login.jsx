import { useState, useContext, Link } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { styles } from "../constants";
import { userLogin } from "../services/services";

const Login = ({ handleClick }) => {
  // Initialize state for the login to enable user login
  const { isLoggedIn, userLoggedIn, userLoggedOut } = useContext(LoginContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const navigate = useNavigate();

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

    let user = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const res = await userLogin(user);

      if (!res.statusText === "OK") return;
      userLoggedIn();
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
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
        <button className={`${styles.button} w-full`}>Login to store</button>
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
            onClick={() => handleClick("createStore")}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
