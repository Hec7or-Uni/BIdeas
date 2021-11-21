import { useState } from "react"
import { getSession } from "next-auth/react"
import Header from "components/Header"
import Statistics from "../components/Cards/Statistics"
import TeUsCard from "../components/Cards/TeUsCard"
import LineMenu from "components/Navegation/LineMenu"
import Layout from "../components/layout"
import Meta from "components/Meta"
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

  const [values, setValues] = useState({
    name: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    avatar: "",
    description: "",
    website: "",
    twitter: "",
    facebook: "",
  })

  const handleAvatar = (e) => {
    setValues({ ...values, avatar: e.target.value })
  }
  const handleName = (e) => {
    setValues({ ...values, name: e.target.value })
  }
  const handleLastName = (e) => {
    setValues({ ...values, lastName: e.target.value })
  }
  const handleUsername = (e) => {
    setValues({ ...values, username: e.target.value })
  }
  const handleEmail = (e) => {
    setValues({ ...values, email: e.target.value })
  }
  const handlePassword = (e) => {
    setValues({ ...values, password: e.target.value })
  }
  const handleDescription = (e) => {
    setValues({ ...values, description: e.target.value })
  }
  const handleWebsite = (e) => {
    setValues({ ...values, website: e.target.value })
  }
  const handleTwitter = (e) => {
    setValues({ ...values, twitter: e.target.value })
  }
  const handleFacebook = (e) => {
    setValues({ ...values, facebook: e.target.value })
  }

  // async function handleSubmit(e) {
  //   e.preventDefault()

  //   const salt = crypto.randomBytes(16).toString("hex")
  //   const query = {
  //     name: values.name,
  //     lastName: values.lastName,
  //     userName: values.username,
  //     email: values.email,
  //     website: values.website,
  //     twitter: values.twitter,
  //     facebook: values.facebook,
  //     description: values.description,
  //     avatar: values.avatar,
  //     salt: salt,
  //     passwd: CryptoJS.SHA512(salt + values.password).toString(),
  //   }
  //   await fetch(`http://localhost:3000/api/user`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "text/plain" },
  //     body: JSON.stringify(query),
  //   }).then((res) => {
  //     return res.json()
  //   })
  // }

  return (
    <div className="w-full px-8 py-3">
      <Meta title="My Profile"/>
      <Header
        avatar={user.avatar}
        username={user.userName}
        id={user.id}
        studies={user.studies}
        plan={user.plan}
        xp={user.xp}
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
                <p className="text-lg font-bold">
                  {Math.trunc((user.xp - 49) / 100) === 0 && "Newbie"}
                  {Math.trunc((user.xp - 49) / 100) === 1 && "Entrepeneur"}
                  {Math.trunc((user.xp - 49) / 100) === 2 && "Veteran"}
                  {Math.trunc((user.xp - 49) / 100) === 3 && "Businessman"}
                  {Math.trunc((user.xp - 49) / 100) === 4 && "Your own Boss"}
                  {Number((user.xp - 49) / 100).toFixed() >= 5 && (
                    <span className="text-yellow-500 animate-pulse duration-700">
                      GOAT
                    </span>
                  )}
                </p>
                <p className="text-lg font-normal">rank</p>
              </div>
            </div>
            <div className="flex flex-col self-start w-2/4 leading-snug">
              <p>
                {user.description
                  ? user.description
                  : "Your account does not have a description yet!"}
              </p>
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
                  key={item.id}
                  img={item.avatar}
                  title={item.teamName}
                  desc={item.description}
                  url={item.teamName}
                  isUser={false}
                />
              )
            })}
            {participates.map((item) => {
              return (
                <TeUsCard
                  key={item.id}
                  img={item.avatar}
                  title={item.teamName}
                  desc={item.description}
                  url={item.teamName}
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

          <div className="flex gap-x-48 mt-5 items-center">
            <div className="flex gap-x-12 px-6 items-center">
              <div className="flex w-32 h-32 rounded-full items-center justify-center">
                <img
                  src={user.avatar || "/personas/DefaultAvatar.jpg"}
                  className="w-32 h-32 rounded-full object-cover relative"
                />
                {/* <div className="flex h-32 w-32 rounded-full absolute justify-center opacity-0 hover:opacity-90">
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
                </div> */}
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
                    placeholder={user.avatar || "https://avatar..."}
                    onChange={handleAvatar}
                    className="block w-72 px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600"
                  />
                </div>
              </label>

              {/* <button className="h-7 w-32 border-2 border-black text-xs font-medium uppercase rounded-sm" Onclick="document.getElementById('file-input').click();">
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
              </button>} */}
            </div>
            <div>
              <button
                type="submit"
                form="form-profile"
                className="h-10 w-40 border-0 bg-indigo-500 text-white text-bold font-medium uppercase rounded-full"
              >
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
              <form id="form-profile">
                <div className="flex gap-x-4">
                  <div>
                    <label>
                      <span className="text-xs font-semibold uppercase">
                        name
                      </span>
                      <div>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          placeholder={user.name}
                          onChange={handleName}
                          className="block w-96 px-3 py-2 mt-1 text-gray-700 border rounded-md form-inpu focus:border-blue-600"
                        />
                      </div>
                    </label>
                  </div>
                  <div>
                    <label>
                      <span className="text-xs font-semibold uppercase">
                        last name
                      </span>
                      <div>
                        <input
                          id="lastname"
                          type="text"
                          name="lastname"
                          placeholder={user.lastName}
                          onChange={handleLastName}
                          className="block w-96 px-3 py-2 mt-1 text-gray-700 border rounded-md form-inpu focus:border-blue-600"
                        />
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex gap-x-4">
                  <div>
                    <label className="block mt-3">
                      <span className="text-xs font-semibold uppercase text-gray-700">
                        Username
                      </span>
                      <div>
                        <input
                          id="username"
                          type="text"
                          name="username"
                          placeholder={user.userName}
                          onChange={handleUsername}
                          className="block w-96 px-3 py-2 mt-1 text-gray-700 border rounded-md form-inpu focus:border-blue-600"
                        />
                      </div>
                    </label>
                  </div>
                  <div>
                    <label className="block mt-3">
                      <span className="text-xs font-semibold uppercase text-gray-700">
                        country
                      </span>
                      <div>
                        <select className="block w-96 px-3 py-2 mt-1 text-gray-700 border rounded-md form-inpu focus:border-blue-600 opacity-75">
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
                </div>
                <div className="flex gap-x-4">
                  <div>
                    <label className="block mt-3">
                      <span className="text-xs font-semibold uppercase">
                        e-mail
                      </span>
                      <div>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          placeholder={user.email || "example@example.com"}
                          onChange={handleEmail}
                          className="block w-96 px-3 py-2 mt-1 text-gray-700 border rounded-md form-inpu focus:border-blue-600"
                        />
                      </div>
                    </label>
                  </div>
                  <div>
                    <label className="block mt-3">
                      <span className="text-xs font-semibold uppercase">
                        password
                      </span>
                      <div>
                        <input
                          id="password"
                          type="password"
                          name="password"
                          onChange={handlePassword}
                          className="block w-96 px-3 py-2 mt-1 text-gray-700 border rounded-md form-inpu focus:border-blue-600"
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
                      placeholder={user.description || "Tell us about you!"}
                      onChange={handleDescription}
                      className="resize-y min-h-32 min h-32 w-7/12 px-3 py-2 mt-1 text-gray-700 border rounded-md form-inpu focus:border-blue-600 align-baseline"
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
                  <label>
                    <span className="text-xs font-semibold uppercase block">
                      website
                    </span>
                    <div>
                      <input
                        id="website"
                        type="url"
                        name="website"
                        placeholder={user.website || "https//www.yourweb.com"}
                        onChange={handleWebsite}
                        className="block w-96 px-3 py-2 mt-1 text-gray-700 border rounded-md form-inpu focus:border-blue-600"
                      />
                    </div>
                  </label>
                </div>
                <div className="flex gap-x-4">
                  <div>
                    <label>
                      <span className="text-xs font-semibold uppercase block mt-4">
                        twitter
                      </span>
                      <div>
                        <input
                          id="twitter"
                          type="text"
                          name="twitter"
                          placeholder={user.twitter || "@TwitterUser"}
                          onChange={handleTwitter}
                          className="block w-96 px-3 py-2 mt-1 text-gray-700 border rounded-md form-inpu focus:border-blue-600"
                        />
                      </div>
                    </label>
                  </div>
                  <div>
                    <label>
                      <span className="text-xs font-semibold uppercase block mt-4">
                        facebook
                      </span>
                      <div>
                        <input
                          id="facebook"
                          type="text"
                          name="facebook"
                          placeholder={user.facebook || "FacebookUser"}
                          onChange={handleFacebook}
                          className="block w-96 px-3 py-2 mt-1 text-gray-700 border rounded-md form-inpu focus:border-blue-600"
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
    const url = `http://localhost:3000/api/users/${session.token.id}`

    res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${req.cookies["next-auth.session-token"]}`,
      },
    }).then((res) => {
      return res.json()
    })
  }

  const { user, ...data } = res.data
  const { owns, participates } = data.projects

  return {
    props: {
      session,
      user,
      owns,
      participates,
    },
  }
}
