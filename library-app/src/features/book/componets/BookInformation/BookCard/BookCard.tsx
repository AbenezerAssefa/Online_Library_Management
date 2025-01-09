import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './BookCard.css';
import { Book } from '../../../../../models/Book';
import { setDisplayLoan } from '../../../../../redux/slices/ModalSlice';
import { AppDispatch, RootState } from '../../../../../redux/ReduxStore';
import { setCurrentBook } from '../../../../../redux/slices/BookSlice';
import { useNavigate } from 'react-router-dom';
import { mapAuthorsToString } from '../../../utils/BookUtils';

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const user = useSelector((state: RootState) => state.authentication.loggedInUser);
  const dispatch: AppDispatch = useDispatch();
  const [available, setAvailable] = useState<boolean>(false);
  const navigate = useNavigate();

  // Check availability on mount and whenever `book.records` changes
  useEffect(() => {
    console.log("Book records:", book.records);
    const isAvailable = book.records.length === 0 || book.records[0].status === "AVAILABLE";
    setAvailable(isAvailable);
  }, [book.records]);
  
  // Navigate to book details
  const displayBook = () => {
    navigate(`/resource/${book.barcode}`); // Replace `/resource/:id` with your route path
  };
  const handleLoan = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  
    if (available) {
      dispatch(setCurrentBook(book));
      dispatch(setDisplayLoan(true));
    }
  };
  

  return (
    <div id="book-card" className="book-card" onClick={displayBook}>
      <img className="book-card-cover" src={book.cover} alt={`${book.title} cover`} />
      <div className="book-card-info">
        <h1 className="book-card-title">{book.title}</h1>
        <h3 className="book-card-author">{mapAuthorsToString(book)}</h3>
        <p className="book-card-description">{book.description}</p>
        <button
          className={`book-card-loan-button ${available ? 'available' : 'unavailable'}`}
          onClick={handleLoan}
        >
          Status: {available ? 'AVAILABLE' : 'UNAVAILABLE'}
        </button>
      </div>
    </div>
  );
};
