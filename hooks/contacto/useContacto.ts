import { Contacto } from "@/config/infrastructure/entities/contacto";
import { useEffect, useState } from "react";
import * as UseCases from "@/core/use-cases";
import { fetcherAdapter } from "@/config/apiDb.adapter";
import { authStore } from "@/store/auth.store";
import { useModalStore } from "@/store/modal-store";
import { sendMessage } from "@/components/ToastCustom";

export const useContacto = () => {
  const [contacto, setContacto] = useState<Contacto>();
  const [contactos, setContactos] = useState<Contacto[]>();
  const [loading, setLoading] = useState(false);
  const user = authStore((state) => state.user);

  const closeModalContacto = useModalStore((state) => state.closeModalContacto);

  useEffect(() => {
    loadContactos();
  }, []);

  const loadContactos = async () => {
    const res = await UseCases.contactoUseCases(fetcherAdapter, user?._id);
    setContactos(res);
  };

  const crearContacto = async () => {
    setLoading(true);
    const newContact = {
      nombre: contacto?.nombre,
      email: contacto?.email,
      userId: user?._id,
    };

    const res = await UseCases.crearContactoUseCases(
      fetcherAdapter,
      user?._id,
      newContact
    );
    setLoading(false);
    closeModalContacto();
    sendMessage("Contacto", "Contacto creado correctamente", "success");
    loadContactos();
  };

  return {
    contactos,
    contacto,
    setContacto,
    crearContacto,
    loading,
    loadContactos,
  };
};
