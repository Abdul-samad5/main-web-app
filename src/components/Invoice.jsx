import React, { useState, useEffect }from 'react';
import { styles } from '../constants/index';
import { noCollections, naira, invoice_styles} from '../assets';
import html2canvas from 'html2canvas';
import axios from 'axios';
import { BASE_URL } from '../services/services';
import Cookies from 'js-cookie';
import ShareButtons from './ShareButtons';

const Invoice = ({}) => {
    const [getStarted, setGetStarted] = useState(true);
    const [sectionToggled, setSectionToggled] = useState({
        header: false,
        businessDetails: false,
        invoice: false,
        footer: false
    });
    const [invoiceDetails, setInvoiceDetails] = useState({
        logo: "",
        invoiceNo: "#000001",
        dueDate: "",
        invoiceDate: "",
        customerEmail: "",
        customerAddress: "",
        customerName: "",
        invoiceBody: [
            {
                id: 0,
                itemName: "",
                unitPrice: "",
                quantity: "",
            }
        ],
        vat: 0,
        discount: 0,
        subTotal: 0
    });
    const [storeName, setStoreName] = useState("");
    const [storeLogo, setStoreLogo] = useState("");
    const [storeEmail, setStoreEmail] = useState("");
    const tk = Cookies.get("_tksr");
    const [open, setOpen] = useState(false);

    const handleToggle = (value) => {
        setSectionToggled(prev => {
            return {...prev, [value] : !prev[value]}
        });
    };

    const selectImage = (event) => {
        const files = event.target.files;
        const arrayFiles = Array.from(files);
        // console.log(arrayFiles);

        const url = URL.createObjectURL(arrayFiles[0]);

        setInvoiceDetails((prev) => {
            return {...prev, logo: url}
        });
    }

    const addNewField = () => {
        const array = invoiceDetails.invoiceBody;
        array.push({
            id: null,
            itemName: "", 
            quantity: null, 
            unitPrice: null,
        });
        
        console.log(array);
        setInvoiceDetails((prev) => {
            return {...prev, invoiceBody: array}
        });
    }

    const handleInput = (event, index) => {
        const {name, value} = event.target;

        const calcSubTotal = invoiceDetails.invoiceBody.reduce((total, current) => {
            return total += current.unitPrice;
        }, 0);

        const total = invoiceDetails.invoiceBody.reduce((total, current) => {
            return total = total + (current.quantity * current.unitPrice);
        }, 0);

        if(name === "itemName" || name === "unitPrice" || name === "quantity" ) {
            let newArray = invoiceDetails.invoiceBody.map((obj, arrayIndex) =>
                arrayIndex === index ? { ...obj, [name]: value } : obj
            );
            
            setInvoiceDetails((prev) => {
                return {...prev, invoiceBody: newArray, subTotal: calcSubTotal}
            });
        }
        
        setInvoiceDetails((prev) => {
            return {...prev, [name]: value, subTotal: calcSubTotal }
        });
        
    }

    useEffect(() => {
        async function fetchData() {
          const response = await axios.get(
            `${BASE_URL}store_settings/store_details`,
            { headers: { Authorization: `Bearer ${tk}` } }
          );
          const store_name = response.data.data["store_name"];
          const profileLogo = response.data.data["store_logo"];
          const store_email = response.data.data["store_email"];
    
          setStoreName(`${store_name}`);
          setStoreLogo(profileLogo);
          setStoreEmail(`${store_email}`);
        }
        fetchData();
      }, []);

    function downloadInvoice() {
        const screenshotTarget = document.getElementById("invoice");

        html2canvas(screenshotTarget).then((canvas) => {
            const base64image = canvas.toDataURL("image/png");
            var anchor = document.createElement("a");
            anchor.setAttribute("href", base64image);
            anchor.setAttribute("download", "invoice.png");
            anchor.click();
            anchor.remove();
        });
    }

    function shareInvoice() {
        const target = document.getElementById("invoice");
        let image;

        html2canvas(target).then((canvas) => {
            image = canvas.toDataURL("image/png");
        });

        if(!window.navigator.canShare) {
            window.alert("Your browser does not support this feature!");
            return;
        } 
        
        if(window.navigator.canShare({ image })) {
            navigator.share({
                image,
                title: "Invoice",
                text: "invoice images",
            }).then(() => {
                console.log("Thanks for sharing!");
            }).catch((error) => console.log(error));
        } else {
            window.alert("Your system does not support this!");
        }
    }

    const getInvoice = () => {
        const target = document.getElementById("invoice");
        let image;

        html2canvas(target).then((canvas) => {
            image = canvas.toDataURL("image/png");
        });
        return image;
    }

    return (
        <>
            <div className='py-5'>
                <div className={getStarted ? "" : "hidden"}>
                    <img src={noCollections} alt="" className='mx-auto'/>
                    <p className='text-base text-black text-center'>Start creating invoices for your customers now.</p>
                    <p className='text-sm opacity-50 text-center'>
                        Improve customers' engagement and experience for your products whilst managing and tracking some.
                    </p>
                    <p className={`${styles.button} text-center lg:w-1/6 w-1/2 mt-5 mx-auto`} onClick={() => setGetStarted(prev => prev = !prev)}>
                        Get Started
                    </p>
                </div>

                <div className={getStarted ? "hidden" : 'py-4 px-4 w-full'}>
                    <p className='text-sm opacity-50'>Customize what appears on each invoice and edit your default email. Changes made here will affect all issued & future invoices.</p>

                    <div className='mt-5 lg:flex justify-between w-full'>
                        <div className='lg:w-2/5 w-full mr-2 lg:border-r lg:border-grey-300 lg:pr-6'>
                            {/* Contains section for adding new fields to the header of the invoice */}
                            <div className='border border-slate-200 h-auto w-full rounded-md mb-4 py-2' >
                                <span className='px-3' onClick={() => handleToggle("header")}>
                                    <span className='text-sm text-slate-500'>Header</span>
                                    {sectionToggled.header ? <p className='w-3 h-3 mr-3 float-right hover:cursor-pointer opacity-50'> - </p> : <span className='w-3 h-3 float-right hover:cursor-pointer mr-3 opacity-50'>+</span>}
                                </span>
                            
                                <div className={sectionToggled.header ? 'mt-5' : "hidden"}>
                                    {/* Responsible for selecting a logo to be added to the invoice  */}
                                    {/* <span className='flex justify-between border-b border-grey-600 px-3 pb-3'>
                                        <p className='text-sm text-slate-500'>Logo</p>
                                        <input type="file" className='hidden' id='addLogo' onChange={selectImage} accept="image/*"/>
                                        <label className='text-xs my-auto text-brand-primary hover:opacity-50 hover:cursor-pointer' htmlFor='addLogo' >+ Add logo</label>
                                    </span> */}

                                    <div className='px-3 mt-3'>
                                        {/* Section for selecting fields - and entering the values - to be added to the header of the invoice being prepared. */}
                                        <h5 className='text-slate-500 text-sm'>Header fields</h5>

                                        {/* Section for Invoice date */}
                                        <span className='w-full mt-3 block'>
                                            <span className='flex justify-between w-1/3'>
                                                <input type="checkbox" name="Invoice Date" id="invoiceDate" className='my-auto'/>
                                                <label htmlFor="invoiceDate" className='text-base my-auto text-slate-500'>Invoice date</label>
                                            </span>
                                            <input type="date" className='w-1/2 mt-2 border border-slate-200 px-2 py-2 rounded' name="invoiceDate" onChange={handleInput} value={invoiceDetails.invoiceDate}/>
                                        </span>

                                        {/* Section for Due date */}
                                        <span className='w-full mt-3 block'>
                                            <span className='flex justify-between w-1/3'>
                                                <input type="checkbox" name="Invoice date" id="dueDate" className='my-auto'/>
                                                <label htmlFor="dueDate" className='text-base my-auto text-slate-500'>Due date</label>
                                            </span>
                                            <input type="date" className='w-1/2 mt-2 border border-slate-200 px-2 py-2 rounded' name="dueDate" onChange={handleInput} value={invoiceDetails.dueDate}/>
                                        </span>

                                        {/* Section for Reference number */}
                                        {/* <span className='w-full mt-3 block'>
                                            <span className='flex justify-between w-1/2'>
                                                <input type="checkbox" name="Invoice date" id="invoiceDate" className='my-auto'/>
                                                <label htmlFor="invoiceDate" className='text-base my-auto text-slate-500'>Reference number</label>
                                            </span>
                                            
                                        </span> */}
                                        {/* <input type="date" className='w-1/2 mt-2 border border-slate-200 px-2 py-2 rounded'/> */}

                                        {/* Section for Tracking number */}
                                        {/* <span className='w-full mt-3 block'>
                                            <span className='flex justify-between w-1/2'>
                                                <input type="checkbox" name="Invoice date" id="invoiceDate" className='my-auto'/>
                                                <label htmlFor="invoiceDate" className='text-base my-auto text-slate-500'>Tracking number</label>
                                            </span>
                                        
                                        </span> */}
                                        {/* <input type="date" className='w-1/2 mt-2 border border-slate-200 px-2 py-2 rounded'/> */}

                                        {/* <p className='text-brand-primary text-right hover:cursor-pointer hover:opacity-40 w-auto text-base mt-6'>
                                            + Add new field
                                        </p> */}
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
                                                <p id='customerName' className='text-sm text-black mb-2'>{storeName}</p>
                                                <p id='customerAddress' className='text-sm text-slate-300 my-2'>Nigeria</p>
                                                <p id='customerEmail' className='text-sm text-slate-300 my-2'>{storeEmail}</p>
                                            </span>
                                            {/* <p className='text-sm text-brand-primary text-center hover:opacity-40 hover:cursor-pointer'>Edit your business info</p> */}
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
                                    {invoiceDetails.invoiceBody.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <div className='w-full px-3 py-4 border border-slate-200'>
                                                    <select className={`${styles.inputBox} w-full px-3`} value={invoiceDetails.invoiceBody[index].itemName} placeholder="Choose customers" name="itemName" onChange={(event) => handleInput(event, index)}>
                                                        <option>Add an item</option>
                                                        <option>Sneakers</option>
                                                        <option>Headphones</option>
                                                    </select>
                
                                                    <div className='jusfity-between flex w-full mt-5'>
                                                        <span className='mx-1 w-1/2'>
                                                            <label htmlFor="unitPrice" className='text-grey-300 block text-sm'>Unit Price</label>
                                                            <input type="text" className={`${styles.inputBox} w-full px-3`} value={invoiceDetails.invoiceBody[index].unitPrice} name="unitPrice" onChange={(event) => handleInput(event, index)}/>
                                                        </span>
                
                                                        <span className='mx-1 w-1/2'>
                                                            <label htmlFor="quantity" className='text-grey-300 block text-sm'>Quantity</label>
                                                            <input type="text" className={`${styles.inputBox} w-full px-3`} value={invoiceDetails.invoiceBody[index].quantity} name="quantity" onChange={(event) => handleInput(event, index)}/>
                                                        </span>
                                                    </div>
                
                                                    <span className='mt-5 block'>
                                                        <label htmlFor="total" className='text-grey-300 block text-sm'>Total</label>
                                                        <input type="text" className={`${styles.inputBox} w-full pl-8 pr-3 bg-blue-100 opacity-70`} disabled value={invoiceDetails.invoiceBody[index].unitPrice * invoiceDetails.invoiceBody[index].quantity} placeholder="100000.00" id="total"/>
                                                        <img src={naira} alt="" className='w-3 h-3 relative left-3 bottom-7'/>
                                                    </span> 
                                                </div>
                                            </div>
                                        )
                                    })}
                                    <p onClick={addNewField} className='text-brand-primary px-3 py-3 text-right hover:cursor-pointer hover:opacity-40 w-auto text-sm mt-2'>
                                        + Add new field
                                    </p>
                                    <div className='w-full h-auto py-2 border-t border-grey-800'>
                                        <div className='w-full px-3'>
                                            <span className='mt-5 block w-full'>
                                                <label htmlFor="subTotal" className='text-grey-300 block text-sm mb-1'>Sub-Total</label>
                                                <input type="text" className={`${styles.inputBox} w-full pl-8 pr-3 bg-blue-100 opacity-70`} disabled value={invoiceDetails.subTotal} placeholder="100000.00" id="subTotal"/>
                                                <img src={naira} alt="" className='w-3 h-3 relative left-3 bottom-7'/>
                                            </span>

                                            <div className='jusfity-between flex w-full mt-5'>
                                                <span className='mx-1 w-1/2 flex justify-between'>
                                                    <span>
                                                        <label htmlFor="discount" className='text-grey-300 block text-sm'>Discount</label>
                                                        <input type="text" className={`${styles.inputBox} w-full px-3`} placeholder="0.00" id="discount"/>
                                                    </span>  

                                                    <p className='my-auto ml-1 text-sm'>%</p>
                                                </span>
                                                

                                                <span className='mx-1 w-1/2'>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 448 512"
                                                        className="w-3 h-3 mb-2 float-right fill-yellow-300 hover:fill-slate-100"
                                                        >
                                                        <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                                                    </svg>
                                                    <input type="text" className={`${styles.inputBox} w-full pl-8 pr-3 bg-blue-100 opacity-70`} disabled placeholder="0.00" id="discount"/>
                                                    <img src={naira} alt="" className='w-3 h-3 relative left-3 bottom-7'/>
                                                </span>
                                            </div>

                                            <div className='jusfity-between flex w-full mt-5'>
                                                <span className='mx-1 w-1/2 flex justify-between'>
                                                    <span>
                                                        <label htmlFor="vat" className='text-grey-300 block text-sm'>VAT</label>
                                                        <input type="text" className={`${styles.inputBox} w-full px-3`} placeholder="0.00" id="vat"/>
                                                    </span>

                                                    <p className='my-auto ml-1 text-sm'>%</p>
                                                </span>
                                                

                                                <span className='mx-1 w-1/2'>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 448 512"
                                                    className="w-3 h-3 mb-2 float-right fill-yellow-300 hover:fill-slate-100"
                                                    >
                                                    <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                                                </svg>
                                                    <input type="text" className={`${styles.inputBox} w-full pl-8 pr-3 bg-blue-100 opacity-70`} disabled placeholder="0.00" id="subTotal"/>
                                                    <img src={naira} alt="" className='w-3 h-3 relative left-3 bottom-7'/>
                                                </span>
                                            </div>
                                            
                                            <span className='mt-3 block'>
                                                <label htmlFor="secondTotal" className='text-grey-300 block text-sm'>Total</label>
                                                <input type="text" className={`${styles.inputBox} w-full pl-8 pr-3 bg-blue-100 opacity-70`} disabled placeholder="100000.00" id="secondTotal"/>
                                                <img src={naira} alt="" className='w-3 h-3 relative left-3 bottom-7'/>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contains section for adding footers and short notes to the footer of the invoice */}
                            <div className='border border-slate-200 h-auto w-full rounded-md  mb-4 py-2 px-3'>
                                <span className='px-3' onClick={() => handleToggle("footer")}>
                                    <span className='text-sm text-slate-500'>Footer</span>
                                    {sectionToggled.footer ? <span className='w-3 h-3 float-right hover:cursor-pointer opacity-50'>-</span> : <span className='w-3 h-3 hover:cursor-pointer float-right opacity-50'>+</span>}
                                </span>
                                <textarea value={invoiceDetails.footer} onChange={handleInput} name="footer" cols="30" rows="10" className={sectionToggled.footer ? 'bg-white w-full h-40 resize-none px-3 py-3' : "hidden"}></textarea>
                            </div>
                        </div>

                        {/* Displays the look of the invoice as the user enters the values */}
                        <div className='lg:w-3/5 w-full px-3 py-4' id="invoice">
                            <img src={invoice_styles} alt="Styles" className='relative top-0 left-0 w-full h-20'/>
                            <div className="shadow-lg rounded w-full h-auto px-3 py-5">
                                {/* Displays the header of the invoice */}
                                <div id='header' className={sectionToggled.header === true ? "opacity-100 px-3 py-3" : "opacity-70 bg-slate-200 py-3 px-3"}>
                                    <p className='text-sm text-brand-primary float-right mb-6'>Invoice</p>

                                    <div className='flex justify-between w-full'>
                                        <img src={storeLogo} alt="Image Chosen" className={storeLogo === "" ? "hidden" : "rounded w-2/5 h-24 shadow-lg bg-grey-800"}/>
                                        <div className={storeLogo != "" ? "hidden" : 'rounded w-2/5 h-24 shadow-lg bg-slate-200'}></div>

                                        <div className='w-2/5 my-auto'>
                                            <span className='flex justify-between block'>
                                                <p className='text-xs'>Invoice no:</p>
                                                <p className='text-sm my-auto text-grey-200'>{invoiceDetails.invoiceNo}</p>
                                            </span>

                                            <span className='flex justify-between block'>
                                                <p className='text-xs'>Invoice date:</p>
                                                <p className='text-sm my-auto text-grey-200'>{invoiceDetails.invoiceDate}</p>
                                            </span>

                                            <span className='flex justify-between block'>
                                                <p className='text-xs'>Due date:</p>
                                                <p className='text-sm my-auto text-grey-200'>{invoiceDetails.dueDate}</p>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Displays the business details of the invoice */}
                                <div id='businessDetails' className={sectionToggled.businessDetails === true ? "opacity-100 py-3 px-3" : "opacity-70 bg-slate-200 py-3 px-3"}>
                                    <h6 className='text-xs text-grey-600'>Billed to: </h6>

                                    <div className='flex justify-between'>
                                        <div>
                                            <p className='text-sm'>Customer name:</p>
                                            <p className='text-sm'>Customer address:</p>
                                            <p className='text-sm'>Email:</p>
                                        </div>

                                        <div>
                                            <p className='text-sm'>{invoiceDetails.customerName}</p>
                                            <p className='text-sm'>{invoiceDetails.customerAddress}</p>
                                            <p className='text-sm'>{invoiceDetails.customerEmail}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Displays the original invoice body */}
                                <div id='invoiceBody' className={sectionToggled.invoice === true ? "opacity-100 py-3 px-3" : "opacity-70 bg-slate-200 py-3 px-3"}>
                                    <div className='bg-blue-100 px-3 py-6 w-full h-auto'>
                                        <div className='flex justify-between border-b border-gray-400 pb-2'>
                                            <p className='text-xs'>Product Description</p>
                                            <p className='text-xs'>Quantity</p>
                                            <p className='text-xs'>Unit price</p>
                                            <p className='text-xs'>Total</p>
                                        </div>

                                        <div>
                                            {invoiceDetails.invoiceBody.map((item, index) => {
                                                return (
                                                    <Item itemName={item.itemName} key={index} quantity={item.quantity} unitPrice={item.unitPrice}/>
                                                )
                                            })}
                                        </div>

                                        <div className='flex justify-end'>
                                            <div className='my-6 lg:w-1/3 w-1/2'>
                                                <span className='flex justify-between'>
                                                    <p className='text-sm'>SUB-TOTAL</p>
                                                    <span className='flex'>
                                                        <img src={naira} alt="" className='w-2 h-2 my-auto'/>
                                                        <p className='text-xs my-auto'>{invoiceDetails.subTotal}</p>
                                                    </span>
                                                </span>

                                                <span className='flex justify-between'>
                                                    <p className='text-sm'>DISCOUNT</p>
                                                    <span className='flex'>
                                                        <img src={naira} alt="" className='w-2 h-2 my-auto'/>
                                                        <p className='text-xs my-auto'>{invoiceDetails.discount}</p>
                                                    </span>
                                                </span>

                                                <span className='flex justify-between'>
                                                    <p className='text-sm'>VAT</p>
                                                    <p className='text-xs my-auto'>{`${invoiceDetails.vat}%`}</p>
                                                </span>
                                            </div>
                                        </div>

                                        <div className='flex justify-end'>
                                            <div className='flex w-1/3 justify-between'>
                                                <p className='font-semibold text-base text-black'>TOTAL</p>
                                                <span className='flex'>
                                                    <img src={naira} alt="" className='w-2 h-2 my-auto'/>
                                                    <p className='text-xs my-auto'>{invoiceDetails.subTotal}</p>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Displays the footer of the invoice */}
                                <div id='footer' className={sectionToggled.footer === true ? "opacity-100 py-3 px-3" : "opacity-70 bg-slate-200 py-3 px-3"}>
                                    <span className='bg-brand-primary w-full px-2 block'>
                                        <p> Your notes come in here</p>
                                    </span>
                                    <textarea disabled value={invoiceDetails.footer} name="footer" cols="30" rows="10" className='bg-white w-full h-40 resize-none px-3 py-3'></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.button} mt-4`} onClick={downloadInvoice}>Download Incoice</div>
                    <div className={`${styles.button} mt-4 `} onClick={() => setOpen(true)}>Share Incoice</div>
                    
                </div>
            </div>
            {open && (
                <div className='justify-center items-center backdrop-filter backdrop-blur-xl flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
                    <div className='relative transition ease-in-out delay-150 w-auto w-[80%] mx-auto max-w-3xl'>
                        {/*content*/}
                        <div className='border-0 rounded-lg  shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                            {/*header*/}
                            <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
                                <h3 className="text-2xl text-center text-red-800 font-bold">
                                    Share to...
                                </h3>
                                {/* <button className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'>
                                <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                                    ×
                                </span>
                                </button> */}
                            </div>
                            {/*body*/}
                            <div className='relative p-6 flex-auto'>
                                <p className='my-4 text-slate-500 text-center text-lg leading-relaxed'>
                                {/* {text} */}
                                <ShareButtons image={() => getInvoice()}/>
                                </p>
                            </div>
                            {/*footer*/}
                            <div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
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
            )}
            {/* <div className='opacity-25 fixed inset-0 z-45 bg-black'></div> */}
        </>
    )
}

const Item = ({itemName, quantity, unitPrice}) => {
    return (
        <div className='flex justify-between w-full my-3'>
            <p className='text-xs'>{itemName}</p>
            <p className='text-xs'>{quantity}</p>
            <span className='flex'>
                <img src={naira} alt="" className='w-2 h-2 my-auto'/>
                <p className='text-xs'>{unitPrice}</p>
            </span>
            <span className='flex'>
                <img src={naira} alt="" className='w-2 h-2 my-auto'/>
                <p className='text-xs'>{unitPrice * quantity}</p>
            </span>
        </div>
    )
}

export default Invoice;