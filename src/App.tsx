/* import React, { useEffect, useState } from "react";
import useCryptoStore from "./Store";
import "./App.css";
import Pagination from "./Pagination";

function App() {
  const { cryptoData, fetchCryptoData, currentPage, itemsPerPage } =
    useCryptoStore();

    const [previousPrices, setPreviousPrices] = useState<{ [key: string]: number }>({});
    const [priceChangeColors, setPriceChangeColors] = useState<{ [key: string]: string }>({});
    const [previousVolumes, setPreviousVolumes] = useState<{ [key: string]: number }>({});
    const [volumeChangeColors, setVolumeChangeColors] = useState<{ [key: string]: string }>({});

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




  useEffect(() => {
    currentData.forEach((crypto) => {
      const lastPrice = parseFloat(crypto.lastPrice);
      const prevPrice = previousPrices[crypto.symbol];
      const lastVolume = parseFloat(crypto.quoteVolume);
      const prevVolume = previousVolumes[crypto.symbol];

      if (prevPrice !== undefined && prevPrice !== lastPrice) {
        const newColor = lastPrice > prevPrice ? "text-green-500" : "text-red-500";
        setPriceChangeColors((prevColors) => ({
          ...prevColors,
          [crypto.symbol]: newColor,
        }));

        setTimeout(() => {
          setPriceChangeColors((prevColors) => ({
            ...prevColors,
            [crypto.symbol]: "", 
          }));
        }, 500);
      }


      if (prevVolume !== undefined && prevVolume !== lastVolume) {
        const newColor = lastVolume > prevVolume ? "text-green-500" : "text-red-500";
        setVolumeChangeColors((prevColors) => ({
          ...prevColors,
          [crypto.symbol]: newColor,
        }));

        setTimeout(() => {
          setVolumeChangeColors((prevColors) => ({
            ...prevColors,
            [crypto.symbol]: "", // Reset color
          }));
        }, 500);
      }

      setPreviousPrices((prevPrices) => ({
        ...prevPrices,
        [crypto.symbol]: lastPrice,
      }));

      setPreviousVolumes((prevVolumes) => ({
        ...prevVolumes,
        [crypto.symbol]: lastVolume,
      }));
    });
  }, [currentData]);





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
      <div className="flex flex-col mt-9   rounded  items-center">
        <table className="w-3/4 table-auto border-gray-100">
          <thead className="bg-slate-100 border-b ">
            <tr className="opacity-40 ">
              <th className="text-left w-2/5" >Crypto</th>
              <th className="text-right w-1/5">Price</th>
              <th className="text-right w-1/5">Market Value</th>
              <th className="w-1/5">24h Change</th>
            </tr>
          </thead>
          <tbody className="border-2">
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
                  <span className="font-bold">
                    {crypto.symbol.replace("USDT", "")}
                  </span>
                  <span className="opacity-30 font-bold" >/USDT</span>
                </td>
                <td className={`py-4 text-right font-semibold transition-colors duration-500 ${
                    priceChangeColors[crypto.symbol] || ""
                  }`}>
                  {parseFloat(crypto.lastPrice).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  <span className="text-xs opacity-70">USDT</span>
                </td>

                <td className={`py-4 text-right font-semibold transition-colors duration-500 ${
                    volumeChangeColors[crypto.symbol] || ""
                  }`}>
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
      </div>
      <div className="pagination mt-2 w-3/4 mx-auto">
          <Pagination />
        </div>
    </div>
  );
}

export default App; 
 */

import React, { useEffect } from "react";
import useCryptoStore from "./Store";
import "./App.css";
import Pagination from "./Pagination";
import PriceChangeHandler from "./PriceChangeHandler";

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
      <div className="flex flex-col mt-9   rounded  items-center">
        <table className="w-3/4 table-auto border-gray-100">
          <thead className="bg-slate-100 border-b ">
            <tr className="opacity-40 ">
              <th className="text-left w-2/5">Crypto</th>
              <th className="text-right w-1/5">Price</th>
              <th className="text-right w-1/5">Market Value</th>
              <th className="w-1/5">24h Change</th>
            </tr>
          </thead>
          <tbody className="border-2">
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
                  <span className="font-bold">
                    {crypto.symbol.replace("USDT", "")}
                  </span>
                  <span className="opacity-30 font-bold">/USDT</span>
                </td>
                <td
                  className={`py-4 text-right font-semibold transition-colors duration-500 ${
                    priceChangeColors[crypto.symbol] || ""
                  }`}
                >
                  {parseFloat(crypto.lastPrice).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  <span className="text-xs opacity-70">USDT</span>
                </td>

                <td
                  className={`py-4 text-right font-semibold transition-colors duration-500 ${
                    volumeChangeColors[crypto.symbol] || ""
                  }`}
                >
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
      </div>
      <div className="pagination mt-2 w-3/4 mx-auto">
        <Pagination />
      </div>
    </div>
  );
}

export default App;





 


 



