import React, { useEffect } from "react";
import useCryptoStore from "./Store";

import "./App.css";
import Pagination from "./Pagination";

function App() {
  const { cryptoData, fetchCryptoData, currentPage, itemsPerPage } =
    useCryptoStore();

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
    const intervalId = setInterval(fetchCryptoData, 3000);
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
      
      return <div style={{ width: "12px", height: "12px", marginRight: "8px" }}></div>;
    }
  };




  return (
    <div className="container mx-auto">
      <div className="flex flex-col mt-9 border border-gray-100 rounded">
        <table className="w-full table-auto border-gray-100">
          <thead className="bg-slate-100 border-b ">
            <tr className="opacity-40 ">
              <th className="text-left">Crypto</th>
              <th className="text-right">Price</th>
              <th className="text-right">Market Value</th>
              <th>24h Change</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((crypto) => (
              <tr className="text-center" key={crypto.symbol}>
                <td className="py-4 text-left flex leading-5">
                  <img
                    width={20}
                    height={20}
                    className="rounded-full mx-2"
                    src={getSvgPath(crypto.symbol)}
                    alt={crypto.symbol}
                  />
                  <span className="font-semibold">
                    {crypto.symbol.replace("USDT", "")}
                  </span>
                  <span className="opacity-60">/USDT</span>
                </td>
                <td className="py-4 text-right font-semibold">
                  {parseFloat(crypto.lastPrice).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  <span className="text-xs opacity-70">USDT</span>
                </td>

                <td className="py-4 text-right font-semibold">
                  {formatNumber(parseFloat(crypto.quoteVolume))}
                  <span className="text-xs opacity-70">USDT</span>
                </td>
                <td className="py-4 flex items-center justify-center">
                  {getChangeIcon(parseFloat(crypto.priceChangePercent))}
                  <span
                    className={`font-semibold ${getChangeColor(
                      parseFloat(crypto.priceChangePercent)
                    )}`}
                  >
                    {parseFloat(crypto.priceChangePercent).toFixed(2)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <Pagination />
        </div>
      </div>
    </div>
  );
}

export default App;
