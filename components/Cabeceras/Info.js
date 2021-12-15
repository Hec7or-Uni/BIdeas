export default function Info() {
  return (
    <div className="flex items-center h-12 relative">
      <div className="flex lg:w-1/2 tracking-wide divide-x-2 divide-gray-200">
        <div className="flex flex-col w-1/2 text-left">
          <p className="text-xs font-medium uppercase truncate text-gray-900 dark:text-gray-100">
            announcement
          </p>
          <p className="mt-2 text-base font-bold truncate text-gray-900 dark:text-gray-100">
            BIdeas Launch
          </p>
        </div>
        <div className="flex flex-col w-1/2 text-left pl-6 text-gray-900 dark:text-gray-100">
          <p className="text-xs font-medium uppercase truncate">changelog</p>
          <p className="mt-2 text-base font-bold capitalize truncate">
            version beta
          </p>
        </div>
      </div>
    </div>
  )
}
