import Link from "next/Link"
import { useRouter } from "next/router"
import { useState } from "react"
import { useSidebar } from "../context/SideBarContext"

export default function SiteButton({ icon, site, url, links }) {
  const router = useRouter()
  const [isActiveMore, setActiveMore] = useState(false)
  const [isActive, setActive] = useSidebar()
  const more = links.length >= 1
  const activeRoute = router.asPath === url

  return (
    <div className="h-9 w-full mb-1 rounded-md">
      {more ? (
        <>
          <button
            type="button"
            onClick={() =>
              setActive(false) | !isActive
                ? setActiveMore(!isActiveMore)
                : setActiveMore(true)
            }
            className={`flex items-center w-full ${
              activeRoute ? "bg-gray-200" : ""
            } ${
              isActive ? "ml-0.5 py-2" : "px-2 py-2"
            } rounded-md hover:bg-gray-200 relative`}
          >
            {icon}
            {!isActive && (
              <>
                <p className="ml-1 max-w-40 text-base font-bold text-left text-black capitalize truncate overflow-clip overflow-hidden tracking-tight">
                  {site}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 absolute right-0 mx-4 transition duration-500 ${
                    isActiveMore ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </>
            )}
          </button>
          <div className="flex flex-col w-full">
            {isActiveMore &&
              !isActive &&
              links.map((item) => {
                return (
                  <Link href={item.url} key={1}>
                    <a className="px-4 py-2 rounded-md">
                      <p className="max-w-40 text-base font-bold text-left text-black capitalize truncate overflow-clip overflow-hidden tracking-tight">
                        {item.name}
                      </p>
                    </a>
                  </Link>
                )
              })}
          </div>
        </>
      ) : (
        <Link href={url}>
          <a
            onClick={() => setActive(false)}
            className={`flex items-center w-full ${
              activeRoute ? "bg-gray-200" : ""
            } ${
              isActive ? "ml-0.5 py-2" : "px-2 py-2"
            } rounded-md hover:bg-gray-200 relative`}
          >
            {icon}
            {!isActive && (
              <p className="ml-1 max-w-40 text-base font-bold text-left text-black capitalize truncate overflow-clip overflow-hidden tracking-tight">
                {site}
              </p>
            )}
          </a>
        </Link>
      )}
    </div>
  )
}
