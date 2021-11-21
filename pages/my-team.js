import { useState } from "react"
import { getSession } from "next-auth/react"
import Link from "next/Link"
import Header from "components/Header"
import Statistics from "../components/Cards/Statistics"
import TeUsCard from "../components/Cards/TeUsCard"
import LineMenu from "components/Navegation/LineMenu"
import Layout from "../components/layout"
import Footer from "components/Navegation/Footer"
import Meta from "components/Meta"
import { useLMenu } from "../context/LMenuContext"
import { countryList } from "../data/countryList"
import { FiAward, FiBriefcase, FiHeart } from "react-icons/fi"
import { RiBlazeLine} from "react-icons/ri"

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

const data = [
  {
    id: 1,
    name: "team",
  },
  {
    id: 2,
    name: "team settings",
  },
]

export default function Team({ team, user, workers }) {
  const [isActive] = useLMenu()

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
  const handleCountry = (e) => {
    setValues({ ...values, country: e.target.value })
  }
  const handleMaxMembers = (e) => {
    setValues({ ...values, maxMembers: e.target.value })
  }
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

  async function handleSubmit(e) {
    e.preventDefault()
  
    const query = {
      teamName: values.teamName,
      motto: values.motto,
      country: values.country,
      maxMembers: values.maxMembers,
      avatar: values.avatar,
      description: values.description,
      discord: values.discord,
      twitter: values.twitter,
      facebook: values.facebook,
    }
    await fetch(`http://localhost:3000/api/team`, {
      method: "PUT",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(query),
    }).then((res) => {
      return res.json()
    })
  }

  return (
    <div className="px-8 py-3">
      <Meta title="My Team"/>
      <Header
        avatar={user.avatar}
        username={user.userName}
        id={user.id}
        studies={user.studies}
        plan={user.plan}
        xp={user.xp}
      />
      <LineMenu data={data} />
      {isActive === 1 && team.teamName && (
        <div className="w-full mt-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-x-6">
              <div className="flex gap-x-4 items-center justify-center w-28 h-28 rounded-full bg-gray-100">
                <img
                  src={team.avatar || "/anuncios/anuncio2.jpg"}
                  alt=""
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <div className="flex items-center gap-x-2">
                  <div className="flex gap-x-4 items-center justify-center w-7 h-7 rounded-full bg-gray-100">
                    <img
                      src="/banderas/spain.png"
                      alt=""
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <p className="text-lg font-bold">{team.teamName}</p>
                </div>
                <p className="text-base font-medium">{team.motto}</p>
              </div>
            </div>
          </div>
          <p className="flex flex-col self-center w-2/4 leading-snug my-5">
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

          <div className="flex flex-col gap-x-5 mt-12">
            {workers.map((item) => {
              return (
                <TeUsCard
                  key={item.id}
                  img={item.avatar}
                  title={item.name + " " + item.lastName}
                  desc={item.description}
                  url={item.userName}
                  isUser={true}
                />
              )
            })}
          </div>
        </div>
      )}
      {isActive === 1 && !team.teamName && (

        <div className="container py-32">
          <div className="mx-auto flex flex-col items-center justify-center w-1/2 space-y-1 pb-10">
            <RiBlazeLine className="h-20 w-20 object-fill object-center mb-3 text-red-600"/>
            <p className="text-lg font-semibold text-justify">
              Oops! Looks like you don't have a team yet!
            </p>
            <p className="text-lg font-normal text-justify">
              You can {" "}
              <Link href="">
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
      {/* Profile Settings */}
      {isActive === 2 && (
        <div>
          {/* Profile Avatar Edit */}
          <div className="px-8 mt-5">
            <p className="text-base font-bold">Team Avatar</p>
          </div>

          <div className="flex gap-x-48 mt-5 items-center">
            <div className="flex gap-x-12 px-6 items-center">
              <div className="flex w-32 h-32 rounded-full items-center justify-center">
                <img
                  src={team.avatar || "/personas/DefaultTeamAvatar.png"}
                  className="w-32 h-32 rounded-full object-cover relative"
                />
                {/*<div className="flex h-32 w-32 rounded-full absolute justify-center opacity-0 hover:opacity-90">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-12"
                  >
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                  </svg>
                </div>*/}
              </div>

                <label>
                  <span className="text-xs font-semibold uppercase">
                    avatar url
                  </span>
                  <div>
                    <input
                      id="avatarUrl"
                      type="url"
                      name="avatarUrl"
                      placeholder={ team.avatar || "https://avatar..." }
                      onChange={handleAvatar}
                      className="block w-72 px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600"
                    />
                  </div>
                </label>
              
              {/*<button className="h-7 w-32 border-2 border-black text-xs font-medium uppercase rounded-sm" Onclick="document.getElementById('file-input').click();">
                <div className="flex gap-x-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-3 w-3 ml-1 transform rotate-180`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  upload avatar
                </div>
              </button>}*/}
            </div>
            <div>
              <button type="submit" form="form-profile" className="h-10 w-40 border-0 bg-indigo-500 text-white text-bold font-medium uppercase rounded-full">
                <div className="flex gap-x-2 ml-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                    <polyline points="17 21 17 13 7 13 7 21"></polyline>
                    <polyline points="7 3 7 8 15 8"></polyline>
                  </svg>
                  save changes
                </div>
              </button>
            </div>
          </div>

          {/* General Info Edit */}
          <div className="px-8 mt-8">
            <p className="text-base font-bold">Team Information</p>
            <div className="mt-4">
              <form className="">
                <div className="flex gap-x-4">
                  <div>
                    <label type="username">
                      <span className="text-xs font-semibold uppercase">
                        team name
                      </span>
                      <div>
                        <input
                          id="username"
                          type="username"
                          name="username"
                          placeholder={team.teamName || "Team Name"}
                          onSubmit={handleTeamname}
                          className="block w-96 px-3 py-2 mt-1 text-gray-700 border rounded-md focus:border-blue-600"
                        />
                      </div>
                    </label>
                  </div>
                  <div>
                    <label type="country">
                      <span className="text-xs font-semibold uppercase">
                        country
                      </span>
                      <div>
                        <select className="block w-96 px-3 py-2 mt-1 text-gray-700 border rounded-md focus:border-blue-600 opacity-75">
                        <option value="">{user.country || "Select a country"}</option>
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
                        <span className="text-xs font-semibold uppercase">
                          max members
                        </span>
                        <div>
                          <select className="block w-24 px-3 py-2 mt-1 text-gray-700 border rounded-md focus:border-blue-600 opacity-75">
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
                  <span className="text-xs font-semibold uppercase">
                    team motto
                  </span>
                  <div>
                    <input
                      id="motto"
                      type="textarea"
                      name="motto"
                      placeholder={team.motto || "Create a brand new motto for your team!"}
                      onSubmit={handleMotto}
                      className="resize-none w-7/12 px-3 py-2 mt-1 text-gray-700 border rounded-md focus:border-blue-600"
                    />
                  </div>
                </label>
                <label type="text" className="block mt-3">
                  <span className="text-xs font-semibold uppercase">
                    team description
                  </span>
                  <div>
                    <textarea
                      id="description"
                      type="textarea"
                      name="description"
                      placeholder={team.description || "Tell us about you!"}
                      onSubmit={handleDescription}
                      className="resize-y min-h-32 w-7/12 px-3 py-2 mt-1 text-gray-700 border rounded-md focus:border-blue-600"
                    />
                  </div>
                </label>
              </form>
            </div>
          </div>

          {/* Social Media */}
          <div className="px-8 mt-8 mb-12">
            <p className="text-base font-bold">Social Media</p>
            <div className="mt-4">
              <form className="">
                <div>
                  <label type="discord">
                    <span className="text-xs font-semibold uppercase block">
                      discord
                    </span>
                    <div>
                      <input
                        id="discord"
                        type="text"
                        name="discord"
                        placeholder={team.discord || "https://discord.gg/"}
                        onSubmit={handleDiscord}
                        className="block w-96 px-3 py-2 mt-1 text-gray-700 border rounded-md focus:border-blue-600"
                      />
                    </div>
                  </label>
                </div>
                <div className="flex gap-x-4">
                  <div>
                    <label type="twitter">
                      <span className="text-xs font-semibold uppercase block mt-4">
                        twitter
                      </span>
                      <div>
                        <input
                          id="twitter"
                          type="text"
                          name="twitter"
                          placeholder={team.twitter || "@TwitterUser"}
                          onSubmit={handleTwitter}
                          className="block w-96 px-3 py-2 mt-1 text-gray-700 border rounded-md focus:border-blue-600"
                        />
                      </div>
                    </label>
                  </div>
                  <div>
                    <label type="facebook">
                      <span className="text-xs font-semibold uppercase block mt-4">
                        facebook
                      </span>
                      <div>
                        <input
                          id="facebook"
                          type="text"
                          name="facebook"
                          placeholder={team.facebook || "FacebookUser"}
                          onSubmit={handleFacebook}
                          className="block w-96 px-3 py-2 mt-1 text-gray-700 border rounded-md focus:border-blue-600"
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <Footer/>
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

  let user = users.owner
  const workers = users.workers

  if (Object.entries(user).length === 0) {
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
