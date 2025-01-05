import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import './CatalogSearchPageNavigator.css';
import { RootState } from '../../../../redux/ReduxStore';
import { calculatePaging } from '../../utils/CatalogUtils';

export const CatalogSearchPageNavigator: React.FC = () => {
  const pagingInformation = useSelector((state: RootState) => state.book.pagingInformation);
  const navigate = useNavigate();
  const { search } = useLocation();

  // Helper function to update the query string and navigate
  const updatePageInSearch = (newPage: number) => {
    let newTerms = search.includes("&page=")
      ? search.split("&page=")[0] + `&page=${newPage}`
      : search + `&page=${newPage}`;
    navigate(`/catalog${newTerms}`);
  };

  const navigatePrevious = () => {
    if (pagingInformation && pagingInformation.currentPage > 1) {
      updatePageInSearch(pagingInformation.currentPage - 1);
    }
  };

  const navigateNext = () => {
    if (pagingInformation && pagingInformation.currentPage < pagingInformation.totalPages) {
      updatePageInSearch(pagingInformation.currentPage + 1);
    }
  };

  const navigateToNumber = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const pageNumber = Number(e.currentTarget.id);
    if (!isNaN(pageNumber)) {
      updatePageInSearch(pageNumber);
    }
  };

  return (
    <div className="catalog-search-page-navigator">
      <p className="catalog-search-page-navigator-navigate" onClick={navigatePrevious}>
        Prev
      </p>
      <div className="catalog-search-page-numbers">
        {pagingInformation &&
          calculatePaging(pagingInformation).map((num) => {
            if (Number(num) === pagingInformation.currentPage) {
              return (
                <p key={num} className="catalog-search-number number active">
                  {num}
                </p>
              );
            }
            return (
              <p
                key={num}
                id={num}
                className="catalog-search-page-number"
                onClick={navigateToNumber}
              >
                {num}
              </p>
            );
          })}
      </div>
      <p className="catalog-search-page-navigator-navigate" onClick={navigateNext}>
        Next
      </p>
    </div>
  );
};
