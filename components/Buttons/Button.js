import Link from "next/Link"

export default function dropDown ({text,url}) {
    return (
        <Link href={url}>
        <a className="capitalize text-sm font-bold px-4 py-2 border-2 border-black rounded
                        hover:bg-black hover:text-white">
          {text}
        </a>
      </Link>
    )
}
