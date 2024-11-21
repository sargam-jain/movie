import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create context
const MovieListContext = createContext();

// Provider component
export const MovieListProvider = ({ children }) => {
  const [toWatch, setToWatch] = useState([]);
  const [watched, setWatched] = useState([]);

  useEffect(() => {
    // Load lists from AsyncStorage when the app starts
    const loadLists = async () => {
      try {
        const toWatchData = await AsyncStorage.getItem('toWatch');
        const watchedData = await AsyncStorage.getItem('watched');
        if (toWatchData) setToWatch(JSON.parse(toWatchData));
        if (watchedData) setWatched(JSON.parse(watchedData));
      } catch (error) {
        console.error("Error loading lists from storage:", error);
      }
    };
    loadLists();
  }, []);

  useEffect(() => {
    // Save lists to AsyncStorage whenever they change
    const saveLists = async () => {
      try {
        await AsyncStorage.setItem('toWatch', JSON.stringify(toWatch));
        await AsyncStorage.setItem('watched', JSON.stringify(watched));
      } catch (error) {
        console.error("Error saving lists to storage:", error);
      }
    };
    saveLists();
  }, [toWatch, watched]);

  const addToList = (movie) => {
    if (toWatch.some(item => item.id === movie.id)) {
      setToWatch(prevList => prevList.filter(item => item.id !== movie.id));
      setWatched(prevList => [...prevList, movie]);
    } else if (watched.some(item => item.id === movie.id)) {
      setWatched(prevList => prevList.filter(item => item.id !== movie.id));
      setToWatch(prevList => [...prevList, movie]);
    } else {
      setToWatch(prevList => [...prevList, movie]);
    }
  };

  const getMyList = () => {
    return { toWatch, watched };
  };

  return (
    <MovieListContext.Provider value={{ addToList, getMyList }}>
      {children}
    </MovieListContext.Provider>
  );
};

// Custom hook to use the context
export const useMovieList = () => {
  return useContext(MovieListContext);
};
