import React, { useState, useContext } from "react";

const SidebarContext = React.createContext()

export function useSidebar() {
    return useContext(SidebarContext)
}

export function SidebarProvider({ children }) {
    // isActive == 0 si el sidebar esta abierto
    // si esta minimizado, isActive == 1
    const [isActive, setActive] = useState(false)

    return (
        <SidebarContext.Provider value={[isActive, setActive]}>
            {children}
        </SidebarContext.Provider>
    )
}