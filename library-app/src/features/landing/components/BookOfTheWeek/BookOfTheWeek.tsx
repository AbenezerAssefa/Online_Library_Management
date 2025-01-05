import React from 'react';
import './BookOfTheWeek.css';
import { BookInformation } from '../../../book'; // Corrected import path

export const BookOfTheWeek: React.FC = () => {
  return (
    <div className="book-of-the-week">
      <h1>Book of the Week:</h1>
      <BookInformation
        book={{
          id: "1234", // Added the missing 'id' property
          barcode: "1234",
          cover: "https://m.media-amazon.com/images/I/81cKlgbyKoL._UF1000,1000_QL80_.jpg",
          title: "Java: The Ultimate Beginner's Guide to Learn Java Quickly With No Prior Experience",
          authors: ["Mark Reed"],
          description: "Immerse yourself in the wealth of notions, exercises, and practical examples made easily digestible for effortless learning and prompt gratification. You will be amazed at the rapid progress as you move forward through the book's contents toward total savvy.",
          subjects: ["java", "learning"],
          publicationDate: new Date("2020-01-01"),
          publisher: "Some Publisher",
          pages: 200,
          genre: "Non-fiction",
          records: [],
        }}
      />
    </div>
  );
};
