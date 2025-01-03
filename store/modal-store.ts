import {create} from 'zustand';

interface FunctionsProps {
  modalCreateRecipes: boolean;
  isopenModalProducto: boolean;
  isopenModalCategory: boolean;
  isopenModalListaCompra: boolean;
  openModalCreateRecipes: () => void;
  closeModalCreateRecipes: () => void;
  closeModalProducto: () => void;
  openModalProducto: () => void;
  closeModalCategory: () => void;
  openModalCategory: () => void;
  openModalListaCompra: () => void;
  closeModalListaCompra: () => void;
}

export const useModalStore = create<FunctionsProps>()((set, get) => ({
  modalCreateRecipes: false,
  isopenModalProducto: false,
  isopenModalListaCompra: false,
  isopenModalCategory: false,

  openModalCreateRecipes: () => {
    set(state => ({
      modalCreateRecipes: true,
    }));
  },
  openModalListaCompra: () => {
    set(state => ({
      isopenModalListaCompra: true,
    }));
  },
  closeModalListaCompra: () => {
    set(state => ({
      isopenModalListaCompra: false,
    }));
  },
  closeModalCreateRecipes: () => {
    set(state => ({
      modalCreateRecipes: false,
    }));
  },
   closeModalProducto: () => {
    set(state=>({
      isopenModalProducto : false
    }))
  },

   openModalProducto :() => {
    set(state=>({
      isopenModalProducto : true
    }))
  },
   closeModalCategory: () => {
    set(state=>({
      isopenModalCategory : false
    }))
  },

   openModalCategory :() => {
    set(state=>({
      isopenModalCategory : true
    }))
  },
}));
