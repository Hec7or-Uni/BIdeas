import { useState } from "react"
import { useRouter } from "next/router"
import { getSession, signOut } from "next-auth/react"
import Header from "components/Cabeceras/Header"
import Statistics from "../components/Cards/Statistics"
import TeUsCard from "../components/Cards/TeUsCard"
import LineMenu from "../components/Navegation/LineMenu"
import Layout from "../components/Layout"
import Meta from "components/Meta"
import crypto from "crypto"
import CryptoJS from "crypto-js"
import toast, { Toaster } from "react-hot-toast"
import { links4myprofile } from "data/LineMenu"
import { countryList } from "../data/countryList"
import {
  FiHexagon,
  FiAward,
  FiFlag,
  FiBriefcase,
  FiHeart,
  FiSave,
  FiTrash2,
} from "react-icons/fi"
import { BsTwitter, BsFacebook } from "react-icons/bs"

import { CgWebsite } from "react-icons/cg"

export default function Profile({ user, owns, participates }) {
  const router = useRouter()
  const [isActive, setActive] = useState(1)
  const handleMenu = (id) => setActive(id)

  function handleUpdate(e) {
    e.preventDefault()

    const salt = crypto.randomBytes(16).toString("hex")
    const query = {
      id: user.id,
      name: e.target.name.value || user.name,
      lastName: e.target.lastname.value || user.lastName,
      userName: e.target.username.value || user.userName,
      email: e.target.email.value || user.email,
      website: e.target.website.value,
      country: e.target.country.value || user.country,
      studies: e.target.studies.value,
      twitter: e.target.twitter.value,
      facebook: e.target.facebook.value,
      description: e.target.description.value,
      avatar: e.target.avatar.value,
      salt: salt,
      passwd: CryptoJS.SHA512(salt + e.target.password.value).toString(),
    }

    if (!e.target.password.value) {
      delete query.salt
      delete query.passwd
    }
    return new Promise(function (resolve, reject) {
      fetch(`/api/user`, {
        method: "PUT",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(query),
      }).then((res) => {
        res.json()
        if (!res) {
          reject(new Error("error"))
        }
        resolve("ok")
      })
    })
  }

  function handleDelete() {
    const params2 = new URLSearchParams({ id: user.id })
    const url = `/api/user?${params2.toString()}`

    return new Promise(function (resolve, reject) {
      fetch(url, {
        method: "DELETE",
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

  return (
    <div className="w-full px-8 py-3">
      <Toaster position="top-center" reverseOrder={true} />
      <Meta title="My Profile" />
      <Header
        avatar={user.avatar}
        username={user.userName}
        id={user.id}
        studies={user.studies}
        plan={user.plan}
        xp={user.xp}
        myProfile={true}
        country={user.country}
        isTeam={false}
        website={user.website}
        facebook={user.facebook}
        twitter={user.twitter}
      />
      <LineMenu
        handleMenu={handleMenu}
        data={links4myprofile}
        isActive={isActive}
      />
      {isActive === 1 && (
        <div className="container mt-6">
          <div className="flex gap-x-5">
            <div className="flex gap-x-1 items-center justify-center w-1/4 h-44 bg-color-light-neutral-1 dark:bg-color-neutral-2 shadow-sm">
              <div className="flex justify-center items-center h-28 w-28 relative">
                <FiHexagon
                  className="h-full w-full relative dark:text-gray-100"
                  style={{ strokeWidth: "0.6" }}
                />
                <div className="h-10 w-10 rounded absolute">
                  <img
                    src={`/ranks/${0}.jpg`}
                    className="w-full h-full object-cover object-center rounded border border-black dark:border-gray-100"
                  />
                </div>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {Math.trunc(user.xp / 100) === 0 && "Newbie"}
                  {Math.trunc(user.xp / 100) === 1 && "Entrepeneur"}
                  {Math.trunc(user.xp / 100) === 2 && "Veteran"}
                  {Math.trunc(user.xp / 100) === 3 && "Businessman"}
                  {Math.trunc(user.xp / 100) === 4 && "Your own Boss"}
                  {Number(user.xp / 100).toFixed() >= 5 && (
                    <span className="text-yellow-500 animate-pulse duration-700">
                      GOAT
                    </span>
                  )}
                </p>
                <p className="text-lg font-normal text-gray-900 dark:text-gray-100">
                  rank
                </p>
              </div>
            </div>
            <div className="flex flex-col self-start w-2/4 leading-snug">
              <p className="text-gray-900 dark:text-gray-100">
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

          <div className="flex flex-col gap-y-4 mt-12">
            {owns.map((item) => {
              return (
                <TeUsCard
                  key={item.id}
                  id={item.id}
                  img={item.project.avatar}
                  title={item.project.teamName}
                  desc={item.project.description}
                  url={item.project.teamName}
                  isUser={false}
                  owns={true}
                />
              )
            })}
            {participates.map((item) => {
              return (
                <TeUsCard
                  key={item.id}
                  id={item.id}
                  img={item.project.avatar}
                  title={item.project.teamName}
                  desc={item.project.description}
                  url={item.project.teamName}
                  isUser={false}
                  owns={false}
                />
              )
            })}
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
              .then(() => router.reload())
              .catch(() => router.reload())
          }}
          id="form-profile"
        >
          <div className="relative">
            {/* Profile Avatar Edit */}

            <div className="px-8 mt-8 w-4/6">
              <p className="text-base font-bold dark:text-gray-100">
                Profile Avatar
              </p>
              <div className="mt-4 px-2">
                <div className="flex items-center gap-x-4 w-full h-full">
                  {/* Parte izquierda img, input */}
                  <div className="flex w-full items-center">
                    <div className="flex w-1/2 justify-start">
                      <img
                        src={user.avatar || "/personas/DefaultAvatar.jpg"}
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
                        placeholder="https://avatar.com"
                        defaultValue={user.avatar}
                        className="w-full py-2 px-2 mt-1 text-gray-700 border rounded-md focus:border-blue-600"
                      />
                    </div>
                  </div>

                  {/* Parte derecha save changes */}
                  <div className="flex w-full items-center">
                    <div className="flex flex-col gap-y-2 absolute top-0 right-0">
                      <button
                        type="submit"
                        form="form-profile"
                        className="px-7 py-1 bg-green-600 hover:bg-green-500 text-white text-bold font-medium uppercase rounded-md"
                      >
                        <div className="flex justify-center gap-x-2 items-center p-2">
                          <FiSave className="h-5 w-5 items-center text-neutral" />
                          save changes
                        </div>
                      </button>
                      <form
                        type="submit"
                        onClick={() => {
                          toast
                            .promise(handleDelete(), {
                              loading: "Deleting user...",
                              success: "User succesfully deleted",
                              error: "Error while deleting user",
                            })
                            .then(async () => {
                              await signOut({ redirect: false })
                              router.push("/")
                            })
                        }}
                        className="px-7 py-1 bg-red-600 hover:bg-red-500 text-white text-bold font-medium uppercase rounded-md cursor-pointer"
                      >
                        <div className="flex justify-center gap-x-2 items-center p-2">
                          <FiTrash2 className="h-5 w-5 items-center text-neutral" />
                          delete
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* General Info Edit */}
            <div className="px-8 mt-8 w-4/6">
              <p className="text-base font-bold dark:text-gray-100">
                General Information
              </p>
              <div className="mt-4 px-2">
                {/* Name & LastName */}
                <div className="flex gap-x-4 w-full">
                  <div className="w-full">
                    <span className="text-xs font-semibold uppercase dark:text-gray-100">
                      name
                    </span>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Name"
                      defaultValue={user.name}
                      className="w-full py-2 px-2 mt-1 text-gray-700 border rounded-md focus:border-blue-600"
                    />
                  </div>
                  <div className="w-full">
                    <span className="text-xs font-semibold uppercase dark:text-gray-100">
                      last name
                    </span>
                    <input
                      id="lastname"
                      type="text"
                      name="lastname"
                      placeholder="Lastname"
                      defaultValue={user.lastName}
                      className="w-full py-2 px-2 mt-1 text-gray-700 border rounded-md focus:border-blue-600"
                    />
                  </div>
                </div>

                {/* Username & Country */}
                <div className="flex gap-x-4 w-full mt-2">
                  <div className="w-full">
                    <span className="text-xs font-semibold uppercase dark:text-gray-100">
                      Username
                    </span>
                    <input
                      id="username"
                      type="text"
                      name="username"
                      placeholder="Username"
                      defaultValue={user.userName}
                      className="w-full py-2 px-2 mt-1 text-gray-700 bg-white border rounded-md focus:border-blue-600"
                    />
                  </div>
                  <div className="w-full">
                    <span className="text-xs font-semibold uppercase dark:text-gray-100">
                      country
                    </span>
                    <select
                      className="w-full px-2 py-2 mt-1 text-gray-700 bg-neutral border rounded-md focus:border-blue-600"
                      id="country"
                    >
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
                </div>

                {/* Email & Password */}
                <div className="flex gap-x-4 w-full mt-2">
                  <div className="w-full">
                    <span className="text-xs font-semibold uppercase dark:text-gray-100">
                      e-mail
                    </span>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="example@example.com"
                      defaultValue={user.email}
                      className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:border-blue-600"
                    />
                  </div>
                  <div className="w-full">
                    <span className="text-xs font-semibold uppercase dark:text-gray-100">
                      password
                    </span>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:border-blue-600"
                    />
                  </div>
                </div>
                <div className="flex gap-x-4 w-full mt-2">
                  <div className="w-full">
                    <span className="text-xs font-semibold uppercase dark:text-gray-100">
                      studies
                    </span>
                    <input
                      id="studies"
                      type="text"
                      name="studies"
                      placeholder="Your studies"
                      defaultValue={user.studies}
                      className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:border-blue-600"
                    />
                  </div>
                  <div className="w-full"></div>
                </div>
                <div className="flex w-full mt-2">
                  <div className="w-full">
                    <span className="text-xs font-semibold uppercase dark:text-gray-100">
                      profile description
                    </span>
                    <textarea
                      id="description"
                      type="textarea"
                      name="description"
                      placeholder="Tell us about you!"
                      defaultValue={user.description}
                      className="resize-y min-h-32 min h-32 w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:border-blue-600 align-baseline"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="px-8 mt-8 w-4/6">
              <p className="text-base font-bold dark:text-gray-100">
                Social media
              </p>
              <div className="mt-4 px-2">
                <div className="flex gap-x-4 w-full">
                  <div className="w-full">
                    <div className="flex gap-x-1">
                      <CgWebsite className="h-auto w-auto object-fill object-center text-gray-400" />
                      <span className="text-xs font-semibold uppercase dark:text-gray-100">
                        website
                      </span>
                    </div>
                    <input
                      id="website"
                      type="url"
                      name="website"
                      placeholder="https//www.yourweb.com"
                      defaultValue={user.website}
                      className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:border-blue-600"
                    />
                  </div>
                  <div className="w-full"></div>
                </div>
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
                      defaultValue={user.twitter}
                      className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md focus:border-blue-600"
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
                      defaultValue={user.facebook}
                      className="block w-full px-3 py-2 mt-1 mb-5 text-gray-700 border rounded-md focus:border-blue-600"
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
    const url = `${process.env.NEXT_PUBLIC_URL}/api/users/${session.token.id}`

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
