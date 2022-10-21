import React from 'react';
import {Security, Profile} from "./index";

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
                <div className='border-b-2 py-7 border-brand-primary h-20 w-full px-10'>
                    <div className='flex w-1/3'>
                        <p 
                            onClick={() => handleClick(0)}
                            className={currentPage === 0 ? 'opacity-50 border-t-2 px-6 py-3 hover:cursor-pointer border-l-2 border-b-white border-brand-primary border-r-2' : "px-5 py-3 hover:cursor-pointer opacity-50"}>
                            Profile
                        </p>
                        <p 
                            onClick={() => handleClick(1)}
                            className={currentPage === 1 ? 'opacity-50 border-t-2 px-6 py-3 border-l-2 border-b-white hover:cursor-pointer border-brand-primary border-r-2' : "px-5 hover:cursor-pointer py-3 opacity-50"}>
                            Security
                        </p>
                    </div>
                </div>

                {currentPage === 0 && <Profile/>}
                {currentPage === 1 && <Security/>}
            </div>
        </div>
    ) 
}

export default UserAccount;