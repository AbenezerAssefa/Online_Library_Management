export class UnableToSaveUserError extends Error {
    constructor(message: string) {
      super(message); // Pass the message to the parent Error class
    
    }
  }

  export class InvalidUsernameOrPasswordError extends Error{
    constructor(message:string){
      super(message);
    }
  }
  
  export class UserDoesNotExistError extends Error {
    constructor(message:string){
      super(message);
    }
  }

  export class BookDoesNotExistError extends Error {
    constructor(message:string){
      super(message);
    }
  }

  export class LibraryCardDoesNotExistError extends Error {
    constructor(message:string){
      super(message);
    }
  }

  export class LoanRecordDoesNotExist extends Error {
    constructor(message:string){
      super(message);
    }
  }