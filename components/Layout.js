import Meta from "./Meta"
import Navbar from "./Navegation/Navbar"
import Sidebar from "./Navegation/Sidebar"

import { SidebarProvider } from "../context/SideBarContext"
import { LMenuProvider } from "../context/LMenuContext"
import { A4HProvider } from "../context/A4HiredContext"

export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <SidebarProvider>
        <Navbar />
        <div className="flex w-full" style={{ height: "calc(100vh - 4rem)" }}>
          <Sidebar />
          <div className="flex-auto px-6 py-3 overflow-y-auto">
            <main>
              <LMenuProvider>
                <A4HProvider>{children}</A4HProvider>
              </LMenuProvider>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </>
  )
}
