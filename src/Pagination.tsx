
import React from 'react';
import useCryptoStore from './Store';
import "./index.css"

/**
 * Pagination component for navigating through pages of cryptocurrency data.
 * @component
 * @returns {JSX.Element} The rendered Pagination component.
 */
const Pagination: React.FC = () => {
  const { currentPage, totalPages, setPage } = useCryptoStore();

  /**
   * Generates an array of page numbers for pagination, including ellipses to indicate skipped pages.
   * @function generatePageNumbers
   * @returns {(number|string)[]} An array of page numbers and ellipses.
   */
  const generatePageNumbers = () => {
    const pages = [];
    const maxPageButtons = 3; 

    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= maxPageButtons - 1) {
        for (let i = 1; i <= maxPageButtons; i++) {
          pages.push(i);
        }
        pages.push('...', totalPages);
      } else if (currentPage >= totalPages - 1) {
        pages.push(1, '...');
        for (let i = totalPages - (maxPageButtons - 1); i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1, '...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...', totalPages);
      }
    }
    return pages;
  };

  /**
   * Handles the change event for the page select dropdown, updating the current page.
   * @function handlePageChange
   * @param {React.ChangeEvent<HTMLSelectElement>} event - The change event from the select element.
   */
  const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(Number(event.target.value));
  };

  return (
    <div className="pagination">
      <select value={currentPage} onChange={handlePageChange} className="pagination-dropdown">
        {Array.from({ length: totalPages }, (_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
      <div className="pagination-buttons">
        {generatePageNumbers().map((page, index) =>
          page === '...' ? (
            <span key={index}>...</span>
          ) : (
            <button
              key={index}
              onClick={() => setPage(page as number)}
              className={`pagination-button ${currentPage === page ? 'active' : ''}`}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Pagination;
