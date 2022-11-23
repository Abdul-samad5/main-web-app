import axios from "axios";
// import { UserContext } from "../context/UserContext";
// import React, { useContext } from "react";

export const BASE_URL = "https://yetti-backend.herokuapp.com/api/v1/";

const token = "LrryO2PtOqGDL5jjrBQ9inh7fRXSmV7X9QSl4ejYAJYn342VMVZ2RUOJDaF0RUW9";
// const { userData } = useContext(UserContext); 

// Load ALL countries from countries endpoint
let countries = [];
axios.get("https://restcountries.com/v3.1/all").then(function (response) {
  const countryInfo = response.data;
  for (const value of countryInfo.values()) {
    let country = value.name.common;
    countries.push(country);
  }

  // Sort in alphabetical order
  countries.sort();
});

const config = {
  withCredentials: true, 
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    Authorization: `${token}`,
    "Content-Type": "application/json"
  }
}

// Register endpoint
const postUser = (user) => axios.post(`${BASE_URL}auth/register/seller`, user, config);

// Store endpoint
const postStore = (store) => axios.post(`${BASE_URL}store/create_store`, store);

// Login endpoint
const userLogin = (user) => axios.post(`${BASE_URL}auth/login`, user);


// add product
const addProduct = (product) => axios.post(`${BASE_URL}product/`, product, config);

// Buyer endpoints
const createOrder = (order) => axios.post(`${BASE_URL}buyer/order_history/create/`, order, config);

const deleteOrder = (buyer_id) => axios.delete(`${BASE_URL}buyer/order_history/delete/${buyer_id}`, config);

const getRecords = () => axios.get(`${BASE_URL}buyer/order_history/records`, config);

const getOrderHistoryUpdate = (buyer_id) => axios.get(`${BASE_URL}buyer/order_history/update/${buyer_id}`, config);

const putOrderHistory = (buyer_id, OrderHistory) => axios.put(`${BASE_URL}buyer/order_history/update/${buyer_id}`, OrderHistory, config);

const patchOrderHistory = (buyer_id, OrderHistory) => axios.patch(`${BASE_URL}buyer/order_history/update/${buyer_id}`, OrderHistory, config);

const getOrderHistory = (buyer_id) => axios.get(`${BASE_URL}buyer/order_history/${buyer_id}`, config);

export { 
  countries, postUser, postStore, 
  userLogin, addProduct, createOrder, 
  deleteOrder, getRecords, getOrderHistoryUpdate, 
  putOrderHistory, patchOrderHistory, getOrderHistory};
