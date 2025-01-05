import React, { useEffect, useState } from 'react';
import './RegisterForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/ReduxStore';
import { registerUser, resetRegisterSuccess } from '../../../../redux/slices/AuthenticationSlice';

interface RegisterFormProps {
  toggleLogin(): void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ toggleLogin }) => {
  const authState = useSelector((state: RootState) => state.authentication);
  const dispatch: AppDispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegisterUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.email && formData.password) {
      dispatch(registerUser({ type: 'PATRON', ...formData }));
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetRegisterSuccess());
    };
  }, [dispatch]);

  return (
    <form className="register-form">
      <h2>Enter your information</h2>
      {authState.error && (
        <p className="register-form-error">There was an error registering.</p>
      )}
      <div className="register-form-name-group">
        <div className="register-form-name-input-group">
          <h6>First Name</h6>
          <input
            id="first-name"
            className="register-form-input-name"
            placeholder="First"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            autoComplete="given-name"
          />
        </div>
        <div className="register-form-name-input-group">
          <h6>Last Name</h6>
          <input
            id="last-name"
            className="register-form-input-name"
            placeholder="Last"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            autoComplete="family-name"
          />
        </div>
      </div>
      <div className="register-form-input-group">
        <h6>Email</h6>
        <input
          id="email"
          className="register-form-input"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
      </div>
      <div className="register-form-input-group">
        <h6>Password</h6>
        <input
          id="password"
          className="register-form-input"
          placeholder="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />
      </div>
      <button
        className="register-form-submit"
        onClick={handleRegisterUser}
        disabled={authState.loading}
      >
        {authState.loading ? 'Registering...' : 'Register'}
      </button>
      {authState.registerSuccess && (
        <p>
          Registered Successfully.
          <span
            className="register-form-login"
            onClick={toggleLogin}
          >
            Login here.
          </span>
        </p>
      )}
    </form>
  );
};
