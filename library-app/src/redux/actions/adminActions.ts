export const fetchUsers = () => {
    return (dispatch: any) => {
      fetch('/api/users')
        .then(response => response.json())
        .then(data => {
          dispatch({ type: 'FETCH_USERS_SUCCESS', payload: data });
        })
        .catch(error => {
          dispatch({ type: 'FETCH_USERS_ERROR', payload: error });
        });
    };
  };
  