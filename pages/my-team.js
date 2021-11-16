import Header from "components/Header"
import LineMenu from "components/Navegation/LineMenu"
import { useLMenu } from "../context/LMenuContext"
import Stats from "../components/Cards/Stats"
import TeUsCard from "../components/Cards/TeUsCard"
import Layout from "../components/layout"
import { getSession } from "next-auth/react"
import { countryList } from "../data/countryList"
import { FiAward, FiBriefcase, FiHeart } from "react-icons/fi"

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

  return (
    <div className="px-8 py-3">
      <Header
        avatar={user.avatar}
        username={user.userName}
        id={user.id}
        studies={user.studies}
        plan={user.plan}
      />
      <LineMenu data={data} />
      {isActive === 1 && (
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
            <Stats
              icon={<FiAward className="h-6 w-6 text-purple-500" />}
              points={team.xp}
              desc={"points"}
            />
            <Stats
              icon={<FiBriefcase className="h-6 w-6 text-blue-500" />}
              points={workers.length}
              desc={"users"}
            />
            <Stats
              icon={<FiHeart className="h-6 w-6 text-red-500" />}
              points={team.respect}
              desc={"respect"}
            />
          </div>

          <div className="flex flex-col gap-x-5 mt-12">
            {workers.map((item) => {
              return (
                <TeUsCard
                  key={item.idUser}
                  img={item.user.avatar}
                  title={item.user.name + " " + item.user.lastName}
                  desc={item.user.description}
                  url={item.user.userName}
                  isUser={true}
                />
              )
            })}
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

          <div className="flex gap-x-52 mt-5 items-center">
            <div className="flex gap-x-12 px-6 items-center">
              <div className="flex w-32 h-32 rounded-full items-center justify-center cursor-pointer hover:brightness-75">
                <img
                  src="/anuncios/anuncio3.jpg"
                  className="w-32 h-32 rounded-full object-cover relative"
                />
                <div className="flex h-32 w-32 rounded-full absolute justify-center opacity-0 hover:opacity-90">
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
                </div>
              </div>

              <button className="h-7 w-32 border-2 border-black text-xs font-medium uppercase hover:animate-pulse rounded-sm">
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
              </button>
            </div>
            <div>
              <button className="h-10 w-40 border-0 bg-indigo-500 text-white text-bold font-medium uppercase hover:animate-pulse rounded-full">
                <div className="flex gap-x-2 items-center ml-2">
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
                          placeholder="Los Languis"
                          className="mt-1 h-8 w-72 form-input bg-gray-200 p-2 rounded-md text-xs opacity-75"
                          required
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
                        <select className="mt-1 h-8 w-72 form-input bg-gray-200 p-2 rounded-md text-xs opacity-75">
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
                          <select className="mt-1 h-8 w-24 bg-gray-200 p-2 rounded-md text-xs opacity-75">
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
                      id="description"
                      type="textarea"
                      name="description"
                      placeholder="Create a brand new motto for your team!"
                      className="mt-1 h-8 w-7/12 form-input bg-gray-200 p-2 rounded-md text-xs opacity-75 align-baseline"
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
                      placeholder="Tell us about you!"
                      className="resize-none mt-1 h-28 w-7/12 form-input bg-gray-200 p-2 rounded-md text-xs opacity-75 align-baseline"
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
                        placeholder="https//www.discord.me"
                        className="mt-1 h-8 w-96 form-input bg-gray-200 p-2 rounded-md text-xs opacity-75"
                        required
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
                          placeholder="@Ismati5"
                          className="mt-1 h-8 w-96 form-input bg-gray-200 p-2 rounded-md text-xs opacity-75"
                          required
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
                          placeholder="Ismati5"
                          className="mt-1 h-8 w-96 form-input bg-gray-200 p-2 rounded-md text-xs opacity-75"
                          required
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
  const user = users.owner.user
  const workers = users.workers

  return {
    props: {
      session,
      team,
      user,
      workers,
    },
  }
}
