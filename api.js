import axios from 'axios';

const API_URL = 'https://api.rapidmock.com/api/vikuman/v1';

// Fetch all movies
export const getMoviesList = async () => {
  try {
    const response = await axios.get(`${API_URL}/movies/all`);
    // Ensure the response data is returned correctly
    return response?.data || []; // return an empty array if no data
  } catch (error) {
    console.error("Error fetching movies list", error);
    throw new Error("Unable to fetch movies list");
  }
};

// Fetch movie details by ID
export const getMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${API_URL}/movies?id=${movieId}`);
    // Ensure the response data is returned correctly
    return response?.data || null; // return null if no data
  } catch (error) {
    console.error("Error fetching movie details", error);
    throw new Error(`Unable to fetch details for movie ID ${movieId}`);
  }
};

// Add a movie to the user's list (To Watch / Watched)
export const addMovieToList = async (movieId, status) => {
  try {
    const response = await axios.post(`${API_URL}/mylist/add`, {
      movieId,
      status,
    });
    return response?.data || {}; // return empty object if no data
  } catch (error) {
    console.error("Error adding movie to list", error);
    throw new Error("Unable to add movie to list");
  }
};

// Fetch the user's My List (To Watch / Watched)
export const getMyList = async () => {
  try {
    const response = await axios.get(`${API_URL}/mylist`);
    return response?.data || []; // return empty array if no data
  } catch (error) {
    console.error("Error fetching my list", error);
    throw new Error("Unable to fetch user's list");
  }
};
