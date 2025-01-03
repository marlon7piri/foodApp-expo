import { create } from 'zustand'
import { ObjectId } from 'bson'
import type { Category } from '@/src/config/infrastructure/entities/category'



interface TypeStore {
    category: Category[],
    obtenerCategory: (categ: Category[]) => void
    crearCategory: (newCategory: Category) => void,
    deleteCategory: (id: string) => void
}

export const categoryStore = create<TypeStore>()((set, get) => ({
    category: [],
    obtenerCategory: (categ) => {
        set(state => ({
            category: categ
        }))

    },
    crearCategory: (newCategory) => {
        
        set(state => ({
            category: [...state.category, newCategory]
        }))

    },
    deleteCategory: (id) => {
        set(state => ({
            category: state.category.filter(e => e.id !== id)
        }))
    }

}))