import Link from "next/link"
import { RiBlazeLine } from "react-icons/ri"

export default function Logo({ toggle }) {
  return (
    <Link href="/">
      <a className="flex gap-x-2 absolute left-0 mx-4">
        <RiBlazeLine className="h-6 w-6 text-red-600" />
        {!toggle && (
          <div>
            <span className="font-bold dark:text-white">BI</span>
            <span className="font-semibold text-gray-900 dark:text-gray-200">
              deas
            </span>
          </div>
        )}
      </a>
    </Link>
  )
}
