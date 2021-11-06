import { useState } from "react"
import { useSidebar } from "../../context/SideBarContext"
import { FiChevronUp } from "react-icons/fi"

// pruebas
import NavButton from "./NavButton"

export default function NewButton2({ icon, text, current }) {
  const [isActive, setActive] = useState(false)
  const [isToggle, ToggleSidebar] = useSidebar()

  return (
    <>
      <button
        className={`flex items-center h-9 w-full px-2.5 py-2.5 rounded hover:bg-gray-200 relative
        ${current ? "bg-gray-200" : ""}`}
        onClick={() => {
          setActive(!isActive)
          ToggleSidebar(false)
        }}
      >
        <div className="w-5 h-5">{icon}</div>
        {!isToggle && (
          <>
            <p className="ml-1.5 max-w-40 text-base font-medium text-left text-black capitalize truncate overflow-clip overflow-hidden tracking-tight">
              {text}
            </p>
            <div
              className={`w-5 h-5 mr-2 absolute right-0 transition duration-500
            ${isActive ? "-rotate-180" : ""}`}
            >
              <FiChevronUp className={`w-full h-full`} />
            </div>
          </>
        )}
      </button>
      {isActive && !isToggle && (
        <>
          {/* Ejemplos */}
          <NavButton url="/" text="Teams" />
          <NavButton url="/" text="Professionals" />
        </>
      )}
    </>
  )
}
