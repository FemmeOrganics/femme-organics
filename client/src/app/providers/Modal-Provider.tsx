'use client'
import React, { useEffect, useState } from 'react'
import PreviewModal from '@/components/Preview-Modal'
import PreviewDrawer from '@/src/components/Preview-Drawer'

function ModalProvider() {
    const [isMounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    },[])

    if(!isMounted) return null; 


    return (
        <>
            <PreviewModal/>
            <PreviewDrawer />
        </>
    )
}

export default ModalProvider
