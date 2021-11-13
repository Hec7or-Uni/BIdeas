import Offert from "../../components/Cards/Offert"
import { useA4Hired } from "../../context/A4HiredContext"
import Layout from "../../components/layout"
import LineMenu from "../../components/Navegation/LineMenu"
import { useLMenu } from "../../context/LMenuContext"
import { getSession } from "next-auth/react"

const data = [
  {
    id: 1,
    name: "Proffesionals",
  },
  {
    id: 2,
    name: "Conatct Requests",
  },
]

export default function Professionals({ users }) {
  const [isToggled, Toggle] = useA4Hired()
  const [isActive] = useLMenu()

  return (
    <>
      <div className="px-8">
        <p className="text-lg font-bold">Lot of Professionals</p>
        <p className="text-base font-normal">
          Here you will be able to find many motivated people to complete your
          team.
        </p>
      </div>
      <div className="flex items-center gap-x-5 w-full bg-gray-200 px-8 my-8 py-5">
        <div
          className={`flex w-12 h-5 rounded-full shadow-inner transition duration-200 ease-in-out ${
            isToggled ? "bg-green-200" : "bg-red-200"
          }`}
        >
          <button
            onClick={() => Toggle(!isToggled)}
            className={`self-center w-6 h-6 bg-gray-100 rounded-full transition duration-500 ${
              isToggled ? "transform translate-x-full" : ""
            }`}
          />
        </div>
        <div>
          <p className="text-lg font-semibold">Available for hire</p>
          <p className="text-base font-normal">
            Make my profile available for hire
          </p>
        </div>
      </div>
      <div className="px-8">
        <LineMenu data={data} />
      </div>
      {isActive === 1 && (
        <div className="container px-8 mx-auto">
          <p className="text-lg font-bold">Proffesional Board</p>
          <p className="text-base font-normal mb-4">
            <span>{users.length}</span> users available for hire
          </p>
          {users.map((item) => {
            return (
              <Offert
                key={item.id}
                img={item.avatar}
                title={item.name + " " + item.lastName}
                subtitle={item.studies}
                accion1={"view job"}
                accion2={"apply for job"}
                date={"8d ago"}
              />
            )
          })}
        </div>
      )}
      {isActive === 2 && (
        <div className="container px-8 mx-auto">
          <p className="text-lg font-bold">Proffesional Board</p>
          <p className="text-base font-normal mb-4">
            you have contacted <span>{users.length}</span> person
          </p>
          <Offert
            img={"/personas/CarlotaLopezSoria.jpg"}
            title={"Juan Rodriguez"}
            subtitle={"System Engineer"}
            accion1={"view profile"}
            accion2={"contact"}
            date={"8d ago"}
            person={true}
          />
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
  let resUsers = null

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

    const urlUsers = `http://localhost:3000/api/users`
    resUsers = await fetch(urlUsers, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${req.cookies["next-auth.session-token"]}`,
      },
    }).then((resTeams) => {
      return resTeams.json()
    })
  }
  const { user } = resUser.data
  const { users } = resUsers.data

  return {
    props: {
      session,
      user,
      users,
    },
  }
}
