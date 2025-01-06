import { Tareas } from "@/config/infrastructure/entities/tareas";
import { useEffect, useState } from "react";
import * as UseCases from "@/core/use-cases/";
import { fetcherAdapter } from "@/config/apiDb.adapter";
import { authStore } from "@/store/auth.store";
import { sendMessage } from "@/components/ToastCustom";
import { useModalStore } from "@/store/modal-store";
import { tareaStore } from "@/store/tareas.store";

const initialValue: Tareas = {
  de: null,
  asunto: "",
  descripcion: "",
  estado: "pendiente",
  fecha_final: null,
  para: "",
};
export const useTareas = () => {
  const [newTask, setNewTask] = useState<Tareas>();
  const [dateSelected, setDateSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const user = authStore((state) => state.user);
  const closeModalTarea = useModalStore((state) => state.closeModalTarea);
  const obtenerTareas = tareaStore((state) => state.obtenerTareas);
  const crearTask = tareaStore((state) => state.crearTarea);
  const tareas = tareaStore((state) => state.tareas);
  const [contactoSelected, setContactoSelected] = useState(null);

  useEffect(() => {
    loadTareas();
  }, []);

  const loadTareas = async () => {
    const res = await UseCases.TareasUseCases(fetcherAdapter, user?._id);
    obtenerTareas(res);
  };
  const updateTarea = async (idTask: string) => {
    const res = await UseCases.updateTareaUseCases(fetcherAdapter, idTask);
    console.log(res);
    loadTareas();
    sendMessage("Tarea", "Actualizada correctamente", "success");
  };
  const crearTarea = async () => {
    const nuevaTarea: Tareas = {
      ...newTask,
      para: contactoSelected,
      fecha_final: new Date(dateSelected),
      de: user?._id,
    };
    const res = await UseCases.createTareaUseCases(fetcherAdapter, nuevaTarea);
    if (res.para == user?._id) {
      crearTask(res.data);
      closeModalTarea();
      loadTareas();
    } else {
      closeModalTarea();
      loadTareas();
    }
    sendMessage("Tarea", "Creada correctamente", "success");
  };
  return {
    tareas,
    crearTarea,
    newTask,
    setNewTask,
    loading,
    dateSelected,
    setDateSelected,
    updateTarea,
    loadTareas,
    contactoSelected,
    setContactoSelected,
  };
};
