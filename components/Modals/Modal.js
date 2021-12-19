import useSWR from "swr"
import { useRouter } from "next/router"
import Notification from "../Cards/Notification"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Modal({ id }) {
  const router = useRouter()

  const params = new URLSearchParams({ id: id })
  const res1 = useSWR(
    `/api/user/requested-member?${params.toString()}`,
    fetcher
  )
  const res2 = useSWR(`/api/user/requested-join?${params.toString()}`, fetcher)

  if (res1.error || res2.error) {
    return router.push("/404")
  }

  if (!res1.data || !res2.data) {
    return <>loading</>
  }

  const user = res1.data.data.user
  const teams = res1.data.data.teams
  const team = res2.data.data.team
  const users = res2.data.data.users

  return (
    <div className="absolute top-2 right-0 z-50 mt-16 bg-white shadow dark:bg-cm-color rounded-xl mr-8">
      <div className="flex flex-col p-2">
        {users.length !== 0 || teams.length !== 0 ? (
          <h2 className="font-bold text-base mb-2 text-gray-900 dark:text-gray-100">
            Notifications
          </h2>
        ) : (
          <p className="w-72 font-normal text-sm mb-1 text-gray-500 dark:text-gray-300">
            It seems that there is no news.
          </p>
        )}
        {/* tarjeta */}
        <div className="flex flex-col gap-y-1 overflow-y-auto max-h-60 ">
          {users.length !== 0 && (
            <>
              <p className="w-72 font-normal text-sm mb-1 text-gray-500 dark:text-gray-300">
                Hey! it looks like someone wants to join your team.
              </p>
              {users.map((item, idx) => {
                return (
                  <Notification
                    key={idx}
                    type={0}
                    id={item.id}
                    idUser={item.idUser}
                    idProject={item.idProject}
                    title={item.users.userName}
                    subtitle={item.users.studies}
                    urlLeft={"/teams/" + team.project.teamName}
                    urlRight={"/users/" + item.users.userName}
                    imgLeft={team.project.avatar}
                    imgRight={item.users.avatar}
                  />
                )
              })}
            </>
          )}
          {teams.length !== 0 && (
            <>
              <p className="w-72 font-normal text-sm mt-2 mb-1 text-gray-500 dark:text-gray-300">
                Hey! Looks like someone wants you to join their team!
              </p>
              {teams.map((item, idx) => {
                return (
                  <Notification
                    key={idx}
                    type={1}
                    id={item.id}
                    idUser={item.idUser}
                    idProject={item.idProject}
                    title={item.projects.teamName}
                    subtitle={item.projects.motto}
                    urlLeft={"/users/" + user.user.userName}
                    urlRight={"/teams/" + item.projects.teamName}
                    imgLeft={user.user.avatar}
                    imgRight={item.projects.avatar}
                  />
                )
              })}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
