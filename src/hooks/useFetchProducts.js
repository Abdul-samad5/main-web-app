import { useState, useEffect } from "react";

// Function to get the products from the API endpoint using axios, useState, and useEffect.
const useFetchData = (url) => {
  // Stores a boolean as axios tries to retrieve the data from the API endpoint.
  const [isLoading, setIsLoading] = useState(true);

  // If axios encounters an error, this keeps track the error.
  const [isError, setIsError] = useState(false);

  // Stores the the data - products in this case - axios gets from the database.
  const [data, setData] = useState([]);

  async function fetchProducts() {
    try {
      const res = await url;
      if (res) {
        setData(res.data.data);
      }
      // console.log(res.data.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsError(true);
    }
  }

  useEffect(() => {
    fetchProducts();
  });

  return { isLoading, isError, data };
};

export default useFetchData;
