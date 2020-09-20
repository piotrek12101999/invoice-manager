interface FirestoreDocument {
  id: string;
}

export interface User extends FirestoreDocument {
  NIP: string;
  PKD: string[];
  REGON: string;
  account: string;
  balance: number;
  companyName: string;
  email: string;
  name: string;
  phoneNumber: string;
  primaryPKD: string;
  profilePicture: string;
}

export interface Customer extends FirestoreDocument {
  NIP: string;
  REGON?: string;
  name: string;
  street: string;
  city: string;
  postalCode: string;
  mailingList: string[];
}

export interface Invoice extends FirestoreDocument {
  test: string;
}
