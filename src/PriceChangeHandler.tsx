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
  const [previousVolumes, setPreviousVolumes] = useState<{ [key: string]: number }>({});
  const [volumeChangeColors, setVolumeChangeColors] = useState<{ [key: string]: string }>({});

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = cryptoData.slice(startIndex, startIndex + itemsPerPage);

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
            [crypto.symbol]: "",
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

  return { priceChangeColors, volumeChangeColors };
};

export default PriceChangeHandler;
