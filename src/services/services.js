import axios from "axios";

export const BASE_URL = "https://yetti-backend.herokuapp.com/api/v1/";

const token = "LrryO2PtOqGDL5jjrBQ9inh7fRXSmV7X9QSl4ejYAJYn342VMVZ2RUOJDaF0RUW9"
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

export { countries, postUser, postStore, userLogin, addProduct };
