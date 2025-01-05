export type User = {
    _id: string;
    type: 'ADMIN' | 'EMPLOYEE' | 'PATRON';
    firstName: string;
    lastName: string;
    email: string;
  };
  
  export interface LoginUserPayload {
    email: string;
    password:string;
  }

  export interface RegisterUserPayload  {
    type: 'ADMIN' | 'EMPLOYEE' | 'PATRON';
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };

  export interface FetchUserPayload  {
    [x: string]: any;
    userId: string;
    propery: 'loggedInUser' | 'profileUser' 
  }

  // src/models/LibraryCard.ts

export interface BookCard {
  _id: string; // Assuming each card has an _id field
  cardNumber: string;
  memberName: string;
  expirationDate: string;
  issuedDate: string;
  // Add more fields as necessary
}
