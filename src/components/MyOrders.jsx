import React, { useEffect, useState } from 'react';
// import {UserData} from "./index";
import {noOrders} from "../assets";
import {styles} from '../constants/index';
import axios from 'axios';
import { BASE_URL } from '../services/services';
import Cookies from 'js-cookie';
import Orders from './Orders';
import { TableCell } from '@mui/material';

export const details = ["Customer", "Date", "Status", "Total"];
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
            // setMyOrders(res.data["orders"]);
            setMyOrders(res.data["Store Details"]);
          }
          // console.log(res);
          // console.log(res.data["orders"]);
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
            <Orders image={noOrders} infoHead={details} children={Children} data={myOrders} type={"My Orders"} />
        </div>
    )
};

export const Children = ({id, customer, date, status, total}) => {
    return (
        <>
          <TableCell>{id}</TableCell>
          <TableCell>{customer}</TableCell>
          <TableCell>{date}</TableCell>
          <TableCell>
            <Status value={status}/>
          </TableCell>
          <TableCell>{total}</TableCell>
        </>
    )
};

export const Status = ({ value }) => {
    if (value === "Completed") {
      return <div className="rounded text-blue-800 bg-blue-100 text-sm px-2 py-1">{value}</div>;
    } else if (value === "Cancelled") {
      return <div className="rounded text-yellow-800 bg-yellow-100 text-sm px-2 py-1">{value}</div>;
    }
};

export default MyOrders;