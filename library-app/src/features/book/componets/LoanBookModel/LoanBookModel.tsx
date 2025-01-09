import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDisplayLoan } from '../../../../redux/slices/ModalSlice';
import { Modal } from '../../../../components';
import { AppDispatch, RootState } from '../../../../redux/ReduxStore';
import { BookCheckout } from '../BookCheckout/BookCheckout';
import { BookCheckin } from '../BookCheckIn/BookCheckIn'; 

export const LoanBookModal: React.FC = () => {
  const currentBook = useSelector((state: RootState) => state.book.currentBook);
  const dispatch: AppDispatch = useDispatch();

  const closeModal = () => {
    dispatch(setDisplayLoan(false));
  };

  const modalContent = currentBook ? (
    currentBook.records[0]?.status === 'AVAILABLE' ? (
      <BookCheckout />
    ) : (
      <BookCheckin />
    )
  ) : (
    <p>No book selected for loan management.</p>
  );

  return <Modal content={modalContent} toggleModal={closeModal} />;
};
