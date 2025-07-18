import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { searchSymbols } from '../../api';
import responsive from '../../utils/responsive';

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
    paddingHorizontal: responsive.padding(18),
    marginBottom: responsive.margin(20),
    marginTop: responsive.margin(10),
  },
  appName: {
    fontSize: responsive.fontSize(23),
    fontWeight: 'bold',
    color: 'black',
    marginRight: responsive.margin(2),
    flexShrink: 1,
    alignSelf: 'flex-start',
  },
  searchContainer: {
    width: responsive.wp(50),
    alignItems: 'flex-end',
    position: 'relative',
  },
  searchBar: {
    width: '100%',
    height: responsive.hp(5),
    backgroundColor: '#f2f2f2',
    borderRadius: responsive.borderRadius(10),
    paddingHorizontal: responsive.padding(8),
    fontSize: responsive.fontSize(16),
    color: 'black',
    alignSelf: 'flex-end',
  },
  dropdown: {
    position: 'absolute',
    top: responsive.hp(5.5),
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: responsive.borderRadius(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 10,
    maxHeight: responsive.hp(20),
  },
  dropdownItem: {
    paddingVertical: responsive.padding(1),
    paddingHorizontal: responsive.padding(3),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownText: {
    fontSize: responsive.fontSize(15),
    color: '#222',
  },
});

export default Header;
