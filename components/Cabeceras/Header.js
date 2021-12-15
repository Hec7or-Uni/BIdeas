import Link from "next/link"
import { useState } from "react"
import { FiPaperclip, FiFacebook, FiTwitter } from "react-icons/fi"
import { SiDiscord } from "react-icons/si"

export default function Header({
  avatar,
  username,
  id,
  studies,
  plan,
  xp,
  myProfile,
  country,
  isTeam,
  website,
  discord,
  facebook,
  twitter,
}) {
  if (
    country !== "Spain" &&
    country !== "France" &&
    country !== "Germany" &&
    country !== "UnitedKingdom" &&
    country !== "UnitedStates" &&
    country !== "Italy" &&
    country !== "China" &&
    country !== "Japan" &&
    country !== "Russia" &&
    country !== "Belgium" &&
    country !== "Netherlands" &&
    country !== "Sweden" &&
    country !== "Canada" &&
    country !== "Brazil"
  ) {
    country = "DefaultCountry"
  }

  const [isActive, setActive] = useState()
  return (
    <>
      <div className="flex justify-between items-center gap-4 tracking-normal mb-4 relative">
        {/* Profile */}
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full relative">
            <img
              src={avatar || "/personas/DefaultAvatar.jpg"}
              className="w-full h-full rounded-full object-cover center"
            />
            <div className="flex w-5 h-5 mb-0.5 ml-0.5 rounded-full absolute right-0 bottom-0">
              <img
                src={`/banderas/${country}.png`}
                className="rounded-full object-cover center"
              />
            </div>
          </div>

          <div className="ml-8">
            <div className="flex items-end">
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100 capitalize">
                {username}
              </p>
              <p className="ml-2 text-base font-semibold text-gray-900 dark:text-gray-100">
                #{id}
              </p>
            </div>
            <p className="text-base font-semibold text-gray-700 dark:text-gray-100 capitalize">
              {studies}
            </p>
          </div>
        </div>

        <div className="flex gap-4 absolute right-0 mr-16">
          {/* Rank */}
          <div className="flex flex-col uppercase mr-16">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              rank
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {Math.trunc(xp / 100) === 0 && "Newbie"}
              {Math.trunc(xp / 100) === 1 && "Entrepeneur"}
              {Math.trunc(xp / 100) === 2 && "Veteran"}
              {Math.trunc(xp / 100) === 3 && "Businessman"}
              {Math.trunc(xp / 100) === 4 && "Your own Boss"}
              {Math.trunc(xp / 100) >= 5 && (
                <span className="text-yellow-500 animate-pulse duration-700">
                  GOAT
                </span>
              )}
            </p>
          </div>

          {/* Plan Type */}
          <div className="flex flex-col uppercase">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              plan type
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {plan === 0 ? "free" : "vip"}
            </p>
            {plan === 0 && myProfile && (
              <Link href="#">
                <a className="text-sm font-medium text-blue-600 hover:underline">
                  go vip
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div
          className={`flex gap-x-20 justify-center pb-6 
          ${isActive ? "" : "hidden"}`}
        >
          <a
            href={(isTeam ? discord : website) || ""}
            className="flex justify-center items-center w-6 h-6 rounded-full"
          >
            {isTeam ? (
              <SiDiscord className="w-5 h-5 text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-400" />
            ) : (
              <FiPaperclip className="w-5 h-5 text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-400" />
            )}
          </a>
          <a
            href={facebook || ""}
            className="flex justify-center items-center w-6 h-6 rounded-full"
          >
            <FiFacebook className="w-5 h-5 text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-400" />
          </a>
          <a
            href={twitter || ""}
            className="flex justify-center items-center w-6 h-6 rounded-full"
          >
            <FiTwitter className="w-5 h-5 text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-400" />
          </a>
        </div>
        <button onClick={() => setActive(!isActive)} className="mx-auto p-">
          <div className="flex items-center w-36 h-1 bg-gray-300 rounded-full" />
        </button>
      </div>
    </>
  )
}

Header.defaultProps = {
  myProfile: false,
}
