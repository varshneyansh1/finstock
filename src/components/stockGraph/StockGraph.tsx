import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { wp, hp, fontSize } from '../../utils/responsive';

interface StockGraphProps {
  data: any[];
  loading: boolean;
}

const StockGraph: React.FC<StockGraphProps> = ({ data, loading }) => {
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        height: hp(18),
      }}
    >
      {loading ? (
        <View
          style={{
            height: hp(18),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="large" color="#d35400" />
        </View>
      ) : (
        <LineChart
          data={data}
          height={hp(16)}
          width={wp(90)}
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
          initialSpacing={wp(1)}
          endSpacing={wp(1)}
          spacing={wp(4)}
          disableScroll
          showVerticalLines={false}
          showXAxisIndices
          showYAxisIndices
          xAxisIndicesHeight={hp(0.5)}
        />
      )}
    </View>
  );
};

export default StockGraph;
