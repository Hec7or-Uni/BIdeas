import { useState } from "react"
import LineMenu from "../components/Navegation/LineMenu"
import Card from "../components/Cards/Card"
import { useLMenu } from "../context/LMenuContext"
import Layout from "../components/layout"
import Link from "next/Link"
import { getSession } from "next-auth/react"
import Cabecera from "components/Cabeceras/Cabecera"

import { GoOrganization, GoTelescope } from "react-icons/go"

import {
  FiChevronUp,
  FiHexagon,
  FiAward,
  FiFlag,
  FiBriefcase,
  FiHeart,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi"

const links = [
  {
    id: 1,
    name: "overview",
  },
  {
    id: 2,
    name: "recommended",
  },
  {
    id: 3,
    name: "in progress",
  },
]

const Stats = [
  {
    id: 0,
    name: "points",
    icon: <FiAward className="h-5 w-5" />,
  },
  {
    id: 1,
    name: "teams owned",
    icon: <FiFlag className="h-5 w-5" />,
  },
  {
    id: 2,
    name: "teams",
    icon: <FiBriefcase className="h-5 w-5" />,
  },
  {
    id: 3,
    name: "respect",
    icon: <FiHeart className="h-5 w-5" />,
  },
]

export default function Home({ user, projects }) {
  const [stat, setStat] = useState(Stats[0])
  const [isActive] = useLMenu()

  const handleIncrement = () => {
    const id = stat.id
    if (id + 1 < Stats.length) {
      setStat(Stats[id + 1])
    } else {
      setStat(Stats[0])
    }
  }

  const handleDecrement = () => {
    const id = stat.id
    if (id - 1 >= 0) {
      setStat(Stats[id - 1])
    } else {
      setStat(Stats[Stats.length - 1])
    }
  }

  return (
    <>
    
      <div className="px-8 pt-3">
        {/* Cabecera */}
        <Cabecera />

        {/* Anuncio & estadisticas */}
        <div className="flex flex-col lg:flex-row w-full gap-x-6 gap-y-4 my-5">
          {/* anuncio */}
          <div className="rounded-xl w-full lg:w-left">
            <img
              src="/anuncios/anuncio2.jpg"
              className="h-auto w-full object-fill object-center rounded-xl"
            />
          </div>
          <div className="flex gap-x-0.5 rounded-xl w-full h-72 lg:h-auto lg:w-right">
            {/* Izquierda */}
            <div className="h-full w-right rounded-tl-xl rounded-bl-xl p-6 bg-gray-200 relative">
              {/* Parte superior */}
              <div className="flex items-center">
                <div className="flex justify-center items-center h-28 w-28">
                  <FiHexagon
                    className="h-full w-full relative"
                    style={{ strokeWidth: "0.6" }}
                  />
                  <div className="h-10 w-10 rounded absolute">
                    <img
                      src={`/ranks/${0}.jpg`}
                      className="w-full h-full border border-black object-cover object-center rounded"
                    />
                  </div>
                </div>
                <div className="flex flex-col ml-5">
                  <p className="text-base font-bold capitalize">entrepreneur</p>
                  <hr className="h-1 w-3/4 my-1.5 bg-gray-700 rounded-full" />
                  <p className="text-sm font-semibold">
                    0% towards your own boss
                  </p>
                </div>
              </div>
              {/* Historial */}
              {/* Rank */}
              <div className="flex items-center absolute bottom-0 mb-10">
                <p className="text-base font-bold capitalize">rank up - 0</p>
                <div className="flex items-center h-7 w-7 ml-3 rounded-full relative">
                  <FiChevronUp className="h-5 w-5 mx-auto text-green-600 z-10" />
                  <div className="w-full h-full rounded-full bg-green-200 absolute filter blur-sm" />
                </div>
              </div>
            </div>

            {/* Derecha */}
            <div className="flex flex-col gap-y-0.5 h-full w-left">
              {/* Parte Superior */}
              <div className="h-7/10 w-full rounded-tr-xl p-6 bg-gray-200 relative">
                <p className="text-lg font-bold capitalize">
                  {user.userName}{" "}
                  <span className="font-medium capitalize">- {stat.name}</span>
                </p>
                <div className="flex gap-x-1 absolute bottom-0 mb-6">
                  <button
                    onClick={() => handleDecrement()}
                    className="bg-gray-500 p-0.5 rounded"
                  >
                    <FiChevronLeft className="h-5 w-5 text-white" />
                  </button>
                  <button
                    onClick={() => handleIncrement()}
                    className="bg-gray-500 p-0.5 rounded"
                  >
                    <FiChevronRight className="h-5 w-5 text-white" />
                  </button>
                </div>
                <div className="flex items-center gap-x-1 absolute bottom-0 right-0 mb-6 mr-6">
                  {stat.icon}
                  <p className="p-0.5 text-xl font-bold">
                    {stat.id === 0 && user.xp}
                    {stat.id === 1 && projects.owns.length}
                    {stat.id === 2 && projects.participates.length}
                    {stat.id === 3 && user.respect}
                  </p>
                </div>
              </div>
              {/* Parte Inferior */}
              <div className="flex justify-between items-center h-3/10 w-full rounded-br-xl p-6 bg-gray-200">
                <div className="flex flex-col">
                  <p className="text-xs font-bold uppercase">plan</p>
                  <p className="text-xl font-bold capitalize">
                    {user.plan === 0 ? "free" : "vip"}
                  </p>
                </div>
                {user.plan === 0 && (
                  <Link href="">
                    <a className="text-base font-bold uppercase hover:underline">
                      go vip
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 px-8">
        <LineMenu data={links} />
        {isActive === 1 && (
          <div className="flex gap-x-4 overflow-x-auto pb-6">
            <Card
              img={<GoOrganization className="h-3/4 w-3/4" />}
              title={"create a team"}
              desc={"Start developing your new idea now"}
            />
            <Card
              img={<GoTelescope className="h-3/4 w-3/4" />}
              title={"join a team"}
              desc={"Looking for amazing projects? join one now!"}
            />
          </div>
        )}
        {isActive === 2 && (
          <div className="flex gap-x-4 overflow-x-auto pb-6">
            {projects.recommended.map((item) => {
              return (
                <>
                  <Card
                    img={item.avatar}
                    title={item.teamName}
                    desc={item.description}
                  />
                </>
              )
            })}
          </div>
        )}
        {isActive === 3 && (
          <div className="flex gap-x-4 overflow-x-auto pb-6">
            {projects.participates.map((item) => {
              return (
                <>
                  <Card
                    img={item.avatar}
                    title={item.teamName}
                    desc={item.description}
                  />
                </>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  let res

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

  const { user, projects } = res.data
  console.log(res.data)

  return {
    props: {
      session,
      user,
      projects,
    },
  }

}
