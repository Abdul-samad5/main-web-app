import React, { useState, useEffect, useContext } from "react";
import { noReviews } from '../assets'
import { styles } from "../constants/index";
import UserData from "./UserData";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { BASE_URL } from "../services/services";
import Cookies from "js-cookie";

const details = ["Payment ID", "User Email", "Ref Code", "Amount", "Status"];
const TransactionHistory = () => {
  // State to store the histories gotten from the API.
  const [transactionHistory, setTransactionHistory] = useState([]);

  // const {userData} = useContext(UserContext);
  const tk = Cookies.get("_tksr");
  const email = Cookies.get("_email");

  // Function to update the state to the next five or so transaction histories gotten from the API.
  const handleNext = () => {
    setTransactionHistory((prev) => {
      return (prev = [0, 2, 3]);
    });
  };

  const handleTransactionSearch = (searchValue) => {
    // Logic to retrieve the details the user requires from the
    // API and change the state to that affect
  };

  async function fetchTransactions() {
      try {
        const res = await axios.get(`${BASE_URL}payment/payment_history/success/${email}/`, 
        { headers: { Authorization: `Bearer ${tk}`} });
        console.log(res);
        setTransactionHistory(res.data.data);
        if(res.statusText !== "OK") return;
      } catch(error) {
        console.log(error);
      }
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <p className={`${styles.componentHeader}`}>Transaction History</p>
      <UserData
        type={"Transaction History"}
        image={noReviews}
        infoHead={details}
        data={transactionHistory}
        children={Children}
        handleNext={handleNext}
        handleSearch={handleTransactionSearch}
      ></UserData>
    </div>
  );
};

// Child component of the transaction history meant to display each review and the date it was made.
const Children = ({ id, paymentID, userEmail, refCode, amount, status }) => {
  return (
    <div className="flex justify-between">
      <p className={`${styles.valueStyle}`}>{id}</p>
      <p className={`${styles.valueStyle}`}>{paymentID}</p>
      <p className={`${styles.valueStyle}`}>{userEmail}</p>
      <p className={`${styles.valueStyle}`}>{refCode}</p>
      <p className={`${styles.valueStyle}`}>{amount}</p>
      <Status value={status} />
    </div>
  );
};

// Component that displays the current status of a transaction based on the value gotten from the API.
const Status = ({ value }) => {
  // pending, completed, cancelled, failed
  if (value === "failed") {
    return <div className="rounded text-red-800 bg-red-100 text-sm px-2 py-1">{value}</div>;
  } 
  if (value === "cancelled") {
    return <div className="rounded text-red-800 bg-red-100 text-sm px-2 py-1">{value}</div>;
  }
  if (value === "pending") {
    return <div className="rounded text-yellow-800 bg-yellow-100 text-sm px-2 py-1">{value}</div>;
  }

  return <div className="rounded text-green-800 bg-green-100 text-sm px-2 py-1">{value}</div>;
};

export default TransactionHistory;
