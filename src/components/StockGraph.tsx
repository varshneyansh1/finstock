import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { wp, hp, fontSize } from '../utils/responsive';

interface StockGraphProps {
  data: any[];
  loading: boolean;
}

const StockGraph: React.FC<StockGraphProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <View
        style={{
          height: hp(18),
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" color="#d35400" />
      </View>
    );
  }
  return (
    <View style={{ width: '100%', alignItems: 'center', overflow: 'hidden' }}>
      <LineChart
        data={data}
        height={hp(18)}
        width={wp(92)}
        color="#d35400"
        thickness={2}
        hideDataPoints
        xAxisColor="#eee"
        yAxisColor="#eee"
        noOfSections={2}
        areaChart
        startFillColor="#fbeee0"
        endFillColor="#fff"
        startOpacity={0.5}
        endOpacity={0.1}
        yAxisTextStyle={{ color: '#888', fontSize: fontSize(12) }}
        initialSpacing={0}
        spacing={wp(4)}
        disableScroll
        showVerticalLines={false}
        showXAxisIndices
        showYAxisIndices
        // No xAxisLabelTextStyle, no yAxisLabelTexts
      />
    </View>
  );
};

export default StockGraph;
