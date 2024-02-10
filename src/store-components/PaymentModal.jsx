import React, { useContext } from "react";
import { PaystackButton } from "react-paystack";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
const publicKey = import.meta.env.VITE_PK;

const PaymentModal = () => {
  const { getCartItemsTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const { storeName } = useContext(UserContext);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
  });

  const componentProps = {
    name: formData.name,
    email: formData.email,
    amount: getCartItemsTotal()[1] * 100,
    metadata: {
      name: formData.name,
      phone: formData.phone,
    },
    publicKey,
    text: "Proceed",
    onSuccess: () => {
      navigate(`/store-front/view-cart`);
      clearCart()
    },
    onClose: () => alert("Failed"),
  };

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  return (
    <>
      <div className="justify-center w-full items-center backdrop-filter backdrop-blur-xl flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative transition ease-in-out delay-150 w-auto w-[95%] px-2 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col px-2 w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <h1 className="flex justify-center text-[28px] my-[20px]  font-bolder">
              Checkout
            </h1>

            {/*body*/}
            <div className="max-w-[400px] w-full mx-auto my-[20px]">
              <form className="w-full" onSubmit={(e) => e.preventDefault()}>
                {/* <Modal /> */}
                <div className="mb-4 w-full">
                  <label htmlFor="name" className="w-full mb-3 ml-2">
                    Full name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="Enter your full name"
                    onChange={handleChange}
                    className="w-full border border-brand-stroke rounded-lg p-3"
                  />
                </div>
                <div className="mb-4 w-full">
                  <label htmlFor="email" className="w-full mb-3 ml-2">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    placeholder="Enter your Email address"
                    onChange={handleChange}
                    className="w-full border border-brand-stroke rounded-lg p-3"
                  />
                </div>
                <div className="mb-4 w-full">
                  <label htmlFor="storeName" className="w-full mb-3 ml-2">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    placeholder="Enter your Phone Number"
                    onChange={handleChange}
                    className="w-full border border-brand-stroke rounded-lg p-3"
                  />
                </div>

                <PaystackButton
                  {...componentProps}
                  className={`w-full py-3 bg-brand-primary text-white font-normal rounded-lg hover:bg-brand-secondary transition-colors duration-500`}
                />
              </form>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            </div>
          </div>
        </div>
      </div>

      <div className="opacity-25 fixed inset-0 z-45 bg-black"></div>
    </>
  );
};

export default PaymentModal;
