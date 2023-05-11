import React, { useEffect, useState } from 'react';
import {UserData} from "./index";
import {noOrders} from "../assets";
import {styles} from '../constants/index';
import axios from 'axios';
import { BASE_URL } from '../services/services';
import Cookies from 'js-cookie';

const details = ["Customer", "Date", "Status", "Total"];
const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([]);
    const token = Cookies.get("_tksr");

    const handleNext = () => {
        setMyOrders((prev) => {
            return (prev = [0, 1, 2, 3, 4, 5, 6, 7, 7, 8, 89]);
        });
    }

    const handleOrderSearch = () => {

    }

    async function fetchOrders(token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
          'Content-Type': 'application/json',
        };
    
        try {
          const res = await axios.get(`${BASE_URL}store/list/`, config);
          if (res) {
            setMyOrders(res.data["Store Details"]);
          }
          console.log(res);
        //   console.log(res.data["Store Details"]);
        } catch (err) {
          console.log(err);
        }
    }

    useEffect(() => {
        fetchOrders(token);
    }, []);

    return (
        <div className='mt-8'>
            <p className={`${styles.componentHeader}`}>My Orders</p>
            <UserData
                type={"My Orders"}
                image={noOrders}
                handleSearch={handleOrderSearch}
                infoHead={details}
                data={myOrders}
                children={Children}
                handleNext={handleNext}
            ></UserData>

        </div>
    )
};

const Children = ({id, customer, date, status, total}) => {
    return (
        <div className="flex justify-between">
            <p className={`${styles.valueStyle}`}>{id}</p>
            <p className={`${styles.valueStyle}`}>{customer}</p>
            <p className={`${styles.valueStyle}`}>{date}</p>
            <Status value={status}/>
            <p className={`${styles.valueStyle}`}>{total}</p>
        </div>
    )
};

const Status = ({ value }) => {
    if (value === "Completed") {
      return <div className="rounded text-blue-800 bg-blue-100 text-sm px-2 py-1">{value}</div>;
    } else if (value === "Cancelled") {
      return <div className="rounded text-yellow-800 bg-yellow-100 text-sm px-2 py-1">{value}</div>;
    }
};

export default MyOrders;