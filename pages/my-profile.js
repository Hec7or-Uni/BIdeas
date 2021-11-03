import Header from "components/Header"
import LineMenu from "components/Navegation/LineMenu"
import { useLMenu } from "../context/LMenuContext"
import Stats from "../components/Cards/Stats"
import TeUsCard from "../components/Cards/TeUsCard"
import Layout from "../components/layout"
import { getSession } from "next-auth/react"

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
      {isActive === 2 && <div>2</div>}
    </div>
  )
}

Profile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  console.log(session.token.name)

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
