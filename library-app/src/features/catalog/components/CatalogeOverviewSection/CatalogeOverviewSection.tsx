import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from '../../../../models/Book';
import { BookCarousel } from '../../../book';
import './CatalogeOverviewSection.css';

interface CatalogOverviewSectionProps {
  books: Book[];
  label: string;
}

export const CatalogOverviewSection: React.FC<CatalogOverviewSectionProps> = ({ books, label }) => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    console.log(`Navigating to: /catalog/genre=${label}&subject=${label}`);
    navigate(`/catalog/genre=${label}&subject=${label}`);
  };

  console.log(`Books in section ${label}:`, books);

  return (
    <div className="catalog-overview-section">
      <div className="catalog-overview-section-top">
        <h4>{label}</h4>
        <p className="catalog-overview-section-more" onClick={handleViewMore}>View more...</p>
      </div>
      {books.length > 0 && <BookCarousel books={books} />}
    </div>
  );
};
