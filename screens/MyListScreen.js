import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MyListScreen = () => {
  const [myList, setMyList] = useState([]);
  const [selectedTab, setSelectedTab] = useState('To Watch');

  const fetchMyList = async () => {
    try {
      // Mock data
      const mockData = [
        { id: 1, title: 'Movie A', status: 'To Watch' },
        { id: 2, title: 'Movie B', status: 'Watched' },
        { id: 3, title: 'Movie C', status: 'To Watch' },
      ];
      console.log('Fetched Data:', mockData);
      setMyList(mockData);
    } catch (error) {
      console.error('Error fetching list:', error);
    }
  };

  useEffect(() => {
    fetchMyList();
  }, []);

  const filteredList = myList.filter(
    (item) => item.status.toLowerCase() === selectedTab.toLowerCase()
  );

  useEffect(() => {
    console.log('Filtered List:', filteredList);
  }, [filteredList]);

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setSelectedTab('To Watch')} style={styles.tab}>
          <Text style={[styles.tabText, selectedTab === 'To Watch' && styles.activeTab]}>To Watch</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('Watched')} style={styles.tab}>
          <Text style={[styles.tabText, selectedTab === 'Watched' && styles.activeTab]}>Watched</Text>
        </TouchableOpacity>
      </View>
      {filteredList.length > 0 ? (
        <FlatList
          data={filteredList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.movieTitle}>{item.title}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyMessage}>No movies in this category.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  tabContainer: { flexDirection: 'row', marginBottom: 10 },
  tab: { flex: 1, alignItems: 'center', padding: 10 },
  tabText: { fontSize: 16 },
  activeTab: { fontWeight: 'bold', color: 'blue' },
  listItem: { padding: 15, backgroundColor: '#fff', marginVertical: 5, borderRadius: 5 },
  movieTitle: { fontSize: 18 },
  emptyMessage: { textAlign: 'center', fontSize: 16, marginTop: 20, color: 'gray' },
});

export default MyListScreen;
