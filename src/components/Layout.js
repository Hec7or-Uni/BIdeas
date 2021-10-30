import Meta from "./Meta"
import Navbar from "./Navegation/Navbar"
import Sidebar from "./Navegation/Sidebar"

import { SidebarProvider } from "context/SidebarContext"
import { LMenuProvider } from "context/LMenuContext"

export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <div className="flex h-screen">
        <SidebarProvider>
          <Sidebar />
        </SidebarProvider>
        <div className="w-full">
          <Navbar />
          <main
            className="w-full py-6 overflow-y-auto "
            style={{ height: "calc(100vh - 3.5rem)" }}
          >
            <LMenuProvider>{children}</LMenuProvider>
          </main>
        </div>
      </div>
    </>
  )
}
