import Link from "next/link"
import { useState } from "react"

export default function ButtonP({ id, func = () => {}, text, url, className }) {
  const [wasClicked, click] = useState(false)
  return (
    <div
      onClick={(e) => {
        func(e)
        click(true)
      }}
    >
      <Link href={url}>
        <a
          id={id}
          className={`capitalize text-xs font-bold tracking-normal px-4 py-2.5 rounded-lg text-white bg-blue-600 hover:bg-blue-700 
          ${wasClicked ? "hidden" : ""} ${className}`}
        >
          {text}
        </a>
      </Link>
    </div>
  )
}
