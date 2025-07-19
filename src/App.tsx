import AppNavContainer from './navigation';
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#2ecc71',
        backgroundColor: '#f8fff9',
        borderWidth: 1,
        borderColor: '#2ecc71',
        borderRadius: 8,
        marginHorizontal: 16,
        marginTop: 16,
        minHeight: 50,
        paddingHorizontal: 12,
        paddingVertical: 8,
      }}
      contentContainerStyle={{
        paddingHorizontal: 6,
      }}
      text1Style={{
        fontSize: 14,
        fontWeight: '600',
        color: '#2ecc71',
        marginBottom: 2,
      }}
      text2Style={{
        fontSize: 12,
        color: '#333',
        lineHeight: 16,
      }}
    />
  ),
  info: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#3498db',
        backgroundColor: '#f8fbff',
        borderWidth: 1,
        borderColor: '#3498db',
        borderRadius: 8,
        marginHorizontal: 16,
        marginTop: 16,
        minHeight: 50,
        paddingHorizontal: 12,
        paddingVertical: 8,
      }}
      contentContainerStyle={{
        paddingHorizontal: 6,
      }}
      text1Style={{
        fontSize: 14,
        fontWeight: '600',
        color: '#3498db',
        marginBottom: 2,
      }}
      text2Style={{
        fontSize: 12,
        color: '#333',
        lineHeight: 16,
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: '#e74c3c',
        backgroundColor: '#fff8f8',
        borderWidth: 1,
        borderColor: '#e74c3c',
        borderRadius: 8,
        marginHorizontal: 16,
        marginTop: 16,
        minHeight: 50,
        paddingHorizontal: 12,
        paddingVertical: 8,
      }}
      contentContainerStyle={{
        paddingHorizontal: 6,
      }}
      text1Style={{
        fontSize: 14,
        fontWeight: '600',
        color: '#e74c3c',
        marginBottom: 2,
      }}
      text2Style={{
        fontSize: 12,
        color: '#333',
        lineHeight: 16,
      }}
    />
  ),
};

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
