import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/ReduxStore'; // Make sure this import path is correct
import { BookInformation } from '../..'; 
import './BookOverview.css'; // Corrected the import syntax
import { BookSubjects } from '../BookSubjects/BookSubjects';
import { BookAdditionalInfo } from '../BookAdditionalInfo/BookAdditionalInfo';
import { BookHistory } from '../BookHistory/BookHistory';

export const BookOverview: React.FC = () => {
  const bookState = useSelector((state: RootState) => state.book);
  const user = useSelector((state: RootState) => state.authentication.loggedInUser);

  return (
    <div className="book-overview">
      {
      bookState.currentBook && !bookState.loading && 
      <>
        <BookInformation book={bookState.currentBook} />
        <BookSubjects subjects={bookState.currentBook.subjects} />
        <BookAdditionalInfo book={bookState.currentBook} />
        {user?.type === 'EMPLOYEE' && <BookHistory book={bookState.currentBook}/>}
      </>
       
}
    </div>
  )
}
