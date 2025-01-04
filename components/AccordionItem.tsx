import { useTareas } from "@/hooks/tareas/useTareas";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager, Pressable, useWindowDimensions, Animated } from "react-native";
import { ArrowRightIcon, ArrowUpIcon, CheckIcon, SadIcon } from "./Icons";
import { useAnimation } from "@/hooks/animations/useAnimation";
import { colors } from "@/theme/theme";
import { Tareas } from "@/config/infrastructure/entities/tareas";
import { transform } from "@babel/core";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


interface Props {
  title: string;
  children: ReactNode;
  item: Tareas
}
const Accordion = ({ title, children, item }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const { updateTarea } = useTareas()
  const widthScreen = useWindowDimensions().width
  const animacion = useRef(new Animated.Value(0)).current
  const contentHeight = useRef(0)

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setExpanded(!expanded)

  };

  const { animatedOpacity, fadeIn, animationTranslate, moveUp } = useAnimation()

  useEffect(() => {
    fadeIn()
    moveUp(20)
  }, [animatedOpacity, animationTranslate])

  return (
    <Animated.View
      style={[styles.cardItem, { opacity: animatedOpacity, transform: [{ translateY: animationTranslate }] }]}>
      <Pressable
        onPress={toggleExpand}
        style={[styles.header, { width: widthScreen - 50 }]}>
        <View style={{ flexDirection: 'row', gap: 2 }}>
          <Text
            style={styles.title}>
            {title}
          </Text>
          {!expanded ? <ArrowRightIcon /> : <ArrowUpIcon />}
        </View>

        {item.estado == 'pendiente' ?
          <Pressable onPress={() => updateTarea(item._id)} >
            {({ pressed }) => <SadIcon style={{ opacity: pressed ? 0.3 : 1 }} />}

          </Pressable>

          : <Pressable onPress={() => updateTarea(item._id)}>
            {({ pressed }) => <CheckIcon style={{ opacity: pressed ? 0.3 : 1 }} />}

          </Pressable>}


      </Pressable>
      {expanded && <Text style={styles.content}>{children}</Text>}

    </Animated.View>
  )
};

const styles = StyleSheet.create({
  cardItem: {
    backgroundColor: colors.cardColor,

    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: "#ddd",
    padding: 15
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    overflow: 'hidden',
    padding: 15,
  },
});

export default Accordion;
