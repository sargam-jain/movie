import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getMoviesList } from '../api'; // Assuming the API returns a list of movies and shows.

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All'); // "All", "Movies", "Shows"
  const [sortOrder, setSortOrder] = useState('None'); // 'None', 'Ascending', 'Descending'
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMoviesList(); // Fetching all movies and shows
        setMovies(data);
        setFilteredMovies(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  // Search filter
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies);
    }
  };

  // Filter by type (Movies, Shows)
  const handleFilterByType = (type) => {
    setFilterType(type);
    if (type === 'All') {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter((movie) => movie.type === type);
      setFilteredMovies(filtered);
    }
  };

  // Sort Alphabetically
  const handleSort = () => {
    let sortedData = [...filteredMovies];
    if (sortOrder === 'Ascending') {
      sortedData.sort((a, b) => a.title.localeCompare(b.title));
      setSortOrder('Descending');
    } else {
      sortedData.sort((a, b) => b.title.localeCompare(a.title));
      setSortOrder('Ascending');
    }
    setFilteredMovies(sortedData);
  };

  // Navigate to Movie Details Screen
  const handleMovieClick = (movieId) => {
    navigation.navigate('MovieDetails', { movieId });
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        placeholder="Search..."
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.searchBar}
      />

      {/* Filter and Sort Options */}
      <View style={styles.filterContainer}>
        <Button
          title="All"
          onPress={() => handleFilterByType('All')}
          color={filterType === 'All' ? 'blue' : 'gray'}
        />
        <Button
          title="Movies"
          onPress={() => handleFilterByType('Movies')}
          color={filterType === 'Movies' ? 'blue' : 'gray'}
        />
        <Button
          title="Shows"
          onPress={() => handleFilterByType('Shows')}
          color={filterType === 'Shows' ? 'blue' : 'gray'}
        />
        <Button title={`Sort (${sortOrder})`} onPress={handleSort} />
      </View>

      {/* Movie List */}
      <FlatList
        data={filteredMovies}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleMovieClick(item.id)}>
            <View style={styles.movieItem}>
              <Text>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  movieItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default HomeScreen;