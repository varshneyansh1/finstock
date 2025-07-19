import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

interface LoadingStateProps {
  color?: string;
  size?: 'small' | 'large';
}

const LoadingState: React.FC<LoadingStateProps> = ({
  color = '#007AFF',
  size = 'large',
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingState;
