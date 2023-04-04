import React from 'react';
import { Security, Profile, BankInformation } from "./index";

const UserAccount = () => {
    const [currentPage, setCurrentPage] = React.useState(0);

    const handleClick = (value) => {
        setCurrentPage((prev) => {
            return prev = value;
        });
    }

    return (
        <div>
            <p className="text-2xl text-black-800 font-bold w-full mx-auto mb-1">User Account</p>
            
            <div className='w-full rounded-lg shadow-lg h-auto mt-3'>
                <div className='border-b-2 py-7 border-brand-primary h-20 w-full px-4 lg:px-10'>
                    <div className='flex w-full justity-between lg:w-1/2 md:w-2/3'>
                        <p 
                            onClick={() => handleClick(0)}
                            className={currentPage === 0 ? 'opacity-50 border-t-2 px-2 lg:px-6 py-3 text-sm lg:text-base hover:cursor-pointer border-l-2 border-b-white border-brand-primary border-r-2' : "lg:px-5 text-xs px-1 lg:text-lg py-3 hover:cursor-pointer opacity-50"}>
                            Profile
                        </p>
                        <p 
                            onClick={() => handleClick(1)}
                            className={currentPage === 1 ? 'opacity-50 border-t-2 px-2 lg:px-6 py-3 text-sm lg:text-base border-l-2 border-b-white hover:cursor-pointer border-brand-primary border-r-2' : "lg:px-5 px-1 text-xs lg:text-lg hover:cursor-pointer py-3 opacity-50"}>
                            Security
                        </p>
                        <p 
                            onClick={() => handleClick(2)}
                            className={currentPage === 2 ? 'opacity-50 border-t-2 px-2 lg:px-6 py-3 text-sm lg:text-base border-l-2 border-b-white hover:cursor-pointer border-brand-primary border-r-2' : "text-xs px-1 lg:text-lg lg:px-5 hover:cursor-pointer py-3 opacity-50"}>
                            Bank Information
                        </p>
                    </div>
                </div>

                {currentPage === 0 && <Profile/>}
                {currentPage === 1 && <Security/>}
                {currentPage === 2 && <BankInformation/>}
            </div>
        </div>
    ) 
}

export default UserAccount;