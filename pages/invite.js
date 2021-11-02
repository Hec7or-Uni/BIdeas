export default function Invite() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 sm:px-6 flex-col gap-y-5">
      <div className="w-full max-w-md p-4 bg-white rounded-md shadow-md sm:p-6">
        <div className="flex items-center justify-center">
          <span className="text-xl font-medium text-gray-900">
            Create your account.
          </span>
        </div>
        <form className="mt-4">
          <div className="flex gap-x-2 mt-3">
            <label type="name" className="block">
              <span className="text-sm text-gray-700">Name</span>
              <input
                type="name"
                id="name"
                name="name"
                autoComplete="name"
                className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-indigo-600"
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
                className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-indigo-600"
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
              className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-indigo-600"
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
              className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-indigo-600"
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
              className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-indigo-600"
              required
            />
          </label>
          <label type="password" className="block mt-1.5">
            <span className="text-sm text-gray-700">Confirm Password</span>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-indigo-600"
              required
            />
          </label>
          <div>
            <label className="inline-flex items-center mt-4">
              <input
                type="checkbox"
                className="text-indigo-600 border form-checkbox"
              />
              <span className="ml-2 text-sm text-gray-600">
                I accept the <span className="font-bold">Terms of Service</span>{" "}
                and the <span className="font-bold">Privacy Policy</span>
              </span>
            </label>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2.5 text-sm text-center text-white bg-indigo-600 rounded-md hover:bg-indigo-500 tracking-wide"
            >
              Register
            </button>
          </div>
        </form>
      </div>
      <div className="flex w-full max-w-md p-4 bg-white rounded-md shadow-md sm:p-5 items-center justify-between">
        <a
          className="block text-sm text-indigo-700 fontme hover:underline"
          href="#"
        >
          Have an account?
        </a>
        <button
          type="submit"
          className="w-1/3 px-4 py-2.5 text-sm text-center text-white bg-indigo-600 rounded-md hover:bg-indigo-500 tracking-wide"
        >
          Sign in
        </button>
      </div>
    </div>
  )
}
