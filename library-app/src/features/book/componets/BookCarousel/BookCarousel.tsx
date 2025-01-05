import React, { useState } from 'react';
import './BookCarousel.css'; 
import { Book } from '../../../../models/Book'; 
import { BookCard } from '../../../../features/book';  

interface BookCarouselProps {
  books: Book[];
}

export const BookCarousel: React.FC<BookCarouselProps> = ({ books }) => {
  const [order, setOrder] = useState<Book[]>(books);

  const moveLeft = () => {
    const newOrder = [...order.slice(1), order[0]];
    setOrder(newOrder);
  };

  const moveRight = () => {
    const newOrder = [order[order.length - 1], ...order.slice(0, order.length - 1)];
    setOrder(newOrder);
  };

  return (
    <div className="book-carousel">
      <div 
        className="book-carousel-left-button" 
        onClick={moveLeft} 
        role="button" 
        tabIndex={0} 
        onKeyDown={(e) => e.key === 'ArrowLeft' && moveLeft()}
      >
        {'<'} {}
      </div>
      <div 
        className="book-carousel-right-button" 
        onClick={moveRight} 
        role="button" 
        tabIndex={0} 
        onKeyDown={(e) => e.key === 'ArrowRight' && moveRight()}
      >
        {'>'} {}
      </div>
      <div className="book-carousel-items">
        {order.map((item) => (
          <BookCard key={item.barcode} book={item} />
        ))}
      </div>
    </div>
  );
};
