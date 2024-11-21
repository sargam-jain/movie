import React, { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { getMoviesList } from '../api'; // Import the API function

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [isGrid, setIsGrid] = useState(false);

  // Fetch movies using the utility function
  const fetchMovies = async () => {
    try {
      const movieList = await getMoviesList();
      setMovies(movieList);
      setFilteredMovies(movieList);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Filter movies based on search query
  useEffect(() => {
    if (query.trim() === '') {
      setFilteredMovies(movies);
    } else {
      const lowerQuery = query.toLowerCase();
      setFilteredMovies(movies.filter((movie) => movie.title.toLowerCase().includes(lowerQuery)));
    }
  }, [query, movies]);

  // Render movie items
  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      style={isGrid ? styles.gridItem : styles.listItem}
      onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}
    >
      <Text style={styles.movieTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
      
        <Text style={styles.title}>Movie Tracker</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a movie..."
          value={query}
          onChangeText={setQuery}
        />
        
        <Button title={`Switch to ${isGrid ? 'List' : 'Grid'} View`} onPress={() => setIsGrid(!isGrid)} />
        <View style={styles.navContainer}>
          <Button title="Go to My List" onPress={() => navigation.navigate('MyList')} />
        </View>
        <FlatList
          data={filteredMovies}
          keyExtractor={(item) => item.id.toString()}
          key={isGrid ? 2 : 1}
          numColumns={isGrid ? 2 : 1}
          renderItem={renderMovieItem}
          contentContainerStyle={styles.listContainer}
        />
        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f9f9f9' },
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  listContainer: { paddingBottom: 20 },
  listItem: { padding: 15, marginVertical: 5, backgroundColor: '#fff', borderRadius: 5 },
  gridItem: {
    flex: 1,
    padding: 15,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  movieTitle: { fontSize: 18, fontWeight: '500' },
  navContainer: { marginTop: 20, alignItems: 'center' },
});

export default HomeScreen;
