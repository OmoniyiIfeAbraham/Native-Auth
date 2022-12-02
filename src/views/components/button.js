import { View, Text, Touchable, TouchableOpacity } from "react-native";
import React from "react";
import COLORS from "../../consts/colors";

export default function Button({ title, onPress = () => {} }) {
  return (
    <TouchableOpacity
    activeOpacity={0.7}
      onPress={onPress}
      style={{
        height: 55,
        width: "100%",
        backgroundColor: COLORS.blue,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20
      }}
    >
      <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: "bold" }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
