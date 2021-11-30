import { useState } from "react"
import { getSession } from "next-auth/react"
import Link from "next/link"
import Header from "components/Cabeceras/Header"
import Statistics from "../components/Cards/Statistics"
import TeUsCard from "../components/Cards/TeUsCard"
import Layout from "../components/layout"
import Meta from "components/Meta"
import LineMenu from "../components/Navegation/LineMenu"
import { countryList } from "../data/countryList"
import { links4myteam } from "data/LineMenu"
import { RiBlazeLine } from "react-icons/ri"
import { FiAward, FiBriefcase, FiHeart, FiSave, FiTrash2 } from "react-icons/fi"
import { BsTwitter, BsFacebook } from "react-icons/bs"
import { FaDiscord } from "react-icons/fa"

const numMaxMembers = {
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  8: "8",
  10: "10",
  12: "12",
  16: "16",
  20: "20",
  unlimited: "Unlimited",
}

export default function Team({ team, user, workers }) {
  const [isActive, setActive] = useState(1)
  const handleMenu = (id) => setActive(id)

  const [values, setValues] = useState({
    teamName: "",
    motto: "",
    country: "",
    maxMembers: "",
    avatar: "",
    description: "",
    discord: "",
    twitter: "",
    facebook: "",
  })

  const handleAvatar = (e) => {
    setValues({ ...values, avatar: e.target.value })
  }
  const handleTeamname = (e) => {
    setValues({ ...values, teamName: e.target.value })
  }
  const handleMotto = (e) => {
    setValues({ ...values, motto: e.target.value })
  }
  // const handleCountry = (e) => {
  //   setValues({ ...values, country: e.target.value })
  // }
  // const handleMaxMembers = (e) => {
  //   setValues({ ...values, maxMembers: e.target.value })
  // }
  const handleDescription = (e) => {
    setValues({ ...values, description: e.target.value })
  }
  const handleDiscord = (e) => {
    setValues({ ...values, discord: e.target.value })
  }
  const handleTwitter = (e) => {
    setValues({ ...values, twitter: e.target.value })
  }
  const handleFacebook = (e) => {
    setValues({ ...values, facebook: e.target.value })
  }

  // async function handleSubmit(e) {
  //   e.preventDefault()

  //   const query = {
  //     teamName: values.teamName,
  //     motto: values.motto,
  //     country: values.country,
  //     maxMembers: values.maxMembers,
  //     avatar: values.avatar,
  //     description: values.description,
  //     discord: values.discord,
  //     twitter: values.twitter,
  //     facebook: values.facebook,
  //   }
  //   await fetch(`http://localhost:3000/api/team`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "text/plain" },
  //     body: JSON.stringify(query),
  //   }).then((res) => {
  //     return res.json()
  //   })
  // }

  function handleUpdate(e) {
    // NOTA: los datos / funciones puestas anterior mente no harian falta sin ponemos un form para todos los campos
    // y llamas a la funcion en: <form onSubmit={(e) => handleUpdate(e)}>
    // se puede acceder a los campos del form con: e.target.<id>.value identificacndo el campo especifico asi: e.target.id.value
    // url: localhost:3000/api/team
    // method: PUT
    // guarda los cambios realizados en la bbdd
  }

  function handleDelete() {
    // url: localhost:3000/api/team
    // method: Delete
    // borra toda la informacion del usuario de la base de datos
    // participaciones, solicitudes, usuarios(necesarios)...
  }

  return (
    <div className="px-8 py-3">
      <Meta title="My Team" />
      <Header
        avatar={user.avatar}
        username={user.userName}
        id={user.id}
        studies={user.studies}
        plan={user.plan}
        xp={user.xp}
        myProfile={true}
        country={user.country}
      />
      <LineMenu
        handleMenu={handleMenu}
        data={links4myteam}
        isActive={isActive}
      />
      {isActive === 1 && team.teamName && (
        <div className="w-full mt-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-x-6">
              <div className="flex gap-x-4 items-center justify-center w-28 h-28 rounded-full">
                <img
                  src={team.avatar || "/anuncios/anuncio2.jpg"}
                  alt=""
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <div className="flex items-center gap-x-2">
                  <div className="flex gap-x-4 items-center justify-center w-7 h-7 rounded-full">
                    <img
                      src="/banderas/spain.png"
                      alt=""
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {team.teamName}
                  </p>
                </div>
                <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                  {team.motto}
                </p>
              </div>
            </div>
          </div>
          <p className="flex flex-col self-center w-2/4 leading-snug my-5 text-gray-900 dark:text-gray-100">
            {team.description}
          </p>

          <div className="flex gap-x-5 mt-6">
            <Statistics
              icon={<FiAward className="h-6 w-6 text-purple-500" />}
              points={team.xp}
              desc={"points"}
            />
            <Statistics
              icon={<FiBriefcase className="h-6 w-6 text-blue-500" />}
              points={workers.length}
              desc={"users"}
            />
            <Statistics
              icon={<FiHeart className="h-6 w-6 text-red-500" />}
              points={team.respect}
              desc={"respect"}
            />
          </div>

          <div className="flex flex-col gap-y-4 mt-12">
            {workers.map((item) => {
              return (
                <TeUsCard
                  key={item.id}
                  id={item.id}
                  img={item.user.avatar}
                  title={item.user.name + " " + item.user.lastName}
                  desc={item.user.description}
                  url={item.user.userName}
                  isUser={true}
                  owns={false}
                />
              )
            })}
          </div>
        </div>
      )}
      {isActive === 1 && !team.teamName && (
        <div className="container py-32">
          <div className="mx-auto flex flex-col items-center justify-center w-1/2 space-y-1 pb-10">
            <RiBlazeLine className="h-20 w-20 object-fill object-center mb-3 text-red-600" />
            <p className="text-lg font-semibold text-justify dark:text-gray-100">
              Oops! Looks like you don&apos;t have a team yet!
            </p>
            <p className="text-lg font-normal text-justify dark:text-gray-100">
              You can{" "}
              <Link href="">
                <a className="hover:underline text-blue-600">create one</a>
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
      {/* Profile Settings */}
      {isActive === 2 && (
        <div className="relative">
          {/* Profile Avatar Edit */}
          <div className="px-8 mt-8 w-4/6">
            <p className="text-base font-bold dark:text-gray-100 ">
              Team Avatar
            </p>
            <div className="mt-4 px-2">
              <div className="flex items-center gap-x-4 w-full h-full">
                <div className="flex w-full items-center">
                  <div className="flex w-1/2 justify-start">
                    <img
                      src={team.avatar || "/personas/DefaultTeamAvatar.png"}
                      className="w-32 h-32 rounded-full object-cover relative"
                    />
                  </div>

                  <div className="w-full">
                    <span className="text-xs font-semibold uppercase dark:text-gray-100">
                      avatar url
                    </span>
                    <input
                      id="avatarUrl"
                      type="url"
                      name="avatarUrl"
                      placeholder={team.avatar || "https://avatar..."}
                      onChange={handleAvatar}
                      className="w-72 px-3 py-2 mt-1 text-gray-700 border rounded-md focus:border-blue-600"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-y-2 absolute top-0 right-0">
                  <button
                    type="submit"
                    className="px-7 py-1 bg-green-600 hover:bg-green-500 text-white text-bold font-medium uppercase rounded-md"
                  >
                    <div className="flex justify-center gap-x-2 items-center p-2">
                      <FiSave className="h-5 w-5 items-center text-neutral" />
                      save changes
                    </div>
                  </button>
                  <button
                    type="submit"
                    className="px-7 py-1 bg-red-600 hover:bg-red-500 text-white text-bold font-medium uppercase rounded-md"
                  >
                    <div className="flex justify-center gap-x-2 items-center p-2">
                      <FiTrash2 className="h-5 w-5 items-center text-neutral" />
                      delete
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* General Info Edit */}
          <div className="px-8 mt-8 5/6">
            <p className="text-base font-bold dark:text-gray-100">
              Team Information
            </p>
            <div className="mt-4 pr-8 w-4/6">
              <form className="">
                <div className="flex gap-x-4">
                  <div className="w-full">
                    <label type="username">
                      <span className="text-xs font-semibold uppercase dark:text-gray-100">
                        team name
                      </span>
                      <div>
                        <input
                          id="username"
                          type="username"
                          name="username"
                          placeholder={team.teamName || "Team Name"}
                          onSubmit={handleTeamname}
                          className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:border-blue-600"
                        />
                      </div>
                    </label>
                  </div>
                  <div>
                    <label type="country">
                      <span className="text-xs font-semibold uppercase dark:text-gray-100">
                        country
                      </span>
                      <div>
                        <select className="w-full px-2 py-2 mt-1 border rounded-md text-gray-700  focus:border-blue-600 text-opacity-75">
                          <option value="">
                            {user.country || "Select a country"}
                          </option>
                          {Object.entries(countryList).map(([key, value]) => (
                            <option key={key} value={key}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </div>
                    </label>
                  </div>
                  <div>
                    <div>
                      <label type="maxmembers">
                        <span className="text-xs font-semibold uppercase dark:text-gray-100">
                          max members
                        </span>
                        <div>
                          <select className="w-24 px-3 py-2 mt-1  text-gray-700 border rounded-md focus:border-blue-600 text-opacity-75">
                            {Object.entries(numMaxMembers).map(
                              ([key, value]) => (
                                <option key={key} value={key}>
                                  {value}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <label type="text" className="block mt-3">
                  <span className="text-xs font-semibold uppercase dark:text-gray-100">
                    team motto
                  </span>
                  <div>
                    <input
                      id="motto"
                      type="textarea"
                      name="motto"
                      placeholder={
                        team.motto || "Create a brand new motto for your team!"
                      }
                      onSubmit={handleMotto}
                      className="resize-none w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:border-blue-600"
                    />
                  </div>
                </label>
                <label type="text" className="block mt-3">
                  <span className="text-xs font-semibold uppercase dark:text-gray-100">
                    team description
                  </span>
                  <div>
                    <textarea
                      id="description"
                      type="textarea"
                      name="description"
                      placeholder={team.description || "Tell us about you!"}
                      onSubmit={handleDescription}
                      className="resize-y min-h-32 w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:border-blue-600"
                    />
                  </div>
                </label>
              </form>
            </div>
          </div>

          {/* Social Media */}
          <div className="px-8 mt-8 w-4/6">
            <p className="text-base font-bold dark:text-gray-100">
              Social media
            </p>
            <div className="mt-4 px-2">
              <div className="flex gap-x-4 w-full">
                <div className="w-full mt-4">
                  <div className="flex gap-x-1">
                    <BsTwitter className="h-auto w-auto object-fill object-center text-blue-600" />
                    <span className="text-xs font-semibold uppercase dark:text-gray-100">
                      twitter
                    </span>
                  </div>
                  <input
                    id="twitter"
                    type="text"
                    name="twitter"
                    placeholder={user.twitter || "@TwitterUser"}
                    onChange={handleTwitter}
                    className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-inpu focus:border-blue-600"
                  />
                </div>
                <div className="w-full mt-4">
                  <div className="flex gap-x-1">
                    <BsFacebook className="h-auto w-auto object-fill object-center text-blue-700" />
                    <span className="text-xs font-semibold uppercase dark:text-gray-100">
                      facebook
                    </span>
                  </div>
                  <input
                    id="facebook"
                    type="text"
                    name="facebook"
                    placeholder={user.facebook || "FacebookUser"}
                    onChange={handleFacebook}
                    className="block w-full px-3 py-2 mt-1 mb-5 text-gray-700 border rounded-md form-inpu focus:border-blue-600"
                  />
                </div>
              </div>
              <div className="flex gap-x-4 w-full">
                <div className="w-full">
                  <div className="flex gap-x-1">
                    <FaDiscord className="h-auto w-auto object-fill object-center text-indigo-400" />
                    <span className="text-xs font-semibold uppercase dark:text-gray-100">
                      discord
                    </span>
                  </div>
                  <input
                    id="discord"
                    type="text"
                    name="discord"
                    placeholder={team.discord || "https://discord.gg/"}
                    onSubmit={handleDiscord}
                    className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:border-blue-600"
                  />
                </div>
                <div className="w-full"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

Team.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  let res = null

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  } else {
    const params = new URLSearchParams({ id: session.token.id })
    const url = `http://localhost:3000/api/team?${params.toString()}`

    res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${req.cookies["next-auth.session-token"]}`,
      },
    }).then((res) => {
      return res.json()
    })
  }

  const { team, users } = res.data

  let user = users.owner.user
  const workers = users.workers

  if (!user) {
    const params = new URLSearchParams({ id: session.token.id })
    const url = `http://localhost:3000/api/user/lite?${params.toString()}`

    res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${req.cookies["next-auth.session-token"]}`,
      },
    }).then((res) => {
      return res.json()
    })
    user = res.data.user
  }

  return {
    props: {
      session,
      team,
      user,
      workers,
    },
  }
}
