import Header from "components/Header"
import LineMenu from "components/Navegation/LineMenu"
import { useLMenu } from "../context/LMenuContext"
import Stats from "../components/Cards/Stats"
import TeUsCard from "../components/Cards/TeUsCard"
import Layout from "../components/layout"
import { getSession } from "next-auth/react"
import { countryList } from "../data/countryList"

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

export default function Profile() {
  const [isActive] = useLMenu()

  return (
    <div className="w-full">
      <Header />
      <LineMenu data={data} />
      {isActive === 1 && (
        <div className="container px-8 mt-6">
          <div className="flex gap-x-5">
            <div className="flex gap-x-4 items-center justify-center w-1/5 h-44 bg-gray-100">
              <div className="bg-blue-500 w-24 h-24" />
              <div>
                <p className="text-lg font-bold">Noob</p>
                <p className="text-lg font-normal">rank</p>
              </div>
            </div>
            <div className="flex flex-col self-center w-2/4 leading-snug">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                cras lectus senectus proin purus, scelerisque odio et. Magna
                pretium et, neque odio. Donec facilisis amet eget donec varius
                semper. Nulla egestas at ac leo. Quam turpis tempus consectetur
                pellentesque. Tincidunt lectus ultricies sit morbi pharetra.
                Varius ullamcorper vulputate amet sit massa.
              </p>
              <p>
                Eu quisque pulvinar dui velit nunc est. Sed quam aenean aliquam
                suspendisse. Habitant augue fringilla dolor risus, sit dolor
                ullamcorper ipsum. Vivamus vulputate tellus tellus lectus
                pharetra volutpat, est. Quis massa cursus faucibus quam cursus
                aliquam, pretium diam.
              </p>
            </div>
          </div>

          <div className="flex gap-x-5 mt-6">
            <Stats
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-current text-purple-500"
                >
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
              }
              points={"10"}
              desc={"points"}
            />
            <Stats
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-current text-yellow-500"
                >
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                  <line x1="4" y1="22" x2="4" y2="15"></line>
                </svg>
              }
              points={"1"}
              desc={"teams owned"}
            />
            <Stats
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-current text-blue-500"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              }
              points={"2"}
              desc={"teams"}
            />
            <Stats
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-current text-red-500"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              }
              points={"4"}
              desc={"respect"}
            />
          </div>

          <div className="flex flex-col gap-x-5 mt-12">
            <TeUsCard />
            <TeUsCard />
          </div>
        </div>
      )}
      {/*Profile Settings*/}
      {isActive === 2 && 
      <div>
          {/*Profile Avatar Edit*/}
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                  class="feather feather-camera" className="mt-12">
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
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" class="feather feather-save">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z">
                    </path>
                    <polyline points="17 21 17 13 7 13 7 21"></polyline>
                    <polyline points="7 3 7 8 15 8"></polyline>
                    </svg>
                  save changes
              </div>
            </button>
          </div>
        </div>

        {/*General Info Edit*/}
        <div className="px-8 mt-8">
          <p className="text-base font-bold">General Information</p>
          <div className="mt-4">
            <form
              className=""
            >
              <div className="flex gap-x-4">
                <div>
                  <label type="username">
                    <span className="text-xs font-semibold uppercase">username</span>
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
                    <span className="text-xs font-semibold uppercase">country</span>
                    <div>
                      <select className="mt-1 h-8 w-96 form-input bg-gray-200 p-2 rounded-md text-xs opacity-75">
                        {Object.entries(countryList).map( ([key, value]) => <option value={key}>{value}</option> )}
                      </select>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex gap-x-4">
                <div>
                  <label type="email" className="block mt-3">
                    <span className="text-xs font-semibold uppercase">e-mail</span>
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
                {/*<div>
                  <label type="timezone" className="block mt-3">
                    <span className="text-xs font-semibold uppercase">timezone</span>
                    <div>
                      <input
                        id="timezone"
                        type="text"
                        name="timezone"
                        placeholder="UTC"
                        className="mt-1 h-8 w-96 form-input bg-gray-200 p-2 rounded-md text-xs opacity-75"
                      />
                    </div>
                  </label>
                </div>*/}
              </div>
              <div className="flex gap-x-4">
                <div>
                  <label type="password" className="block mt-3">
                    <span className="text-xs font-semibold uppercase">password</span>
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
                    <span className="text-xs font-semibold uppercase">confirm password</span>
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
                <span className="text-xs font-semibold uppercase">profile description</span>
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

        {/*Social Media*/}
        <div className="px-8 mt-8 mb-12">
          <p className="text-base font-bold">Social Media</p>
          <div className="mt-4">
            <form
              className=""
            >
              <div>
                  <label type="website">
                    <span className="text-xs font-semibold uppercase block">website</span>
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
                    <span className="text-xs font-semibold uppercase block mt-4">twitter</span>
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
                    <span className="text-xs font-semibold uppercase block mt-4">facebook</span>
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
      }
    </div>
  )
}

Profile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  } else {
    console.log(req.cookies["next-auth.session-token"])
    const params = new URLSearchParams({ id: session.token.id })
    const url = `http://localhost:3000/api/user?${params.toString()}`
    console.log(url)

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${req.cookies["next-auth.session-token"]}`,
      },
    }).then((res) => {
      return res.json()
    })

    await console.log(res)
  }

  return {
    props: {
      session,
    },
  }
}
