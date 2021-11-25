import { useState } from "react"
import { useRouter } from "next/router"
import { getSession } from "next-auth/react"
import useSWR from "swr"
import Layout from "../../components/layout"
import Preview from "../../components/Cards/Preview"
import Preload from "components/Cabeceras/Preload"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Professionals({ user }) {
  const router = useRouter()
  const [isActive, setActive] = useState(1)
  const handleMenu = async (id) => setActive(id)

  const params = new URLSearchParams({ id: user.id })
  const res1 = useSWR(`http://localhost:3000/api/users/lite`, { fetcher })
  const res2 = useSWR(
    `http://localhost:3000/api/user/request-member?${params.toString()}`,
    { fetcher }
  )

  if (res1.error || res2.error) {
    return router.push("/404")
  }

  if (!res1.data || !res2.data) {
    return (
      <Preload
        web={"Professionals"}
        title={"Lot of Professionals"}
        subtitle={
          "Here you will be able to find many motivated people to complete your team."
        }
        handleMenu={handleMenu}
        isActive={isActive}
      />
    )
  }

  const contactedUsers = res2.data.data.users
  const contactedUsersCopy = contactedUsers.map((item) => item.user.id)
  const users = res1.data.data.users
    .filter((item) => item.id !== user.id)
    .filter((item) => !contactedUsersCopy.includes(item.id))

  return (
    <>
      <Preload
        web={"Professionals"}
        title={"Lot of Professionals"}
        subtitle={
          "Here you will be able to find many motivated people to complete your team."
        }
        handleMenu={handleMenu}
        isActive={isActive}
      />
      {isActive === 1 && (
        <div className="container px-8 mx-auto">
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Proffesional Board
          </p>
          <p className="text-base font-normal mb-4 text-gray-700 dark:text-gray-100">
            <span>{users.length}</span> {users.length === 1 ? "user" : "users"}{" "}
            available for hire
          </p>
          <div className="flex flex-col gap-y-4">
            {users.map((item) => {
              return (
                <Preview
                  key={item.id}
                  id={item.id}
                  img={item.avatar}
                  title={item.name + " " + item.lastName}
                  subtitle={item.studies}
                  accion1={"view profile"}
                  accion2={"contact"}
                  isUser={true}
                  url={item.userName}
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
            Proffesional Board
          </p>
          <p className="text-base font-normal mb-4 text-gray-700 dark:text-gray-100">
            You have contacted <span>{contactedUsers.length}</span>{" "}
            {contactedUsers.length === 1 ? "person" : "people"}
          </p>
          <div className="flex flex-col gap-y-4">
            {contactedUsers.map((item) => {
              return (
                <Preview
                  key={item.id}
                  id={item.id}
                  img={item.user.avatar}
                  title={item.user.name + " " + item.user.lastName}
                  subtitle={item.user.studies}
                  accion1={"view profile"}
                  accion2={"contact"}
                  applied={true}
                  isUser={true}
                  url={item.user.userName}
                  createdAt={item.user.createdAt}
                />
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

Professionals.getLayout = function getLayout(page) {
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

  const { user } = resUser.data

  return {
    props: {
      session,
      user,
    },
  }
}
