import { useState } from "react"
import { useRouter } from "next/router"
import { getSession } from "next-auth/react"
import Layout from "../../components/layout"
import LineMenu from "../../components/Navegation/LineMenu"
import Preview from "../../components/Cards/Preview"
import Meta from "components/Meta"
import { useA4Hired } from "../../context/A4HiredContext"

import useSWR from "swr"

const links = [
  {
    id: 1,
    name: "Jobs",
  },
  {
    id: 2,
    name: "Applied Jobs",
  },
]

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Teams({ user, myProjects }) {
  const [isActive, setActive] = useState(1)
  const handleMenu = (id) => setActive(id)

  let projects = null
  let appliedJobs = null
  let appliedJobsCopy = null
  let current = null

  const router = useRouter()
  const [isToggled, Toggle] = useA4Hired()

  const res1 = useSWR(`http://localhost:3000/api/teams/lite`, fetcher)

  const params = new URLSearchParams({ id: user.id })
  const res2 = useSWR(
    `http://localhost:3000/api/user/request-join?${params.toString()}`,
    fetcher
  )

  const params2 = new URLSearchParams({ id: user.id })
  const res3 = useSWR(
    `http://localhost:3000/api/user/participates?${params2.toString()}`,
    fetcher
  )

  if (res3.error) {
    return router.push("/404")
  } else {
    if (!res3.data) {
      return <>loading</>
    } else {
      current = res3.data.data.current.map((item) => item.project.id)
    }
  }

  if (res2.error) {
    return router.push("/404")
  } else {
    if (!res2.data) {
      return <>loading</>
    } else {
      appliedJobs = res2.data.data.teams
      appliedJobsCopy = appliedJobs.map((item) => item.project.id)
    }
  }

  if (res1.error) {
    return router.push("/404")
  } else {
    if (!res1.data) {
      return <>loading</>
    } else {
      projects = res1.data.data.teams
        .filter((item) => !current.includes(item.id))
        .filter((item) => !appliedJobsCopy.includes(item.id))
    }
  }

  return (
    <>
      <Meta title="Teams" />
      <div className="px-8 top-0">
        <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
          Lot of Jobs
        </p>
        <p className="text-base font-normal text-gray-900 dark:text-gray-100">
          Here you will be able to find some of the projects that are looking
          for professionals. Hopefully you will find one to your liking.
        </p>
      </div>
      <div className="flex items-center gap-x-5 w-full bg-color-light-neutral-1 dark:bg-gray-900 shadow-sm px-8 my-8 py-5">
        <div
          className={`flex w-12 h-5 rounded-full shadow-inner transition duration-200 ease-in-out
          ${isToggled ? "bg-green-400" : "bg-red-400"}`}
        >
          <button
            onClick={() => Toggle(!isToggled)}
            className={`self-center w-6 h-6 bg-white rounded-full transition duration-500 
            ${isToggled ? "transform translate-x-full" : ""}`}
          />
        </div>

        <div>
          <p className="text-lg font-semibold text-black dark:text-white">
            Available for hire
          </p>
          <p className="text-base font-normal text-black dark:text-white">
            Make my profile available for hire
          </p>
        </div>
      </div>
      <div className="px-8">
        {/* <LineMenu data={links} /> */}
        <LineMenu handleMenu={handleMenu} data={links} isActive={isActive} />
      </div>
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
  let resUser = null

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  } else {
    const params = new URLSearchParams({ id: session.token.id })
    const urlUser = `http://localhost:3000/api/user?${params.toString()}`

    resUser = await fetch(urlUser, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${req.cookies["next-auth.session-token"]}`,
      },
    }).then((resUser) => {
      return resUser.json()
    })
  }
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
