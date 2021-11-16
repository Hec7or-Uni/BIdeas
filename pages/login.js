import Link from "next/link"
import { getCsrfToken } from "next-auth/react"

export default function Login({ csrfToken }) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 sm:px-6 flex-col gap-y-5">
      <div className="w-full max-w-sm p-4 bg-white rounded-md shadow-md sm:p-6">
        <div className="flex items-center justify-center">
          <span className="text-xl font-medium text-gray-900">Login</span>
        </div>
        <form
          method="post"
          action="/api/auth/callback/credentials"
          className="mt-4"
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label type="email" className="block">
            <span className="text-sm text-gray-700">Email</span>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="username"
              className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600"
              required
            />
          </label>
          <label type="password" className="block mt-3">
            <span className="text-sm text-gray-700">Password</span>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600"
              required
            />
          </label>
          <div className="flex items-center justify-between mt-4">
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="text-blue-600 border form-checkbox"
                />
                <span className="mx-2 text-sm text-gray-600">Remember me</span>
              </label>
            </div>
            <div>
              <a
                className="block text-sm text-blue-600 fontme hover:underline"
                href="#"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="capitalize w-full tracking-normal px-4 py-3 text-xs font-bold text-center text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
      <div className="flex w-full max-w-sm p-4 bg-white rounded-md shadow-md sm:p-5 items-center justify-between">
        <Link href="/invite">
          <a
            className="block text-sm text-blue-700 fontme hover:underline"
            href="/invite"
          >
            Don’t have an account?
          </a>
        </Link>
        <Link href="/invite">
          <a className="capitalize w-1/3 tracking-normal px-4 py-2.5 text-xs font-bold text-center text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Join Now
          </a>
        </Link>
      </div>
    </div>
  )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}
