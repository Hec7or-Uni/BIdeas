import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { getSession } from "next-auth/react"
import Link from "next/link"
import Header from "components/Cabeceras/Header"
import Statistics from "../components/Cards/Statistics"
import TeUsCard from "../components/Cards/TeUsCard"
import Layout from "../components/layout"
import Meta from "components/Meta"
import LineMenu from "../components/Navegation/LineMenu"
import { countryList } from "../data/countryList"
import { links4myteam, links4myteamCreate } from "data/LineMenu"
import { RiBlazeLine } from "react-icons/ri"
import { FiAward, FiBriefcase, FiHeart, FiSave, FiTrash2 } from "react-icons/fi"
import { BsTwitter, BsFacebook } from "react-icons/bs"
import { FaDiscord } from "react-icons/fa"
import { numMaxMembers } from "../data/MaxMembers"

export default function Team({ team, user, workers }) {
  const [isActive, setActive] = useState(1)
  const handleMenu = (id) => setActive(id)

  const createdTeam = Boolean(team.id)

  function handleUpdate(e) {
    e.preventDefault()
    let metodo = "PUT"

    const query = {
      id: team.id,
      teamName: e.target.name.value || team.teamName,
      motto: e.target.motto.value,
      country: e.target.country.value || team.country,
      maxMembers: Number(e.target.maxMembers.value) || team.maxMembers,
      avatar: e.target.avatar.value,
      description: e.target.description.value,
      discord: e.target.discord.value,
      twitter: e.target.twitter.value,
      facebook: e.target.facebook.value,
      owner: user.id,
    }

    if (!createdTeam) {
      delete query.id
      metodo = "POST"
    }

    return new Promise(function (resolve, reject) {
      fetch(`http://localhost:3000/api/team`, {
        method: metodo,
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(query),
      }).then((res) => {
        res.json()
        console.log(res)
        if (!res.ok) {
          reject(new Error("error"))
        }
        resolve("ok")
      })
    })
  }

  function handleDelete() {
    const params = new URLSearchParams({ id: team.id })

    return new Promise(function (resolve, reject) {
      fetch(`http://localhost:3000/api/team?${params.toString()}`, {
        method: "DELETE",
      }).then((res) => {
        res.json()
        if (!res.ok) {
          reject(new Error("error"))
        }
        resolve("ok")
      })
    })
  }

  let country = team.country
  if (
    country !== "Spain" &&
    country !== "France" &&
    country !== "Germany" &&
    country !== "UnitedKingdom" &&
    country !== "UnitedStates" &&
    country !== "Italy" &&
    country !== "China" &&
    country !== "Japan" &&
    country !== "Russia" &&
    country !== "Belgium" &&
    country !== "Netherlands" &&
    country !== "Sweden" &&
    country !== "Canada" &&
    country !== "Brazil"
  ) {
    country = "DefaultCountry"
  }

  return (
    <div className="px-8 py-3">
      <Toaster position="top-center" reverseOrder={true} />
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
        data={team.teamName ? links4myteam : links4myteamCreate}
        isActive={isActive}
      />
      {isActive === 1 && createdTeam && (
        <div className="w-full mt-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-x-6">
              <div className="flex gap-x-4 items-center justify-center w-28 h-28 rounded-full">
                <img
                  src={team.avatar || "/personas/DefaultTeamAvatar.png"}
                  alt=""
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <div className="flex items-center gap-x-2">
                  <div className="flex gap-x-4 items-center justify-center w-7 h-7 rounded-full">
                    <img
                      src={`/banderas/${country}.png`}
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
      {isActive === 1 && !createdTeam && (
        <div className="container py-32">
          <div className="mx-auto flex flex-col items-center justify-center w-1/2 space-y-1 pb-10">
            <RiBlazeLine className="h-20 w-20 object-fill object-center mb-3 text-red-600" />
            <p className="text-lg font-semibold text-justify dark:text-gray-100">
              Oops! Looks like you don&apos;t have a team yet!
            </p>
            <p className="text-lg font-normal text-justify dark:text-gray-100">
              You can{" "}
              <Link href="/my-team">
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
        <form
          onSubmit={(e) => {
            toast
              .promise(handleUpdate(e), {
                loading: "Saving changes...",
                success: "Changes succesfully saved",
                error: "Error while saving changes",
              })
              .then(() => window.location.reload(false))
              .catch(() => {})
          }}
          id="form-teamProfile"
        >
          <div className="relative">
            {/* Profile Avatar Edit */}

            <div className="px-8 mt-8 w-4/6">
              <p className="text-base font-bold dark:text-gray-100 ">
                Team Avatar
              </p>
              <div className="mt-4 px-2">
                <div className="flex items-center gap-x-4 w-full h-full">
                  {/* Parte izquierda img, input */}
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
                        id="avatar"
                        type="url"
                        name="avatar"
                        placeholder="https://avatar..."
                        defaultValue={team.avatar}
                        className="w-full px-2 py-2 mt-1 text-gray-700 border rounded-md focus:border-blue-600"
                      />
                    </div>
                  </div>

                  {/* Parte derecha save changes */}
                  <div className="flex w-full items-center">
                    <div className="flex flex-col gap-y-2 absolute top-0 right-0">
                      <button
                        type="submit"
                        form="form-teamProfile"
                        className="px-7 py-1 bg-green-600 hover:bg-green-500 text-white text-bold font-medium uppercase rounded-md"
                      >
                        <div className="flex justify-center gap-x-2 items-center p-2">
                          <FiSave className="h-5 w-5 items-center text-neutral" />
                          {createdTeam ? "save changes" : "create team"}
                        </div>
                      </button>
                      {createdTeam && (
                        <form
                          type="submit"
                          onClick={() => {
                            toast
                              .promise(handleDelete(), {
                                loading: "Deleting team...",
                                success: "Team succesfully deleted",
                                error: "Error while deleting team",
                              })
                              .then(() => window.location.reload(false))
                              .catch(() => {})
                          }}
                          className="px-7 py-1 bg-red-600 hover:bg-red-500 text-white text-bold font-medium uppercase rounded-md cursor-pointer"
                        >
                          <div className="flex justify-center gap-x-2 items-center p-2">
                            <FiTrash2 className="h-5 w-5 items-center text-neutral" />
                            delete
                          </div>
                        </form>
                      )}
                    </div>
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
                <div className="flex gap-x-4">
                  <div className="w-full">
                    <label type="username">
                      <span className="text-xs font-semibold uppercase dark:text-gray-100">
                        team name
                      </span>
                      <div>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          placeholder="Team Name"
                          defaultValue={team.teamName}
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
                        <select
                          id="country"
                          className="w-full px-2 py-2 mt-1 border rounded-md text-gray-700  focus:border-blue-600 text-opacity-75"
                        >
                          <option value="">
                            {team.country || "Select a country"}
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
                          <select
                            id="maxMembers"
                            className="w-24 px-3 py-2 mt-1  text-gray-700 border rounded-md focus:border-blue-600 text-opacity-75"
                          >
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
                      placeholder="Create a brand new motto for your team!"
                      defaultValue={team.motto}
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
                      placeholder="Tell us about you!"
                      defaultValue={team.description}
                      className="resize-y min-h-32 w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:border-blue-600"
                    />
                  </div>
                </label>
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
                      placeholder="@TwitterUser"
                      defaultValue={team.twitter}
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
                      placeholder="FacebookUser"
                      defaultValue={team.facebook}
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
                      placeholder="https://discord.gg/"
                      defaultValue={team.discord}
                      className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:border-blue-600"
                    />
                  </div>
                  <div className="w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </form>
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
  let user = users.owner?.user
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
