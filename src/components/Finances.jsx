import React, {useState} from 'react';
import Invoice from './Invoice';

const Finances = () => {
    const [currentPage, setCurrentPage] = React.useState(0);

    const handleClick = (value) => {
        setCurrentPage((prev) => {
            return prev = value;
        });
    }

    return (
        <div>
            <p className="text-2xl text-black-800 font-bold w-full mx-auto mb-1">Finances</p>
            <p className='text-sm opacity-50'>Create and schedule your invoices, quotes, and payments.</p>

            <div className='w-full rounded-lg shadow-lg h-auto mt-3'>
                <div className='border-b-2 py-7 border-brand-primary h-20 w-full px-10'>
                    <div className='flex justify-between w-1/4'>
                        <p 
                            onClick={() => handleClick(0)}
                            className={currentPage === 0 ? 'opacity-50 border-t-2 px-4 py-3 hover:cursor-pointer border-l-2 border-b-white border-brand-primary border-r-2' : "px-4 py-3 hover:cursor-pointer opacity-50"}>
                            Payment
                        </p>
                        <p 
                            onClick={() => handleClick(1)}
                            className={currentPage === 1 ? 'opacity-50 border-t-2 px-4 py-3 border-l-2 border-b-white hover:cursor-pointer border-brand-primary border-r-2' : "px-4 hover:cursor-pointer py-3 opacity-50"}>
                            Invoice
                        </p>
                        {/* <p 
                            onClick={() => handleClick(2)}
                            className={currentPage === 2 ? 'opacity-50 border-t-2 px-4 py-3 border-l-2 border-b-white border-brand-primary hover:cursor-pointer border-r-2' : "px-4 hover:cursor-pointer py-3 opacity-50"}>
                            Payments
                        </p> */}
                    </div>
                </div>

                {currentPage === 0 && <Invoice/>}
                {currentPage === 1 && <Invoice/>}
                {/* {currentPage === 2 && <Invoice/>} */}
            </div>
        </div>
    ) 
}

export default Finances;