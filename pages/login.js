import Link from "next/link"
import { useRouter } from "next/router"
import { signIn, getCsrfToken } from "next-auth/react"
import toast, { Toaster } from "react-hot-toast"

export default function Login({ csrfToken }) {
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { id, password } = e.target
    console.log("hola")

    const res = await signIn("credentials", {
      id: id.value,
      password: password.value,
      redirect: false,
    })

    const { error } = res
    if (!error) {
      toast.success("Successfully logged in!")
      return router.push("http://localhost:3000/home")
    }
    toast.error("Error while logging in.")
    return router.push("http://localhost:3000/login")
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 sm:px-6 flex-col gap-y-5 dark:bg-gradient-to-t dark:from-cm-color dark:via-cm-color dark:to-cm-color2">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-sm p-4 bg-white dark:bg-color-light-neutral-1 rounded-md shadow-md sm:p-6">
        <div className="flex items-center justify-center">
          <span className="text-xl font-medium text-gray-900">Login</span>
        </div>
        <form
          onSubmit={(e) => {
            handleSubmit(e)
          }}
          className="mt-4"
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label type="id" className="block">
            <span className="text-sm text-gray-700">Username or Email</span>
            <input
              id="id"
              type="id"
              name="id"
              className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600 bg-transparent"
              required
            />
          </label>
          <label type="password" className="block mt-3">
            <span className="text-sm text-gray-700">Password</span>
            <input
              id="password"
              type="password"
              name="password"
              className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600 bg-transparent"
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
