import { View, Text } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/button";

export default function HomeScreen({ navigation }) {
  const [userDetails, setUserDetails] = React.useState();
  React.useEffect(() => {
    getUserDetails();
  }, []);
  const getUserDetails = async () => {
    const userData = await AsyncStorage.getItem("user");
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };
  const Logout = () => {
    AsyncStorage.setItem(
      "user",
      JSON.stringify({ ...userDetails, loggedIn: false })
    );
    navigation.navigate("LoginScreen");
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 40,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Welcome {userDetails?.fullName}
      </Text>
      <Button title="Logout" onPress={Logout} />
    </View>
  );
}
