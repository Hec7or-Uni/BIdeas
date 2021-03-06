import { useState } from "react"
import { useSidebar } from "../../context/SideBarContext"
import { FiChevronUp } from "react-icons/fi"

// pruebas
import NavButton from "./NavButton"

export default function NewButton2({ icon, text, current, sub }) {
  const [isActive, setActive] = useState(false)
  const [isToggle, ToggleSidebar] = useSidebar()

  return (
    <>
      <button
        className={`flex items-center h-9 w-full px-2.5 py-2.5 rounded hover:bg-color-light-neutral-2 dark:hover:bg-color-neutral-3 relative
        ${
          current || isActive
            ? "bg-color-light-neutral-2 dark:bg-color-neutral-3"
            : ""
        }`}
        onClick={() => {
          setActive(!isActive)
          ToggleSidebar(false)
        }}
      >
        <div className="w-5 h-5">{icon}</div>
        {!isToggle && (
          <>
            <p className="ml-1.5 max-w-40 text-base font-medium text-left text-black dark:text-white capitalize truncate overflow-clip overflow-hidden tracking-tight">
              {text}
            </p>
            <div
              className={`w-5 h-5 mr-2 absolute right-0 transition duration-500
            ${isActive ? "-rotate-180" : ""}`}
            >
              <FiChevronUp className={`w-full h-full dark:text-white`} />
            </div>
          </>
        )}
      </button>
      {isActive && !isToggle && (
        <>
          {sub.map((item) => {
            return <NavButton key={item.id} url={item.url} text={item.text} />
          })}
        </>
      )}
    </>
  )
}
