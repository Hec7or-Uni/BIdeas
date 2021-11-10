import Header from "components/Header"
import LineMenu from "components/Navegation/LineMenu"
import { useLMenu } from "../context/LMenuContext"
import Stats from "../components/Cards/Stats"
import TeUsCard from "../components/Cards/TeUsCard"
import Layout from "../components/layout"
import { getSession } from "next-auth/react"
import {
  FiHexagon,
  FiAward,
  FiFlag,
  FiBriefcase,
  FiHeart,
} from "react-icons/fi"

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

export default function Profile({ res }) {
  const [isActive] = useLMenu()

  return (
    <div className="w-full px-8 py-3">
      <Header />
      <LineMenu data={data} />
      {isActive === 1 && (
        <div className="container mt-6">
          <div className="flex gap-x-5">
            <div className="flex gap-x-1 items-center justify-center w-1/4 h-44 bg-gray-100">
              <div className="flex justify-center items-center h-28 w-28 relative">
                <FiHexagon
                  className="h-full w-full relative"
                  style={{ strokeWidth: "0.6" }}
                />
                <div className="h-10 w-10 rounded absolute">
                  <img
                    src={`/ranks/${0}.jpg`}
                    className="w-full h-full object-cover object-center rounded border border-black"
                  />
                </div>
              </div>
              <div>
                <p className="text-lg font-bold">Noob</p>
                <p className="text-lg font-normal">rank</p>
              </div>
            </div>
            <div className="flex flex-col self-start w-2/4 leading-snug">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                cras lectus senectus proin purus, scelerisque odio et. Magna
                pretium et, neque odio. Donec facilisis amet eget donec varius
                semper. Nulla egestas at ac leo. Quam turpis tempus consectetur
                pellentesque. Tincidunt lectus ultricies sit morbi pharetra.
                Varius ullamcorper vulputate amet sit massa.
              </p>
            </div>
          </div>

          <div className="flex gap-x-5 mt-6">
            <Stats
              icon={<FiAward className="h-6 w-6 text-purple-500" />}
              points={"10"}
              desc={"points"}
            />
            <Stats
              icon={<FiFlag className="h-6 w-6 text-yellow-500" />}
              points={"1"}
              desc={"teams owned"}
            />
            <Stats
              icon={<FiBriefcase className="h-6 w-6 text-blue-500" />}
              points={"2"}
              desc={"teams"}
            />
            <Stats
              icon={<FiHeart className="h-6 w-6 text-red-500" />}
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
  let res = null

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  } else {
    const params = new URLSearchParams({ id: session.token.id })
    const url = `http://localhost:3000/api/user?${params.toString()}`

    res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${req.cookies["next-auth.session-token"]}`,
      },
    }).then((res) => {
      return res.json()
    })
  }

  return {
    props: {
      session,
      res,
    },
  }
}
