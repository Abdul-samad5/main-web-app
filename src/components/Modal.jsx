import React from "react";
import { useState } from "react";
import { styles } from "../constants";

const Modal = ({ text, showModal }) => {
  const [open, setOpen] = useState(showModal);
  return (
    <>
      {
        open && (
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
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-center text-lg leading-relaxed">
                    {text}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className={`${styles.button} w-[100px]`}
                    type="button"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

        // <div className="opacity-5 fixed inset-0 z-40 bg-black"></div>
      }
    </>
  );
};

export default Modal;
