export interface User {
  NIP: string;
  PKD: string[];
  REGON: string;
  account: string;
  companyName: string;
  email: string;
  name: string;
  phoneNumber: string;
  primaryPKD: string;
  profilePicture: string;
}

export interface Customer {
  id: string;
  name: string;
}

export interface Invoice {
  id: string;
  test: string;
}
