import React, { useEffect } from "react";
import useCryptoStore from "./Store";

import "./App.css";

function App () {
  
  const { cryptoData, fetchCryptoData, currentPage, itemsPerPage } =
    useCryptoStore();

 

  const getSvgPath = (symbol: string) => {
    const baseSymbol = symbol.replace("USDT", "");
    return `https://cdn.bilira.co/symbol/svg/${baseSymbol}.svg`;
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
    fetchCryptoData()
    const intervalId = setInterval(fetchCryptoData, 3000);
    return () => clearInterval(intervalId);
  }, []);

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
                  {crypto.symbol.replace("USDT", "")}
                  <span className="opacity-60">/USDT</span>
                </td>
                <td className="py-4 text-right">
                  {parseFloat(crypto.lastPrice).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  <span className="text-xs opacity-70">USDT</span>
                </td>

                <td className="py-4 text-right">
                  {formatNumber(parseFloat(crypto.quoteVolume))}
                  <span className="text-xs opacity-70">USDT</span>
                </td>
                <td className="py-4">
                  {parseFloat(crypto.priceChangePercent).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
 
      {/* https://cryptofonts.com/img/SVG/doge.svg */}
    </div>
  );
}

export default App;