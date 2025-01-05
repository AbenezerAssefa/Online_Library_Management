import React from 'react';
import { useDispatch } from 'react-redux'; // Correct import for useDispatch
import { AppDispatch, RootState } from '../../../../redux/ReduxStore'; // Correct path for AppDispatch
import { setDisplayLibraryCard } from '../../../../redux/slices/ModalSlice'; // Correct path and function name
import { Modal } from '../../../../components';
import { RegisterLibraryCardForm } from '../RegisterLibraryCardForm/RegisterLibraryCardForm';

export const LibraryCardModal: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const closeModal = () => {
    dispatch(setDisplayLibraryCard(false)); // Dispatch action with false
  };

  return (
    <Modal content={<RegisterLibraryCardForm/>} toggleModal={closeModal} />
  );
};
