import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { addMovieToList, getMovieDetails } from '../api'; // Import the API functions

const MovieDetailsScreen = ({ route, navigation }) => {
  const { movieId } = route.params; // Movie ID passed as a route parameter
  const [movie, setMovie] = useState(null);

  // Fetch movie details
  const fetchMovieDetails = async () => {
    try {
      const movieData = await getMovieDetails(movieId); // Fetch movie details by ID
      setMovie(movieData);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      Alert.alert('Error', 'Failed to load movie details. Please try again.');
    }
  };

  // Add a movie to the specified list
  const addToList = async (status) => {
    try {
      await addMovieToList(movieId, status); // Call the API to add the movie to the list
      Alert.alert(
        'Success',
        `Movie added to "${status}" list!`,
        [{ text: 'OK' }] // Success popup
      );
    } catch (error) {
      console.error('Error adding movie to list:', error);
      Alert.alert(
        'Error',
        'Could not add the movie to the list. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  // Fetch movie details when the component mounts or when movieId changes
  useEffect(() => {
    fetchMovieDetails();
  }, [movieId]);

  // Display a loading message while movie data is being fetched
  if (!movie) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.description}>{movie.description}</Text>
      <Button title="Add to To Watch" onPress={() => addToList('To Watch')} />
      <Button title="Add to Watched" onPress={() => addToList('Watched')} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  description: { fontSize: 16, marginBottom: 20 },
});

export default MovieDetailsScreen;
