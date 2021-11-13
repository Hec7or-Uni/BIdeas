import Header from "components/Header"
import LineMenu from "components/Navegation/LineMenu"
import { useLMenu } from "../context/LMenuContext"
import Stats from "../components/Cards/Stats"
import TeUsCard from "../components/Cards/TeUsCard"
import Layout from "../components/layout"
import { getSession } from "next-auth/react"
import { countryList } from "../data/countryList"

const numMaxMembers = {
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  8: "8",
  10: "10",
  12: "12",
  16: "16",
  20: "20",
  unlimited: "Unlimited",
}

const data = [
  {
    id: 1,
    name: "team",
  },
  {
    id: 2,
    name: "team settings",
  },
]

export default function Team() {
  const [isActive] = useLMenu()
  return (
    <div className="">
      <Header />
      <LineMenu data={data} />
      {isActive === 1 && (
        <div className="w-full px-8 mt-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-x-6">
              <div className="flex gap-x-4 items-center justify-center w-28 h-28 rounded-full bg-gray-100">
                <img
                  src="/anuncios/anuncio2.jpg"
                  alt=""
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <div className="flex items-center gap-x-2">
                  <div className="flex gap-x-4 items-center justify-center w-7 h-7 rounded-full bg-gray-100">
                    <img
                      src="/banderas/spain.png"
                      alt=""
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <p className="text-lg font-bold">EUROAVIA MISION</p>
                </div>
                <p className="text-base font-medium">To infinity and beyond.</p>
              </div>
            </div>
            <div className="flex gap-x-3">
              <button className="h-10 border-2 border-black px-8 text-base font-semibold uppercase hover:animate-pulse">
                request join
              </button>
              <button className="h-10 bg-black text-white px-8 text-base font-semibold uppercase hover:animate-pulse">
                respect
              </button>
            </div>
          </div>
          <p className="flex flex-col self-center w-2/4 leading-snug my-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam cras
            lectus senectus proin purus, scelerisque odio et. Magna pretium et,
            neque odio. Donec facilisis amet eget donec varius semper. Nulla
            egestas at ac leo. Quam turpis tempus consectetur pellentesque.
            Tincidunt lectus ultricies sit morbi pharetra. Varius ullamcorper
            vulputate amet sit massa.
          </p>

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
                  className="stroke-current text-blue-500"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              }
              points={"1"}
              desc={"sponsors"}
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
            <TeUsCard
              img={"/personas/AnaMariaGarciaJirola.jpg"}
              title={"Ana Maria"}
              desc={
                "Pellentesque maximus eros sit amet eleifend aliquam. Duis fringilla porta sapien, a commodo risus convallis molestie. Vestibulum congue magna ac venenatis porta. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam vitae felis dignissim, vulputate metus vitae, varius tortor. Vivamus condimentum elementum justo. Duis non velit ac ante laoreet varius. Vivamus sollicitudin justo at ex vestibulum, sit amet mollis turpis pellentesque."
              }
            />
            <TeUsCard
              img={"/personas/AnaMariaGarciaJirola.jpg"}
              title={"Ana Maria"}
              desc={
                "Pellentesque maximus eros sit amet eleifend aliquam. Duis fringilla porta sapien, a commodo risus convallis molestie. Vestibulum congue magna ac venenatis porta. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam vitae felis dignissim, vulputate metus vitae, varius tortor. Vivamus condimentum elementum justo. Duis non velit ac ante laoreet varius. Vivamus sollicitudin justo at ex vestibulum, sit amet mollis turpis pellentesque."
              }
            />
          </div>
        </div>
      )}
      {/*Profile Settings*/}
      {isActive === 2 && 
      <div>
          {/*Profile Avatar Edit*/}
        <div className="px-8 mt-5">
          <p className="text-base font-bold">Team Avatar</p>
        </div>
        
        <div className="flex gap-x-52 mt-5 items-center">
          <div className="flex gap-x-12 px-6 items-center">
            <div className="flex w-32 h-32 rounded-full items-center justify-center cursor-pointer hover:brightness-75">
              <img
                src="/anuncios/anuncio3.jpg"
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
              <div className="flex gap-x-2 items-center ml-2">
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

        {/*<div className="px-8 mt-8">
          <p className="text-base font-bold">Team Cover</p>
        </div>

        <div className="flex gap-x-72 mt-5 items-center">
          <div className="flex gap-x-12 px-6 items-center">
            <div className="flex w-96 h-32 rounded-lg items-center justify-center cursor-pointer hover:brightness-75">
              <img
                src="/anuncios/anuncio2.jpg"
                className="w-96 h-32 rounded-lg object-cover relative"
              />
              <div className="flex h-32 w-96 rounded-full absolute justify-center opacity-0 hover:opacity-90">
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
                  upload cover
              </div>
            </button>
          </div>
        </div>
        */}

        {/*General Info Edit*/}
        <div className="px-8 mt-8">
          <p className="text-base font-bold">Team Information</p>
          <div className="mt-4">
            <form
              className=""
            >
              <div className="flex gap-x-4">
                <div>
                  <label type="username">
                    <span className="text-xs font-semibold uppercase">team name</span>
                    <div>
                      <input
                        id="username"
                        type="username"
                        name="username"
                        placeholder="Los Languis"
                        className="mt-1 h-8 w-72 form-input bg-gray-200 p-2 rounded-md text-xs opacity-75"
                        required
                      />
                    </div>
                  </label>
                </div>
                <div>
                  <label type="country">
                    <span className="text-xs font-semibold uppercase">country</span>
                    <div>
                      <select className="mt-1 h-8 w-72 form-input bg-gray-200 p-2 rounded-md text-xs opacity-75">
                        {Object.entries(countryList).map( ([key, value]) => 
                          <option value={key}>
                            {value}
                          </option> )}
                      </select>
                    </div>
                  </label>
                </div>
                <div>
                  <div>
                    <label type="maxmembers">
                      <span className="text-xs font-semibold uppercase">max members</span>
                      <div>
                        <select className="mt-1 h-8 w-24 bg-gray-200 p-2 rounded-md text-xs opacity-75">
                          {Object.entries(numMaxMembers).map( ([key, value]) => 
                            <option className="flex" value={key}>
                              {value}
                            </option> )}
                        </select>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <label type="text" className="block mt-3">
                <span className="text-xs font-semibold uppercase">team motto</span>
                <div>
                  <input
                    id="description"
                    type="textarea"
                    name="description"
                    placeholder="Create a brand new motto for your team!"
                    
                    className="mt-1 h-8 w-7/12 form-input bg-gray-200 p-2 rounded-md text-xs opacity-75 align-baseline"
                  />
                </div>
              </label>
              <label type="text" className="block mt-3">
                <span className="text-xs font-semibold uppercase">team description</span>
                <div>
                  <textarea
                    id="description"
                    type="textarea"
                    name="description"
                    placeholder="Tell us about you!"
                    
                    className="resize-none mt-1 h-28 w-7/12 form-input bg-gray-200 p-2 rounded-md text-xs opacity-75 align-baseline"
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
                  <label type="discord">
                    <span className="text-xs font-semibold uppercase block">discord</span>
                    <div>
                      <input
                        id="discord"
                        type="text"
                        name="discord"
                        placeholder="https//www.discord.me"
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

Team.getLayout = function getLayout(page) {
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
  }

  return {
    props: {
      session,
    },
  }
}
