import { useState } from "react"
import { useRouter } from "next/router"
import { getSession } from "next-auth/react"
import Layout from "../../components/layout"
import Preview from "../../components/Cards/Preview"
import Preload from "components/Cabeceras/Preload"

import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Teams({ user, myProjects }) {
  const router = useRouter()
  const [isActive, setActive] = useState(1)
  const handleMenu = (id) => setActive(id)

  const params = new URLSearchParams({ id: user.id })
  const params2 = new URLSearchParams({ id: user.id })
  const res1 = useSWR(`http://localhost:3000/api/teams/lite`, fetcher)
  const res2 = useSWR(
    `http://localhost:3000/api/user/request-join?${params.toString()}`,
    fetcher
  )
  const res3 = useSWR(
    `http://localhost:3000/api/user/participates?${params2.toString()}`,
    fetcher
  )

  if (res1.error || res2.error || res3.error) {
    return router.push("/404")
  }

  if (!res1.data || !res2.data || !res3.data) {
    return (
      <Preload
        web={"Teams"}
        title={"Lot of Jobs"}
        subtitle={
          "Here you will be able to find some of the projects that are looking for professionals. Hopefully you will find one to your liking."
        }
        handleMenu={handleMenu}
        isActive={isActive}
      />
    )
  }

  const current = res3.data.data.current.map((item) => item.project.id)
  const appliedJobs = res2.data.data.teams
  const appliedJobsCopy = appliedJobs.map((item) => item.project.id)
  const projects = res1.data.data.teams
    .filter((item) => !current.includes(item.id))
    .filter((item) => !appliedJobsCopy.includes(item.id))

  return (
    <>
      <Preload
        web={"Teams"}
        title={"Lot of Jobs"}
        subtitle={
          "Here you will be able to find some of the projects that are looking for professionals. Hopefully you will find one to your liking."
        }
        handleMenu={handleMenu}
        isActive={isActive}
      />
      {isActive === 1 && (
        <div className="container px-8 mx-auto">
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Job Board
          </p>
          <p className="text-base font-normal mb-4 text-gray-700 dark:text-gray-100">
            <span>{projects.length}</span> active{" "}
            {projects.length === 1 ? "job opportunity" : "jobs opportunities"}
          </p>
          <div className="flex flex-col gap-y-4">
            {projects.map((item) => {
              return (
                <Preview
                  key={item.id}
                  id={item.id}
                  img={item.avatar}
                  title={item.teamName}
                  subtitle={item.motto}
                  accion1={"view job"}
                  accion2={"apply for job"}
                  isUser={false}
                  url={item.teamName}
                  createdAt={item.createdAt}
                />
              )
            })}
          </div>
        </div>
      )}
      {isActive === 2 && (
        <div className="container px-8 mx-auto">
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Job Board
          </p>
          <p className="text-base font-normal mb-4 text-gray-700 dark:text-gray-100">
            you applied for <span>{appliedJobs.length}</span>{" "}
            {appliedJobs.length === 1 ? "job" : "jobs"}
          </p>
          <div className="flex flex-col gap-y-4">
            {appliedJobs.map((item) => {
              return (
                <Preview
                  key={item.id}
                  id={item.id}
                  img={item.project.avatar}
                  title={item.project.teamName}
                  subtitle={item.project.motto}
                  accion1={"view job"}
                  accion2={"apply for job"}
                  applied={true}
                  isUser={false}
                  url={item.project.teamName}
                  createdAt={item.project.createdAt}
                />
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

Teams.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  const params = new URLSearchParams({ id: session.token.id })
  const urlUser = `http://localhost:3000/api/user?${params.toString()}`

  const resUser = await fetch(urlUser, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${req.cookies["next-auth.session-token"]}`,
    },
  }).then((resUser) => {
    return resUser.json()
  })

  const { user, projects } = resUser.data
  const myProjects = projects.owns || {}

  return {
    props: {
      session,
      user,
      myProjects,
    },
  }
}
