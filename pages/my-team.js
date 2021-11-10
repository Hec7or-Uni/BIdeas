import Header from "components/Header"
import LineMenu from "components/Navegation/LineMenu"
import { useLMenu } from "../context/LMenuContext"
import Stats from "../components/Cards/Stats"
import TeUsCard from "../components/Cards/TeUsCard"
import Layout from "../components/layout"
import { getSession } from "next-auth/react"
import { FiAward, FiBriefcase, FiHeart } from "react-icons/fi"

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
    <div className="px-8 py-3">
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
              icon={<FiAward className="h-6 w-6 text-purple-500" />}
              points={"10"}
              desc={"points"}
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
      {isActive === 2 && <div>2</div>}
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
