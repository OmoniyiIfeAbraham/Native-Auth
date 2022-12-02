import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Keyboard,
  Alert,
} from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../../consts/colors";
import Input from "../components/input";
import Button from "../components/button";
import Loader from "../components/loader";

export default function LoginScreen({ navigation }) {
  const [inputs, setInputs] = React.useState({
    email: "",
    fullName: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.email) {
      handleError("Please input email", "email");
      valid = false;
    }

    if (!inputs.password) {
      handleError("Please input password", "password");
    }

    if (valid) {
      login();
    }
  };
  const login = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      let userData = await AsyncStorage.getItem("user");
      if (userData) {
        userData = JSON.parse(userData);
        if (
          inputs.email == userData.email &&
          inputs.password == userData.password
        ) {
          AsyncStorage.setItem("user", JSON.stringify({...userData, loggedIn: true}))
          navigation.navigate("HomeScreen")
        } else {
          Alert.alert("Error", "Invalid Details");
        }
      } else {
        Alert.alert("Error", "User does not exist");
      }
    }, 3000);
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 50 }}
      >
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>
          Login
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Enter your Details to Login
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            placeholder="Enter your email address"
            iconName="email-outline"
            label="Email"
            error={errors.email}
            onFocus={() => {
              handleError(null, "email");
            }}
            onChangeText={(text) => handleOnchange(text, "email")}
          />
          <Input
            placeholder="Enter your password"
            iconName="lock-outline"
            label="Password"
            password
            error={errors.password}
            onFocus={() => {
              handleError(null, "password");
            }}
            onChangeText={(text) => handleOnchange(text, "password")}
          />
          <Button title="Login" onPress={validate} />
          <Text
            onPress={() => navigation.navigate("RegisterationScreen")}
            style={{
              color: COLORS.black,
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Don't have an account? Register
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
