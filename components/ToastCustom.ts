import Toast from "react-native-toast-message";

export function sendMessage(
  message: string,
  submessage: string,
  tipo: "success" | "error" | "info",
  visibilityTime = 1000
) {
  return Toast.show({
    type: tipo,
    text1: message,
    text2: submessage,
    visibilityTime,
  });
}
