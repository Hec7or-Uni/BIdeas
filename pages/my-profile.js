import { getSession } from "next-auth/react"
import Header from "components/Header"
import Statistics from "../components/Cards/Statistics"
import TeUsCard from "../components/Cards/TeUsCard"
import LineMenu from "components/Navegation/LineMenu"
import Layout from "../components/layout"
import { useLMenu } from "../context/LMenuContext"
import { countryList } from "../data/countryList"
import {
  FiHexagon,
  FiAward,
  FiFlag,
  FiBriefcase,
  FiHeart,
} from "react-icons/fi"

const data = [
  {
    id: 1,
    name: "profile",
  },
  {
    id: 2,
    name: "profile settings",
  },
]

export default function Profile({ user, owns, participates }) {
  const [isActive] = useLMenu()

  return (
    <div className="w-full px-8 py-3">
      <Header
        avatar={user.avatar}
        username={user.userName}
        id={user.id}
        studies={user.studies}
        plan={user.plan}
      />
      <LineMenu data={data} />
      {isActive === 1 && (
        <div className="container mt-6">
          <div className="flex gap-x-5">
            <div className="flex gap-x-1 items-center justify-center w-1/4 h-44 bg-neutral">
              <div className="flex justify-center items-center h-28 w-28 relative">
                <FiHexagon
                  className="h-full w-full relative"
                  style={{ strokeWidth: "0.6" }}
                />
                <div className="h-10 w-10 rounded absolute">
                  <img
                    src={`/ranks/${0}.jpg`}
                    className="w-full h-full object-cover object-center rounded border border-black"
                  />
                </div>
              </div>
              <div>
                <p className="text-lg font-bold">Noob</p>
                <p className="text-lg font-normal">rank</p>
              </div>
            </div>
            <div className="flex flex-col self-start w-2/4 leading-snug">
              <p>{user.description ? user.description : "Introduzca texto"}</p>
            </div>
          </div>

          <div className="flex gap-x-5 mt-6">
            <Statistics
              icon={<FiAward className="h-6 w-6 text-purple-500" />}
              points={user.xp}
              desc={"points"}
            />
            <Statistics
              icon={<FiFlag className="h-6 w-6 text-yellow-500" />}
              points={owns.length}
              desc={"teams owned"}
            />
            <Statistics
              icon={<FiBriefcase className="h-6 w-6 text-blue-500" />}
              points={participates.length}
              desc={"teams"}
            />
            <Statistics
              icon={<FiHeart className="h-6 w-6 text-red-500" />}
              points={user.respect}
              desc={"respect"}
            />
          </div>

          <div className="flex flex-col gap-x-5 mt-12">
            {owns.map((item) => {
              return (
                <TeUsCard
                  key={item.idProject}
                  img={item.project.avatar}
                  title={item.project.teamName}
                  desc={item.project.description}
                  url={item.project.teamName}
                  isUser={false}
                />
              )
            })}
            {participates.map((item) => {
              return (
                <TeUsCard
                  key={item.idProject}
                  img={item.project.avatar}
                  title={item.project.teamName}
                  desc={item.project.description}
                  url={item.project.teamName}
                  isUser={false}
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
            <p className="text-base font-bold">Profile Avatar</p>
          </div>

          <div className="flex gap-x-72 mt-5 items-center">
            <div className="flex gap-x-12 px-6 items-center">
              <div className="flex w-32 h-32 rounded-full items-center justify-center cursor-pointer hover:brightness-75">
                <img
                  src="/personas/HectorToralPallas.jpg"
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
            <p className="text-base font-bold">General Information</p>
            <div className="mt-4">
              <form className="">
                <div className="flex gap-x-4">
                  <div>
                    <label type="username">
                      <span className="text-xs font-semibold uppercase">
                        username
                      </span>
                      <div>
                        <input
                          id="username"
                          type="username"
                          name="username"
                          placeholder="Hec7orci7o"
                          className="mt-1 h-8 w-96 form-input bg-gray-200 p-2 rounded-md text-xs opacity-75"
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
                        <select className="mt-1 h-8 w-96 form-input bg-gray-200 p-2 rounded-md text-xs opacity-75">
                          {Object.entries(countryList).map(([key, value]) => (
                            <option key={key} value={key}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex gap-x-4">
                  <div>
                    <label type="email" className="block mt-3">
                      <span className="text-xs font-semibold uppercase">
                        e-mail
                      </span>
                      <div>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          placeholder="prueba@prueba.com"
                          className="mt-1 h-8 w-96 form-input bg-gray-200 p-2 rounded-md text-xs opacity-75"
                          required
                        />
                      </div>
                    </label>
                  </div>
                </div>
                <div className="flex gap-x-4">
                  <div>
                    <label type="password" className="block mt-3">
                      <span className="text-xs font-semibold uppercase">
                        password
                      </span>
                      <div>
                        <input
                          id="password"
                          type="password"
                          name="password"
                          className="mt-1 h-8 w-96 form-input bg-gray-200 p-2 rounded-md text-xs opacity-75"
                          required
                        />
                      </div>
                    </label>
                  </div>
                  <div>
                    <label type="confpassword" className="block mt-3">
                      <span className="text-xs font-semibold uppercase">
                        confirm password
                      </span>
                      <div>
                        <input
                          id="confpassword"
                          type="password"
                          name="confpassword"
                          className="mt-1 h-8 w-96 form-input bg-gray-200 p-2 rounded-md text-xs opacity-75"
                          required
                        />
                      </div>
                    </label>
                  </div>
                </div>
                <label type="text" className="block mt-3">
                  <span className="text-xs font-semibold uppercase">
                    profile description
                  </span>
                  <div>
                    <textarea
                      id="description"
                      type="textarea"
                      name="description"
                      placeholder="Tell us about you!"
                      className="resize-none mt-1 h-28 w-8/12 form-input bg-gray-200 p-2 rounded-md text-xs opacity-75 align-baseline"
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
                  <label type="website">
                    <span className="text-xs font-semibold uppercase block">
                      website
                    </span>
                    <div>
                      <input
                        id="website"
                        type="website"
                        name="website"
                        placeholder="https//www.hec7or.me"
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

Profile.getLayout = function getLayout(page) {
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
  const { owns, participates } = projects

  return {
    props: {
      session,
      user,
      owns,
      participates,
    },
  }
}
