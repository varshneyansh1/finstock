# Finstock

Finstock is a React Native mobile application that allows users to track, analyze, and manage stock market data. The app provides real-time information on top gainers and losers, detailed stock analytics, and personalized watchlists, making it a powerful tool for investors and market enthusiasts.

## Features

- **Home Screen:**

  - View top gaining and losing stocks in the market.
  - Quick access to detailed stock information.
  - Search for stocks by name or symbol with real-time suggestions.
  - Network connectivity monitoring with offline state handling.

- **View All Screen:**

  - Explore a comprehensive list of all top gainers or losers.
  - Infinite scroll and pagination for large datasets.
  - Tap any stock to view its details.

- **Details Screen:**

  - In-depth analytics for each stock, including:
    - Company overview and description
    - Price, change percentage, and exchange info
    - Interactive price chart with selectable time ranges (1D, 1W, 1M)
    - Key financial stats (Market Cap, P/E Ratio, Beta, Dividend Yield, Profit Margin, 52-Week High/Low)
  - Add or remove stocks from your watchlists.

- **WatchList Screen:**
  - Create and manage multiple watchlists.
  - Add stocks to custom watchlists from the details screen.
  - View all stocks in a selected watchlist and access their details.

## Advanced Features

### Error Handling & Network Management

- **Comprehensive Error States:** Custom error components for different scenarios (network errors, API limits, server errors)
- **Network Connectivity Monitoring:** Real-time network status detection using NetInfo
- **Automatic Retry Mechanism:** Smart retry functionality when network connection is restored
- **API Rate Limit Handling:** Graceful handling of API rate limits with user-friendly messages
- **Offline State Management:** Proper handling of offline scenarios with cached data

### User Experience Enhancements

- **Responsive Design:** Adaptive layouts that work across different screen sizes using custom responsive utilities
- **Loading States:** Smooth loading indicators for all data fetching operations
- **Toast Notifications:** Success, error, and info notifications for user actions
- **Safe Area Handling:** Proper safe area management for different device types
- **Debounced Search:** Optimized search with 400ms debounce to reduce API calls

### Data Management

- **Redux Persist Integration:** Persistent storage for watchlists and user preferences
- **State Management:** Centralized state management with Redux Toolkit
- **Data Caching:** Efficient data caching and state persistence
- **Optimistic Updates:** Immediate UI updates for better user experience

### Performance Optimizations

- **Infinite Scrolling:** Efficient pagination for large datasets
- **Lazy Loading:** On-demand data loading for better performance
- **Memory Management:** Proper cleanup of resources and event listeners
- **Optimized Re-renders:** Efficient component updates and state management

## Screens Overview

- **Home:**

  - Displays top gainers and losers with quick navigation to details and view-all lists.
  - Includes a search bar for finding stocks by symbol or name with real-time suggestions.
  - Network status monitoring with appropriate error states.

- **View All:**

  - Shows a full list of either top gainers or losers, with support for loading more data as you scroll.
  - Handles API rate limits and network errors gracefully.

- **Details:**

  - Presents detailed analytics, company info, and a price chart for the selected stock.
  - Allows adding/removing the stock to/from watchlists with toast notifications.
  - Interactive chart with multiple time range options.

- **WatchList:**
  - Lists all user-created watchlists with persistent storage.
  - Each watchlist contains a grid of stocks, with options to view details or remove stocks.
  - Toast notifications for watchlist operations.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd finstock
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Run on Android:**
   ```bash
   npm run android
   ```
   **Run on iOS:**
   ```bash
   npm run ios
   ```

## Technologies Used

- [React Native](https://reactnative.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/) & [Redux Persist](https://github.com/rt2zz/redux-persist)
- [React Navigation](https://reactnavigation.org/)
- [Axios](https://axios-http.com/)
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
- [react-native-gifted-charts](https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts) (for stock charts)
- [@react-native-community/netinfo](https://github.com/react-native-netinfo/react-native-netinfo) (for network connectivity)
- [react-native-toast-message](https://github.com/calintamas/react-native-toast-message) (for notifications)
- [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context) (for safe area handling)
- [@react-native-async-storage/async-storage](https://github.com/react-native-async-storage/async-storage) (for data persistence)

## Error Handling Strategy

The app implements a comprehensive error handling strategy:

1. **Network Errors:** Detects network connectivity issues and provides retry options
2. **API Errors:** Handles various HTTP status codes (429, 500+, etc.) with appropriate messages
3. **Timeout Errors:** Manages request timeouts with user-friendly error messages
4. **Rate Limiting:** Gracefully handles API rate limits with informative messages
5. **Fallback States:** Provides appropriate fallback UI for different error scenarios

## Performance Considerations

- **Debounced Search:** Reduces API calls by implementing 400ms debounce
- **Efficient State Management:** Uses Redux Toolkit for optimized state updates
- **Memory Optimization:** Proper cleanup of event listeners and subscriptions
- **Lazy Loading:** Implements pagination and infinite scrolling for large datasets
- **Persistent Storage:** Caches user data to reduce redundant API calls
