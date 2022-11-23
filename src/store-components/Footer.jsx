import React from 'react';
// import Logo from "../assets/images/logo.png";
// import mastercard from "../assets/images/mastercard.png";
// import verve from "../assets/images/verve.png";

const Footer = () => {
  return (
    <div className='lg:flex justify-between px-10 lg:px-20 bg-gray-100 py-6'>
        <div className='flex items-center justify-center'>
            {/* <img src={Logo} alt="" className='w-6 h-6 my-auto mr-4' /> */}
            <span className='flex my-auto'>
                <p className='text-sm text-black my-auto'>©2022.</p>
                <a className='text-sm no-underline text-black my-auto hover:text-brand-primary ml-1' href="#">  Get a free online store on Yetti!</a>
            </span>
        </div>

        <div className='flex lg:mx-0 mx-auto mt-4 lg:mt-0 items-center justify-center'>
            {/* <img src={mastercard} alt="" className='w-14 h-10'/>
            <img src={verve} alt="" className='w-14 ml-4 h-10'/> */}
        </div>
    </div>
  )
}

export default Footer;