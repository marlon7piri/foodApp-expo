import { fetcherAdapter } from "@/config/apiDb.adapter";
import * as UseCases from "@/core/use-cases";
import { useEffect, useState } from "react";
import { Compras, Producto } from "@/config/infrastructure/entities/compras";
import { authStore } from "@/store/auth.store";
import { comprasStore } from "../../store/compras.store";
import { useModalStore } from "../../store/modal-store";
import { sendMessage } from "@/components/ToastCustom";

const initialStateCompras: Compras = {
  estado: "pendiente",
  productos: [],
  total: 0,
  userId: "",
  fecha: null,
};
export const useCompras = () => {
  const [productosSelected, setProductosSelected] = useState([]);
  const [dateSelected, setDateSelected] = useState("");
  const obtenerCompras = comprasStore((state) => state.obtenerCompras);
  const crearCompras = comprasStore((state) => state.crearCompras);
  const compras = comprasStore((state) => state.compras);
  const closeModalListaCompra = useModalStore(
    (state) => state.closeModalListaCompra
  );

  const [newCompra, setNewCompra] = useState<Compras>(initialStateCompras);
  const [loading, setLoading] = useState(false);
  const user = authStore((state) => state.user);

  useEffect(() => {
    loadCompras();
  }, []);

  const loadCompras = async () => {
    setLoading(true);
    const res = await UseCases.comprasUseCases(fetcherAdapter, user?._id);

    obtenerCompras(res);
    setLoading(false);
  };
  const crearListaCompra = async () => {
    const ids = productosSelected.map((e) => e.id);

    const date = new Date(dateSelected).toISOString();
    const newLista: Compras = {
      ...newCompra,
      userId: user?._id,
      fecha: date,
      productos: ids,
    };

    setLoading(true);
    const res = await UseCases.createCompraUseCases(fetcherAdapter, newLista);

    crearCompras(res);
    closeModalListaCompra();
    loadCompras();

    setLoading(false);
    sendMessage("Lista de Compra", "Creada on éxito", "success");
  };

  return {
    compras,
    loading,
    newCompra,
    setNewCompra,
    crearListaCompra,
    productosSelected,
    setProductosSelected,
    dateSelected,
    setDateSelected,
  };
};
