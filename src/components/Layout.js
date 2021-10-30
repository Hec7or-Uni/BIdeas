import Meta from "./Meta"
import Navbar from "./Navegation/Navbar"
import Sidebar from "./Navegation/Sidebar"

import { SidebarProvider } from "context/SidebarContext"
import { LMenuProvider } from "context/LMenuContext"
import { A4HProvider } from "context/A4HiredContext"

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
          <main className="w-full py-3 overflow-y-visible">
            <LMenuProvider>
              <A4HProvider>{children}</A4HProvider>
            </LMenuProvider>
          </main>
        </div>
      </div>
    </>
  )
}
