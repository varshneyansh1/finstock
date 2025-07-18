import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchCompanyOverview,
  fetchDailyTimeSeries,
  fetchWeeklyTimeSeries,
  fetchMonthlyTimeSeries,
  fetchGlobalQuote, 
} from '../../api';

interface DetailsState {
  companyData: any | null;
  chartData: any[];
  loading: boolean;
  error: string | null;
  selectedRange: '1D' | '1W' | '1M';
}

const initialState: DetailsState = {
  companyData: null,
  chartData: [],
  loading: false,
  error: null,
  selectedRange: '1D',
};

export const fetchDetailsData = createAsyncThunk(
  'details/fetchDetailsData',
  async (
    {
      symbol,
      selectedRange,
    }: { symbol: string; selectedRange: '1D' | '1W' | '1M' },
    { rejectWithValue },
  ) => {
    try {
     
      const [companyData, chartRaw, globalQuoteRaw] = await Promise.all([
        fetchCompanyOverview(symbol),
        selectedRange === '1D'
          ? fetchDailyTimeSeries(symbol)
          : selectedRange === '1W'
          ? fetchWeeklyTimeSeries(symbol)
          : fetchMonthlyTimeSeries(symbol),
        fetchGlobalQuote(symbol),
      ]);
    
      let timeSeries = null;
      if (selectedRange === '1D') {
        timeSeries = chartRaw['Time Series (Daily)'];
      } else if (selectedRange === '1W') {
        timeSeries = chartRaw['Weekly Time Series'];
      } else if (selectedRange === '1M') {
        timeSeries = chartRaw['Monthly Time Series'];
      }
      let chartData: any[] = [];
      if (timeSeries) {
        chartData = Object.entries(timeSeries)
          .slice(0, selectedRange === '1D' ? 16 : 12)
          .map(([date, val]: any) => ({ value: parseFloat(val['4. close']) }))
          .reverse();
      }
      
      const globalQuote =
        globalQuoteRaw && globalQuoteRaw['Global Quote']
          ? globalQuoteRaw['Global Quote']
          : {};
      const price = globalQuote['05. price'] || null;
      const changePercent = globalQuote['10. change percent'] || null;
    
      const mergedCompanyData = {
        ...companyData,
        Price: price,
        ChangePercent: changePercent,
      };
      return { companyData: mergedCompanyData, chartData };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch details data');
    }
  },
);

const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    setSelectedRange(state, action: PayloadAction<'1D' | '1W' | '1M'>) {
      state.selectedRange = action.payload;
    },
    resetDetails(state) {
      state.companyData = null;
      state.chartData = [];
      state.loading = false;
      state.error = null;
      state.selectedRange = '1D';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDetailsData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDetailsData.fulfilled, (state, action) => {
        state.loading = false;
        state.companyData = action.payload.companyData;
        state.chartData = action.payload.chartData;
        state.error = null;
      })
      .addCase(fetchDetailsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedRange, resetDetails } = detailsSlice.actions;
export default detailsSlice.reducer;
