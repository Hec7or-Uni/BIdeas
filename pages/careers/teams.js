import { useState } from "react"
import { useRouter } from "next/router"
import { getSession } from "next-auth/react"
import Layout from "../../components/layout"
import Preview from "../../components/Cards/Preview"
import Preload from "components/Cabeceras/Preload"
import Careers from "components/Content/careers"

import useSWR, { mutate } from "swr"

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

  const handleApplyJob = async (e) => {
    mutate(`http://localhost:3000/api/teams/lite`)
    const id = Number(e.target.id)
    const url = `http://localhost:3000/api/user/request-join`
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: JSON.stringify({ id: id }),
    }).then((res) => {
      return res.json()
    })
    mutate(`http://localhost:3000/api/user/request-join?${params.toString()}`)
  }

  const handleRemove = async (e) => {
    mutate(`http://localhost:3000/api/teams/lite`)

    const id = Number(e.target.id)
    const params2 = new URLSearchParams({ id: id })
    const url = `http://localhost:3000/api/user/request-join?${params2.toString()}`
    await fetch(url, { method: "DELETE" }).then((res) => {
      return res.json()
    })
    mutate(`http://localhost:3000/api/user/request-join?${params.toString()}`)
  }

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
      {isActive === 1 ? (
        <Careers
          title={"Job Board"}
          text={
            projects.length +
            " active " +
            (projects.length === 1 ? " job opportunity" : " jobs opportunities")
          }
          lista={projects.map((item, idx) => {
            return (
              <Preview
                key={idx}
                id={item.id}
                img={item.avatar}
                title={item.teamName}
                subtitle={item.motto}
                url={item.teamName}
                createdAt={item.createdAt}
                isUser={false}
                accion1={"view job"}
                accion2={"apply for job"}
                func={handleApplyJob}
              />
            )
          })}
        />
      ) : (
        <Careers
          title={"Job Board"}
          text={
            "you applied for " +
            appliedJobs.length +
            (appliedJobs.length === 1 ? " job" : " jobs")
          }
          lista={appliedJobs.map((item, idx) => {
            return (
              <Preview
                key={idx}
                id={item.id}
                img={item.project.avatar}
                title={item.project.teamName}
                subtitle={item.project.motto}
                url={item.project.teamName}
                createdAt={item.project.createdAt}
                isUser={false}
                applied={true}
                accion1={"view job"}
                accion2={"remove"}
                func={handleRemove}
              />
            )
          })}
        />
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
