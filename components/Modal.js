import useSWR from "swr"
import Notification from "./Cards/Notification"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Modal({ id }) {
  let user = []
  let teams = []

  let team = []
  let users = []

  const params = new URLSearchParams({ id: id })
  const res1 = useSWR(
    `http://localhost:3000/api/user/requested-member?${params.toString()}`,
    fetcher
  )

  const res2 = useSWR(
    `http://localhost:3000/api/user/requested-join?${params.toString()}`,
    fetcher
  )

  if (res1.error) {
    // return router.push("/404")
  } else {
    if (!res1.data) {
      return <>loading</>
    } else {
      user = res1.data.data.user
      teams = res1.data.data.teams
      console.log(user, teams)
    }
  }

  if (res2.error) {
    // return router.push("/404")
  } else {
    if (!res2.data) {
      return <>loading</>
    } else {
      team = res2.data.data.team
      users = res2.data.data.users
    }
  }

  return (
    <div className="absolute top-0 right-0 z-50 mt-16 bg-neutral rounded-xl mr-8">
      <div className="flex flex-col p-2">
        <h2 className="font-bold text-base mb-2">Notifications</h2>
        {/* tarjeta */}
        <div className="flex flex-col gap-y-1 overflow-y-auto max-h-60 ">
          <p className="w-72 font-normal text-sm mb-1">
            Hey! it looks like someone wants to join your team.
          </p>
          {users.map((item) => {
            return (
              <Notification
                key={item.id}
                type={0}
                title={item.userName}
                subtitle={item.studies}
                urlLeft={team.teamName}
                urlRight={item.userName}
                imgLeft={team.avatar}
                imgRight={item.avatar}
              />
            )
          })}
          <p className="w-72 font-normal text-sm mt-2 mb-1">
            Hey! Looks like someone wants you to join their team!
          </p>
          {teams.map((item) => {
            return (
              <Notification
                key={item.id}
                type={1}
                title={item.teamName}
                subtitle={item.motto}
                urlLeft={user.userName}
                urlRight={item.teamName}
                imgLeft={user.avatar}
                imgRight={item.avatar}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
