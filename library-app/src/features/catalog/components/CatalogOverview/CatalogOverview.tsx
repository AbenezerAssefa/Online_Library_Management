import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CatalogOverview.css';
import { AppDispatch, RootState } from '../../../../redux/ReduxStore';
import { fetchAllBooks } from '../../../../redux/slices/BookSlice';
import { generateRandomGenres, getRandomBooksByGenre } from '../../utils/CatalogUtils';
import { CatalogOverviewSection } from '../CatalogeOverviewSection/CatalogeOverviewSection';

export const CatalogOverview: React.FC = () => {
  const bookState = useSelector((state: RootState) => state.book);
  const userState = useSelector((state: RootState) => state.user); // Access user state here
  const dispatch: AppDispatch = useDispatch();

  const [genres, setGenres] = useState<string[]>(() => generateRandomGenres());
  const [currentBookIndex, setCurrentBookIndex] = useState<number>(0); // Initial index set to 0

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  // Check loading state
  if (bookState.loading) {
    return <div>Loading...</div>;
  }

  // Check if there are books to display
  if (bookState.books.length === 0) {
    return <div>No books available at the moment.</div>;
  }

  // Function to show the next set of 4 books
  const showBooks = (books: any[]) => books.slice(currentBookIndex, currentBookIndex + 4);



  // Handlers for Edit and Delete buttons (to be implemented)
  const handleEdit = (bookId: string) => {
    console.log('Edit book with id:', bookId);
    // Implement edit functionality
  };

  const handleDelete = (bookId: string) => {
    console.log('Delete book with id:', bookId);
    // Implement delete functionality
  };

  return (
    <div className="catalog-overview">
      <h2>
        Welcome to our library! We currently have {bookState.books.length} books.
      </h2>
      <h4>
        Browse our selected books below, or search for something using the top navigation bar.
      </h4>

      {/* Display books by genres */}
      {genres.map((genre) => {
        const booksByGenre = getRandomBooksByGenre(genre, bookState.books);

        return (
          <div key={genre}>
            <CatalogOverviewSection
              books={showBooks(booksByGenre)} // Show 4 books based on current index
              label={genre}
            />
          </div>
        );
      })}

      {/* Render "Edit" and "Delete" buttons for admin */}
      {userState.role === 'admin' && (
        <div className="admin-controls">
          <h3>Admin Controls</h3>
          {/* Loop through the displayed books and show Edit/Delete buttons */}
          {showBooks(bookState.books).map((book) => (
            <div key={book.id} className="admin-buttons">
              <button onClick={() => handleEdit(book.id)}>Edit</button>
              <button onClick={() => handleDelete(book.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}

   

    </div>
  );
};
