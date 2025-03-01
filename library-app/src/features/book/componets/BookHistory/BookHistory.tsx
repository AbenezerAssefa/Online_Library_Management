import React from 'react';
import './BookHistory.css'; // Ensure the CSS file is correctly imported
import { Book } from '../../../../models/Book'; // Adjust path if necessary
import { BookHistoryItem } from '../BookHistoryItem/BookHistoryItem'; // Adjust path if necessary

interface BookHistoryProps {
  book: Book;
}

export const BookHistory: React.FC<BookHistoryProps> = ({ book }) => {
  return (
    <div className="book-history">
      <h2>Loan History</h2>
      <div className="book-history-box">
        {book.records.map((record) => (
          <BookHistoryItem key={record._id} record={record} />
        ))}
      </div>
    </div>
  );
};
