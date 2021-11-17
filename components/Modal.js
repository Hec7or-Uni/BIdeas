import Notification from "./Cards/Notification"

export default function Modal() {
  return (
    <div className="absolute top-0 right-0 z-50 mt-16 bg-neutral rounded-xl mr-8">
      <div className="flex flex-col p-2">
        <h2 className="font-bold text-base mb-2">Notifications</h2>
        {/* tarjeta */}
        <div className="flex flex-col gap-y-1 overflow-y-auto h-60 ">
          <p className="w-72 font-normal text-sm mb-1">
            Hey! it looks like someone wants to join one of your teams.
          </p>
          <Notification />
          <p className="w-72 font-normal text-sm mt-2 mb-1">
            Hey! Looks like someone wants you to join their team!
          </p>
          <Notification type={1} />
        </div>
      </div>
    </div>
  )
}
