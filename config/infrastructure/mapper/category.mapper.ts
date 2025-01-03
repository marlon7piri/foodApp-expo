import { CategoryDb } from "@/src/types/category";
import type { Category } from "../entities/category";

export class CategoryMapper {



    static FromCategoryDbToCategory(result: CategoryDb): Category {
        return {
            id: result._id,
            nombre: result.nombre,
            userId:result.userId
        }
    }
}