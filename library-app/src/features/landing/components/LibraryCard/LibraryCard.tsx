import React from 'react';
import { useDispatch } from 'react-redux';
import libraryCard from "../../../../assets/librarycard.png" // Corrected the import path
import './LibraryCard.css';
import { AppDispatch } from '../../../../redux/ReduxStore';
import { setDisplayLibraryCard } from '../../../../redux/slices/ModalSlice';

export const LibraryCard: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleDisplayModal = () => {
    dispatch(setDisplayLibraryCard(true));
  };

  return (
    <div className="get-library-card">
      <h2>Get A Library Card</h2>
      <img src={libraryCard} className="get-library-card-img" alt="Library Card" />
      <p>
        Learn how to get your own library card{' '}
        <span className="get-library-card-link" onClick={handleDisplayModal}>
          here.
        </span>
      </p>
    </div>
  );
};
