import { create } from "zustand";
import { Tareas } from "@/config/infrastructure/entities/tareas";

interface TypeStore {
  tareas: Tareas[];
  obtenerTareas: (categ: Tareas[]) => void;
  crearTarea: (newreceta: Tareas) => void;
  deleteTarea: (id: string) => void;
}

export const tareaStore = create<TypeStore>()((set, get) => ({
  tareas: [],
  obtenerTareas: (tasks) => {
    set((state) => ({
      tareas: tasks,
    }));
  },
  crearTarea: (newTarea) => {
    set((state) => ({
      tareas: [...state.tareas, newTarea],
    }));
  },
  deleteTarea: (id) => {
    set((state) => ({
      tareas: state.tareas.filter((e) => e._id !== id),
    }));
  },
}));
