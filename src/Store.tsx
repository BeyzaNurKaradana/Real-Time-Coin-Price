

import { create } from 'zustand';

/**
 * Represents the structure of cryptocurrency data from Binance API.
 * @interface CryptoData
 */
interface CryptoData {
  /** Symbol representing the cryptocurrency pair. */
  symbol: string;
  /** Last price of the cryptocurrency. */
  lastPrice: string;
  /** Quote volume of the cryptocurrency. */
  quoteVolume: string;
  /** Percentage change in price over the last 24 hours. */
  priceChangePercent: string;
}

/**
 * State management for cryptocurrency data and pagination.
 * @interface CryptoState
 */
interface CryptoState {
  /** Array of cryptocurrency data. */
  cryptoData: CryptoData[];
  /** Current page number in pagination. */
  currentPage: number;
  /** Number of items per page. */
  itemsPerPage: number;
  /** Total number of pages for pagination. */
  totalPages: number;
  /** Function to fetch cryptocurrency data from Binance API. */
  fetchCryptoData: () => void;
  /** Function to set the current page number. */
  setPage: (page: number) => void;
}

/**
 * Zustand store for managing cryptocurrency data and pagination.
 * @function useCryptoStore
 */
const useCryptoStore = create<CryptoState>((set) => ({
  cryptoData: [],
  currentPage: 1,
  itemsPerPage: 10,
  totalPages: 0,
  /**
   * Fetches cryptocurrency data from Binance API, filters the data to include only pairs ending with "USDT",
   * and updates the state.
   * @async
   * @function fetchCryptoData
   * @returns {Promise<void>}
   */
  fetchCryptoData: async () => {
    try {
      const response = await fetch("https://api.binance.com/api/v3/ticker/24hr");
      const data = await response.json();

      const filteredData = data.filter((item: CryptoData) =>
        item.symbol.endsWith("USDT")
      );

      set({
        cryptoData: filteredData,
        totalPages: Math.ceil(filteredData.length / 10),
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  /**
   * Sets the current page number for pagination.
   * @function setPage
   * @param {number} page - The page number to set.
   */
  setPage: (page: number) => set({ currentPage: page }),
}));

export default useCryptoStore;
