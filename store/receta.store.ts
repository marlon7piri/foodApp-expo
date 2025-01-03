import { create } from 'zustand'
import { ObjectId } from 'bson'
import type { Category } from '@/src/config/infrastructure/entities/category'
import { Receta } from '@/src/config/infrastructure/entities/receta'



interface TypeStore {
    recetas: Receta[],
    obetenerRecetas: (rec: Receta[]) => void
    createReceta: (newReceta: Receta) => void,
    deleteReceta: (id: string) => void
}

export const recetaStore = create<TypeStore>()((set, get) => ({
    recetas: [],
    obetenerRecetas: (recetas) => {
        set(state => ({
            recetas: recetas
        }))

    },
    createReceta: (newReceta) => {
        
        set(state => ({
            recetas: [...state.recetas, newReceta]
        }))

    },
    deleteReceta: (id) => {
        set(state => ({
            recetas: state.recetas.filter(e => e.id !== id)
        }))
    }

}))