import React from "react";
import { PaystackButton } from "react-paystack";

const PaymentModal = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
  });

  const componentProps = {
    name: formData.name,
    email: formData.email,
    amount: "50000",
    metadata: {
      name: formData.name,
      phone: formData.phone,
    },
    text: "Proceed",
    onSuccess: () => alert("Thanks for paying"),
    onClose: () => alert("Failed"),
  };
  function handleChange(e) {
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
      <div className="justify-center items-center backdrop-filter backdrop-blur-xl flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative transition ease-in-out delay-150 w-auto w-[80%] mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg  shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              {/* <h3 className="text-2xl text-center text-red-800 font-bold">
                
              </h3> */}
              <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="max-w-[400px] w-full mx-auto mb-20">
              <h1 className="text-center text-[28px] mb-[15px] font-normal">
                Checkout
              </h1>

              <form className="w-full">
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

                <button
                  type="submit"
                  // onClick={() => handleClick("getStarted")}
                  className={`w-full py-3 bg-brand-primary text-white font-normal rounded-lg hover:bg-brand-secondary transition-colors duration-500`}
                >
                  {<PaystackButton {...componentProps} />}
                </button>
              </form>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              {/* <button
                  className={`${styles.button} w-[100px]`}
                  type="button"
                  onClick={() => setOpen(null)}
                >
                  Close
                </button> */}
            </div>
          </div>
        </div>
      </div>

      <div className="opacity-25 fixed inset-0 z-45 bg-black"></div>
    </>
  );
};

export default PaymentModal;
