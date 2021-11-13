import Header from "components/Header"
import LineMenu from "components/Navegation/LineMenu"
import { useLMenu } from "../context/LMenuContext"
import Stats from "../components/Cards/Stats"
import TeUsCard from "../components/Cards/TeUsCard"
import Layout from "../components/layout"
import { getSession } from "next-auth/react"
import { FiAward, FiBriefcase, FiHeart } from "react-icons/fi"

const data = [
  {
    id: 1,
    name: "team",
  },
  {
    id: 2,
    name: "team settings",
  },
]

export default function Team({ team, user, workers }) {
  const [isActive] = useLMenu()

  return (
    <div className="px-8 py-3">
      <Header
        avatar={user.avatar}
        username={user.userName}
        id={user.id}
        studies={user.studies}
        plan={user.plan}
      />
      <LineMenu data={data} />
      {isActive === 1 && (
        <div className="w-full mt-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-x-6">
              <div className="flex gap-x-4 items-center justify-center w-28 h-28 rounded-full bg-gray-100">
                <img
                  src={team.avatar || "/anuncios/anuncio2.jpg"}
                  alt=""
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <div className="flex items-center gap-x-2">
                  <div className="flex gap-x-4 items-center justify-center w-7 h-7 rounded-full bg-gray-100">
                    <img
                      src="/banderas/spain.png"
                      alt=""
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <p className="text-lg font-bold">{team.teamName}</p>
                </div>
                <p className="text-base font-medium">{team.motto}</p>
              </div>
            </div>
          </div>
          <p className="flex flex-col self-center w-2/4 leading-snug my-5">
            {team.description}
          </p>

          <div className="flex gap-x-5 mt-6">
            <Stats
              icon={<FiAward className="h-6 w-6 text-purple-500" />}
              points={team.xp}
              desc={"points"}
            />
            <Stats
              icon={<FiBriefcase className="h-6 w-6 text-blue-500" />}
              points={workers.length}
              desc={"users"}
            />
            <Stats
              icon={<FiHeart className="h-6 w-6 text-red-500" />}
              points={team.respect}
              desc={"respect"}
            />
          </div>

          <div className="flex flex-col gap-x-5 mt-12">
            {workers.map((item) => {
              return (
                <TeUsCard
                  key={item.idUser}
                  img={item.user.avatar}
                  title={item.user.name + " " + item.user.lastName}
                  desc={item.user.description}
                />
              )
            })}
          </div>
        </div>
      )}
      {isActive === 2 && <div>2</div>}
    </div>
  )
}

Team.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  let res = null

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  } else {
    const params = new URLSearchParams({ id: session.token.id })
    const url = `http://localhost:3000/api/team?${params.toString()}`

    res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${req.cookies["next-auth.session-token"]}`,
      },
    }).then((res) => {
      return res.json()
    })
  }

  const { team, users } = res.data
  const user = users.owner.user
  const workers = users.workers

  return {
    props: {
      session,
      team,
      user,
      workers,
    },
  }
}
