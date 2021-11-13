import { useState } from "react"
import { FiChevronUp } from "react-icons/fi"

export default function DropDown({ title, content }) {
  const [isActive, setActive] = useState(false)
  return (
    <div className="w-full px-2">
      <div
        onClick={() => setActive(!isActive)}
        className="flex justify-between items-center bg-gray-200 rounded shadow-xl transition duration-200 cursor-pointer mb-3"
      >
        <p className="p-2 text-gray-800 font-bold">{title}</p>
        <button>
          <FiChevronUp
            className={`h-6 w-6 duration-500 cursor-pointer mr-2 ${
              isActive ? "-rotate-180" : ""
            }`}
          />
        </button>
      </div>
      {isActive ? (
        <div className={`bg-gray-200 rounded shadow-xl p-3`}>
          <p className="font-normal text-justify">{content}</p>
        </div>
      ) : null}
    </div>
  )
}
