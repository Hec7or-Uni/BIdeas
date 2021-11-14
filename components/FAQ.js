import { useState } from "react"
import { FiChevronUp } from "react-icons/fi"

export default function FAQ({ title, content }) {
  const [isActive, setActive] = useState(false)
  return (
    <div className="w-full px-2 mb-1">
      <div
        onClick={() => setActive(!isActive)}
        className="p-4 bg-gray-100 rounded shadow-md transition duration-200 cursor-pointer mb-3"
      >
        <div className="flex justify-between items-center">
          <p
            className={`text-gray-800 font-bold
            ${isActive ? "text-blue-600" : ""}`}
          >
            {title}
          </p>
          <button>
            <FiChevronUp
              className={`h-6 w-6 transition duration-500 cursor-pointer mr-2 
              ${isActive ? "-rotate-180 text-blue-600" : ""}`}
            />
          </button>
        </div>
        {isActive && (
          <p className="font-normal text-justify opacity-70 mt-4">{content}</p>
        )}
      </div>
    </div>
  )
}
