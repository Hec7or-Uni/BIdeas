import { createContext, useState } from "react";

export const sideBarContext = createContext();

export const useSidebar = () => useContext(sideBarContext);

export const SidebarProvider = ({ children }) => {
    const [toggle, setToggle] = useState(false)

    return (
        <sideBarContext.Provider value={{toggle, setToggle}}>
            {children}
        </sideBarContext.Provider>
    )
};