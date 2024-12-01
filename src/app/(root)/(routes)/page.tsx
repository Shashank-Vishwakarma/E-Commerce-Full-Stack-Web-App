"use client";

import Modal from "@/components/modal/Modal";
import { useStoreModal } from "@/hooks/useModalStore";
import { useEffect } from "react";

export default function Home() {
    const onOpen = useStoreModal((state) => state.onOpen);
    const isOpen = useStoreModal((state) => state.isOpen);

    useEffect(() => {
        onOpen();
    }, [onOpen, isOpen]);

    return null;
}
