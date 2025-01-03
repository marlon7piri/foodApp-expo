import { HttpAdapter } from "@/src/config/adapters/http/http.adapter";
import { Category } from "@/src/config/infrastructure/entities/category";
import { CategoryMapper } from "../../../config/infrastructure/mapper/category.mapper";

export const createCategoryUseCase = async (fetcher: HttpAdapter, newCategory: Category) => {

  try {

    const res = await fetcher.post('/categorias', newCategory)

     if (res) {
      const category = CategoryMapper.FromCategoryDbToCategory(res?.data)


      return category
    } 

  } catch (error) {
    throw new Error(`Error creating category`)
  }


}