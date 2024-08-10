import { create } from 'zustand';

interface CryptoData {
  symbol: string;
  lastPrice: string;
  quoteVolume: string;
  priceChangePercent: string;
}

interface CryptoState {
  cryptoData: CryptoData[];
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  fetchCryptoData: () => void;
  setPage: (page: number) => void;
}

const useCryptoStore = create<CryptoState>((set) => ({
  cryptoData: [],
  currentPage: 1,
  itemsPerPage: 10,
  totalPages: 0,
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
  setPage: (page: number) => set({ currentPage: page }),
}));

export default useCryptoStore;