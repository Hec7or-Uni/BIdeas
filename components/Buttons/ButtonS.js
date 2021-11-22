import Link from "next/link"

export default function ButtonS({ func, text, url, className }) {
  return (
    <div onClick={func}>
      <Link href={url}>
        <a
          className={`capitalize text-xs font-bold tracking-normal px-4 py-2.5 rounded-lg text-black hover:bg-color-light-neutral-2 dark:hover:bg-color-neutral-2 ${className}`}
        >
          <span className="dark:text-white">{text}</span>
        </a>
      </Link>
    </div>
  )
}
