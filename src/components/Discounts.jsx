import React, { useState, useEffect, useContext } from 'react';
import { noDiscounts } from '../assets';
import {styles} from '../constants/index';
import UserData from './UserData';
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { BASE_URL } from "../services/services";
import Cookies from 'js-cookie';
import Modal from './Modal';

const details = ["Discount Code", "Method", "Discount Type", "Status", "Discount Value", "Value", "Action"];
const Discounts = () => {
    // State to store the collections gotten from the API
    const [discounts, setDiscounts] = useState([]);
    const [isVisible, setVisisble] = useState(false);
    const [newDiscountInfo, setDiscountInfo] = useState({
        discountType: "Product Discount",
        discountMethod: "",
        discountTitle: "",
        discountValue: "",
        value: 0,
        startDate: "",
        endDate: "",
        minPurValue: 0
    });
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const tk = Cookies.get("_tksr");
    const isVerified = Cookies.get("emailVerify");

    const [reRender, setRender] = useState(false);

    // Function to update the state to the next five or so discount details gotten from the API.
    const handleNext = () => {
        setDiscounts((prev) => {
            return prev = [0, 2, 3];
        });
    }

    const handleDiscountSearch = (searchValue) => {
        // Logic for searching for a specific discount by setting the discounts state to the data gotten from the API following the users prompt.
        // alert(searchValue);
    }

    const { userData } = useContext(UserContext);
    const toggleAddDiscount = () => {
        if(isVisible === true) {
            setDiscountInfo((prev) => {
                return {
                    collectionName: "",
                    collectionImage: ""
                }
            });
        }
        
        setVisisble((prev) => {
            return prev = !prev;
        });
    }

    async function fetchDiscounts() {
        try {
            // const res = await axios.get(`${BASE_URL}marketing/view_list`, 
            // { headers: { Authorization: `Bearer ${userData.access}`} });
            const res = await axios.get(`${BASE_URL}marketing/view_list`, 
            { headers: { Authorization: `Bearer ${tk}`} });
            setDiscounts(res.data.data);
            if(!res.statusText === "OK") return;
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchDiscounts();
    }, [reRender, isVisible]);

    async function addDiscount() {

        if(isVerified === false) {
            window.alert("You must verify your email before you can perform this action!");
      
            setModalContent("You must verify your email before you can perform this action!");
            setShowModal(true);
            // setFormData(initialState);
            setTimeout(() => {
              setShowModal(false);
            }, 2000);
      
            return;
        }
      
        let discountInfo = {
            "discount_type": newDiscountInfo.discountType,
            "discount_method": newDiscountInfo.discountMethod,
            "discount_code": newDiscountInfo.discountTitle,
            "discount_value": newDiscountInfo.discountValue,
            "value": newDiscountInfo.value,
            "start_date": newDiscountInfo.startDate.toString(),
            "end_date": newDiscountInfo.endDate.toString(),
            "minimum_purchase_value": newDiscountInfo.minPurValue
        }

        try {
            const res = await axios.post(`${BASE_URL}marketing/create_discount`, discountInfo, 
            { headers: { Authorization: `Bearer ${tk}`} });
            setVisisble(prev => prev = !prev);
            console.log(res);
            setDiscountInfo((prev) => {
                return prev = {
                    discountType: "",
                    discountMethod: "",
                    discountTitle: "",
                    discountValue: "",
                    value: 0,
                    startDate: "",
                    endDate: "",
                    minPurValue: 0
                }
            });
        } catch(err) {
            console.log(err);
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setDiscountInfo((prev) => {
            return {
                ...prev,
                [name]: value
            }
        });
    }

    const Children = ({id, discountCode, method, type, discount_value, value, no, end_date, active }) => {
        const [currentState, setCurrentState] = useState(false);
    
        const handleClick = () => {
            setCurrentState(prevValue => !prevValue);
        }
    
        const deleteDiscount = async () => {
            try {
                const response = await axios.delete(`${BASE_URL}marketing/delete/${id}`, 
                { headers: { Authorization: `Bearer ${tk}`} });
                console.log(response);
                if(!response.statusText === "OK") return;
                setRender(prev => prev = !prev);
            } catch (err) {
                console.log(err);
            }
        }
    
        const deactivateDiscount = async () => {
            try {
                // const response = await axios.put(`${BASE_URL}marketing/deactivate/${id}`, {active : false}, 
                // { headers: { Authorization: `Bearer ${userData.access}`} });
                const response = await axios.put(`${BASE_URL}marketing/deactivate/${id}`, {active : false}, 
                { headers: { Authorization: `Bearer ${tk}`} });
                // console.log(response);
                setRender(prev => prev = !prev);
            } catch (err) {
                console.log(err);
            }
        }
    
        return (
            <div className="flex justify-between wrap items-center">
                <p className={`${styles.valueStyle} relative lg:left-2`}>{no}</p>
                <p className={`${styles.valueStyle} relative lg:left-6`}>{discountCode}</p>
                <p className={`${styles.valueStyle} relative lg:left-8`}>{method}</p>
                <p className={`${styles.valueStyle} relative lg:left-2`}>{type}</p>
                {/* <Status value={new Date(end_date).getTime() > new Date().getTime() ? "Active" : "Expired"}/> */}
                <Status value={active ? "Active" : "Expired"}/>
                <p className={`${styles.valueStyle} relative lg:right-8`}>{discount_value}</p>
                <p className={`${styles.valueStyle} relative lg:right-6`}>{value}</p>
                <div onClick={handleClick} className="flex w-2 h-4 relative lg:right-4">
                    <div className={currentState ? 'rounded bg-white shadow-lg top-6 relative px-1 z-10 h-20 w-auto' : 'hidden'}>
                        <p className='text-xs cursor-pointer' onClick={deactivateDiscount}>Deactivte discount</p>
                        <p className='text-xs cursor-pointer my-auto text-red-400 my-2' onClick={deleteDiscount}>Delete discount</p>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" className='w-4 h-4 fill-slate-400'><path d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z"/></svg>
                    
                </div>
            </div>
        )
    };

    return (
        <>
            <div className='w-full'>
                <div className='flex justify-between w-full mb-10'>
                    <p className="text-2xl text-black-800 font-bold my-auto">Discounts</p>
                    <span className='flex justify-between hover:opacity-50 cursor-pointer' onClick={toggleAddDiscount}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='fill-blue-400 w-4 mx-1 h-4 my-auto'><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                        <p className='text-blue-400 text-sm my-auto mx-1'>Create Discount</p>
                    </span>
                </div>
                
                <UserData 
                    type={"Discounts"} 
                    image={noDiscounts} 
                    handleSearch={handleDiscountSearch} 
                    infoHead={details} 
                    data={discounts} 
                    children={Children} 
                    handleNext={handleNext}></UserData>

                <div className={isVisible ? 'h-full w-full absolute top-0 right-0' : ' -translate-x-full hidden'}>
                    <div className='h-auto w-1/3 shadow-2xl bg-white float-right px-4 py-3'>
                        <span className='cursor-pointer text-2xl float-right block text-slate-300' onClick={toggleAddDiscount}>x</span>

                        <div className='mt-10 mx-auto align-center px-5'>
                            <p>Create discount</p>

                            <span className='mt-5 block'>
                                <h4 className='text-sm'>Discount type</h4>
                                <select name="discountType" className={`${styles.inputBox} w-full mt-1 px-3`} value={newDiscountInfo.discountType} onChange={handleChange}>
                                    <option>Product Discount</option>
                                    <option>Order Discount</option>
                                    <option>Shipping Discount</option>
                                    <option>Buy and Get One Discount</option>
                                </select>
                            </span>

                            <span className='mt-5 block'>
                                <h4 className='text-sm'>Discount method</h4>
                                <span className='flex justify-between mt-2'>
                                    <div >
                                        <input 
                                            type="radio"
                                            name="discountMethod"
                                            value="Discount Code"
                                            id='discountCode' 
                                            onChange={handleChange}/>

                                        <label htmlFor="discountCode"> Discount Code</label>
                                    </div>

                                    <div>
                                        <input 
                                            type="radio"
                                            name="discountMethod"
                                            value="Automatic Discount"
                                            id='autoDiscount' 
                                            onChange={handleChange}/>

                                        <label htmlFor="autoDiscount"> Automatic Discount </label>
                                    </div>
                                </span>   
                            </span>
                            
                            <span className='mt-5 block'>
                                <h4 className='text-sm'>Discount Code</h4>
                                <input 
                                    className={`${styles.inputBox} w-full mt-1 px-3`} 
                                    value={newDiscountInfo.discountTitle} 
                                    placeholder="Eg. Boots, Shoes..." 
                                    type="text" 
                                    onChange={handleChange}
                                    name="discountTitle"/>
                            </span>

                            <span className='mt-5 block'>
                                <h4 className='text-sm'>Discount value</h4>
                                <span className='flex justify-between mt-2'>
                                    <div >
                                        <input 
                                            type="radio"
                                            name="discountValue"
                                            value="Fixed Amount"
                                            id='discountCode' 
                                            onChange={handleChange}/>

                                        <label htmlFor="discountCode"> Fixed Amount </label>
                                    </div>

                                    <div>
                                        <input 
                                            type="radio"
                                            name="discountValue"
                                            value="Percentage"
                                            id='autoDiscount' 
                                            onChange={handleChange}/>

                                        <label htmlFor="autoDiscount"> Percentage </label>
                                    </div>
                                </span>   
                            </span>

                            <span className='mt-5 block'>
                                <h4 className='text-sm'>Value</h4>
                                <input
                                    type="text"
                                    placeholder="0.00"
                                    value={newDiscountInfo.value} 
                                    name="value"
                                    onChange={handleChange}
                                    className={`${styles.inputBox} w-full mt-1 pl-8 pr-3`} ></input>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                    className="w-4 h-4 relative bottom-8 left-2 fill-gray-500">
                                    <path d="M122.6 46.3c-7.8-11.7-22.4-17-35.9-12.9S64 49.9 64 64V256H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H64V448c0 17.7 14.3 32 32 32s32-14.3 32-32V320H228.2l97.2 145.8c7.8 11.7 22.4 17 35.9 12.9s22.7-16.5 22.7-30.6V320h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H384V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V256H262.5L122.6 46.3zM305.1 320H320v22.3L305.1 320zM185.5 256H128V169.7L185.5 256z" />
                                </svg>
                            </span>

                            <span className='mt-5 block'>
                                <h4 className='text-sm'>Start date</h4>
                                <input 
                                    className={`${styles.inputBox} w-full mt-1 px-3`} 
                                    value={newDiscountInfo.startDate} 
                                    type="date" 
                                    name='startDate'
                                    placeholder="YYYY-MM-DD"
                                    onChange={handleChange}/>
                            </span>

                            <span className='mt-5 block'>
                                <h4 className='text-sm'>End Date</h4>
                                <input 
                                    className={`${styles.inputBox} w-full mt-1 px-3`} 
                                    value={newDiscountInfo.endDate}  
                                    placeholder="YYYY-MM-DD"
                                    type="date"
                                    name='endDate' 
                                    onChange={handleChange}/>
                            </span>

                            <span className='mt-5 block'>
                                <h4 className='text-sm'>Minimum purchhase value</h4>
                                <input 
                                    className={`${styles.inputBox} w-full mt-1 px-3`} 
                                    value={newDiscountInfo.minPurValue} 
                                    placeholder="Apply to orders above value set" 
                                    type="text"
                                    name="minPurValue"
                                    onChange={handleChange}/>
                            </span>

                            <button className={`${styles.button} mt-7 w-full ${newDiscountInfo.discountTitle === "" ? "opacity-50" : "opacity-100"}`} onClick={addDiscount}> Create discount </button>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && <Modal text={modalContent} showModal={true} />}
        </>
    )
};

// Component that displays the current status of a discount based on the value gotten from the API.
const Status = ({value}) => {
    if(value === "Active") {
        return (
            <div className="rounded text-blue-800 bg-blue-100 relative lg:right-4 text-sm px-5 py-1">{value}</div>
        )
    } else if(value === "Expired") {
        return (
            <div className="rounded text-yellow-800 bg-yellow-100 text-sm px-4 relative lg:right-4 py-1">{value}</div>
        )
    }
}

export default Discounts;