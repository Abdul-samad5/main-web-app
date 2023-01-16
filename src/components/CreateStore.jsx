import { useState, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "../services/services";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const CreateStore = ({ handleClick }) => {
  // Initialize state for submit button textContent
  const [message, setMessage] = useState({ text: true });

  const { userData } = useContext(UserContext);
  const navigate = useNavigate();

  function changeMessage(status) {
    if (status) {
      setMessage({
        color: "text-brand-secondary",
        text: "Submitting...",
      });
    }
    if (status === 200 || status === 201) {
      setMessage({
        color: "text-green-500",
        text: "Registration successful!",
      });
    }
    if (status >= 400) {
      setMessage({
        color: "text-red-500",
        text: "Registration Failed!",
      });
    }
  }

  // const { userData, onUserLogin } = useContext(UserContext);
  // Collect form data
  const [formData, setFormData] = useState({
    storeName: "",
    storeDomain: "",
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
    const store = {
      store_name: formData.storeName,
      store_domain: formData.storeDomain,
    };

    changeMessage(true);
    const config = {
      headers: { Authorization: `Bearer ${userData}` },
      "Content-Type": "application/json",
    };

    try {
      const res = await axios.post(
        `${BASE_URL}store/create_store`,
        store,
        config
      );
      changeMessage(res.status);
      console.log(res);

      if (res.status === 201 || res.status === 200) {
        navigate("/dashboard");
        return;
      }
    } catch (err) {
      changeMessage(err.response.status);
      if (err.response.data.message.includes("exists")) {
        alert("Store already exists, Please choose a different name");
      }
    }
  }

  return (
    <div className="max-w-[400px] w-full mx-auto mb-20">
      <h1 className="text-center text-[28px] mb-[15px] font-normal">
        Create Store
      </h1>
      <form className="w-full" onSubmit={formSubmit}>
        <div className="mb-4 w-full">
          <label htmlFor="storeName" className="w-full mb-3 ml-2">
            Store name
          </label>
          <input
            type="text"
            name="storeName"
            value={formData.storeName}
            placeholder="Enter your store name"
            onChange={handleChange}
            className="w-full border border-brand-stroke rounded-lg p-3"
          />
        </div>

        <div className="w-full mb-4">
          <label htmlFor="password" className="w-full mb-3 ml-2">
            Store domain
          </label>
          <div className="w-full relative">
            <input
              type="text"
              name="storeDomain"
              value={formData.storeDomain}
              placeholder="Your store name"
              onChange={handleChange}
              className="w-full border border-brand-stroke rounded-lg p-3"
            />
            <span className="absolute top-1/2 -translate-y-[50%] right-[12px] text-[14px] text-brand-gray">
              .myetti.co
            </span>
          </div>
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
        {message.text && (
          <p className={`${message.color} text-sm text-center`}>
            {message?.text}
          </p>
        )}
        <button
          type="submit"
          // onClick={() => handleClick("getStarted")}
          className="w-full py-3 bg-brand-primary text-white font-normal rounded-lg hover:bg-brand-secondary transition-colors duration-500"
        >
          Create Store
        </button>
      </form>
    </div>
  );
};

export default CreateStore;
