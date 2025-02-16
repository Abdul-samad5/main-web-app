export class User {
  constructor(email, password, fullname, user_type) {
    this.email = email;
    this.password = password;
    this.full_name = fullname;
    this.user_type = user_type;
  }
}

export class Store {
  constructor(storeName, storeDomain) {
    this.store_name = storeName;
    this.store_domain = storeDomain;
  }
}

export class BankDetails {
  constructor(bankName, accoutNumber, accountName) {
      this.bank_name = bankName;
      this.account_number = accoutNumber;
      this.account_name = accountName;
  }
}
