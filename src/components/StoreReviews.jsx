import React, {useState} from 'react';
import { noReviews } from '../assets'; 
import {styles} from '../constants/index';
import UserData from './UserData';

// Table Headings of the store review component
const details = ["Reviews", "Ratings", "Date", "Action"];

const StoreReviews = () => {
    // State to store the store reviews gotten from the API.
    const [storeReviews, setStoreReviews] = useState([]);

    // Function to update the state to the next five or so store reviews gotten from the API.
    const handleNext = () => {
        setStoreReviews((prev) => {
            return prev = [0, 2, 3];
        });
    }

    const handleStoreReviewSearch = (searchValue) => {
        
    }

    return (
        <div>
            <p className={`${styles.componentHeader}`}>Store Reviews</p>
            <UserData 
                type={"Store Reviews"} 
                image={noReviews} 
                infoHead={details} data={storeReviews} 
                children={Children} 
                handleNext={handleNext}
                handleSearch={handleStoreReviewSearch}></UserData>
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

export default StoreReviews