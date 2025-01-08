import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CatalogOverview.css';
import { AppDispatch, RootState } from '../../../../redux/ReduxStore';
import { fetchAllBooks } from '../../../../redux/slices/BookSlice';
import { generateRandomGenres, getRandomBooksByGenre } from '../../utils/CatalogUtils';
import { CatalogOverviewSection } from '../CatalogeOverviewSection/CatalogeOverviewSection';

export const CatalogOverview: React.FC = () => {
  const bookState = useSelector((state: RootState) => state.book);
  const dispatch: AppDispatch = useDispatch();

  const [genres, setGenres] = useState<string[]>(generateRandomGenres());

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  console.log('Books loaded:', bookState.books);
  console.log('Genres:', genres);

  if (bookState.loading) {
    return <div className="catalog-loading">Loading books...</div>;
  }

  if (!bookState.books.length) {
    return <div className="catalog-empty">No books available at the moment.</div>;
  }

  return (
    <div className="catalog-overview">
      <h2>Welcome to our library! We currently have {bookState.books.length} books.</h2>
      <h4>Browse our selected books below, or search for something using the top navigation bar.</h4>
      {genres.map((genre) => {
        const booksByGenre = getRandomBooksByGenre(genre, bookState.books);
        console.log(`Books for genre ${genre}:`, booksByGenre);
        return (
          <div key={genre} className="catalog-genre-section">
            <CatalogOverviewSection
              books={booksByGenre}
              label={genre}
            />
          </div>
        );
      })}
    </div>
  );
};
