import { useState } from "react"
import { useRouter } from "next/router"
import { signOut } from "next-auth/react"
import NavButton from "../Buttons/NavButton"
import NavButton2 from "../Buttons/NavButton2"
import { useSidebar } from "../../context/SideBarContext"
import { cat1, cat2 } from "../../data/Sidebar"
import { FiChevronLeft, FiLogOut } from "react-icons/fi"

export default function Sidebar() {
  const router = useRouter()
  const [isHover, setHover] = useState()
  const [isToggle, ToggleSidebar] = useSidebar()
  return (
    <>
      <div
        className={`flex flex-col justify-between dark:divide-black gap-y-1 p-2 overflow-y-auto bg-color-light-neutral-1 dark:bg-cm-color transform duration-300
        ${isToggle ? "min-w-3.5" : "min-w-15 w-48"}`}
      >
        <div className="flex flex-col divide-y-2 gap-y-1 overflow-y-auto">
          <div>
            {cat1.map((item) => {
              return (
                <NavButton
                  key={item.id}
                  url={item.url}
                  icon={item.icon}
                  text={item.text}
                  current={router.asPath === item.url}
                />
              )
            })}
          </div>
          <div>
            {cat2.map((item) => {
              return (
                <NavButton2
                  key={item.id}
                  url={item.url}
                  icon={item.icon}
                  text={item.text}
                  current={router.asPath === item.url}
                  sub={item.sub}
                />
              )
            })}
          </div>
        </div>
        <div className="mx-auto w-full">
          {!isToggle ? (
            <button
              onClick={() => signOut()}
              className="px-3 py-1.5 bg-red-100 hover:bg-red-200 rounded-lg w-full mb-2"
            >
              <p className="text-base font-semibold text-red-600 hover:text-red-700 capitalize  ml-1.5 max-w-40 text-center truncate overflow-clip overflow-hidden tracking-tight">
                Logout
              </p>
            </button>
          ) : (
            <button
              onClick={() => signOut()}
              className="px-2.5 py-2 bg-white hover:bg-red-200 rounded-lg w-full"
            >
              <FiLogOut className="w-5 h-5 text-red-600" />
            </button>
          )}
        </div>
      </div>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <button
          className={`flex justify-center items-center h-7 w-7 rounded-full bg-blue-600 absolute z-50 transition delay-75 duration-500
          ${isHover ? "bg-opacity-100" : "bg-opacity-0"}
          ${isToggle ? "rotate-180" : ""}`}
          style={{ marginLeft: "-0.8rem", marginTop: "-0.8rem" }}
          onClick={() => ToggleSidebar(!isToggle)}
        >
          <FiChevronLeft
            className={`h-4 w-4 z-50 transition delay-75 duration-500 text-white 
            ${isHover ? "opacity-100" : "opacity-0"}`}
            style={{ marginLeft: "-0.1rem" }}
          />
        </button>
        <hr
          className={`h-screen w-0.5 relative top-0 -mt-16 z-40 transition duration-300 
          ${
            isHover
              ? "bg-blue-500 border-blue-500"
              : "bg-color-light-neutral-1 dark:bg-cm-color"
          }`}
        />
      </div>
    </>
  )
}
