import Header from "components/Header"
import LineMenu from "components/Navegation/LineMenu"
import { useLMenu } from "../context/LMenuContext"
import Stats from "../components/Cards/Stats"
import TeUsCard from "../components/Cards/TeUsCard"

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
            <TeUsCard />
            <TeUsCard />
          </div>
        </div>
      )}
      {isActive === 2 && <div>2</div>}
    </div>
  )
}
