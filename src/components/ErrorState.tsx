import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { fontSize } from '../utils/responsive';

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  error,
  onRetry,
  showRetry = true,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.errorCard}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
      {showRetry && onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorCard: {
    backgroundColor: '#fff3cd', // soft warning yellow
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ffeeba',
    marginBottom: 20,
    alignItems: 'center',
    maxWidth: 320,
  },
  errorText: {
    color: '#856404', // dark yellow/brown for warning
    fontSize: fontSize(16),
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 0,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: fontSize(16),
    fontWeight: '600',
  },
});

export default ErrorState;
