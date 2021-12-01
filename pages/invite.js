import Link from "next/link"
import crypto from "crypto"
import CryptoJS from "crypto-js"
import { useRouter } from "next/router"
import toast, { Toaster } from "react-hot-toast"

export default function Invite() {
  const router = useRouter()
  const currentDate = new Date().getTime()

  function handleSubmit(e) {
    e.preventDefault()
    const endDate = new Date("December 25, 2021 12:00").getTime()
    const { name, lastName, username, email, password } = e.target

    const salt = crypto.randomBytes(16).toString("hex")
    const query = {
      name: name.value,
      lastName: lastName.value,
      userName: username.value,
      email: email.value,
      plan: currentDate > endDate ? 0 : 1,
      salt: salt,
      passwd: CryptoJS.SHA512(salt + password.value).toString(),
    }

    return new Promise(function (resolve, reject) {
      if (!e.target.checkbox.checked) {
        reject(new Error("error"))
      }

      fetch(`http://localhost:3000/api/user`, {
        method: "POST",
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

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 sm:px-6 flex-col gap-y-5  dark:bg-gradient-to-t dark:from-cm-color dark:via-cm-color dark:to-cm-color2">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-md p-4 bg-white dark:bg-color-light-neutral-1 rounded-md shadow-md sm:p-6">
        <div className="flex items-center justify-center">
          <span className="text-xl font-medium text-gray-900">
            Create your account.
          </span>
        </div>
        <form
          method="post"
          onSubmit={(e) => {
            toast
              .promise(handleSubmit(e), {
                loading: "Registering user",
                success: "User successfully registered",
                error: "Error while registering the user",
              })
              .then(() => router.push("http://localhost:3000/login"))
              .catch(() => router.push("http://localhost:3000/invite"))
          }}
          className="mt-4"
        >
          <div className="flex gap-x-2 mt-3">
            <label type="name" className="block">
              <span className="text-sm text-gray-700">Name</span>
              <input
                type="name"
                id="name"
                name="name"
                autoComplete="name"
                className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600 bg-transparent"
                required
              />
            </label>
            <label type="lastName" className="block">
              <span className="text-sm text-gray-700">Last Name</span>
              <input
                type="lastName"
                id="lastName"
                name="lastName"
                autoComplete="last name"
                className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600 bg-transparent"
                required
              />
            </label>
          </div>
          <label type="username" className="block mt-1.5">
            <span className="text-sm text-gray-700">Username</span>
            <input
              type="username"
              id="username"
              name="username"
              autoComplete="username"
              className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600 bg-transparent"
              required
            />
          </label>
          <label type="email" className="block mt-1.5">
            <span className="text-sm text-gray-700">Email</span>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600 bg-transparent"
              required
            />
          </label>
          <label type="password" className="block mt-1.5">
            <span className="text-sm text-gray-700">Password</span>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600 bg-transparent"
              required
            />
          </label>
          <label className="inline-flex items-center mt-4">
            <input
              id="checkbox"
              type="checkbox"
              className="text-blue-600 border form-checkbox"
            />
            <span className="ml-2 text-sm text-gray-600">
              I accept the{" "}
              <Link href="/tos">
                <a className="font-bold hover:underline">Terms of Service</a>
              </Link>{" "}
              and the{" "}
              <Link href="/privacypolicy">
                <a className="font-bold hover:underline">Privacy Policy</a>
              </Link>
            </span>
          </label>
          <div className="mt-6">
            <button
              type="submit"
              className="capitalize w-full tracking-normal px-4 py-3 text-xs font-bold text-center text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Register
            </button>
          </div>
        </form>
      </div>
      <div className="flex w-full max-w-md p-4 bg-white rounded-md shadow-md sm:p-5 items-center justify-between">
        <Link href="/login">
          <a
            className="block text-sm text-blue-700 fontme hover:underline"
            href="#"
          >
            Have an account?
          </a>
        </Link>
        <Link href="/login">
          <a className="capitalize w-1/3 tracking-normal px-4 py-2.5 text-xs font-bold text-center text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Sign in
          </a>
        </Link>
      </div>
    </div>
  )
}
