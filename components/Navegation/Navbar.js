import { useState, useEffect } from "react"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { useSidebar } from "../../context/SideBarContext"
import { FiChevronUp, FiHelpCircle, FiMail } from "react-icons/fi"
import { links } from "../../data/Navbar"
import Logo from "../Logo"
import Modal from "../Modals/Modal"
import Search from "components/Search"

export default function NewNavbar({ avatar, userName, plan }) {
  const [isActive, setActive] = useState(false)
  const [isModal, setModal] = useState(false)
  const [isToggle, ToggleSidebar] = useSidebar()

  useEffect(() => {
    const checkIfClickedOutside = () => {
      if (isActive) {
        setActive(false)
      }
    }
    document.addEventListener("click", checkIfClickedOutside)
    return () => {
      document.removeEventListener("click", checkIfClickedOutside)
    }
  }, [isActive])

  return (
    <div className="sticky top-0 flex items-center h-16 w-full z-40 bg-color-light-neutral-1 dark:bg-cm-color">
      {/* Logotipo */}
      <Link href="/">
        <a
          className={`flex justify-center items-center h-full p-2
          ${isToggle ? "min-w-3.5" : "min-w-15 w-48"}`}
          onClick={() => ToggleSidebar(false)}
        >
          <Logo url={"/"} toggle={isToggle} />
        </a>
      </Link>
      <Search />

      <div className="flex items-center gap-x-6 absolute right-0 mr-8">
        <div className="flex items-center gap-x-4 relative">
          <button
            id="button"
            onClick={() => {
              setModal(!isModal)
              setActive(false)
            }}
          >
            <FiMail className="h-5 w-5 hover:text-blue-500 dark:text-white" />
          </button>
          <Link href="/faq">
            <a>
              <FiHelpCircle className="h-5 w-5 hover:text-green-500 dark:text-white" />
            </a>
          </Link>
        </div>
        {/* User */}
        <div
          className="flex items-center gap-x-2.5 h-12 cursor-pointer"
          onClick={() => {
            setActive(!isActive)
            setModal(false)
          }}
        >
          <div className="w-10 h-10 rounded-full">
            <img
              src={avatar || "/personas/DefaultAvatar.jpg"}
              className="w-full h-full rounded-full object-cover center"
            />
          </div>
          <p className="text-lg font-normal text-black dark:text-white capitalize">
            {userName}
          </p>
          <div>
            <FiChevronUp
              className={`mt-2 transition duration-500 dark:text-white
              ${isActive ? "-rotate-180" : ""}`}
            />
            {isActive && (
              <div className="p-2 flex flex-col gap-y-2 w-52 mt-16 rounded-md bg-white shadow dark:bg-cm-color absolute top-0 right-0 z-50">
                {links.map((item) => {
                  return item.name === "go vip" && plan === 1 ? (
                    <></>
                  ) : (
                    <Link href={item.url} key={1}>
                      <a className="px-3 py-1.5 hover:bg-color-light-neutral-1 dark:hover:bg-color-neutral-3 rounded-lg">
                        <p className="text-base font-semibold text-black dark:text-white capitalize">
                          {item.name}
                        </p>
                      </a>
                    </Link>
                  )
                })}
                <button
                  onClick={() => signOut()}
                  className="px-3 py-1.5 bg-white hover:bg-red-200 rounded-lg"
                >
                  <p className="text-base font-semibold text-red-600 capitalize">
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
