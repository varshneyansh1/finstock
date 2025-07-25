import AppNavContainer from './navigation';
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import toastConfig from './components/ToastConfig';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavContainer />
        <Toast config={toastConfig} />
      </PersistGate>
    </Provider>
  );
}

export default App;
