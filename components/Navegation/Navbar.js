import { useState } from "react"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { useSidebar } from "../../context/SideBarContext"
import { FiChevronUp } from "react-icons/fi"
import { links } from "../../data/Navbar"

export default function NewNavbar({ avatar, userName, plan }) {
  const [isActive, setActive] = useState(false)
  const [isToggle, ToggleSidebar] = useSidebar()

  return (
    <div className="sticky top-0 flex items-center h-16 w-full z-40 bg-gray-200">
      {/* Logotipo */}

      <Link href="/">
        <a
          className={`flex justify-center items-center h-full p-2
          ${isToggle ? "min-w-3.5" : "min-w-15 w-48"}`}
          onClick={() => ToggleSidebar(false)}
        >
          <p className="h-10 w-full text-center text-base lg:text-xl font-semibold text-black bg-gray-100 rounded-md">
            lg
          </p>
        </a>
      </Link>

      {/* User */}
      <div className="flex items-center gap-x-2.5 h-12 absolute right-0 mr-8">
        <div className="w-10 h-10 rounded-full">
          <img
            src={avatar || "/personas/HectorToralPallas.jpg"}
            className="w-10 max-h-10 rounded-full object-cover center"
          />
        </div>
        <p className="text-lg font-normal text-black capitalize">{userName}</p>
        <div>
          <button onClick={() => setActive(!isActive)}>
            <FiChevronUp
              className={`mt-2 transition duration-500 
            ${isActive ? "-rotate-180" : ""}`}
            />
          </button>
          {isActive && (
            <div className="flex flex-col w-52 mt-6 rounded-md bg-gray-200 absolute right-0 z-50 py-1">
              {links.map((item) => {
                return (
                  <Link href={item.url} key={1}>
                    <a className="px-3 py-1.5 hover:bg-gray-100">
                      <p className="text-base font-semibold text-black capitalize">
                        {item.name}
                      </p>
                    </a>
                  </Link>
                )
              })}
              <button
                onClick={() => signOut()}
                className="px-3 py-1.5 hover:bg-gray-100 bg-gray-50"
              >
                <p className="text-base font-semibold text-black capitalize">
                  Logout
                </p>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
