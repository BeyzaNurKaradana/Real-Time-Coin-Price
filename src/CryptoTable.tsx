import React from "react";

interface CryptoTableProps {
  currentData: any[];
  priceChangeColors: { [key: string]: string };
  volumeChangeColors: { [key: string]: string };
  getSvgPath: (symbol: string) => string;
  formatNumber: (num: number) => string;
  getChangeColor: (change: number) => string;
  getChangeIcon: (change: number) => JSX.Element;
}

const CryptoTable: React.FC<CryptoTableProps> = ({
  currentData,
  priceChangeColors,
  volumeChangeColors,
  getSvgPath,
  formatNumber,
  getChangeColor,
  getChangeIcon,
}) => {
  return (
    <table className="w-3/4 table-auto border-gray-100">
      <thead className="bg-slate-100 border-b">
        <tr className="opacity-40">
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
  );
};

export default CryptoTable;
