import { useState, useCallback } from 'react';

export interface ModalState {
  isOpen: boolean;
  title: string;
  image?: string;
  description?: string;
}

interface UseModalReturn {
  modalContent: ModalState;
  openModal: (title: string, image?: string, description?: string) => void;
  closeModal: () => void;
}

export const useModal = (initialState?: Partial<ModalState>): UseModalReturn => {
  const [modalContent, setModalContent] = useState<ModalState>({
    isOpen: false,
    title: "",
    image: undefined,
    description: undefined,
    ...initialState
  });

  const openModal = useCallback((title: string, image?: string, description?: string) => {
    setModalContent({
      isOpen: true,
      title,
      image,
      description
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalContent(prev => ({
      ...prev,
      isOpen: false
    }));
  }, []);

  return { modalContent, openModal, closeModal };
};
