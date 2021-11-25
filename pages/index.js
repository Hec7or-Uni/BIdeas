import { getSession } from "next-auth/react"
import LayoutOut from "../components/LayoutOut"

import {
  HiOutlineShare,
  HiOutlineOfficeBuilding,
  HiOutlineTrendingUp,
} from "react-icons/hi"

export default function Root() {
  return (
    <>
      <div className="w-full">
        <h1 className="mt-32 text-center text-7xl font-bold  mx-auto text-gray-900 dark:text-white">
          A Massive
          <br />
          Online Coworking
        </h1>
        <h2 className="mt-12 text-center text-xl leading-6 font-medium max-w-prose mx-auto text-gray-500 dark:text-gray-300">
          Join a dynamically growing community of entrepreneurs and take your
          teamwork skills to the next level through the most engaging, playful
          and practical, hands-on training experience.
        </h2>
        <div className="w-1/2 h-96 mt-16 rounded-xl mx-auto">
          <img
            src="https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>

      <div className="max-w-screen-xl p-4 mx-auto px-4 sm:px-6 lg:px-8 relative py-26 lg:mt-28">
        <div className="relative">
          <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="lg:col-start-2 lg:max-w-2xl ml-auto">
              <p className="text-base leading-6 text-indigo-500 dark:text-indiego-100 font-semibold uppercase">
                Interactive
              </p>
              <h4 className="mt-2 text-2xl leading-8 font-extrabold text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-9">
                Interactivity between team members is the key of the success.
              </h4>
              <p className="mt-4 text-lg leading-6 text-gray-500 dark:text-gray-300">
                Join other teams with amazing projects or create your own and
                realize the ideas you&apos;ve always wanted to see come true.
                Thanks to the reward and level system, the more projects you
                successfully complete, the more interesting you will be to other
                teams and companies.
              </p>
              <ul className="mt-8 md:grid md:grid-cols-2 gap-6">
                <li className="mt-6 lg:mt-0">
                  <div className="flex">
                    <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 dark:text-green-400 dark:bg-transparent">
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    <span className="ml-4 text-base leading-6 font-medium text-gray-500 dark:text-gray-200">
                      Live modifications
                    </span>
                  </div>
                </li>
                <li className="mt-6 lg:mt-0">
                  <div className="flex">
                    <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 dark:text-green-500 dark:bg-transparent">
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    <span className="ml-4 text-base leading-6 font-medium text-gray-500 dark:text-gray-200">
                      Data tracker
                    </span>
                  </div>
                </li>
                <li className="mt-6 lg:mt-0">
                  <div className="flex">
                    <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 dark:text-green-500 dark:bg-transparent">
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    <span className="ml-4 text-base leading-6 font-medium text-gray-500 dark:text-gray-200">
                      24/7 support
                    </span>
                  </div>
                </li>
                <li className="mt-6 lg:mt-0">
                  <div className="flex">
                    <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 dark:text-green-500 dark:bg-transparent">
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    <span className="ml-4 text-base leading-6 font-medium text-gray-500 dark:text-gray-200">
                      Free tips to improve work time
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="mt-10 lg:-mx-4 relative relative-20 lg:mt-0 lg:col-start-1">
              <div className="relative space-y-4">
                <div className="flex items-end justify-center lg:justify-start space-x-4">
                  <img
                    className="rounded-lg shadow-lg w-32 md:w-56"
                    width="200"
                    src="https://images.unsplash.com/photo-1534614971-6be99a7a3ffd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
                    alt="1"
                  />
                  <img
                    className="rounded-lg shadow-lg w-40 md:w-64"
                    width="260"
                    src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt="2"
                  />
                </div>
                <div className="flex items-start justify-center lg:justify-start space-x-4 ml-12">
                  <img
                    className="rounded-lg shadow-lg w-24 md:w-40"
                    width="170"
                    src="https://images.unsplash.com/photo-1636909798006-027d5d726fe2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                    alt="3"
                  />
                  <img
                    className="rounded-lg shadow-lg w-32 md:w-56"
                    width="200"
                    src="https://images.unsplash.com/photo-1632489031533-62cf8cea9d2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
                    alt="4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-gradient py-8 md:py-16 my-16">
        <div className="max-w-5xl mx-auto px-5 box-content">
          <div className="flex items-center flex-col md:flex-row -mx-5">
            <div className="w-full px-5 mb-5 md:mb-0 text-center md:text-left">
              <h6 className="uppercase font-semibold text-xs md:text-base text-black dark:text-gray-100">
                early access
              </h6>
              <h3 className="font-bold font-heading text-2xl md:text-4xl text-black dark:text-gray-100">
                Saturday 25
              </h3>
              <h3 className="font-bold font-heading text-lg md:text-xl text-black dark:text-gray-100 leading-tight">
                @ 12:00 AM
              </h3>
              <div className="mt-4 w-full md:w-44">
                <button
                  type="button"
                  className="py-2 px-4 text-white dark:text-black bg-black dark:bg-white hover:bg-gray-100 dark:hover:bg-color-neutral-2 focus:ring-indigo-500 focus:ring-offset-indigo-200 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                >
                  Beta Access
                </button>
              </div>
            </div>
            <div className="w-full md:w-auto px-5">
              <div className="flex justify-center text-black dark:text-white text-center">
                <div className="w-20 md:w-24 border border-black dark:border-white bg-light-100 rounded-lg py-3 md:py-4 mx-2">
                  <div className="text-2xl md:text-3xl font-semibold">
                    <span>0</span>
                    <span>1</span>
                  </div>
                  <div className="opacity-75 text-xs mt-3 uppercase">Day</div>
                </div>
                <div className="w-20 md:w-24 border border-black dark:border-white bg-light-100 rounded-lg py-3 md:py-4 mx-2">
                  <div className="text-2xl md:text-3xl font-semibold">
                    <span>1</span>
                    <span>8</span>
                  </div>
                  <div className="opacity-75 text-xs mt-3 uppercase">Hour</div>
                </div>
                <div className="w-20 md:w-24 border border-black dark:border-white bg-light-100 rounded-lg py-3 md:py-4 mx-2">
                  <div className="text-2xl md:text-3xl font-semibold">
                    <span>5</span>
                    <span>0</span>
                  </div>
                  <div className=" opacity-75 text-xs mt-3 uppercase">Min</div>
                </div>
                <div className="w-20 md:w-24 border border-black dark:border-white bg-light-100 rounded-lg py-3 md:py-4 mx-2">
                  <div className="text-2xl md:text-3xl font-semibold">
                    <span>1</span>
                    <span>9</span>
                  </div>
                  <div className="opacity-75 text-xs mt-3 uppercase">
                    Second
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="my-16 py-8">
        <h4 className="mt-2 text-center text-2xl leading-8 font-extrabold text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-9">
          Improve your skills with other like you
        </h4>
        <p className="mx-auto w-1/2 mt-4 text-center text-lg leading-6 text-gray-500">
          Join other teams with awesome projects or create you own and carry out
          ideas you&apos;ve always wanted to see come true Thanks to the reward
          and level system. The more projects you carry out, the more
          interesting you will be for other teams and companies.
        </p>
        <div className="sm:flex flex-wrap justify-center items-center text-center gap-8">
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 py-4 bg-color-light-neutral-1 mt-6  shadow-lg rounded-lg dark:bg-color-neutral-2">
            <div className="flex-shrink-0">
              <div className="flex items-center mx-auto justify-center h-12 w-12 rounded-md bg-indigo-600 text-white">
                <HiOutlineShare className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-xl text-gray-900 dark:text-white font-semibold py-4">
              Networking
            </h3>
            <p className="text-md  text-gray-500 dark:text-gray-300 py-4">
              connect with people with the same passion as you to take your
              project to the top.
            </p>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 py-4 mt-6 sm:mt-16 md:mt-20 lg:mt-24 bg-color-light-neutral-1 shadow-lg rounded-lg dark:bg-color-neutral-2">
            <div className="flex-shrink-0">
              <div className="flex items-center mx-auto justify-center h-12 w-12 rounded-md bg-indigo-600 text-white">
                <HiOutlineOfficeBuilding className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-xl text-gray-900 font-semibold dark:text-white py-4">
              Companies
            </h3>
            <p className="text-md text-gray-500 dark:text-gray-300 py-4">
              Share relevant, attractive and inspiring messages to attract
              companies and make your project bigger.
            </p>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 mt-6  px-4 py-4 bg-color-light-neutral-1 shadow-lg rounded-lg dark:bg-color-neutral-2">
            <div className="flex-shrink-0">
              <div className="flex items-center mx-auto justify-center h-12 w-12 rounded-md bg-indigo-600 text-white">
                <HiOutlineTrendingUp className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-xl text-gray-900 font-semibold dark:text-white py-4">
              Growth
            </h3>
            <p className="text-md  text-gray-500 dark:text-gray-300 py-4">
              Let us help you level up by connecting you with thousands of
              professionals with exciting ideas just like yours.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

Root.getLayout = function getLayout(page) {
  return <LayoutOut>{page}</LayoutOut>
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })

  return {
    props: {
      session,
    },
  }
}
