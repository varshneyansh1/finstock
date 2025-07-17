import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTopGainersLosers } from '../../api';

interface StockItem {
  id: string;
  name: string;
  price: string;
  changePercentage: string;
  symbol?: string;
}

interface TopGainersLosersState {
  gainers: StockItem[];
  losers: StockItem[];
  loading: boolean;
  error: string | null;
}

const initialState: TopGainersLosersState = {
  gainers: [],
  losers: [],
  loading: false,
  error: null,
};

export const fetchTopGainersLosersThunk = createAsyncThunk(
  'topGainersLosers/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchTopGainersLosers();
      return {
        gainers: (data.top_gainers || [])
          .slice(0, 4)
          .map((item: any, idx: number) => ({
            id: item.ticker + idx,
            name: item.ticker,
            price: item.price,
            changePercentage: item.change_percentage,
            symbol: item.ticker,
          })),
        losers: (data.top_losers || [])
          .slice(0, 4)
          .map((item: any, idx: number) => ({
            id: item.ticker + idx,
            name: item.ticker,
            price: item.price,
            changePercentage: item.change_percentage,
            symbol: item.ticker,
          })),
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch data');
    }
  },
);

const topGainersLosersSlice = createSlice({
  name: 'topGainersLosers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTopGainersLosersThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopGainersLosersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.gainers = action.payload.gainers;
        state.losers = action.payload.losers;
        state.error = null;
      })
      .addCase(fetchTopGainersLosersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to fetch data';
      });
  },
});

export default topGainersLosersSlice.reducer;
