import { Contacto } from "@/config/infrastructure/entities/contacto";
import { create } from "zustand";

interface TypeStore {
  contactos: Contacto[];
  obtenerContactos: (categ: Contacto[]) => void;
  crearContactos: (newContactos: Contacto) => void;
  deleteContactos: (id: string) => void;
}

export const contactoStore = create<TypeStore>()((set, get) => ({
  contactos: [],
  obtenerContactos: (contac) => {
    set((state) => ({
      contactos: contac,
    }));
  },
  crearContactos: (newContactos) => {
    set((state) => ({
      contactos: [...state.contactos, newContactos],
    }));
  },
  deleteContactos: (id) => {
    set((state) => ({
      contactos: state.contactos.filter((e) => e._id !== id),
    }));
  },
}));
