import { useState } from "react"
import { useRouter } from "next/router"
import { getSession } from "next-auth/react"
import useSWR from "swr"
import Layout from "../../components/layout"
import LineMenu from "../../components/Navegation/LineMenu"
import Preview from "../../components/Cards/Preview"
import Meta from "components/Meta"
import { links4pro } from "data/LineMenu"
import { useA4Hired } from "../../context/A4HiredContext"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Professionals({ user }) {
  const [isActive, setActive] = useState(1)
  const handleMenu = async (id) => setActive(id)
  let users = null
  let contactedUsers = null
  let contactedUsersCopy = null

  const router = useRouter()
  const [isToggled, Toggle] = useA4Hired()

  const res1 = useSWR(`http://localhost:3000/api/users/lite`, { fetcher })

  const params = new URLSearchParams({ id: user.id })
  const res2 = useSWR(
    `http://localhost:3000/api/user/request-member?${params.toString()}`,
    { fetcher }
  )

  if (res2.error) {
    return router.push("/404")
  } else {
    if (!res2.data) {
      return <>loading</>
    } else {
      contactedUsers = res2.data.data.users
      contactedUsersCopy = contactedUsers.map((item) => item.user.id)
    }
  }

  if (res1.error) {
    return router.push("/404")
  } else {
    if (!res1.data) {
      return <>loading</>
    } else {
      users = res1.data.data.users
        .filter((item) => item.id !== user.id)
        .filter((item) => !contactedUsersCopy.includes(item.id))
    }
  }

  return (
    <>
      <Meta title="Professionals" />
      <div className="px-8">
        <p className="text-lg font-bold dark:text-gray-100">
          Lot of Professionals
        </p>
        <p className="text-base font-normal dark:text-gray-100">
          Here you will be able to find many motivated people to complete your
          team.
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
        <LineMenu
          handleMenu={handleMenu}
          data={links4pro}
          isActive={isActive}
        />
      </div>
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
  const { user } = resUser.data

  return {
    props: {
      session,
      user,
    },
  }
}
