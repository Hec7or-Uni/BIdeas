import { useRouter } from "next/router"
import { getSession } from "next-auth/react"
import useSWR from "swr"
import Header from "../../components/Cabeceras/Header"
import Statistics from "../../components/Cards/Statistics"
import TeUsCard from "../../components/Cards/TeUsCard"
import Layout from "../../components/Layout"
import Meta from "components/Meta"
import { FiAward, FiBriefcase, FiHeart } from "react-icons/fi"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Team() {
  const router = useRouter()
  let team = null
  let ownerCli = null
  let workersCli = null

  const { data, error } = useSWR(`/api/teams/${router.query.id}`, fetcher)

  if (error) {
    return router.push("/404")
  } else {
    if (!data) {
      return <>Loading...</>
    } else {
      const { project, users } = data.data
      const { owner, workers } = users
      team = project
      ownerCli = owner
      workersCli = workers
    }
  }

  let country = team.country

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

  return (
    <div className="px-8 py-3">
      <Meta title={team.teamName} />
      <Header
        avatar={ownerCli.avatar}
        username={ownerCli.userName}
        id={ownerCli.id}
        studies={ownerCli.studies}
        plan={ownerCli.plan}
        xp={ownerCli.xp}
        country={ownerCli.country}
      />
      <div className="w-full mt-16">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-x-6">
            <div className="flex gap-x-4 items-center justify-center w-28 h-28 rounded-full">
              <img
                src={team.avatar || "/personas/DefaultTeamAvatar.png"}
                alt=""
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <div className="flex items-center gap-x-2">
                <div className="flex gap-x-4 items-center justify-center w-7 h-7 rounded-full">
                  <img
                    src={`/banderas/${country}.png`}
                    alt=""
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {team.teamName}
                </p>
              </div>
              <p className="text-base font-medium text-gray-900 dark:text-white">
                {team.motto}
              </p>
            </div>
          </div>
        </div>
        <p className="flex flex-col self-center w-2/4 leading-snug my-5 text-gray-900 dark:text-white">
          {team.description}
        </p>

        <div className="flex gap-x-5 mt-6">
          <Statistics
            icon={<FiAward className="h-6 w-6 text-purple-500" />}
            points={team.xp}
            desc={"points"}
          />
          <Statistics
            icon={<FiBriefcase className="h-6 w-6 text-blue-500" />}
            // points={users.length}
            desc={"users"}
          />
          <Statistics
            icon={<FiHeart className="h-6 w-6 text-red-500" />}
            points={team.respect}
            desc={"respect"}
          />
        </div>

        <div className="flex flex-col gap-y-4 mt-12">
          {workersCli.map((item) => {
            return (
              <TeUsCard
                key={item.id}
                img={item.avatar}
                title={item.name + " " + item.lastName}
                desc={item.description}
                isUser={true}
                url={item.userName}
                owns={true}
              />
            )
          })}
        </div>
      </div>
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
    const url = `${process.env.NEXT_PUBLIC_URL}/api/user?${params.toString()}`

    res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${req.cookies["next-auth.session-token"]}`,
      },
    }).then((res) => {
      return res.json()
    })
  }

  const { user } = res.data

  return {
    props: {
      session,
      user,
    },
  }
}
