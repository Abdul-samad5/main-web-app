import React, {useState} from 'react';
import noReviews from '../assets/images/review.png'; 
import {styles} from '../constants/index';
import UserData from './UserData';

const details = ["Customer's name", "Order", "Date", "Amount", "Payment Method", "Status"];
const TransactionHistory = () => {
  // State to store the histories gotten from the API.
  const [transactionHistory, setTransactionHistory] = useState([]);

  // Function to update the state to the next five or so transaction histories gotten from the API.
  const handleNext = () => {
      setTransactionHistory((prev) => {
          return prev = [0, 2, 3];
      });
  }

  const handleTransactionSearch = (searchValue) => {
        // Logic to retrieve the details the user requires from the 
        // API and change the state to that affect
  }

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
            handleSearch={handleTransactionSearch}>

        </UserData>
      </div>
  )
}

// Child component of the transaction history meant to display each review and the date it was made.
const Children = ({id, name, order,  date, amount, paymentMethod, status}) => {
    
    return (
        <div className="flex justify-between">
            <p className='text-xs my-auto'>{id}</p>
            <p className='text-xs my-auto'>{name}</p>
            <p className='text-xs my-auto'>{order}</p>
            <p className='text-xs my-auto'>{date}</p>
            <p className='text-xs my-auto'>{amount}</p>
            <p className='text-xs my-auto'>{paymentMethod}</p>
            <Status value={status}/>
        </div>
    )
};


// Component that displays the current status of a transaction based on the value gotten from the API.
const Status = ({value}) => {
    if(value === "Completed") {
        return (
            <div className="rounded text-blue-800 bg-blue-100 text-sm px-2 py-2">{value}</div>
        )
    } else if(value === "Cancelled") {
        return (
            <div className="rounded text-yellow-800 bg-yellow-100 text-sm px-2 py-2">{value}</div>
        )
    }
}

export default TransactionHistory