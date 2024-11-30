"use client";

import Modal from "@/components/modal/Modal";
import { useStoreModal } from "@/hooks/useModalStore";
import { useEffect } from "react";

export default function Home() {
    const onOpen = useStoreModal((state) => state.onOpen);
    const onClose = useStoreModal((state) => state.onClose);

    useEffect(() => {
        onOpen();
    }, [onOpen]);

    return <p className="">root page</p>;
}
