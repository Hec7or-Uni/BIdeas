import { useState } from "react"
import Link from "next/link"
import crypto from "crypto"
import CryptoJS from "crypto-js"

export default function Invite() {
  const [values, setValues] = useState({
    name: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  })

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

  async function handleSubmit(e) {
    e.preventDefault()

    const salt = crypto.randomBytes(16).toString("hex")
    const query = {
      name: values.name,
      lastName: values.lastName,
      userName: values.username,
      email: values.email,
      salt: salt,
      passwd: CryptoJS.SHA512(salt + values.password).toString(),
    }
    await fetch(`http://localhost:3000/api/user`, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(query),
    }).then((res) => {
      return res.json()
    })
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 sm:px-6 flex-col gap-y-5">
      <div className="w-full max-w-md p-4 bg-white rounded-md shadow-md sm:p-6">
        <div className="flex items-center justify-center">
          <span className="text-xl font-medium text-gray-900">
            Create your account.
          </span>
        </div>
        <form method="post" onSubmit={handleSubmit} className="mt-4">
          <div className="flex gap-x-2 mt-3">
            <label type="name" className="block">
              <span className="text-sm text-gray-700">Name</span>
              <input
                type="name"
                id="name"
                name="name"
                autoComplete="name"
                onChange={handleName}
                className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600"
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
                onChange={handleLastName}
                className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600"
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
              onChange={handleUsername}
              className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600"
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
              onChange={handleEmail}
              className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600"
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
              onChange={handlePassword}
              className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600"
              required
            />
          </label>
          <div>
            <label className="inline-flex items-center mt-4">
              <input
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
          </div>
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
