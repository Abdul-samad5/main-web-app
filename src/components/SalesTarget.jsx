import React, {useState} from 'react';
import { noReviews } from '../assets'; 
import {styles} from '../constants/index';
import UserData from './UserData';

// Table Headings of the store review component
const details = ["Target name", "Amount", "Interval", "Start Date", "End Date"];

const SalesTarget = () => {
    // State to store the store reviews gotten from the API.
    const [storeReviews, setStoreReviews] = useState([]);
    const [isVisible, setVisisble] = useState(false);
    const [newSalesTarget, setSalesTarget] = useState({
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

    // Function to update the state to the next five or so store reviews gotten from the API.
    const handleNext = () => {
        setStoreReviews((prev) => {
            return prev = [0, 2, 3];
        });
    }

    const toggleAddSalesTarget = () => {
        if(isVisible === true) {
            setSalesTarget((prev) => {
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

    const handleStoreReviewSearch = (searchValue) => {
        
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

    async function addSalesTarget() {

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

    return (
        <div>
            <div className='flex justify-between w-full mb-10'>
                <p className="text-2xl text-black-800 font-bold my-auto">Sales Target</p>
                <span className='flex justify-between hover:opacity-50 cursor-pointer' onClick={toggleAddSalesTarget}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='fill-blue-400 w-4 mx-1 h-4 my-auto'><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                    <p className='text-blue-400 text-sm my-auto mx-1'>Create sales target</p>
                </span>
            </div>
            <UserData 
                type={"Sales target"} 
                image={noReviews} 
                infoHead={details} data={storeReviews} 
                children={Children} 
                handleNext={handleNext}
                handleSearch={handleStoreReviewSearch}></UserData>
            <div className={isVisible ? 'h-full w-full absolute top-0 right-0' : ' -translate-x-full hidden'}>
                    <div className='h-auto w-1/3 shadow-2xl bg-white float-right px-4 py-3'>
                        <span className='cursor-pointer text-2xl float-right block text-slate-300' onClick={toggleAddSalesTarget}>x</span>

                        <div className='mt-10 mx-auto align-center px-5'>
                            <p>Create sales target</p>

                            <span className='mt-5 block'>
                                <h4 className='text-sm'>Discount type</h4>
                                <select name="discountType" className={`${styles.inputBox} w-full mt-1 px-3`} value={newSalesTarget.discountType} onChange={handleChange}>
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
                                    value={newSalesTarget.discountTitle} 
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
                                    value={newSalesTarget.value} 
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
                                    value={newSalesTarget.startDate} 
                                    type="date" 
                                    name='startDate'
                                    placeholder="YYYY-MM-DD"
                                    onChange={handleChange}/>
                            </span>

                            <span className='mt-5 block'>
                                <h4 className='text-sm'>End Date</h4>
                                <input 
                                    className={`${styles.inputBox} w-full mt-1 px-3`} 
                                    value={newSalesTarget.endDate}  
                                    placeholder="YYYY-MM-DD"
                                    type="date"
                                    name='endDate' 
                                    onChange={handleChange}/>
                            </span>

                            <span className='mt-5 block'>
                                <h4 className='text-sm'>Minimum purchhase value</h4>
                                <input 
                                    className={`${styles.inputBox} w-full mt-1 px-3`} 
                                    value={newSalesTarget.minPurValue} 
                                    placeholder="Apply to orders above value set" 
                                    type="text"
                                    name="minPurValue"
                                    onChange={handleChange}/>
                            </span>

                            <button className={`${styles.button} mt-7 w-full ${newSalesTarget.discountTitle === "" ? "opacity-50" : "opacity-100"}`} onClick={addSalesTarget}> Create discount </button>
                        </div>
                    </div>
            </div>
            {showModal && <Modal text={modalContent} showModal={true} />}
        </div>
    )
}


// Child component of the store review meant to display each review and the date it was made.
const Children = ({id, reviews, ratings, date}) => {
    const [currentState, setCurrentState] = useState(false);

    const handleClick = () => {
        setCurrentState(prevValue => !prevValue);
    }

    return (
        <div className="flex justify-between">
            <p className={`${styles.valueStyle}`}>{id}</p>
            <p className={`${styles.valueStyle}`}>{reviews}</p>
            <p className={`${styles.valueStyle}`}>{ratings}</p>
            <p className={`${styles.valueStyle}`}>{date}</p>
            <span onClick={handleClick} className="flex justify-between w-2 h-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" className='w-4 fixed h-4 fill-slate-400'><path d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z"/></svg>
                <div className={currentState ? 'rounded bg-white shadow-lg relative left-5 px-5 top-5 h-20 w-20' : 'hidden'}>
                    <p className='text-xs'>View Review</p>
                    <p className='text-xs my-auto text-red-400 my-2'>Delete Review</p>
                </div>
            </span>
            
        </div>
    )
};

export default SalesTarget;