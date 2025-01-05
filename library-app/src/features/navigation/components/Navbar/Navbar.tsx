import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/ReduxStore'; // Adjust import paths as necessary
import { Book, Search } from '@mui/icons-material'; // Assuming you're using MUI icons
import { setDisplayLogin } from '../../../../redux/slices/ModalSlice';

export const Navbar: React.FC = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const authState = useSelector((state: RootState) => state.authentication);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchRef && searchRef.current && searchRef.current.value.length > 0) {
      navigate(`/catalog?barcode=${searchRef.current.value}&title=${searchRef.current.value}&description=${searchRef.current.value}`);
      searchRef.current.value = '';
    }
  }

  const handleSearchIconClick = () => {
    if (searchRef && searchRef.current && searchRef.current.value.length > 0 ) {
      navigate(`/catalog?barcode=${searchRef.current.value}&title=${searchRef.current.value}&description=${searchRef.current.value}`);
      searchRef.current.value = '';
    }
  }

  const navigateToProfile = () => {
    if (authState.loggedInUser) 
      navigate(`/profile/${authState.loggedInUser._id}`);
    }
  

  const toggleLogin = () => {
    dispatch( setDisplayLogin(true)); // Adjust with the actual action for showing login modal
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo-section">
        <Book sx={{ fontSize: '3rem' }} /> {/* Book icon from Material UI */}
        <h1>My Library</h1>
      </Link>
      <div className="navbar-option-section">
        <Link to="/catalog" className="navbar-option navbar-link">
          <h2>View Catalog</h2>
        </Link>
        <div className="navbar-search-box">
          <input
            className="navbar-search-input"
            placeholder="Search Catalog"
            onKeyDown={handleEnterKey}
            ref={searchRef}
          />
          <Search
            onClick={handleSearchIconClick}
            sx={{ cursor: 'pointer', fontSize: '2rem' }} // Search icon from Material UI
          />
        </div>
        {authState.loggedInUser ? 
          <div className="navbar-option" onClick={navigateToProfile}>
            <h2>{authState.loggedInUser.firstName}'s Account</h2>
          </div>
         : 
          <div className="navbar-option" onClick={toggleLogin}>
            <h2>Login</h2>
          </div>
        }
      </div>
    </nav>
  )
}
