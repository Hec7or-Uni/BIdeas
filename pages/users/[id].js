import Header from "../../components/Header"
import Stats from "../../components/Cards/Stats"
import TeUsCard from "../../components/Cards/TeUsCard"
import Layout from "../../components/layout"
import { getSession } from "next-auth/react"
import useSWR from "swr"
import { useRouter } from "next/router"

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
  let projects = null

  const { data, error } = useSWR(
    `http://localhost:3000/api/users/${router.query.id}`,
    fetcher
  )

  if (error) {
    return router.push("/404")
  } else {
    if (!data) {
      return <>loading</>
    } else {
      user = data.data.user
      projects = data.data.projects
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
              <p className="text-lg font-bold">Noob</p>
              <p className="text-lg font-normal">rank</p>
            </div>
          </div>
          <div className="flex flex-col self-start w-2/4 leading-snug">
            <p>{user.description ? user.description : "Introduzca texto"}</p>
          </div>
        </div>

        <div className="flex gap-x-5 mt-6">
          <Stats
            icon={<FiAward className="h-6 w-6 text-purple-500" />}
            points={user.xp}
            desc={"points"}
          />
          <Stats
            icon={<FiFlag className="h-6 w-6 text-yellow-500" />}
            points={1}
            desc={"teams owned"}
          />
          <Stats
            icon={<FiBriefcase className="h-6 w-6 text-blue-500" />}
            points={1}
            desc={"teams"}
          />
          <Stats
            icon={<FiHeart className="h-6 w-6 text-red-500" />}
            points={user.respect}
            desc={"respect"}
          />
        </div>

        <div className="flex flex-col gap-x-5 mt-12">
          {projects.map((item) => {
            return (
              <TeUsCard
                key={item.idProject}
                img={item.project.avatar}
                title={item.project.teamName}
                desc={item.project.description}
                isUser={false}
                url={item.project.teamName}
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
