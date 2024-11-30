"use client"

import React, { useEffect } from 'react'
import StoreModal from '../modal/StoreModal'

export default function ModalProvider() {
    const [isMounted, setIsMounted] = React.useState(false)

    useEffect(()=>{
        setIsMounted(true)
    }, [])

    if(!isMounted) {
        return null
    }

    return (
        <>
            <StoreModal />
        </>
    )
}
