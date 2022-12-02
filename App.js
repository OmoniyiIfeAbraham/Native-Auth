import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/views/screens/LoginScreen";
import RegisterationScreen from "./src/views/screens/RegisterationScreen";
import HomeScreen from "./src/views/screens/HomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "./src/views/components/loader";

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRouteName, setInitilaRouteName] = React.useState("");
  React.useEffect(() => {
    setTimeout(authUser, 2000)
  }, [])
  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem("user");
      if (userData) {
        userData = JSON.parse(userData);
        if (userData?.loggedIn) {
          setInitilaRouteName("HomeScreen");
        } else {
          setInitilaRouteName("LoginScreen");
        }
      } else {
        setInitilaRouteName("RegisterationScreen");
      }
    } catch (error) {
      setInitilaRouteName("RegisterationScreen");
    }
  };
  return (
    <NavigationContainer>
      {initialRouteName == "" ? (
        <Loader visible={true} />
      ) : (
        <>
          <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="RegisterationScreen"
              component={RegisterationScreen}
            />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
}