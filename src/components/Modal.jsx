import React from "react";

const Modal = ({ text }) => {
  return (
    <div
      id="defaultModal"
      //   tabIndex="-1"
      aria-hidden="true"
      className="fixed flex w-[50%] h-[200px] bg-zinc-100 md:w-full shadow justify-center align-center z-50 h-modal"
    >
      <div className="flex justify-center max-w-2xl md:h-auto">
        <h4>{text}</h4>
      </div>
    </div>
  );
};

export default Modal;
