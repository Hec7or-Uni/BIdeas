import { createContext } from "react";

export const sideBarContext = createContext();

export const useSidebar = () => useContext(sideBarContext);

export const SidebarProvider = ({ children }) => {
    return (
        <sideBarContext.Provider>
            {children}
        </sideBarContext.Provider>
    )
};