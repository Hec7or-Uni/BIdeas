import Link from "next/Link";
import { useState } from "react";

const links = [
  {
    id: 1,
    name: "Go VIP",
    url: "",
  },
  {
    id: 2,
    name: "View Profile",
    url: "",
  },
  {
    id: 3,
    name: "Profile Settings",
    url: "",
  },
  {
    id: 4,
    name: "Subscriptions",
    url: "",
  },
  {
    id: 5,
    name: "Logout",
    url: "",
  },
];

export default function Navbar({ username }) {
  const [isActive, setActive] = useState(false);

  return (
    <nav className="flex items-center h-14 w-full bg-gray-200 z-50 tracking-wide">
      <div className="flex items-center h-10 ml-8">
        {/* Buscador */}
        <form
          method="#"
          onSubmit={() => console.log("Click")}
          className="flex items-center h-8 bg-white p-2 rounded-md"
        >
          <button id="magnifier" type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <input
            id="search"
            name="search"
            type="search"
            placeholder="Search..."
            className="w-56 ml-2.5 outline-none text-lg font-normal text-black"
          />
        </form>

        {/* Upgrade To Vip */}
        <div className="px-5 py-1.5 ml-6 rounded-full bg-gray-600">
          <button
            id="vip"
            type="button"
            className="uppercase text-base font-bold text-white"
            onClick={() => console.log("Click")}
          >
            upgrade to vip
          </button>
        </div>
      </div>

      {/* Profile */}
      <div className="flex items-center h-12 absolute right-0 mr-8">
        <div className="w-10 h-10 rounded-full">
          <img
            src="/personas/HectorToralPallas.jpg"
            className="w-10 max-h-10 rounded-full object-cover center"
          />
        </div>
        <p className="mx-2.5 text-lg font-semibold text-black">{username}</p>
        <div>
          <button
            id="settings"
            type="button"
            onClick={() => setActive(!isActive)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 mt-1.5 transition duration-500 ${
                isActive ? "rotate-180" : ""
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
          </button>
          {isActive && (
            <div className="flex flex-col w-52 mt-6 rounded-md bg-gray-200 absolute right-0 z-50 py-1">
              {links.map((item) => {
                return (
                  <Link href={item.url} key={1}>
                    <a className="px-3 py-1.5 hover:bg-gray-100">
                      <p className="text-base font-semibold text-black capitalize">
                        {item.name}
                      </p>
                    </a>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

Navbar.defaultProps = {
  username: "Hec7orci7o",
};
