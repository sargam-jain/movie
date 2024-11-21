import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from './screens/HomeScreen'; // Update path as per your file structure
import MovieDetails from './screens/MovieDetailsScreen';
import MyListScreen from './screens/MyListScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MovieDetails" component={MovieDetails} />
        <Stack.Screen name="MyList" component={MyListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
