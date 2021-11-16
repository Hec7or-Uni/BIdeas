import Link from "next/link"

export default function Header({ avatar, username, id, studies, plan }) {
  return (
    <div className="flex justify-between items-center gap-4 tracking-normal mb-4 relative">
      {/* Profile */}
      <div className="flex items-center">
        <div className="w-16 h-16 rounded-full relative bg-green-500">
          <img
            src={avatar || "/personas/HectorToralPallas.jpg"}
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
            <p className="text-lg font-bold text-black capitalize">
              {username}
            </p>
            <p className="ml-2 text-base font-semibold text-black">#{id}</p>
          </div>
          <p className="text-base font-semibold text-gray-800 capitalize">
            {studies}
          </p>
        </div>
      </div>

      <div className="flex gap-4 absolute right-0 mr-16">
        {/* Rank */}
        <div className="flex flex-col uppercase mr-16">
          <p className="text-sm font-medium">rank</p>
          <p className="text-lg font-bold">noob</p>
        </div>

        {/* Plan Type */}
        <div className="flex flex-col uppercase">
          <p className="text-sm font-medium">plan type</p>
          <p className="text-lg font-bold">{plan === 0 ? "free" : "vip"}</p>
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
