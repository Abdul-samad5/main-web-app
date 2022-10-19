import React, {useState} from 'react';
import {styles} from '../constants/index';
import { noCollections, naira} from '../assets';

const Finances = () => {
    const [currentPage, setCurrentPage] = React.useState(0);

    const handleClick = (value) => {
        setCurrentPage((prev) => {
            return prev = value;
        });
    }

    const [invoiceDetails, setInvoiceDetails] = useState({
        logo: ""
    });

    const Invoice = () => {
        const [getStarted, setGetStarted] = useState(false);
        const [sectionToggled, setSectionToggled] = useState({
            header: true,
            businessDetails: false,
            invoice: false,
            footer: false
        });

        const handleToggle = (value) => {
            setSectionToggled(prev => {
                return {...prev, [value] : !prev[value]}
            });
        };

        const selectImage = (event) => {
            let files = event.target.files;
            let arrayFiles = Array.from(files);

            const imageURL = URL.createObjectURL(arrayFiles[0]);

            setInvoiceDetails(() => {
                return {...prev, logo: imageURL}
            });
        }

        return (
            <div className='py-5'>
                <div className={getStarted ? "" : "hidden"}>
                    <img src={noCollections} alt="" className='mx-auto'/>
                    <p className='text-base text-black text-center'>Start creating invoices for your customers now.</p>
                    <p className='text-sm opacity-50 text-center'>
                        Improve customers' engagement and experience for your products whilst managing and tracking some.
                    </p>
                    <p className={`${styles.button} text-center w-1/6 mt-3 mx-auto`} onClick={() => setGetStarted(prev => prev = !prev)}>
                        Get Started
                    </p>
                </div>

                <div className={getStarted ? "hidden" : 'py-4 px-4 w-full'}>
                    <p className='text-sm opacity-50'>Customize what appears on each invoice and edit your default email. Changes made here will affect all issued & future invoices.</p>

                    <div className='mt-5 flex justify-between w-full'>
                        <div className='w-2/5 mr-2 border-r border-grey-300 pr-6'>
                            {/* Contains section for adding new fields to the header of the invoice */}
                            <div className='border border-slate-200 h-auto w-full rounded-md mb-4 py-2' >
                                <span className='px-3' onClick={() => handleToggle("header")}>
                                    <span className='text-sm text-slate-500'>Header</span>
                                    {sectionToggled.header ? <p className='w-3 h-3 mr-3 float-right hover:cursor-pointer opacity-50'> - </p> : <span className='w-3 h-3 float-right hover:cursor-pointer mr-3 opacity-50'>+</span>}
                                </span>
                               
                                <div className={sectionToggled.header ? 'mt-5' : "hidden"}>
                                    {/* Responsible for selecting a logo to be added to the invoice  */}
                                    <span className='flex justify-between border-b border-grey-600 px-3 pb-3'>
                                        <p className='text-sm text-slate-500'>Logo</p>
                                        <p className='text-xs my-auto text-brand-primary hover:opacity-50 hover:cursor-pointer'>+ Add logo</p>
                                    </span>

                                    <div className='px-3 mt-3'>
                                        {/* Section for selecting fields - and entering the values - to be added to the header of the invoice being prepared. */}
                                        <h5 className='text-slate-500 text-sm'>Header fields</h5>

                                        {/* Section for Invoice date */}
                                        <span className='w-full mt-3 block'>
                                            <span className='flex justify-between w-1/3'>
                                                <input type="checkbox" name="Invoice date" id="invoiceDate" className='my-auto'/>
                                                <label htmlFor="invoiceDate" className='text-base my-auto text-slate-500'>Invoice date</label>
                                            </span>
                                            <input type="date" className='w-1/2 mt-2 border border-slate-200 px-2 py-2 rounded'/>
                                        </span>

                                        {/* Section for Due date */}
                                        <span className='w-full mt-3 block'>
                                            <span className='flex justify-between w-1/3'>
                                                <input type="checkbox" name="Invoice date" id="dueDate" className='my-auto'/>
                                                <label htmlFor="dueDate" className='text-base my-auto text-slate-500'>Due date</label>
                                            </span>
                                            <input type="date" className='w-1/2 mt-2 border border-slate-200 px-2 py-2 rounded'/>
                                        </span>

                                        {/* Section for Reference number */}
                                        <span className='w-full mt-3 block'>
                                            <span className='flex justify-between w-1/2'>
                                                <input type="checkbox" name="Invoice date" id="invoiceDate" className='my-auto'/>
                                                <label htmlFor="invoiceDate" className='text-base my-auto text-slate-500'>Reference number</label>
                                            </span>
                                            {/* <input type="date" className='w-1/2 mt-2 border border-slate-200 px-2 py-2 rounded'/> */}
                                        </span>

                                        {/* Section for Tracking number */}
                                        <span className='w-full mt-3 block'>
                                            <span className='flex justify-between w-1/2'>
                                                <input type="checkbox" name="Invoice date" id="invoiceDate" className='my-auto'/>
                                                <label htmlFor="invoiceDate" className='text-base my-auto text-slate-500'>Tracking number</label>
                                            </span>
                                            {/* <input type="date" className='w-1/2 mt-2 border border-slate-200 px-2 py-2 rounded'/> */}
                                        </span>

                                        <p className='text-brand-primary text-right hover:cursor-pointer hover:opacity-40 w-auto text-base mt-6'>
                                            + Add new field
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Contains section for adding extra details of the business to the invoice */}
                            <div className='border border-slate-200 h-auto w-full rounded-md mb-4 py-2'>
                                <span className='px-3' onClick={() => handleToggle("businessDetails")}>
                                    <span className='text-sm text-slate-500'>Business details</span>
                                    {sectionToggled.businessDetails ? <span className='w-3 h-3 hover:cursor-pointer mr-3 float-right opacity-50'>-</span> : <span className='w-3 mr-3 h-3 hover:cursor-pointer float-right opacity-50'>+</span>}
                                </span>

                                <div className={sectionToggled.businessDetails ? 'mt-5' : "hidden"}>
                                    <div className='w-full px-4 py-4 border-b border-grey-800'>
                                        <select className={`${styles.inputBox} w-full px-3`} placeholder="Choose customers">
                                            <option value="">Choose customer</option>
                                        </select>
                                    </div>
                                    <div className='px-3 w-full h-auto py-2 '>
                                        <span className='flex justify-between w-full'>
                                            <span>
                                                <p id='customerName' className='text-sm text-black mb-2'>Michelline</p>
                                                <p id='customerAddress' className='text-sm text-slate-300 my-2'>Nigeria</p>
                                                <p id='customerEmail' className='text-sm text-slate-300 my-2'>yetti@gmail.org</p>
                                            </span>
                                            <p className='text-sm text-brand-primary text-center hover:opacity-40 hover:cursor-pointer'>Edit your business info</p>
                                        </span>
                                        
                                    </div>
                                </div>
                            </div>

                            {/* Contains section for adding the details of the invoice. */}
                            <div className='border border-slate-200 h-auto w-full rounded-md mb-4 py-2 '>
                                <span className='px-3' onClick={() => handleToggle("invoice")}>
                                    <span className='text-sm text-slate-500'>Invoice body</span>
                                    {sectionToggled.invoice ? <span className='w-3 h-3 mr-3 float-right hover:cursor-pointer opacity-50'>-</span> : <span className='w-3 h-3 mr-3 hover:cursor-pointer float-right opacity-50'>+</span>}
                                </span>

                                <div className={sectionToggled.invoice ? 'mt-5' : "hidden"}>
                                    <div className='w-full px-3 py-4'>
                                        <select className={`${styles.inputBox} w-full px-3`} placeholder="Choose customers">
                                            <option value="">Add an item</option>
                                        </select>

                                        <div className='jusfity-between flex w-full mt-5'>
                                            <span className='mx-1 w-1/2'>
                                                <label htmlFor="unitPrice" className='text-grey-300 block text-sm'>Unit Price</label>
                                                <input type="text" className={`${styles.inputBox} w-full px-3`} id="unitPrice"/>
                                            </span>

                                            <span className='mx-1 w-1/2'>
                                                <label htmlFor="quantity" className='text-grey-300 block text-sm'>Quantity</label>
                                                <input type="text" className={`${styles.inputBox} w-full px-3`} id="quantity"/>
                                            </span>
                                        </div>

                                        <span className='mt-5 block'>
                                            <label htmlFor="total" className='text-grey-300 block text-sm'>Total</label>
                                            <input type="text" className={`${styles.inputBox} w-full pl-8 pr-3 bg-blue-100 opacity-70`} placeholder="100000.00" id="total"/>
                                            <img src={naira} alt="" className='w-3 h-3 relative left-3 bottom-7'/>
                                        </span>

                                        <p className='text-brand-primary text-right hover:cursor-pointer hover:opacity-40 w-auto text-sm mt-2'>
                                            + Add new field
                                        </p>
                                    </div>

                                    <div className='w-full h-auto py-2 border-t border-grey-800'>
                                        <div className='w-full px-3'>
                                            <span className='mt-5 block w-full'>
                                                <label htmlFor="subTotal" className='text-grey-300 block text-sm mb-1'>Sub-Total</label>
                                                <input type="text" className={`${styles.inputBox} w-full pl-8 pr-3 bg-blue-100 opacity-70`} placeholder="100000.00" id="subTotal"/>
                                                <img src={naira} alt="" className='w-3 h-3 relative left-3 bottom-7'/>
                                            </span>

                                            <div className='jusfity-between flex w-full mt-5'>
                                                <span className='mx-1 w-1/2'>
                                                    <label htmlFor="discount" className='text-grey-300 block text-sm'>Discount</label>
                                                    <input type="text" className={`${styles.inputBox} w-full px-3`} placeholder="0.00" id="discount"/>
                                                </span>

                                                <span className='mx-1 w-1/2'>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 448 512"
                                                        className="w-3 h-3 mb-2 float-right fill-yellow-300 hover:fill-slate-100"
                                                        >
                                                        <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                                                    </svg>
                                                    <input type="text" className={`${styles.inputBox} w-full pl-8 pr-3 bg-blue-100 opacity-70`} placeholder="0.00" id="discount"/>
                                                    <img src={naira} alt="" className='w-3 h-3 relative left-3 bottom-7'/>
                                                </span>
                                            </div>

                                            <div className='jusfity-between flex w-full mt-5'>
                                                <span className='mx-1 w-1/2'>
                                                    <label htmlFor="vat" className='text-grey-300 block text-sm'>VAT</label>
                                                    <input type="text" className={`${styles.inputBox} w-full px-3`} placeholder="0.00" id="vat"/>
                                                </span>

                                                <span className='mx-1 w-1/2'>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 448 512"
                                                    className="w-3 h-3 mb-2 float-right fill-yellow-300 hover:fill-slate-100"
                                                    >
                                                    <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                                                </svg>
                                                    <input type="text" className={`${styles.inputBox} w-full pl-8 pr-3 bg-blue-100 opacity-70`} placeholder="0.00" id="subTotal"/>
                                                    <img src={naira} alt="" className='w-3 h-3 relative left-3 bottom-7'/>
                                                </span>
                                            </div>
                                            
                                            <span className='mt-3 block'>
                                                <label htmlFor="secondTotal" className='text-grey-300 block text-sm'>Total</label>
                                                <input type="text" className={`${styles.inputBox} w-full pl-8 pr-3 bg-blue-100 opacity-70`} placeholder="100000.00" id="secondTotal"/>
                                                <img src={naira} alt="" className='w-3 h-3 relative left-3 bottom-7'/>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contains section for adding footers and short notes to the footer of the invoice */}
                            <div className='border border-slate-200 h-auto w-full rounded-md  mb-4 py-2 px-3' onClick={() => handleToggle("footer")}>
                                <span className='px-3' onClick={() => handleToggle("footer")}>
                                    <span className='text-sm text-slate-500'>Footer</span>
                                    {sectionToggled.footer ? <span className='w-3 h-3 float-right hover:cursor-pointer opacity-50'>-</span> : <span className='w-3 h-3 hover:cursor-pointer float-right opacity-50'>+</span>}
                                </span>
                            </div>
                        </div>

                        Displays the look of the invoice as the user e
                        <div className='w-3/5 px-3 py-4 border border-red-400'>
                            <div className="shadow-lg rounded w-full h-auto px-3 py-5">
                                <div id='header' className={sectionToggled.header === true ? "opacity-100" : "opacity-70 bg-slate-300"}>
                                    <p className='text-sm text-brand-primary float-right mb-6'>Invoice</p>

                                    <div className='flex justify-between w-full'>
                                        <img src={invoiceDetails.logo} alt="" className='rounded w-2/5 h-24 shadow-lg bg-grey-800'/>

                                        <div className='w-2/5 my-auto'>
                                            <span className='flex justify-between block'>
                                                <p className='text-xs'>Invoice no:</p>
                                                <p className='text-sm my-auto text-grey-200'>29th July, 2022</p>
                                            </span>

                                            <span className='flex justify-between block'>
                                                <p className='text-xs'>Invoice date:</p>
                                                <p className='text-sm my-auto text-grey-200'>29th July, 2022</p>
                                            </span>

                                            <span className='flex justify-between block'>
                                                <p className='text-xs'>Due date:</p>
                                                <p className='text-sm my-auto text-grey-200'>#000001</p>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <p className="text-2xl text-black-800 font-bold w-full mx-auto mb-1">Finances</p>
            <p className='text-sm opacity-50'>Create and schedule your invoices, quotes, and payments.</p>

            <div className='w-full rounded-lg shadow-lg h-auto mt-3'>
                <div className='border-b-2 py-7 border-brand-primary h-20 w-full px-10'>
                    <div className='flex justify-between w-1/3'>
                        <p 
                            onClick={() => handleClick(0)}
                            className={currentPage === 0 ? 'opacity-50 border-t-2 px-4 py-3 hover:cursor-pointer border-l-2 border-b-white border-brand-primary border-r-2' : "px-4 py-3 hover:cursor-pointer opacity-50"}>
                            Invoice
                        </p>
                        <p 
                            onClick={() => handleClick(1)}
                            className={currentPage === 1 ? 'opacity-50 border-t-2 px-4 py-3  border-l-2 border-b-white hover:cursor-pointer border-brand-primary border-r-2' : "px-4 hover:cursor-pointer py-3 opacity-50"}>
                            Quotes
                        </p>
                        <p 
                            onClick={() => handleClick(2)}
                            className={currentPage === 2 ? 'opacity-50 border-t-2 px-4 py-3  border-l-2 border-b-white border-brand-primary hover:cursor-pointer border-r-2' : "px-4 hover:cursor-pointer py-3 opacity-50"}>
                            Payments
                        </p>
                    </div>
                </div>

                {currentPage === 0 && <Invoice/>}
                {currentPage === 1 && <Invoice/>}
                {currentPage === 2 && <Invoice/>}
            </div>
        </div>
    ) 
}

export default Finances;