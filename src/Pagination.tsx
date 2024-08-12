import React from 'react';
import useCryptoStore from './Store';
import "./index.css"

const Pagination = () => {
  const { currentPage, totalPages, setPage } = useCryptoStore();

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