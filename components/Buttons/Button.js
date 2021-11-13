import Link from "next/Link"

export default function Button({ func, text, url, className }) {
  return (
    <div onClick={func}>
      <Link href={url}>
        <a
          className={`capitalize text-sm font-medium px-4 py-2 border-2 border-black rounded-sm transition-colors duration-500 hover:bg-black hover:text-white ${className}`}
        >
          {text}
        </a>
      </Link>
    </div>
  )
}
