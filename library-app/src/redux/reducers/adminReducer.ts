interface User {
    id: number;
    username: string;
    email: string;
  }
  
  interface AdminState {
    users: User[];
    error: string | null;
  }
  
  const initialState: AdminState = {
    users: [],
    error: null,
  };
  
  const adminReducer = (state = initialState, action: any): AdminState => {
    switch (action.type) {
      case 'FETCH_USERS_SUCCESS':
        return { ...state, users: action.payload };
      case 'FETCH_USERS_ERROR':
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
  
  export default adminReducer;
  