import Link from "next/Link";
import { useState } from "react";
import { useSidebar } from "../context/SidebarContext";

export default function SiteButton({ icon, site, url, links }) {
  const [isActiveMore, setActiveMore] = useState(false);
  const [isActive, setActive] = useSidebar();
  const more = links.length >= 1;

  return (
    <div className="mb-1 rounded-md">
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
              isActive ? "px-1 py-2" : "px-2 py-2"
            } rounded-md hover:bg-gray-200 relative`}
          >
            {icon}
            {!isActive && (
              <>
                <p className="w-40 mx-4 text-base lg:text-lg font-medium text-left text-black capitalize truncate overflow-clip overflow-hidden tracking-wide">
                  {site}
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 md:h-5 md:w-5 absolute right-0 mx-4 transition duration-500 ${
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
                    <a className="px-2 py-2 rounded-md">
                      <p className="w-40 mx-4 text-base lg:text-lg font-medium text-left text-black capitalize truncate overflow-clip overflow-hidden tracking-wide">
                        {item.name}
                      </p>
                    </a>
                  </Link>
                );
              })}
          </div>
        </>
      ) : (
        <Link href={url}>
          <a
            onClick={() => setActive(false)}
            className={`flex items-center w-full ${
              isActive ? "px-1 py-2" : "px-2 py-2"
            } rounded-md hover:bg-gray-200 relative`}
          >
            {icon}
            {!isActive && (
              <p className="w-40 mx-4 text-base lg:text-lg font-medium text-left text-black capitalize truncate overflow-clip overflow-hidden tracking-wide">
                {site}
              </p>
            )}
          </a>
        </Link>
      )}
    </div>
  );
}
