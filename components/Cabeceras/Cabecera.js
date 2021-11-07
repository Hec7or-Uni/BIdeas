export default function Cabecera() {
  return (
    <div className="flex items-center h-12 relative">
      <div className="flex lg:w-1/2 tracking-wide divide-x-2">
        <div className="flex flex-col w-1/2 text-left">
          <p className="text-xs font-medium uppercase truncate">announcement</p>
          <p className="mt-2 text-base font-bold truncate">EUROAVIA Mission</p>
        </div>
        <div className="flex flex-col w-1/2 text-left pl-6">
          <p className="text-xs font-medium uppercase truncate">changelog</p>
          <p className="mt-2 text-base font-bold capitalize truncate">
            version 0.1
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:w-1/2 text-right absolute right-0">
        <p className="text-xs font-medium uppercase truncate">users</p>
        <p className="mt-2 text-base font-bold capitalize truncate">
          <span className="text-lg font-black">555</span> users online
        </p>
      </div>
    </div>
  )
}
