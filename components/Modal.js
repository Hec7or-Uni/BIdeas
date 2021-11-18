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
          <Notification
            type={0}
            title={"Max Verstappen"}
            subtitle={"Pilot"}
            urlLeft={"/home"}
            urlRight={"/home"}
            imgLeft={
              "https://images.unsplash.com/photo-1597137257188-5916d281a9e0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1887&q=80"
            }
            imgRight={
              "https://images.unsplash.com/photo-1501940740999-480321d51e5a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            }
          />
          <p className="w-72 font-normal text-sm mt-2 mb-1">
            Hey! Looks like someone wants you to join their team!
          </p>
          <Notification
            type={1}
            title={"Space X"}
            subtitle={"Team"}
            urlLeft={"/home"}
            urlRight={"/home"}
            imgLeft={
              "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80"
            }
            imgRight={
              "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=580&q=80"
            }
          />
        </div>
      </div>
    </div>
  )
}
