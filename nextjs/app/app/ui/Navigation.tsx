"use client"

import { useState } from "react"
import Navbar from "./navbar"
import Sidebar from "./Sidebar"

export default function Navigation() {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false)
    
    return <>
        <Navbar setSidebarIsOpen={setSidebarIsOpen} />
        <Sidebar isOpen={sidebarIsOpen} setIsOpen={setSidebarIsOpen} />
    </>
}