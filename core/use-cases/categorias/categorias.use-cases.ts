import { HttpAdapter } from "@/src/config/adapters/http/http.adapter";
import type { Category } from "@/src/config/infrastructure/entities/category";
import { CategoryMapper } from "../../../config/infrastructure/mapper/category.mapper";

export const categoriasUseCases = async (fetcher: HttpAdapter,userId:string):Promise<Category[]> => {
    try {
        const response = await fetcher.get(`/categorias/${userId}`)
        const result = response.data.map(CategoryMapper.FromCategoryDbToCategory)
        return result
    } catch (error) {
        throw new Error("Error fetching products")
    }

}