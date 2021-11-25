import { useState } from "react"
import { getSession } from "next-auth/react"
import Link from "next/link"
import LineMenu from "../components/Navegation/LineMenu"
import Shortcut from "../components/Cards/Shortcut"
import Cabecera from "components/Cabeceras/Cabecera"
import Layout from "../components/layout"
import Meta from "../components/Meta"
import { GoOrganization, GoTelescope } from "react-icons/go"
import { RiBlazeLine } from "react-icons/ri"
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
    icon: <FiAward className="h-5 w-5 dark:text-gray-100" />,
  },
  {
    id: 1,
    name: "teams owned",
    icon: <FiFlag className="h-5 w-5 dark:text-gray-100" />,
  },
  {
    id: 2,
    name: "teams",
    icon: <FiBriefcase className="h-5 w-5 dark:text-gray-100" />,
  },
  {
    id: 3,
    name: "respect",
    icon: <FiHeart className="h-5 w-5 dark:text-gray-100" />,
  },
]

export default function Home({ user, projects }) {
  const [isActive, setActive] = useState(1)
  const handleMenu = (id) => setActive(id)
  const [stat, setStat] = useState(Stats[0])

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
        <Meta title="Home" />
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
            <div className="h-full w-right rounded-tl-xl rounded-bl-xl p-6 bg-color-light-neutral-1 dark:bg-color-neutral-2 relative">
              {/* Parte superior */}
              <div className="flex items-center">
                <div className="flex justify-center items-center h-28 w-28">
                  <FiHexagon
                    className="h-full w-full relative text-black dark:text-gray-100"
                    style={{ strokeWidth: "0.6" }}
                  />
                  <div className="h-10 w-10 rounded absolute">
                    <img
                      src={`/ranks/${0}.jpg`}
                      className="w-full h-full border border-black dark:border-white object-cover object-center rounded"
                    />
                  </div>
                </div>
                <div className="flex flex-col ml-5">
                  {/* Nombre rango parte superior */}
                  <p className="text-base font-bold capitalize text-gray-900 dark:text-gray-100">
                    {Math.trunc((user.xp - 49) / 100) === 0 && "Newbie"}
                    {Math.trunc((user.xp - 49) / 100) === 1 && "Entrepeneur"}
                    {Math.trunc((user.xp - 49) / 100) === 2 && "Veteran"}
                    {Math.trunc((user.xp - 49) / 100) === 3 && "Businessman"}
                    {Math.trunc((user.xp - 49) / 100) === 4 && "Your own Boss"}
                    {Math.trunc((user.xp - 49) / 100) >= 5 && (
                      <span className="text-yellow-500 animate-pulse duration-700">
                        GOAT
                      </span>
                    )}
                  </p>

                  {/* Barra rango */}
                  <div className="w-40 bg-gray-200 rounded-full h-1 my-1.5">
                    {Number((user.xp - 49) / 100).toFixed() < 5 && (
                      <div
                        className="bg-gray-800 h-1 rounded-full"
                        style={{
                          width:
                            Number(user.xp % 100)
                              .toFixed()
                              .toString() + "%",
                        }}
                      ></div>
                    )}
                    {Number((user.xp - 49) / 100).toFixed() >= 5 && (
                      <div
                        className="bg-gray-800 h-1 rounded-full"
                        style={{ width: "100%" }}
                      ></div>
                    )}
                  </div>

                  {/* Your own boss */}
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {Math.trunc((user.xp - 49) / 100) === 0.0 &&
                      Number(user.xp % 100)
                        .toFixed()
                        .toString() + "% towards entrepeneur"}
                    {Math.trunc((user.xp - 49) / 100) === 1.0 &&
                      Number(user.xp % 100)
                        .toFixed()
                        .toString() + "% towards veteran"}
                    {Math.trunc((user.xp - 49) / 100) === 2.0 &&
                      Number(user.xp % 100)
                        .toFixed()
                        .toString() + "% towards businessman"}
                    {Math.trunc((user.xp - 49) / 100) === 3.0 &&
                      Number(user.xp % 100)
                        .toFixed()
                        .toString() + "% towards your own boss"}
                    {Math.trunc((user.xp - 49) / 100) === 4.0 &&
                      Number(user.xp % 100)
                        .toFixed()
                        .toString() + "% towards goat"}
                    {Math.trunc((user.xp - 49) / 100) >= 5 && "You are a GOAT"}
                  </p>
                </div>
              </div>
              {/* Historial */}
              {/* Rank */}

              {Math.trunc((user.xp - 49) / 100 + 1) < 5 && (
                <div className="flex items-center absolute bottom-0 mb-10">
                  <p className="text-base font-bold capitalize text-gray-900 dark:text-gray-100">
                    rank up - {Math.trunc((user.xp - 49) / 100 + 1)}
                  </p>
                  <div className="flex items-center h-7 w-7 ml-3 rounded-full relative">
                    <FiChevronUp className="h-5 w-5 mx-auto text-green-600 z-10" />
                    <div className="w-full h-full rounded-full bg-green-200 absolute filter blur" />
                  </div>
                </div>
              )}
            </div>

            {/* Derecha */}
            <div className="flex flex-col gap-y-0.5 h-full w-left">
              {/* Parte Superior */}
              <div className="h-7/10 w-full rounded-tr-xl p-6 bg-color-light-neutral-1 dark:bg-color-neutral-2 relative">
                <p className="text-lg font-bold capitalize text-gray-900 dark:text-gray-100">
                  {user.userName}{" "}
                  <span className="font-medium capitalize text-gray-900 dark:text-gray-100">
                    - {stat.name}
                  </span>
                </p>
                <div className="flex gap-x-1 absolute bottom-0 mb-6">
                  <button
                    onClick={() => handleDecrement()}
                    className="bg-color-neutral-3 dark:bg-color-light-neutral-4 p-0.5 rounded"
                  >
                    <FiChevronLeft className="h-5 w-5 text-white" />
                  </button>
                  <button
                    onClick={() => handleIncrement()}
                    className="bg-color-neutral-3 dark:bg-color-light-neutral-4 p-0.5 rounded"
                  >
                    <FiChevronRight className="h-5 w-5 text-white" />
                  </button>
                </div>
                <div className="flex items-center gap-x-1 absolute bottom-0 right-0 mb-6 mr-6">
                  {stat.icon}
                  <p className="p-0.5 text-xl font-bold text-gray-900 dark:text-gray-100">
                    {stat.id === 0 && user.xp}
                    {stat.id === 1 && projects.owns.length}
                    {stat.id === 2 && projects.participates.length}
                    {stat.id === 3 && user.respect}
                  </p>
                </div>
              </div>
              {/* Parte Inferior */}
              <div className="flex justify-between items-center h-3/10 w-full rounded-br-xl p-6 bg-color-light-neutral-1 dark:bg-color-neutral-2">
                <div className="flex flex-col">
                  <p className="text-xs font-bold uppercase text-gray-900 dark:text-gray-100">
                    plan
                  </p>
                  <p className="text-xl font-bold capitalize text-gray-900 dark:text-gray-100">
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
        <LineMenu handleMenu={handleMenu} data={links} isActive={isActive} />
        {isActive === 1 && (
          <div className="flex gap-x-4 overflow-x-auto pb-6">
            <Shortcut
              key={0}
              img={
                <GoOrganization className="h-3/5 w-3/5 dark:text-gray-100" />
              }
              title={"create a team"}
              desc={"Start developing your new idea now"}
              url={"/home"}
            />
            <Shortcut
              key={1}
              img={<GoTelescope className="h-3/5 w-3/5 dark:text-gray-100" />}
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
            {projects.participates === 0 && (
              <div className="container pb-32 py-3">
                <div className="mx-auto flex flex-col items-center justify-center w-1/2 space-y-1 pb-10">
                  <RiBlazeLine className="h-14 w-14 object-fill object-center mb-3 text-red-600" />
                  <p className="text-base font-semibold text-justify">
                    Oops! Looks like you don&apos;t have a team yet!
                  </p>
                  <p className="text-sm font-normal text-justify">
                    You can{" "}
                    <Link href="/my-team">
                      <a className="hover:underline text-blue-600">
                        create one
                      </a>
                    </Link>{" "}
                    or you can{" "}
                    <Link href="/careers/teams">
                      <a className="hover:underline text-blue-600">join</a>
                    </Link>{" "}
                    an already created team.
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
