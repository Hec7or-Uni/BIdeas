import { useState } from "react"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { useSidebar } from "../../context/SideBarContext"
import { FiChevronUp, FiHelpCircle, FiMail } from "react-icons/fi"
import { links } from "../../data/Navbar"
import Logo from "../Logo"
import Modal from "../Modal"

export default function NewNavbar({ avatar, userName, plan }) {
  const [isActive, setActive] = useState(false)
  const [isModal, setModal] = useState(false)
  const [isToggle, ToggleSidebar] = useSidebar()

  return (
    <div className="sticky top-0 flex items-center h-16 w-full z-40 bg-white">
      {/* Logotipo */}
      <Link href="/">
        <a
          className={`flex justify-center items-center h-full p-2
          ${isToggle ? "min-w-3.5" : "min-w-15 w-48"}`}
          onClick={() => ToggleSidebar(false)}
        >
          <Logo toggle={isToggle} />
        </a>
      </Link>

      <div className="flex items-center gap-x-6 absolute right-0 mr-8">
        <div className="flex items-center gap-x-4 relative">
          <button
            id="button"
            onClick={() => {
              setModal(!isModal)
              setActive(false)
            }}
          >
            <FiMail className="h-5 w-5 hover:text-blue-500" />
          </button>
          <Link href="/faq">
            <a>
              <FiHelpCircle className="h-5 w-5 hover:text-green-500" />
            </a>
          </Link>
        </div>
        {/* User */}
        <div className="flex items-center gap-x-2.5 h-12">
          <div className="w-10 h-10 rounded-full">
            <img
              src={avatar || "/personas/HectorToralPallas.jpg"}
              className="w-full h-full rounded-full object-cover center"
            />
          </div>
          <p className="text-lg font-normal text-black capitalize">
            {userName}
          </p>
          <div>
            <button
              onClick={() => {
                setActive(!isActive)
                setModal(false)
              }}
            >
              <FiChevronUp
                className={`mt-2 transition duration-500 
                ${isActive ? "-rotate-180" : ""}`}
              />
            </button>
            {isActive && (
              <div className="flex flex-col w-52 mt-6 rounded-md bg-neutral absolute right-0 z-50 py-1">
                {links.map((item) => {
                  return item.name === "go vip" && plan === 1 ? (
                    <></>
                  ) : (
                    <Link href={item.url} key={1}>
                      <a className="px-3 py-1.5 hover:bg-basic">
                        <p className="text-base font-semibold text-black capitalize">
                          {item.name}
                        </p>
                      </a>
                    </Link>
                  )
                })}
                <button
                  onClick={() => signOut()}
                  className="px-3 py-1.5 hover:bg-neutral bg-gray-50"
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
      {isModal && <Modal />}
    </div>
  )
}
