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

export default function RegisterationScreen({ navigation }) {
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
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input valid email", "email");
      valid = false;
    }

    if (!inputs.fullName) {
      handleError("Please input fullName", "fullName");
      valid = false;
    }
    if (!inputs.phone) {
      handleError("Please input phone number", "phone");
      valid = false;
    }
    if (!inputs.password) {
      handleError("Please input password", "password");
      valid = false;
    } else if (inputs.password.length < 5) {
      handleError("Min password length of 5", "password");
      valid = false;
    }

    if (valid) {
      register();
    }
  };
  const register = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      try {
        AsyncStorage.setItem("user", JSON.stringify(inputs));
        navigation.navigate("LoginScreen");
      } catch (error) {
        Alert.alert("Error", "Something went wrong");
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
          Register
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Enter your Details to Register
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
            placeholder="Enter your fullname"
            iconName="account-outline"
            label="Fullname"
            error={errors.fullName}
            onFocus={() => {
              handleError(null, "fullName");
            }}
            onChangeText={(text) => handleOnchange(text, "fullName")}
          />
          <Input
            keyboardType="numeric"
            placeholder="Enter your phone number"
            iconName="phone-outline"
            label="Phone Number"
            error={errors.phone}
            onFocus={() => {
              handleError(null, "phone");
            }}
            onChangeText={(text) => handleOnchange(text, "phone")}
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
          <Button title="Register" onPress={validate} />
          <Text
            onPress={() => navigation.navigate("LoginScreen")}
            style={{
              color: COLORS.black,
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Already have an account? Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
