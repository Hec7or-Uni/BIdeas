import Link from "next/Link"

export default function ButtonP({ func, text, url, className }) {
  return (
    <div onClick={func}>
      <Link href={url}>
        <a
          className={`capitalize text-xs font-bold tracking-normal px-4 py-2.5 rounded-lg text-white bg-blue-600 hover:bg-blue-700 ${className}`}
        >
          {text}
        </a>
      </Link>
    </div>
  )
}
