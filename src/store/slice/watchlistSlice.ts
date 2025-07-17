import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StockItem {
  symbol: string;
  name: string;
  price: string;
  changePercentage: string;
}

export interface Watchlist {
  name: string;
  stocks: StockItem[];
}

interface WatchlistState {
  lists: Watchlist[];
}

const initialState: WatchlistState = {
  lists: [],
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    createWatchlist: (state, action: PayloadAction<string>) => {
      if (!state.lists.find(w => w.name === action.payload)) {
        state.lists.push({ name: action.payload, stocks: [] });
      }
    },
    addStockToWatchlist: (
      state,
      action: PayloadAction<{ watchlistName: string; stock: StockItem }>,
    ) => {
      const { watchlistName, stock } = action.payload;
      const list = state.lists.find(w => w.name === watchlistName);
      if (list && !list.stocks.find(s => s.symbol === stock.symbol)) {
        list.stocks.push(stock);
      }
    },
    removeStockFromWatchlist: (
      state,
      action: PayloadAction<{ watchlistName: string; symbol: string }>,
    ) => {
      const { watchlistName, symbol } = action.payload;
      const list = state.lists.find(w => w.name === watchlistName);
      if (list) {
        list.stocks = list.stocks.filter(s => s.symbol !== symbol);
      }
    },
    deleteWatchlist: (state, action: PayloadAction<string>) => {
      state.lists = state.lists.filter(w => w.name !== action.payload);
    },
  },
});

export const {
  createWatchlist,
  addStockToWatchlist,
  removeStockFromWatchlist,
  deleteWatchlist,
} = watchlistSlice.actions;

export default watchlistSlice.reducer;
