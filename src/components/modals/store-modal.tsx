"use client"

import { useStoreModal } from "../../../hooks/use-store-modal";
import { Modal } from "../ui/modal"

export const StoreModal=()=>
{
    const storeModal = useStoreModal();
    return(
    <Modal 
    title="Create Store"
    description="Add new store to manage product and caetgories"
    isOpen={storeModal.isOpen}
    onClose={storeModal.onClose}
    >
        Future
    </Modal>
    )
}