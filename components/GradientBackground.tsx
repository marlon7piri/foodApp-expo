import React from "react";
import { View, StyleSheet, StatusBar, Text, Dimensions } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Rect, Path } from "react-native-svg";

const GradientBackground = ({ text }: { text: string }) => {
  const statusBarHeight = StatusBar.currentHeight || 0;

  return (
    <View style={[styles.gradientContainer, { height: 300 + statusBarHeight }]}>
      {/* Gradiente SVG */}
      <Svg width="100%" height="100%">
        <Defs>
          <LinearGradient id="emeraldToBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#16a085" stopOpacity="1" />
            <Stop offset="100%" stopColor="#3498db" stopOpacity="1" />


          </LinearGradient>
        </Defs>
        <Rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#emeraldToBlue)"
        />

      </Svg>



      {/* Texto centrado */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1, // Permite que otros elementos aparezcan encima
  },
  textContainer: {
    position: "absolute",
    top: "50%", // Centro vertical
    left: 0,
    right: 0,
    transform: [{ translateY: -20 }], // Ajuste para centrar completamente
    alignItems: "center",
  },
  text: {
    fontSize: 48,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  wave: {
    position: "absolute",
    bottom: 0,
  },
});

export default GradientBackground;
