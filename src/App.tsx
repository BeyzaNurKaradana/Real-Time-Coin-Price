

import React, { useState, useEffect } from 'react';
import useCryptoStore from './Store';
import Pagination from './Pagination';
import PriceChangeHandler from './PriceChangeHandler';
import CryptoTable from './CryptoTable';
import Modal from './Modal'; 

/**
 * Main application component for displaying cryptocurrency data.
 * @component
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  const [isModalOpen, setModalOpen] = useState(true); 

  const { cryptoData, fetchCryptoData, currentPage, itemsPerPage } =
    useCryptoStore();

  /**
   * Handles price and volume change colors based on the current data.
   * @function PriceChangeHandler
   * @param {Object} params - Parameters for PriceChangeHandler.
   * @param {any[]} params.cryptoData - Array of cryptocurrency data.
   * @param {number} params.currentPage - Current page number for pagination.
   * @param {number} params.itemsPerPage - Number of items per page.
   * @returns {Object} An object containing priceChangeColors and volumeChangeColors.
   */
  const { priceChangeColors, volumeChangeColors } = PriceChangeHandler({
    cryptoData,
    currentPage,
    itemsPerPage,
  });

  /**
   * Generates the SVG path for a given cryptocurrency symbol.
   * @function getSvgPath
   * @param {string} symbol - The cryptocurrency symbol.
   * @returns {string} The URL path to the SVG image.
   */
  const getSvgPath = (symbol: string) => {
    const baseSymbol = symbol.replace('USDT', '').toLowerCase();
    return `https://cryptofonts.com/img/SVG/${baseSymbol}.svg`;
  };

  /**
   * Formats a number to a readable string with suffixes for large numbers.
   * @function formatNumber
   * @param {number} num - The number to format.
   * @returns {string} The formatted number with a suffix.
   */
  const formatNumber = (num: number) => {
    if (num >= 1e12) {
      return (num / 1e12).toFixed(2) + 'T';
    } else if (num >= 1e9) {
      return (num / 1e9).toFixed(2) + 'B';
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(2) + 'M';
    } else {
      return num.toFixed(2);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = cryptoData.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    fetchCryptoData();
    const intervalId = setInterval(fetchCryptoData, 5000);
    return () => clearInterval(intervalId);
  }, [fetchCryptoData]);

  /**
   * Determines the color class for a given price change percentage.
   * @function getChangeColor
   * @param {number} change - The price change percentage.
   * @returns {string} The color class for the price change.
   */
  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-500';
    if (change < 0) return 'text-red-500';
    return '';
  };

  /**
   * Returns the appropriate icon based on the price change percentage.
   * @function getChangeIcon
   * @param {number} change - The price change percentage.
   * @returns {JSX.Element} The icon for the price change.
   */
  const getChangeIcon = (change: number) => {
    if (change > 0) {
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-green-500 mr-2"
        >
          <path
            d="M4.5 19.5L19.5 4.5M19.5 4.5L8.25 4.5M19.5 4.5V15.75"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      );
    } else if (change < 0) {
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-red-500 mr-2"
        >
          <path
            d="M4.5 4.5L19.5 19.5M19.5 19.5V8.25M19.5 19.5H8.25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      );
    } else {
      return (
        <div
          style={{ width: '12px', height: '12px', marginRight: '8px' }}
        ></div>
      );
    }
  };

  return (
    <div className="container mx-auto relative">
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50">
          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </div>
      )}
      <div className={`flex flex-col mt-9 rounded items-center ${isModalOpen ? 'opacity-0 pointer-events-none' : ''}`}>
        <CryptoTable
          currentData={currentData}
          priceChangeColors={priceChangeColors}
          volumeChangeColors={volumeChangeColors}
          getSvgPath={getSvgPath}
          formatNumber={formatNumber}
          getChangeColor={getChangeColor}
          getChangeIcon={getChangeIcon}
        />
      </div>
      <div className={`pagination mt-2 w-3/4 mx-auto ${isModalOpen ? 'opacity-0 pointer-events-none' : ''}`}>
        <Pagination />
      </div>
    </div>
  );
}

export default App;



