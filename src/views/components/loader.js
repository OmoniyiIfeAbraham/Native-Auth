import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import React from "react";
import COLORS from "../../consts/colors";

export default function Loader({ visible = false }) {
  const { height, width } = useWindowDimensions();
  return (
    visible && (
      <View style={[styles.container, , { height, width }]}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={COLORS.blue} />
          <Text style={{ marginLeft: 10, fontSize: 16 }}>Loading</Text>
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
  },
  loader: {
    height: 70,
    backgroundColor: COLORS.white,
    marginHorizontal: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
