import { useEffect, useState } from "react";

interface Props {
  cryptoData: any[];
  currentPage: number;
  itemsPerPage: number;
}

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
