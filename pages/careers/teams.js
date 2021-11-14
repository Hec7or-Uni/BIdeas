import Offert from "../../components/Cards/Offert"
import { useA4Hired } from "../../context/A4HiredContext"
import Layout from "../../components/layout"
import LineMenu from "../../components/Navegation/LineMenu"
import { useLMenu } from "../../context/LMenuContext"
import { getSession } from "next-auth/react"

const data = [
  {
    id: 1,
    name: "Jobs",
  },
  {
    id: 2,
    name: "Applied Jobs",
  },
]

export default function Teams({ projects }) {
  const [isToggled, Toggle] = useA4Hired()
  const [isActive] = useLMenu()

  return (
    <>
      <div className="px-8 top-0">
        <p className="text-lg font-bold">Lot of Jobs</p>
        <p className="text-base font-normal">
          Here you will be able to find some of the projects that are looking
          for professionals. Hopefully you will find one to your liking.
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
          <p className="text-lg font-bold">Job Board</p>
          <p className="text-base font-normal mb-4">
            <span>{projects.length}</span> active job opportunities
          </p>
          {projects.map((item) => {
            return (
              <Offert
                key={item.id}
                img={item.avatar}
                title={item.teamName}
                subtitle={item.motto}
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
          <p className="text-lg font-bold">Job Board</p>
          <p className="text-base font-normal mb-4">
            you applied for <span>{projects.length}</span>{" "}
            {projects.length === 0 ? "job" : "jobs"}
          </p>
          <Offert
            img={"/anuncios/anuncio3.jpg"}
            title={"Space X goes to mars"}
            subtitle={"engineer required"}
            accion1={"view job"}
            accion2={"apply for job"}
            date={"8d ago"}
            applied={true}
          />
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
  let resTeams = null

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

    const urlTeams = `http://localhost:3000/api/teams`
    resTeams = await fetch(urlTeams, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${req.cookies["next-auth.session-token"]}`,
      },
    }).then((resTeams) => {
      return resTeams.json()
    })
  }
  const { user } = resUser.data
  const { projects } = resTeams.data

  return {
    props: {
      session,
      user,
      projects,
    },
  }
}
