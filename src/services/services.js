import axios from "axios";

export const BASE_URL = "https://yetti-backend.herokuapp.com/api/v1/";

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

// Register endpoint
const postUser = (user) => axios.post(`${BASE_URL}auth/register/seller`, user);

// Store endpoint
const postStore = (store) => axios.post(`${BASE_URL}store/create_store`, store);

// Login endpoint
const userLogin = (user) => axios.post(`${BASE_URL}auth/login`, user);

export { countries, postUser, postStore, userLogin };
