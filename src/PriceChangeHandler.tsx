
import { useEffect, useState } from "react";

interface Props {
  /**
   * The array of cryptocurrency data.
   * @type {any[]}
   */
  cryptoData: any[];

  /**
   * The current page number for pagination.
   * @type {number}
   */
  currentPage: number;

  /**
   * The number of items displayed per page.
   * @type {number}
   */
  itemsPerPage: number;
}

/**
 * Handles price changes and determines the color to display based on price fluctuations.
 * @component
 * @param {Props} props - The properties for the component.
 * @returns {{ priceChangeColors: { [key: string]: string } }} An object containing price change colors for each cryptocurrency.
 */
const PriceChangeHandler: React.FC<Props> = ({
  cryptoData,
  currentPage,
  itemsPerPage,
}) => {
  const [previousPrices, setPreviousPrices] = useState<{ [key: string]: number }>({});
  const [priceChangeColors, setPriceChangeColors] = useState<{ [key: string]: string }>({});

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = cryptoData.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    currentData.forEach((crypto) => {
      const lastPrice = parseFloat(crypto.lastPrice);
      const prevPrice = previousPrices[crypto.symbol];

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

      setPreviousPrices((prevPrices) => ({
        ...prevPrices,
        [crypto.symbol]: lastPrice,
      }));
    });
  }, [currentData]);

  return { priceChangeColors };
};

export default PriceChangeHandler;
