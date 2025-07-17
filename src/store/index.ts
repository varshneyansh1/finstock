import { configureStore, combineReducers } from '@reduxjs/toolkit';
import watchlistReducer from './slice/watchlistSlice';
import topGainersLosersReducer from './slice/topGainersLosersSlice';
import viewAllGainersLosersReducer from './slice/viewAllGainersLosersSlice';
import detailsReducer from './slice/detailsSlice';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['watchlist'],
};

const rootReducer = combineReducers({
  watchlist: watchlistReducer,
  topGainersLosers: topGainersLosersReducer,
  viewAllGainersLosers: viewAllGainersLosersReducer,
  details: detailsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
