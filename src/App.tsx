
import React, { useEffect } from "react";
import useCryptoStore from "./Store";
import Pagination from "./Pagination";
import PriceChangeHandler from "./PriceChangeHandler";
import CryptoTable from "./CryptoTable";


function App() {
  const { cryptoData, fetchCryptoData, currentPage, itemsPerPage } =
    useCryptoStore();

  const { priceChangeColors, volumeChangeColors } = PriceChangeHandler({
    cryptoData,
    currentPage,
    itemsPerPage,
  });

  const getSvgPath = (symbol: string) => {
    const baseSymbol = symbol.replace("USDT", "").toLowerCase();
    return `https://cryptofonts.com/img/SVG/${baseSymbol}.svg`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1e12) {
      return (num / 1e12).toFixed(2) + "T";
    } else if (num >= 1e9) {
      return (num / 1e9).toFixed(2) + "B";
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(2) + "M";
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
  }, []);

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-green-500";
    if (change < 0) return "text-red-500";
    return "";
  };

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
          className="text-red-500 mr-2 "
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
          style={{ width: "12px", height: "12px", marginRight: "8px" }}
        ></div>
      );
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col mt-9 rounded items-center">
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
      <div className="pagination mt-2 w-3/4 mx-auto">
        <Pagination />
      </div>
    </div>
  );
}

export default App;






 


 



