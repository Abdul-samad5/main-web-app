import React, {useState} from 'react';
import noCollections from '../assets/images/Collections.png'; 
import {styles} from '../constants/index';
import UserData from './UserData';

const details = ["Collection name", "Product", "Action"];

const Collections = () => {
    // State to store the collections gotten from the API
    const [collections, setCollections] = useState([]);

    // Function to update the state to the next five or so collection details gotten from the API.
    const handleNext = () => {
        setCollections((prev) => {
            return prev = [0, 2, 3];
        });
    }

    const handleCollectionSearch = (searchValue) => {
        // Logic for searching for a specific transaction history by setting the transaction history state to the data gotten from the API following the users prompt.
        // alert(searchValue);
    }
    return (
        <div>
            <p className={`${styles.componentHeader}`}>Collections</p>
            <UserData 
                type={"Collections"} 
                image={noCollections} 
                handleSearch={handleCollectionSearch} 
                infoHead={details} 
                data={collections} 
                children={Children} 
                handleNext={handleNext}></UserData>
        </div>
    )
};

const Children = ({id, collectionName, product}) => {
    return (
        <div className="flex justify-between">
            <p className='text-xs my-auto'>{id}</p>
            <p className='text-xs my-auto'>{collectionName}</p>
            <p className='text-xs my-auto'>{product}</p>
            <div className='flex h-auto mt-2 group hover:cursor-pointer w-auto justify-between'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='w-4 h-3 mt-1 align-middle mr-1 fill-slate-300'><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
                <p className="text-red-600 group-hover:text-red-200 text-sm">Delete collection</p>
            </div>
        </div>
    )
};

export default Collections