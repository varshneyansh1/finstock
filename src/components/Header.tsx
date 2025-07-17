import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { wp, hp, fontSize, borderRadius, padding } from '../utils/responsive';
import { searchSymbols } from '../api';

interface HeaderProps {
  appName: string;
  searchPlaceholder?: string;
  onResultPress?: (item: any) => void;
}

const Header = ({ appName, searchPlaceholder, onResultPress }: HeaderProps) => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = async (text: string) => {
    setSearch(text);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (text.length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    timeoutRef.current = setTimeout(async () => {
      try {
        const data = await searchSymbols(text);
        setResults(data.bestMatches || []);
        setShowDropdown(true);
      } catch {
        setResults([]);
        setShowDropdown(false);
      }
    }, 400);
  };

  const handleResultPress = (item: any) => {
    setSearch('');
    setShowDropdown(false);
    setResults([]);
    if (onResultPress) onResultPress(item);
  };

  return (
    <View style={styles.header}>
      <Text style={styles.appName}>{appName}</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder={searchPlaceholder || 'Search here...'}
          placeholderTextColor="#888"
          value={search}
          onChangeText={handleSearch}
          onFocus={() => search.length > 1 && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        />
        {showDropdown && results.length > 0 && (
          <View style={styles.dropdown}>
            <FlatList
              data={results}
              keyExtractor={item => item['1. symbol']}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleResultPress(item)}
                >
                  <Text style={styles.dropdownText}>
                    {item['2. name']} ({item['1. symbol']})
                  </Text>
                </TouchableOpacity>
              )}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    marginBottom: hp(2),
    marginTop: hp(3),
  },
  appName: {
    fontSize: fontSize(20),
    fontWeight: 'bold',
    color: 'black',
    marginRight: wp(2),
    flexShrink: 1,
    alignSelf: 'flex-start',
  },
  searchContainer: {
    width: wp(50),
    alignItems: 'flex-end',
    position: 'relative',
  },
  searchBar: {
    width: '100%',
    height: hp(5),
    backgroundColor: '#f2f2f2',
    borderRadius: borderRadius(10),
    paddingHorizontal: padding(8),
    fontSize: fontSize(16),
    color: 'black',
    alignSelf: 'flex-end',
  },
  dropdown: {
    position: 'absolute',
    top: hp(5.5),
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: borderRadius(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 10,
    maxHeight: hp(20),
  },
  dropdownItem: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownText: {
    fontSize: fontSize(15),
    color: '#222',
  },
});

export default Header;
