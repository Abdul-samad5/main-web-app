import { useState } from "react";

const CreateStore = ({ handleClick }) => {
  const [formData, setFormData] = useState({
    storeName: "",
    fullName: "",
    email: "",
    password: "",
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

  function formSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="max-w-[400px] w-full mx-auto mb-20">
      <h1 className="text-center text-[28px] mb-[40px] font-normal">Create Store</h1>
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
              @yetti.com
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
        <button className="w-full py-3 bg-brand-primary text-white font-normal rounded-lg hover:bg-brand-secondary transition-colors duration-500">
          Create store
        </button>
        <div className="w-full flex justify-between items-center mt-2">
          <p className="text-brand-gray font-normal text-[14px]">Already have an account?</p>
          <button
            className="text-brand-gray font-normal text-[14px]"
            type="button"
            onClick={() => handleClick("login")}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateStore;
