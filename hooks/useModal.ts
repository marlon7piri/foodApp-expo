import {useState} from 'react';

export const useModal = () => {
  const [isopenModal, setIsOpenModal] = useState<boolean>(false);
  const [isopenModalProducto, setIsOpenModalProducto] = useState<boolean>(false);

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const openModal = () => {
    setIsOpenModal(!isopenModal);
  };

  const closeModalProducto = () => {
    setIsOpenModalProducto(false);
  };

  const openModalProducto = () => {
    setIsOpenModalProducto(!isopenModalProducto);
  };

  return {
    isopenModal,
    openModal,
    closeModal,
    closeModalProducto,
    openModalProducto
    
  };
};
