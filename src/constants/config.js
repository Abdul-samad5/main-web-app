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
