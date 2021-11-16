import { useState } from "react"
import { useRouter } from "next/router"
import NavButton from "../Buttons/NavButton"
import NavButton2 from "../Buttons/NavButton2"
import { useSidebar } from "../../context/SideBarContext"
import { cat1, cat2 } from "../../data/Sidebar"
import { FiChevronLeft } from "react-icons/fi"

export default function Sidebar() {
  const router = useRouter()
  const [isHover, setHover] = useState()
  const [isToggle, ToggleSidebar] = useSidebar()
  return (
    <>
      <div
        className={`flex flex-col divide-y-2 gap-y-1 p-2 overflow-y-auto overflow-x-hidden bg-white transform duration-300
        ${isToggle ? "min-w-3.5" : "min-w-15 w-48"}`}
      >
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
          ${isHover ? "bg-blue-500 border-blue-500" : "bg-white"}`}
        />
      </div>
    </>
  )
}
