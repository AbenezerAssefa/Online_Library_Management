import React, { useState } from 'react';
import './BookCarousel.css'; // Ensure the correct path to the CSS file
import { Book } from '../../models/Book'; // Adjust the path to your Book model
import { BookCard } from '../../features/book/componets/BookInformation/BookCard/BookCard'; // Assuming BookCard component exists

interface BookCarouselProps {
  books: Book[];
}

export const BookCarousel: React.FC<BookCarouselProps> = ({ books }) => {
  const [order, setOrder] = useState<Book[]>(books);

  const moveLeft = () => {
    let item = order[0];
    let reordered = order.slice(1, order.length);
    reordered.push(item);
    setOrder(reordered);
  };

  const moveRight = () => {
    let item = order[order.length - 1];
    let reordered = order.slice(0, order.length - 1);
    reordered = [item, ...reordered]; // Corrected the spread operator usage
    setOrder(reordered);
  };

  return (
    <div className="book-carousel">
      <div className="book-carousel-left-button" onClick={moveLeft}>
        {'<'} {/* You can replace this with an actual arrow or icon */}
      </div>
      <div className="book-carousel-right-button" onClick={moveRight}>
        {'>'} {/* You can replace this with an actual arrow or icon */}
      </div>
      {order.map((item) => (
        <BookCard key={item.barcode} book={item} />
      ))}
    </div>
  );
};
