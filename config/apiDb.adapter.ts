import { AxiosAdapter } from "./adapters/http/axios.adapter";

export const fetcherAdapter = new AxiosAdapter({
    baseUrl:`https://food-apiv1.vercel.app`,
    params:{
        
    }
})