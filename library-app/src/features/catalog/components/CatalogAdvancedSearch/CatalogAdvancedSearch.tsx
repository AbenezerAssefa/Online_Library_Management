import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CatalogAdvancedSearch.css';

export const CatalogAdvancedSearch: React.FC = () => {
  const navigate = useNavigate();

  // Define references for each input field
  const isbnRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const genreRef = useRef<HTMLInputElement>(null);

  // Search function to build query string
  const search = () => {
    let query = ""; // Start query string

    if (isbnRef && isbnRef.current && isbnRef.current.value !== "") 
      query += `?barcode=${isbnRef.current.value}`;
    
    
    if (titleRef && titleRef.current && titleRef.current.value !== "") {
      query +=  query === '' ? `?title=${titleRef.current.value}`: `&title=${titleRef.current.value}`;
    }

    if (authorRef && authorRef.current && authorRef.current.value !== "") {
        query +=  query === '' ? `?author=${authorRef.current.value}` : `&author=${authorRef.current.value}`;
    }

    if (descriptionRef && descriptionRef.current && descriptionRef.current.value !== "") {
      query +=  query === '' ? `?description=${descriptionRef.current.value}`: `&description=${descriptionRef.current.value}`;
    }

    if (subjectRef && subjectRef.current && subjectRef.current.value !== "") {
        query +=  query === '' ? `?subject=${subjectRef.current.value}` : `&subject= ${subjectRef.current.value}`;
    }

    if (genreRef && genreRef.current && genreRef.current.value !== "") {
        query +=  query === '' ? `?genre=${genreRef.current.value}`: `&genere=${genreRef.current.value}`;
    }

    // Navigate to the search result page with query string
    navigate(`/catalog${query}`);
  };

  return (
    <div className="catalog-advanced-search">
      <h2>Advanced Book Search</h2>
      <p>Fill in as many or as few fields to narrow down your search results</p>
      <form className="catalog-advanced-search-form">
        <div className="catalog-advanced-form-input-group">
          <p>ISBN</p>
          <input 
            id="isbn" 
            className="catalog-advanced-form-input" 
            placeholder={"ISBN" }
            ref={isbnRef} 
          />
        </div>
        
        <div className="catalog-advanced-form-input-group">
          <p>Title</p>
          <input 
            id="title" 
            className="catalog-advanced-form-input" 
            placeholder={"Title" }
            ref={titleRef} 
          />
        </div>

        <div className="catalog-advanced-form-input-group">
          <p>Author</p>
          <input 
            id="author" 
            className="catalog-advanced-form-input" 
            placeholder={"Author" }
            ref={authorRef} 
          />
        </div>

        <div className="catalog-advanced-form-input-group">
          <p>Description</p>
          <input 
            id="description" 
            className="catalog-advanced-form-input" 
            placeholder={"Description" }
            ref={descriptionRef} 
          />
        </div>

        <div className="catalog-advanced-form-input-group">
          <p>Subject</p>
          <input 
            id="subject" 
            className="catalog-advanced-form-input" 
            placeholder={"Subject" }
            ref={subjectRef} 
          />
        </div>

        <div className="catalog-advanced-form-input-group">
          <p>Genre</p>
          <input 
            id="genre" 
            className="catalog-advanced-form-input" 
            placeholder={"Genre" }
            ref={genreRef} 
          />
        </div>
      </form>

      <button 
        className="catalog-advanced-search-button" 
        onClick={search}
      >
        Search
      </button>
    </div>
  );
};

