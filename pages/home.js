import { useState } from "react"
import { getSession } from "next-auth/react"
import Link from "next/Link"
import LineMenu from "../components/Navegation/LineMenu"
import Shortcut from "../components/Cards/Shortcut"
import Cabecera from "components/Cabeceras/Cabecera"
import Layout from "../components/layout"
import Meta from "../components/Meta"
import { useLMenu } from "../context/LMenuContext"
import { GoOrganization, GoTelescope} from "react-icons/go"
import { RiBlazeLine} from "react-icons/ri"
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
import Footer from "components/Navegation/Footer"

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
        <Meta title="Home"/>
        <Cabecera />

        {/* Anuncio & estadisticas */}
        <div className="flex flex-col lg:flex-row w-full gap-x-6 gap-y-4 my-5">
          {/* anuncio */}
          <div className="rounded-xl w-full lg:w-left">
            <img
              src="/anuncios/anuncio8.jpg"
              className="h-auto w-full object-fill object-center rounded-xl cursor-pointer shadow"
            />
          </div>
          <div className="flex gap-x-0.5 rounded-xl w-full h-72 lg:h-auto lg:w-right shadow">
            {/* Izquierda */}
            <div className="h-full w-right rounded-tl-xl rounded-bl-xl p-6 bg-white relative">
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
                  {/* Nombre rango parte superior */}
                  <p className="text-base font-bold capitalize">
                    { Number((user.xp-49)/100).toFixed() == 0 && "Newbie"}
                    { Number((user.xp-49)/100).toFixed() == 1 && "Entrepeneur"}
                    { Number((user.xp-49)/100).toFixed() == 2 && "Veteran"}
                    { Number((user.xp-49)/100).toFixed() == 3 && "Businessman"}
                    { Number((user.xp-49)/100).toFixed() == 4 && "Your own Boss"}
                    { Number((user.xp-49)/100).toFixed() >= 5 && (
                      <span className="text-yellow-500 animate-pulse duration-700">GOAT</span>
                    )}
                  </p>

                  {/* Barra rango */}
                  <div className="w-40 bg-gray-200 rounded-full h-1 my-1.5">
                    { Number((user.xp-49)/100).toFixed() < 5 && (
                        <div className="bg-gray-800 h-1 rounded-full" style={{width : Number((user.xp)%100).toFixed().toString() + "%"}}></div>
                    )}
                    { Number((user.xp-49)/100).toFixed() >= 5 && (
                        <div className="bg-gray-800 h-1 rounded-full" style={{width : "100%"}}></div>
                    )}
                  </div>

                  {/* Your own boss */}
                  <p className="text-sm font-semibold">
                    { Number((user.xp-49)/100).toFixed() == 0 && Number((user.xp)%100).toFixed().toString() + "% towards entrepeneur"}
                    { Number((user.xp-49)/100).toFixed() == 1 && Number((user.xp)%100).toFixed().toString() + "% towards veteran"}
                    { Number((user.xp-49)/100).toFixed() == 2 && Number((user.xp)%100).toFixed().toString() + "% towards businessman"}
                    { Number((user.xp-49)/100).toFixed() == 3 && Number((user.xp)%100).toFixed().toString() + "% towards your own boss"}
                    { Number((user.xp-49)/100).toFixed() == 4 && Number((user.xp)%100).toFixed().toString() + "% towards goat"}
                    { Number((user.xp-49)/100).toFixed() >= 5 && "You are a GOAT"}
                  </p>
                </div>
              </div>
              {/* Historial */}
              {/* Rank */}
              
              { Number((user.xp-49)/100 +1).toFixed() < 5 && (
                <div className="flex items-center absolute bottom-0 mb-10">
                  <p className="text-base font-bold capitalize">
                      rank up - {Number((user.xp-49)/100 +1).toFixed()}
                  </p>
                  <div className="flex items-center h-7 w-7 ml-3 rounded-full relative">
                    <FiChevronUp className="h-5 w-5 mx-auto text-green-600 z-10" />
                    <div className="w-full h-full rounded-full bg-green-200 absolute filter blur-sm" />
                  </div>
                </div>
              )}
            </div>

            {/* Derecha */}
            <div className="flex flex-col gap-y-0.5 h-full w-left">
              {/* Parte Superior */}
              <div className="h-7/10 w-full rounded-tr-xl p-6 bg-white relative">
                <p className="text-lg font-bold capitalize">
                  {user.userName}{" "}
                  <span className="font-medium capitalize">- {stat.name}</span>
                </p>
                <div className="flex gap-x-1 absolute bottom-0 mb-6">
                  <button
                    onClick={() => handleDecrement()}
                    className="bg-gray-700 p-0.5 rounded"
                  >
                    <FiChevronLeft className="h-5 w-5 text-white" />
                  </button>
                  <button
                    onClick={() => handleIncrement()}
                    className="bg-gray-700 p-0.5 rounded"
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
              <div className="flex justify-between items-center h-3/10 w-full rounded-br-xl p-6 bg-white">
                <div className="flex flex-col">
                  <p className="text-xs font-bold uppercase">plan</p>
                  <p className="text-xl font-bold capitalize">
                    {user.plan === 0 ? "free" : "vip"}
                  </p>
                </div>
                {user.plan === 0 && (
                  <Link href="">
                    <a className="text-base font-bold uppercase hover:underline text-blue-600">
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
            <Shortcut
              key={0}
              img={<GoOrganization className="h-3/5 w-3/5" />}
              title={"create a team"}
              desc={"Start developing your new idea now"}
              url={"/home"}
            />
            <Shortcut
              key={1}
              img={<GoTelescope className="h-3/5 w-3/5" />}
              title={"join a team"}
              desc={"Looking for amazing projects? join one now!"}
              url={"/home"}
            />
          </div>
        )}
        {isActive === 2 && (
          <div className="flex gap-x-4 overflow-x-auto pb-6">
            {projects.recommended.map((item) => {
              return (
                <Shortcut
                  key={item.id}
                  img={item.avatar}
                  title={item.teamName}
                  desc={item.description}
                  url={"/teams/" + item.teamName}
                />
              )
            })}
          </div>
        )}
        {isActive === 3 && (
          <div className="flex gap-x-4 overflow-x-auto pb-6">
            {projects.participates.map((item) => {
              return (
                <Shortcut
                  key={item.project.id}
                  img={item.project.avatar}
                  title={item.project.teamName}
                  desc={item.project.description}
                  url={"/"}
                />
              )
            })}
            {projects.participates == 0 && (
              <div className="container pb-32 py-3">
                <div className="mx-auto flex flex-col items-center justify-center w-1/2 space-y-1 pb-10">
                  <RiBlazeLine className="h-14 w-14 object-fill object-center mb-3 text-red-600"/>
                  <p className="text-base font-semibold text-justify">
                    Oops! Looks like you don't have a team yet!
                  </p>
                  <p className="text-sm font-normal text-justify">
                    You can {" "}
                    <Link href="/my-team">
                      <a className="hover:underline text-blue-600">
                        create one
                      </a>
                    </Link>
                    {" "} or you can {" "}
                    <Link href="/careers/teams">
                      <a className="hover:underline text-blue-600">
                        join
                      </a>
                    </Link>
                    {" "} an already created team.
                  </p>
                </div>
              </div>
            )}
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

  return {
    props: {
      session,
      user,
      projects,
    },
  }
}
