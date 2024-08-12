
import React from "react";

/**
 * Props for the CryptoTable component.
 * @interface CryptoTableProps
 */
interface CryptoTableProps {
  /** Array of cryptocurrency data to be displayed in the table. */
  currentData: any[];
  /** An object mapping cryptocurrency symbols to their respective price change colors. */
  priceChangeColors: { [key: string]: string };
  /** An object mapping cryptocurrency symbols to their respective volume change colors. */
  volumeChangeColors: { [key: string]: string };
  /** Function to get the SVG path for a given cryptocurrency symbol. */
  getSvgPath: (symbol: string) => string;
  /** Function to format numbers for display. */
  formatNumber: (num: number) => string;
  /** Function to get the color class for a given price change percentage. */
  getChangeColor: (change: number) => string;
  /** Function to get the icon for a given price change percentage. */
  getChangeIcon: (change: number) => JSX.Element;
}

/**
 * Component to display cryptocurrency data in a table format.
 * @component
 * @param {CryptoTableProps} props - The props for the CryptoTable component.
 * @returns {JSX.Element} The rendered CryptoTable component.
 */
const CryptoTable: React.FC<CryptoTableProps> = ({
  currentData,
  priceChangeColors,
  getSvgPath,
  formatNumber,
  getChangeColor,
  getChangeIcon,
}) => {
  return (
    <>
      <table className="w-3/4 table-auto border-gray-100 table">
        <thead className="bg-slate-100 border-b">
          <tr className="opacity-40 border-2">
            <th className="text-left w-2/5 ps-2">Crypto</th>
            <th className="text-right w-1/5">Price</th>
            <th className="text-right w-1/5 market-title">Market Value</th>
            <th className="w-1/5">24h Change</th>
          </tr>
        </thead>
        <tbody className="border-2">
          {currentData.map((crypto) => (
            <tr className="text-center h-14" key={crypto.symbol}>
              <td className="py-4 text-left flex leading-3">
                <img
                  width={20}
                  height={20}
                  className="rounded-full mx-2 pt-2"
                  src={getSvgPath(crypto.symbol)}
                  alt={crypto.symbol}
                />
                <span className="font-bold mt-3">
                  {crypto.symbol.replace("USDT", "")}
                </span>
                <span className="opacity-30 font-bold mt-3">/USDT</span>
              </td>
              <td
                className={`py-4 px-3 text-right font-semibold transition-colors duration-500 ${
                  priceChangeColors[crypto.symbol] || ""
                }`}
              >
                {parseFloat(crypto.lastPrice).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                <span className="text-xs opacity-70">USDT</span>
              </td>
              <td className="py-4 text-right font-semibold market-value">
                {formatNumber(parseFloat(crypto.quoteVolume))}
                <span className="text-xs opacity-70">USDT</span>
              </td>
              <td className="py-4 px-2 flex items-center justify-center">
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
    </>
  );
};

export default CryptoTable;
