import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './BookCard.css';
import { Book } from '../../../../../models/Book';
import { setDisplayLoan } from '../../../../../redux/slices/ModalSlice';
import { AppDispatch, RootState } from '../../../../../redux/ReduxStore';
import { setCurrentBook } from '../../../../../redux/slices/BookSlice';
import { useNavigate } from 'react-router-dom'; // Import navigate

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const user = useSelector((state: RootState) => state.authentication.loggedInUser);
  const dispatch: AppDispatch = useDispatch();
  const [available, setAvailable] = useState<boolean>(false);
  const navigate = useNavigate(); // Declare navigate

  // Check availability on mount and whenever `book.records` changes
  React.useEffect(() => {
    const isAvailable = book.records.length === 0 || book.records[0].status === 'AVAILABLE';
    setAvailable(isAvailable); // Update availability
  }, [book.records]);

  const handleLoan = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent the event from bubbling

    if (available && user?.type === 'EMPLOYEE') {
      dispatch(setCurrentBook(book)); // Set current book for loan
      dispatch(setDisplayLoan(true)); // Open loan modal
      setAvailable(false); // Update availability
      
      // Navigate to the book details page
      navigate(`/resource/${book.barcode}`);
    }
  };

  return (
    <div id="book-card" className="book-card">
      <img className="book-card-cover" src={book.cover} alt={book.title} />
      <div className="book-card-info">
        <h1 className="book-card-title">{book.title}</h1>
        <h3 className="book-card-author">{book.authors.join(', ')}</h3>
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