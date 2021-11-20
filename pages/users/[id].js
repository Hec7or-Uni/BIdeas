import { useRouter } from "next/router"
import { getSession } from "next-auth/react"
import useSWR from "swr"
import Header from "../../components/Header"
import Statistics from "../../components/Cards/Statistics"
import TeUsCard from "../../components/Cards/TeUsCard"
import Layout from "../../components/layout"
import {
  FiHexagon,
  FiAward,
  FiFlag,
  FiBriefcase,
  FiHeart,
} from "react-icons/fi"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Profile() {
  const router = useRouter()
  let user = null
  let ownsCli = null
  let participatesCli = null

  const { data, error } = useSWR(
    `http://localhost:3000/api/users/${router.query.id}`,
    fetcher
  )

  if (error) {
    // return router.push("/404")
  } else {
    if (!data) {
      return <>loading</>
    } else {
      user = data.data.user
      ownsCli = data.data.projects.owns
      participatesCli = data.data.projects.participates
    }
  }

  return (
    <div className="w-full px-8 py-3">
      <Header
        avatar={user.avatar}
        username={user.userName}
        id={user.id}
        studies={user.studies}
        plan={user.plan}
      />
      <div className="container mt-6">
        <div className="flex gap-x-5">
          <div className="flex gap-x-1 items-center justify-center w-1/4 h-44 bg-gray-100">
            <div className="flex justify-center items-center h-28 w-28 relative">
              <FiHexagon
                className="h-full w-full relative"
                style={{ strokeWidth: "0.6" }}
              />
              <div className="h-10 w-10 rounded absolute">
                <img
                  src={`/ranks/${0}.jpg`}
                  className="w-full h-full object-cover object-center rounded border border-black"
                />
              </div>
            </div>
            <div>
              <p className="text-lg font-bold">
                { Number((user.xp-49)/100).toFixed() == 0 && "Newbie"}
                { Number((user.xp-49)/100).toFixed() == 1 && "Entrepeneur"}
                { Number((user.xp-49)/100).toFixed() == 2 && "Veteran"}
                { Number((user.xp-49)/100).toFixed() == 3 && "Businessman"}
                { Number((user.xp-49)/100).toFixed() == 4 && "Your own Boss"}
                { Number((user.xp-49)/100).toFixed() >= 5 && (
                  <span className="text-yellow-500 animate-pulse duration-700">GOAT</span>
                )}
              </p>
              <p className="text-lg font-normal">rank</p>
            </div>
          </div>
          <div className="flex flex-col self-start w-2/4 leading-snug">
          <p>{user.description ? user.description : "This user does not have a description yet!"}</p>
          </div>
        </div>

        <div className="flex gap-x-5 mt-6">
          <Statistics
            icon={<FiAward className="h-6 w-6 text-purple-500" />}
            points={user.xp}
            desc={"points"}
          />
          <Statistics
            icon={<FiFlag className="h-6 w-6 text-yellow-500" />}
            points={1}
            desc={"teams owned"}
          />
          <Statistics
            icon={<FiBriefcase className="h-6 w-6 text-blue-500" />}
            points={1}
            desc={"teams"}
          />
          <Statistics
            icon={<FiHeart className="h-6 w-6 text-red-500" />}
            points={user.respect}
            desc={"respect"}
          />
        </div>

        <div className="flex flex-col gap-x-5 mt-12">
          {ownsCli.map((item) => {
            return (
              <TeUsCard
                key={item.id}
                img={item.avatar}
                title={item.teamName}
                desc={item.description}
                isUser={false}
                url={item.teamName}
              />
            )
          })}
          {participatesCli.map((item) => {
            return (
              <TeUsCard
                key={item.id}
                img={item.avatar}
                title={item.teamName}
                desc={item.description}
                isUser={false}
                url={item.teamName}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

Profile.getLayout = function getLayout(page) {
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
    const url = `http://localhost:3000/api/user?${params.toString()}`

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
