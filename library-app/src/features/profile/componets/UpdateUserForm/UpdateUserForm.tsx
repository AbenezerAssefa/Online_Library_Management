import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './UpdateUserForm.css';
import { AppDispatch, RootState } from '../../../../redux/ReduxStore';
import { User } from '../../../../models/User';
import { Create } from '@mui/icons-material';
import { UpdateUser,  resetUser } from '../../../../redux/slices/AuthenticationSlice';

export const UpdateUserForm: React.FC = () => {
  const userState = useSelector((state: RootState) => state.authentication);
  const dispatch: AppDispatch = useDispatch();
  const [displayUpdate, setDisplayUpdate] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>(userState.profileUser);
  const navigate = useNavigate();

  // Handle input change and update user state
  const updateUserState = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayUpdate(true);
    if (e.target.value && e.target.name && user) {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
  };

  // Submit updated user information
  const submitUpdatedUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (user) {
      dispatch(UpdateUser(user)); // Dispatch action to update the user in the store
      setDisplayUpdate(false);
    }
  };

  // Handle logout functionality
  const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.removeItem('userId'); // Adjust based on your storage key
    dispatch(resetUser('loggedInUser'));
    dispatch(resetUser('profileUser'));
    navigate('/');
  };

  // Sync user profile with Redux state
  useEffect(() => {
    if (userState.profileUser) {
      setUser(userState.profileUser);
    }
  }, [userState.profileUser]);

  return (
    <form className="update-user-form">
      <div className="update-user-input-group">
        <h4>First Name:</h4>
        <input
          className="update-user-input"
          name="firstName"
          value={user?.firstName}
          onChange={updateUserState}
          disabled={userState.loggedInUser?._id !== userState.profileUser?._id}
        />
        {userState.loggedInUser?._id === userState.profileUser?._id && (
          <Create sx={{ position: 'absolute', top: '65%', right: '0' }} />
        )}
      </div>

      <div className="update-user-input-group">
        <h4>Last Name:</h4>
        <input
          className="update-user-input"
          name="lastName"
          value={user?.lastName}
          onChange={updateUserState}
          disabled={userState.loggedInUser?._id !== userState.profileUser?._id}
        />
        {userState.loggedInUser?._id === userState.profileUser?._id && (
          <Create sx={{ position: 'absolute', top: '65%', right: '0' }} />
        )}
      </div>

      <div className="update-user-input-group">
        <h4>Email:</h4>
        <input
          className="update-user-input"
          name="email"
          value={user?.email}
          onChange={updateUserState}
          disabled={userState.loggedInUser?._id !== userState.profileUser?._id}
        />
        {userState.loggedInUser?._id === userState.profileUser?._id && (
          <Create sx={{ position: 'absolute', top: '65%', right: '0' }} />
        )}
      </div>

      {displayUpdate && (
        <button className="profile-button" onClick={submitUpdatedUser}>
          Update Profile
        </button>
      )}

      {userState.loggedInUser?._id === userState.profileUser?._id && (
        <button className="profile-button" onClick={logout}>
          Logout of Account
        </button>
      )}
    </form>
  );
};
