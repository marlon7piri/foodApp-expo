import { create } from 'zustand'
import { Compras } from '@/src/config/infrastructure/entities/compras'



interface TypeStore {
    compras: Compras[],
    obtenerCompras: (comp: Compras[]) => void
    crearCompras: (newComp: Compras) => void,
    deleteCategory: (id: string) => void
}

export const comprasStore = create<TypeStore>()((set, get) => ({
    compras: [],
    obtenerCompras: (comp) => {
        set(state => ({
            compras: comp
        }))

    },
    crearCompras: (newComp) => {
        
        set(state => ({
            compras: [...state.compras, newComp]
        }))

    },
    deleteCategory: (id) => {
        set(state => ({
            compras: state.compras.filter(e => e.id !== id)
        }))
    }

}))