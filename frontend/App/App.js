import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./app/screens/SplashScreen";
import HomeScreen from "./app/screens/HomeScreen";
import AddEntryScreen from "./app/screens/AddEntryScreen";
import SeeEntriesScreen from "./app/screens/SeeEntriesScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddEntry" component={AddEntryScreen} />
        <Stack.Screen name="SeeEntries" component={SeeEntriesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
