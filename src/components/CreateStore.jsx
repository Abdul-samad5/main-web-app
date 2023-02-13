import { useState, useContext } from "react";
import axios from "axios";
import { BASE_URL, postStore } from "../services/services";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const CreateStore = ({ handleClick }) => {
  // Initialize state for submit button textContent
  const [message, setMessage] = useState({ text: true });
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalText, setModalText] = useState(null);

  const { userData } = useContext(UserContext);
  const navigate = useNavigate();

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
      store_domain: "https://" + formData.storeDomain + ".myyetti.store",
    };

    try {
      setLoading(true);
      const res = await postStore(store);
      changeMessage(res.status);

      if (res.status === 201) {
        setLoading(false);
        setShowModal(true);
        setModalText("Store Created successfully");
        setTimeout(() => {
          setShowModal(false);
          navigate("dashboard");
        }, 3000);
      }
    } catch (err) {
      setLoading(false);
      if (err.code === "ERR_NETWORK") {
        setLoading(false);
        setShowModal(true);
        setModalText("There might be a problem with your network connection!");
      } else if (err.response.status === 401) {
        setLoading(false);
        setShowModal(true);
        setModalText("Invalid request");
      }
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
      console.log(err);
    }
  }

  return (
    <div className="max-w-[400px] w-full mx-auto mb-20">
      {showModal && <Modal text={modalText} showModal={showModal} />}
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
              .myetti.store
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
          disabled={loading}
          className="w-full py-3 bg-brand-primary text-white font-normal rounded-lg hover:bg-brand-secondary transition-colors duration-500"
        >
          {loading ? "Please wait..." : "Create Store"}
        </button>
      </form>
    </div>
  );
};

export default CreateStore;
