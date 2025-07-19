import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import {
  wp,
  hp,
  fontSize,
  borderRadius,
  padding,
} from '../../utils/responsive';

interface CompanyOverview {
  Symbol: string;
  Name: string;
  Description: string;
  Exchange: string;
  Sector: string;
  Industry: string;
  MarketCapitalization: string;
  PERatio: string;
  DividendYield: string;
  AnalystTargetPrice: string;
  ProfitMargin: string;
  Beta: string;
  '52WeekHigh': string;
  '52WeekLow': string;
}

interface AboutSectionProps {
  companyData: CompanyOverview | null;
  loading?: boolean;
  currentPrice?: string | number;
}

const AboutSection: React.FC<AboutSectionProps> = ({
  companyData,
  loading = false,
  currentPrice,
}) => {
  if (loading) {
    return <View style={styles.aboutSection} />;
  }

  if (!companyData) {
    return (
      <View style={styles.aboutSection}>
        <Text style={styles.aboutTitle}>Company information not available</Text>
      </View>
    );
  }

  const displayValue = (value: string | undefined | null) => {
    if (
      value === undefined ||
      value === null ||
      value === '' ||
      value.toLowerCase() === 'none' ||
      value === 'null' ||
      value === 'undefined'
    ) {
      return ' ';
    }
    return value;
  };


  const formatMarketCap = (marketCap: string) => {
    if (!marketCap || marketCap.toLowerCase() === 'none') return ' ';
    const num = parseFloat(marketCap);
    if (isNaN(num)) return ' ';
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };


  const formatPercentage = (value: string) => {
    if (!value || value.toLowerCase() === 'none') return ' ';
    const num = parseFloat(value);
    if (isNaN(num)) return ' ';
    return `${(num * 100).toFixed(2)}%`;
  };

  // Create tags from company data
  const tags = [
    {
      label: `Industry: ${displayValue(companyData.Industry)}`,
      color: '#fbeee0',
    },
    { label: `Sector: ${displayValue(companyData.Sector)}`, color: '#e0f7fa' },
  ];


  const rawStats = [
    {
      label: 'Market Cap',
      value: formatMarketCap(companyData.MarketCapitalization),
      raw: companyData.MarketCapitalization,
    },
    {
      label: 'P/E Ratio',
      value: displayValue(companyData.PERatio),
      raw: companyData.PERatio,
    },
    {
      label: 'Beta',
      value: displayValue(companyData.Beta),
      raw: companyData.Beta,
    },
    {
      label: 'Dividend Yield',
      value: formatPercentage(companyData.DividendYield),
      raw: companyData.DividendYield,
    },
    {
      label: 'Profit Margin',
      value: formatPercentage(companyData.ProfitMargin),
      raw: companyData.ProfitMargin,
    },
  ];

  // Only include stats where the raw value is not null/empty/none/undefined
  const stats = rawStats.filter(stat => {
    const v = stat.raw;
    if (
      v === undefined ||
      v === null ||
      v === '' ||
      (typeof v === 'string' &&
        (v.toLowerCase() === 'none' || v === 'null' || v === 'undefined'))
    ) {
      return false;
    }
    return true;
  });

  return (
    <View style={styles.aboutSection}>
      <Text style={styles.aboutTitle}>
        About {displayValue(companyData.Name)}
      </Text>
      <Text style={styles.aboutText}>
        {displayValue(companyData.Description)}
      </Text>

      <View style={styles.tagsRow}>
        {tags.map(tag => (
          <View
            key={tag.label}
            style={[styles.tag, { backgroundColor: tag.color }]}
          >
            <Text style={styles.tagText}>{tag.label}</Text>
          </View>
        ))}
      </View>

   
      <View style={styles.rangeBarContainer}>
        <View style={styles.rangeLabelCol}>
          <Text style={styles.rangeLabelTitle}>52-Week Low</Text>
          <Text style={styles.rangeLabelValue}>
            ${displayValue(companyData['52WeekLow'])}
          </Text>
        </View>
        <View style={styles.rangeBarCenterWrapper}>
          <View style={styles.currentPriceWrapper}>
            <Text style={styles.currentPriceValue}>
              Current price: ${displayValue(currentPrice?.toString())}
            </Text>
            <Text style={styles.currentPriceMarker}>▼</Text>
          </View>
          <View style={styles.rangeBar} />
        </View>
        <View style={styles.rangeLabelCol}>
          <Text style={styles.rangeLabelTitle}>52-Week High</Text>
          <Text style={styles.rangeLabelValue}>
            ${displayValue(companyData['52WeekHigh'])}
          </Text>
        </View>
      </View>

    
      <View style={styles.statsGrid}>
        {stats.map((stat, idx) => (
          <View key={stat.label} style={styles.statItem}>
            <Text style={styles.statLabel}>{stat.label}</Text>
            <Text style={styles.statValue}>{stat.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  aboutSection: {
    backgroundColor: '#fff',
    borderRadius: borderRadius(12),
    padding: padding(3),
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  aboutTitle: {
    fontSize: fontSize(15),
    fontWeight: '700',
    color: '#222',
    marginBottom: hp(1),
  },
  aboutText: {
    fontSize: fontSize(13),
    color: '#444',
    marginBottom: hp(1.5),
  },
  tagsRow: {
    marginBottom: hp(1.5),
    paddingHorizontal: wp(1),
  },
  tag: {
    borderRadius: borderRadius(8),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.7),
    marginRight: wp(2),
    marginBottom: hp(1),
    height: hp(5),
    justifyContent: 'center',
  },
  tagText: {
    fontSize: fontSize(12),
    color: '#222',
    fontWeight: '500',
  },
  statsGrid: {
    paddingHorizontal: wp(4),
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: hp(1),
  },
  statItem: {
    width: '33%',
    marginBottom: hp(1.5),
  },
  statLabel: {
    fontSize: fontSize(12),
    color: '#888',
  },
  statValue: {
    fontSize: fontSize(14),
    color: '#222',
    fontWeight: '600',
  },
  rangeBarContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginVertical: hp(2),
    paddingHorizontal: wp(2),
  },
  rangeLabelCol: {
    alignItems: 'center',
    width: wp(22),
  },
  rangeLabelTitle: {
    fontSize: fontSize(11),
    color: '#888',
    fontWeight: '500',
    marginBottom: 2,
  },
  rangeLabelValue: {
    fontSize: fontSize(13),
    color: '#222',
    fontWeight: '700',
  },
  rangeBarCenterWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
    minWidth: wp(30),
  },
  currentPriceWrapper: {
    alignItems: 'center',
    marginBottom: 2,
  },
  currentPriceValue: {
    fontSize: fontSize(11),
    color: '#222',
    fontWeight: '700',
    marginBottom: -2,
  },
  currentPriceMarker: {
    fontSize: fontSize(14),
    color: '#d35400',
    lineHeight: fontSize(10),
    marginTop: -1,
    marginBottom: 2,
  },
  rangeBar: {
    height: 2,
    backgroundColor: '#d35400',
    borderRadius: 1,
    width: '100%',
    minWidth: wp(30),
  },
});

export default AboutSection;
