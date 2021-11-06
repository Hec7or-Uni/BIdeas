import NewNavbar from "./Navegation/NewNavbar"
import NewSidebar from "./Navegation/NewSidebar"

import { SidebarProvider } from "../context/SideBarContext"

export default function NewLayout({ children }) {
  return (
    <>
      <SidebarProvider>
        <NewNavbar />
        <div
          className="flex w-full bg-red-200"
          style={{ height: "calc(100vh - 4rem)" }}
        >
          <NewSidebar />
          <div className="flex-auto px-6 py-3 overflow-y-auto">
            <div>Cabecera</div>
            <div>Menu</div>
            <main>{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </>
  )
}
