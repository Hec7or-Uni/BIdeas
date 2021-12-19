import Meta from "./Meta"
import Navbar from "./Navegation/Navbar"
import Sidebar from "./Navegation/Sidebar"
import { SidebarProvider } from "../context/SideBarContext"
import { A4HProvider } from "../context/A4HiredContext"

export default function Layout({ children }) {
  const user = children.props.children.props.user

  return (
    <>
      <Meta />
      <SidebarProvider>
        <Navbar
          id={user.id}
          avatar={user.avatar}
          userName={user.userName}
          plan={user.plan}
        />
        <div
          className="flex w-full dark:bg-gradient-to-t dark:from-cm-color dark:via-cm-color dark:to-cm-color2"
          style={{ height: "calc(100vh - 4rem)" }}
        >
          <Sidebar />
          <A4HProvider>
            <div className="flex-auto overflow-y-auto ">
              <main className="py-3">{children}</main>
            </div>
          </A4HProvider>
        </div>
      </SidebarProvider>
    </>
  )
}
