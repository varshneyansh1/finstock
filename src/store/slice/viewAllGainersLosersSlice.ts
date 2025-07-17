import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchTopGainersLosers } from '../../api';

interface StockItem {
  id: string;
  name: string;
  price: string;
  changePercentage: string;
  symbol?: string;
}

export type ViewAllType = 'gainers' | 'losers';

interface ViewAllState {
  allData: StockItem[];
  displayed: StockItem[];
  page: number;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  type: ViewAllType;
}

const PAGE_SIZE = 10;

const initialState: ViewAllState = {
  allData: [],
  displayed: [],
  page: 1,
  loading: false,
  loadingMore: false,
  error: null,
  type: 'gainers',
};

export const fetchViewAllGainersLosers = createAsyncThunk(
  'viewAllGainersLosers/fetch',
  async (type: ViewAllType, { rejectWithValue }) => {
    try {
      const data = await fetchTopGainersLosers();
      const items =
        (type === 'losers' ? data.top_losers : data.top_gainers) || [];
      const mapped = items.map((item: any, idx: number) => ({
        id: item.ticker + idx,
        name: item.ticker,
        price: item.price,
        changePercentage: item.change_percentage,
        symbol: item.ticker,
      }));
      return { mapped, type };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch data');
    }
  },
);

const viewAllGainersLosersSlice = createSlice({
  name: 'viewAllGainersLosers',
  initialState,
  reducers: {
    resetViewAllState: state => {
      state.allData = [];
      state.displayed = [];
      state.page = 1;
      state.loading = false;
      state.loadingMore = false;
      state.error = null;
    },
    loadMoreViewAll: state => {
      if (state.loadingMore || state.displayed.length >= state.allData.length)
        return;
      state.loadingMore = true;
      const nextPage = state.page + 1;
      const nextData = state.allData.slice(0, nextPage * PAGE_SIZE);
      state.displayed = nextData;
      state.page = nextPage;
      state.loadingMore = false;
    },
    setViewAllType: (state, action: PayloadAction<ViewAllType>) => {
      state.type = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchViewAllGainersLosers.pending, state => {
        state.loading = true;
        state.error = null;
        state.page = 1;
        state.displayed = [];
        state.allData = [];
      })
      .addCase(fetchViewAllGainersLosers.fulfilled, (state, action) => {
        state.loading = false;
        state.allData = action.payload.mapped;
        state.displayed = action.payload.mapped.slice(0, PAGE_SIZE);
        state.page = 1;
        state.error = null;
        state.type = action.payload.type;
      })
      .addCase(fetchViewAllGainersLosers.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to fetch data';
        state.allData = [];
        state.displayed = [];
      });
  },
});

export const { resetViewAllState, loadMoreViewAll, setViewAllType } =
  viewAllGainersLosersSlice.actions;
export default viewAllGainersLosersSlice.reducer;
