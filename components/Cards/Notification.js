import Link from "next/link"
import { FiArrowLeft, FiArrowRight, FiPlus, FiX } from "react-icons/fi"

export default function Notification({
  title,
  type,
  urlLeft,
  urlRight,
  imgLeft,
  imgRight,
  subtitle,
}) {
  return (
    <div className="w-96 flex items-center gap-x-2 rounded-lg p-2 bg-color-light-neutral-1 shadow-lg dark:bg-color-light-neutral-2 relative">
      <div className="flex items-center gap-x-2">
        <Link href={urlLeft}>
          <a className="w-12 h-12">
            <img
              src={imgLeft || "/personas/DefaultAvatar.jpg"}
              alt="imagen"
              className="w-full h-full object-cover rounded-lg"
            />
          </a>
        </Link>
        {type === 0 ? (
          <FiArrowLeft className="w-4 h-4 text-black" />
        ) : (
          <FiArrowRight className="w-4 h-4 text-black" />
        )}
        <Link href={urlRight}>
          <a className="w-12 h-12">
            <img
              src={imgRight || "/personas/DefaultAvatar.jpg"}
              alt="imagen"
              className="w-full h-full object-cover rounded-lg"
            />
          </a>
        </Link>
      </div>
      <div className="">
        <h3 className="font-bold text-base text-gray-900">{title}</h3>
        <p className="font-normal text-sm text-gray-700">{subtitle}</p>
      </div>
      <div className="absolute right-0 mr-2">
        <button className="p-1">
          <FiPlus className="w-5 h-5 text-green-500 hover:bg-green-100 rounded-full" />
        </button>
        <button className="p-1">
          <FiX className="w-5 h-5 text-red-500 hover:bg-red-100 rounded-full" />
        </button>
      </div>
    </div>
  )
}

Request.defaultProps = {
  title: "Max Verstappen",
  subtitle: "Pilot",
  type: 0,
  urlLeft: "/home",
  urlRight: "/home",
  imgLeft:
    "https://images.unsplash.com/photo-1597137257188-5916d281a9e0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1887&q=80",
  imgRight:
    "https://images.unsplash.com/photo-1501940740999-480321d51e5a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
}
