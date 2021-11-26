import { useRouter } from "next/router"
import { getSession } from "next-auth/react"
import useSWR from "swr"
import Header from "../../components/Cabeceras/Header"
import Statistics from "../../components/Cards/Statistics"
import TeUsCard from "../../components/Cards/TeUsCard"
import Layout from "../../components/layout"
import Meta from "components/Meta"
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
      <Meta title={user.userName} />
      <Header
        avatar={user.avatar}
        username={user.userName}
        id={user.id}
        studies={user.studies}
        plan={user.plan}
        xp={user.xp}
      />
      <div className="container mt-6">
        <div className="flex gap-x-5">
          <div className="flex gap-x-1 items-center justify-center w-1/4 h-44 bg-color-light-neutral-1 dark:bg-color-neutral-2">
            <div className="flex justify-center items-center h-28 w-28 relative">
              <FiHexagon
                className="h-full w-full relative text-gray-900 dark:text-gray-100"
                style={{ strokeWidth: "0.6" }}
              />
              <div className="h-10 w-10 rounded absolute">
                <img
                  src={`/ranks/${0}.jpg`}
                  className="w-full h-full object-cover object-center rounded border border-black dark:border:white"
                />
              </div>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {Math.trunc((user.xp - 49) / 100) === 0 && "Newbie"}
                {Math.trunc((user.xp - 49) / 100) === 1 && "Entrepeneur"}
                {Math.trunc((user.xp - 49) / 100) === 2 && "Veteran"}
                {Math.trunc((user.xp - 49) / 100) === 3 && "Businessman"}
                {Math.trunc((user.xp - 49) / 100) === 4 && "Your own Boss"}
                {Math.trunc((user.xp - 49) / 100) >= 5 && (
                  <span className="text-yellow-500 animate-pulse duration-700">
                    GOAT
                  </span>
                )}
              </p>
              <p className="text-lg font-normal text-gray-900 dark:text-gray-100">
                rank
              </p>
            </div>
          </div>
          <div className="flex flex-col self-start w-2/4 leading-snug">
            <p className="text-gray-900 dark:text-gray-100">
              {user.description
                ? user.description
                : "This user does not have a description yet!"}
            </p>
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

        <div className="flex flex-col gap-y-4 mt-12">
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
