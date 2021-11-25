import Link from "next/link"

export default function Header({ avatar, username, id, studies, plan, xp }) {
  return (
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
              src="/banderas/spain.png"
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
            {Math.trunc((xp - 49) / 100) === 0 && "Newbie"}
            {Math.trunc((xp - 49) / 100) === 1 && "Entrepeneur"}
            {Math.trunc((xp - 49) / 100) === 2 && "Veteran"}
            {Math.trunc((xp - 49) / 100) === 3 && "Businessman"}
            {Math.trunc((xp - 49) / 100) === 4 && "Your own Boss"}
            {Math.trunc((xp - 49) / 100) >= 5 && (
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
          {plan === 0 && (
            <Link href="#">
              <a className="text-sm font-medium text-blue-600 hover:underline">
                go vip
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
