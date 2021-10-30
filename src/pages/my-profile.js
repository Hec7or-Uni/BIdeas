import Header from "components/Header"
import LineMenu from "components/Navegation/LineMenu"
import { useLMenu } from "../context/LMenuContext"

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
        <div className="container px-10">
          <div className="flex gap-x-5">
            <div className="flex gap-x-5 items-center justify-center w-1/5 h-44 bg-red-500">
              <div className="bg-blue-500 w-24 h-24" />
              <div>
                <p className="text-base font-bold">Noob</p>
                <p className="text-sm font-normal">rank</p>
              </div>
            </div>
            <div className="w-2/4 bg-red-300">
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
        </div>
      )}
      {isActive === 2 && <div>2</div>}
    </div>
  )
}
