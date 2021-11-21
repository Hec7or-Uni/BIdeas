import Link from "next/link"

export default function ButtonS({ func, text, url, className }) {
  return (
    <div onClick={func}>
      <Link href={url}>
        <a
          className={`capitalize text-xs font-bold tracking-normal px-4 py-2.5 rounded-lg text-black hover:bg-gray-50 ${className}`}
        >
          {text}
        </a>
      </Link>
    </div>
  )
}
