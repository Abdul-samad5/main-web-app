export class User {
  constructor(email, password, fullname) {
    this.email = email;
    this.password = password;
    this.full_name = fullname;
  }
}

export class Store {
  constructor(storeName, storeDomain) {
    this.store_name = storeName;
    this.store_domain = storeDomain;
  }
}

export const BASE_URL = "https://yetti-backend.herokuapp.com/api/v1/";
