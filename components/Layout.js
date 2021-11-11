import Meta from "./Meta"
import Navbar from "./Navegation/Navbar"
import Sidebar from "./Navegation/Sidebar"

import { SidebarProvider } from "../context/SideBarContext"
import { LMenuProvider } from "../context/LMenuContext"
import { A4HProvider } from "../context/A4HiredContext"

export default function Layout({ children }) {
  const user = children.props.children.props.user

  return (
    <>
      <Meta />
      <SidebarProvider>
        <Navbar
          avatar={user.avatar}
          userName={user.userName}
          plan={user.plan}
        />
        <div className="flex w-full" style={{ height: "calc(100vh - 4rem)" }}>
          <Sidebar />
          <LMenuProvider>
            <A4HProvider>
              <div className="flex-auto overflow-y-auto">
                <main>{children}</main>
              </div>
            </A4HProvider>
          </LMenuProvider>
        </div>
      </SidebarProvider>
    </>
  )
}
