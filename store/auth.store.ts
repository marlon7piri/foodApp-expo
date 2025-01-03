import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface User {
  email: string;
  password: string;
  name: string;
  _id: string;
}

interface authProps {
  user: User | null;
  token: string;
  loading: boolean;
  login: (tokenInfo: string, userInfo: User) => void;
  logout: () => void;
  isLoggeIn: () => void;
}

export const authStore = create<authProps>()((set, get) => ({
  user: null,
  token: "",
  loading: false,
  login: async (tokenInfo: string, userInfo: User) => {
    try {
      /*  set(state => ({loading: true})) */

      await AsyncStorage.setItem("tokenInfo", tokenInfo);

      const userString = JSON.stringify(userInfo);

      await AsyncStorage.setItem("userInfo", userString);

      set((state) => ({
        token: tokenInfo,
        user: userInfo,
        loading: false,
      }));
    } catch (error) {}
  },
  logout: async () => {
    await AsyncStorage.removeItem("tokenInfo");
    set((state) => ({
      token: "",
    }));
  },
  isLoggeIn: async () => {
    const userToken = await AsyncStorage.getItem("tokenInfo");
    const userInfo = await AsyncStorage.getItem("userInfo");

    if (userToken && userInfo) {
      const userParsed = JSON.parse(userInfo);

      set((state) => ({
        user: userParsed,
        token: userToken,
      }));
    }
  },
}));
