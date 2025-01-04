import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

export const useAnimation = () => {
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const animationTranslate = useRef(new Animated.Value(0)).current;

  function fadeIn() {
    Animated.timing(animatedOpacity, {
      delay: 300,
      duration: 1000,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }

  function moveUp({
    initialPosition = -200,
    duration = 1000,
    easing = Easing.elastic(2),
    toValue = 0,
    callback = () => {},
  }) {
    animationTranslate.setValue(initialPosition);
    Animated.timing(animationTranslate, {
      easing: easing,
      duration: duration,
      toValue: toValue,
      useNativeDriver: true,
    }).start(callback);
  }

  return {
    fadeIn,
    moveUp,
    animationTranslate,
    animatedOpacity,
  };
};
