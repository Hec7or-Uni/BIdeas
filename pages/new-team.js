import toast, { Toaster } from "react-hot-toast"
import { getSession } from "next-auth/react"
import Layout from "../components/layout"
import { countryList } from "../data/countryList"
import {FiSave} from "react-icons/fi"
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

  function handleSubmit(e) {
    e.preventDefault()

    const query = {
      teamName: e.target.name.value,
      motto: e.target.motto.value ,
      country: e.target.country.value,
      maxMembers: e.target.maxMembers.value,
      avatar: e.target.avatar.value ,
      description: e.target.description.value ,
      discord: e.target.discord.value ,
      twitter: e.target.twitter.value ,
      facebook: e.target.facebook.value ,
    }

    return new Promise(function (resolve, reject) {

      fetch(`http://localhost:3000/api/team`, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(query),
      })
        .then((res) => {
          return res.json()
        })
        .then((res) => {
          if (!res) {
            reject(new Error("error"))
          }
          resolve("ok")
        })
    })
  }


export default function New_Team() {

  return (
    <form onSubmit={(e) => {
      toast
        .promise(handleSubmit(e), {
          loading: "Creating team...",
          success: "Team created",
          error: "Error while creating team",
        })
        .then(() => window.location.reload(false))
    }} id="form-teamProfile">
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
                    src={"/personas/DefaultTeamAvatar.png"}
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
                    placeholder={"https://avatar..."}
                    className="w-full px-2 py-2 mt-1 text-gray-700 border rounded-md focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Parte derecha save changes */}
              <div className="flex flex-col gap-y-2 absolute top-0 right-0 mr-10">
                <button
                  type="submit"
                  form="form-teamProfile"
                  className="px-7 py-1 bg-green-600 hover:bg-green-500 text-white text-bold font-medium uppercase rounded-md"
                >
                  <div className="flex justify-center gap-x-2 items-center p-2">
                    <FiSave className="h-5 w-5 items-center text-neutral  top-0 right-0" />
                    create team
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
                        placeholder={"Team Name"}
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
                      <select id="country" className="w-full px-2 py-2 mt-1 border rounded-md text-gray-700  focus:border-blue-600 text-opacity-75">
                        <option value="">
                          {"Select a country"}
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
                        <select id="maxMembers" className="w-24 px-3 py-2 mt-1  text-gray-700 border rounded-md focus:border-blue-600 text-opacity-75">
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
                    placeholder={"Create a brand new motto for your team!"}
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
                    placeholder={"Tell us about you!"}
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
                  placeholder={"@TwitterUser"}
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
                  placeholder={"FacebookUser"}
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
                  placeholder={"https://discord.gg/"}
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

  New_Team.getLayout = function getLayout(page) {
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
