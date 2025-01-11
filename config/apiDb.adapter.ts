import { AxiosAdapter } from "./adapters/http/axios.adapter";

export const fetcherAdapter = new AxiosAdapter({
  baseUrl: `${process.env.EXPO_PUBLIC_API_URL}`,
  params: {},
});
