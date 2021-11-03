import LineMenu from "../components/Navegation/LineMenu"
import Card from "../components/Cards/Card"
import { useLMenu } from "../context/LMenuContext"
import Layout from "../components/layout"
import Link from "next/Link"
import { getSession } from "next-auth/react"

const data = [
  {
    id: 1,
    name: "overview",
  },
  {
    id: 2,
    name: "recommended",
  },
  {
    id: 3,
    name: "in progress",
  },
]

export default function Home() {
  const [isActive] = useLMenu()

  return (
    <>
      <div className="px-8 h-1/2">
        {/* Cabecera */}
        <div className="flex items-center h-12 relative">
          <div className="flex lg:w-1/2 tracking-wide divide-x-2">
            <div className="flex flex-col w-1/2 text-left">
              <p className="text-xs font-medium uppercase truncate">
                announcement
              </p>
              <p className="mt-2 text-base font-bold truncate">
                EUROAVIA Mission
              </p>
            </div>
            <div className="flex flex-col w-1/2 text-left pl-6">
              <p className="text-xs font-medium uppercase truncate">
                changelog
              </p>
              <p className="mt-2 text-base font-bold capitalize truncate">
                version 0.1
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:w-1/2 text-right absolute right-0">
            <p className="text-xs font-medium uppercase truncate">users</p>
            <p className="mt-2 text-base font-bold capitalize truncate">
              <span className="text-lg font-black">555</span> users online
            </p>
          </div>
        </div>

        {/* Anuncio & estadisticas */}
        <div className="flex gap-x-6 h-cg42">
          {/* anuncio */}
          <div className="w-cg42 h-cg42 rounded-xl py-5">
            <img
              src="/anuncios/anuncio2.jpg"
              className="w-full h-full object-fill object-center rounded-xl"
            />
          </div>

          {/* estadisticas */}
          <div className="flex h-cg42 w-cg58 gap-x-0.5 py-5 rounded-xl">
            {/* Izquierda */}
            <div className="h-full w-1/2 rounded-tl-xl rounded-bl-xl p-6 bg-gray-200 relative">
              {/* Parte superior */}
              <div className="flex items-center">
                <div className="h-28 w-28 bg-red-500">img</div>
                <div className="flex flex-col ml-5">
                  <p className="text-base font-bold capitalize">entrepreneur</p>
                  <hr className="h-1 w-3/4 my-1.5 bg-gray-700 rounded-full" />
                  <p className="text-sm font-semibold">
                    0% towards your own boss
                  </p>
                </div>
              </div>
              {/* Historial */}
              {/* Rank */}
              <div className="flex items-center absolute bottom-0 mb-10">
                <p className="text-base font-bold capitalize">rank up - 0</p>
                <div className="flex items-center h-7 w-7 ml-3 rounded-full relative">
                  <div className="w-full h-full rounded-full bg-green-200 absolute filter blur-sm" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mx-auto rotate-180 text-green-600"
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
                </div>
              </div>
            </div>

            {/* Derecha */}
            <div className="flex flex-col gap-y-0.5 h-full w-1/2">
              {/* Parte Superior */}
              <div className="h-7/10 w-full rounded-tr-xl p-6 bg-gray-200">
                <p className="text-lg font-bold">Hec7orci7o</p>
              </div>
              {/* Parte Inferior */}
              <div className="flex justify-between items-center h-3/10 w-full rounded-br-xl p-6 bg-gray-200">
                <div className="flex flex-col">
                  <p className="text-xs font-bold uppercase">plan</p>
                  <p className="text-xl font-bold capitalize">free</p>
                </div>
                <Link href="">
                  <a className="text-base font-bold uppercase hover:underline">
                    go vip
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <LineMenu data={data} />
        {isActive === 1 && (
          <div className="flex gap-x-4 px-8">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        )}
        {isActive === 2 && (
          <div className="flex gap-x-4 px-8">
            <Card />
            <Card />
          </div>
        )}
        {isActive === 3 && (
          <div className="flex gap-x-4 px-8">
            <Card />
          </div>
        )}
      </div>
    </>
  )
}

Home.getLayout = function getLayout(page) {
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
