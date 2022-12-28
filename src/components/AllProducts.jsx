import React, { useContext, useEffect } from 'react';
import { UserData } from "./index";
import { noProducts } from "../assets";
import axios from "axios";
import { BASE_URL } from '../services/services';
import { styles } from '../constants/index';
import { UserContext }from '../context/UserContext';

const details = ["Product name", "Price", "Status:", "Inventory:", "Action"];
const MyOrders = () => {
    const [myProducts, setMyProducts] = React.useState([]);

    const handleNext = () => {
        setMyProducts((prev) => {
            return (prev = [0, 1, 2, 3, 4, 5, 6, 7, 7, 8, 89]);
        });
    }

    const { userData } = useContext(UserContext);
    
    useEffect(() => {
        axios.get(`${BASE_URL}product/list`, {
            headers: { Authorization: `Bearer ${userData.access}`}
          }).then((response) => {
            console.log(response);
            setMyProducts(response.data.data);
          }).catch((err) => console.log(err));
    }, []);

    const handleProductSearch = () => {

    }

    return (
        <div>
            <p className={`${styles.componentHeader}`}>All Products</p>
            <UserData
                type={"Products"}
                image={noProducts}
                handleSearch={handleProductSearch}
                infoHead={details}
                data={myProducts}
                children={Children}
                handleNext={handleNext}
            ></UserData>
        </div>
    )
};

const Children = ({id, productName, price, status, inventory}) => {
    const [currentState, setCurrentState] = React.useState(false);

    const handleClick = () => {
        setCurrentState(prevValue => !prevValue);
    }

    return (
        <div className='pr-10 flex justify-between'>
            <div className="flex justify-between w-full sticky">
                <p className={`${styles.valueStyle} sticky`}>{id}</p>
                <p className={`${styles.valueStyle} sticky `}>{productName}</p>
                <p className={`${styles.valueStyle} sticky ml-12`}>{price}</p>
                <Status value={status}/>
                <p 
                    className={inventory === 0 ? `${styles.valueStyle} text-red-600` : `${styles.valueStyle}`}>
                    {inventory + " in stock"}
                </p>
                <span onClick={handleClick} className="justify-between flex block sticky">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" className='w-4 h-4 fill-slate-400'><path d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z"/></svg>
                    <div className={currentState ? 'rounded bg-white shadow-lg relative px-3 h-20 w-26' : 'hidden'}>
                        <p className='text-xs my-2'>Edit product</p>
                        <p className='text-xs my-2'>Preview</p>
                        <p className='text-xs text-red-400 mt-2'>Delete</p>
                    </div>
                </span>
            </div>
        </div>
    )
};

const Status = ({ value }) => {
    if (value === "Draft") {
        return <div className="rounded text-black-800 bg-gray-300 text-xs px-6 py-1 ">{value}</div>;
    } else if (value === "Archived") {
        return <div className="rounded text-purple-800 bg-purple-200 text-xs px-3 py-1">{value}</div>;
    } else if(value === "Active") {
        return <div className="rounded text-green-900 bg-green-200 mr-10 relative left-10 text-sm px-2 border border-red-500">{value}</div>;
    }
};

export default MyOrders;