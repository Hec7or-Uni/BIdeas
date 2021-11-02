import Offert from "../../components/Cards/Offert"
import { useA4Hired } from "../../context/A4HiredContext"
import Layout from "../../components/layout"
import LineMenu from "../../components/Navegation/LineMenu"
import { useLMenu } from "../../context/LMenuContext"

const data = [
  {
    id: 1,
    name: "Proffesionals",
  },
  {
    id: 2,
    name: "Conatct Requests",
  },
]

export default function Professionals() {
  const [isToggled, Toggle] = useA4Hired()
  const [isActive] = useLMenu()

  function handleToggle() {
    Toggle(!isToggled)
  }
  return (
    <>
      <div className="px-10">
        <p className="text-lg font-bold">Lot of Professionals</p>
        <p className="text-base font-normal">
          Here you will be able to find many motivated people to complete your
          team.
        </p>
      </div>
      <div className="flex items-center gap-x-5 w-full bg-gray-200 px-10 my-8 py-5">
        <div
          className={`flex w-12 h-5 rounded-full shadow-inner transition duration-200 ease-in-out ${
            isToggled ? "bg-green-200" : "bg-red-200"
          }`}
        >
          <button
            onClick={handleToggle}
            className={`self-center w-6 h-6 bg-gray-100 rounded-full transition duration-500 ${
              isToggled ? "transform translate-x-full" : ""
            }`}
          />
        </div>
        <div>
          <p className="text-lg font-semibold">Available for hire</p>
          <p className="text-base font-normal">
            Make my profile available for hire
          </p>
        </div>
      </div>
      <LineMenu data={data} />
      {isActive === 1 && (
        <div className="container px-10 mx-auto">
          <p className="text-lg font-bold">Proffesional Board</p>
          <p className="text-base font-normal mb-4">
            142 active job opportunities
          </p>
          <Offert
            img={"/personas/AnaMariaGarciaJirola.jpg"}
            title={"Ana Maria"}
            subtitle={"Engineer"}
            accion1={"view profile"}
            accion2={"contact"}
            date={"8d ago"}
            person={true}
          />
          <Offert
            img={"/personas/JuanRodriguezPerez.jpg"}
            title={"Juan Rodriguez"}
            subtitle={"System Engineer"}
            accion1={"view profile"}
            accion2={"contact"}
            date={"8d ago"}
            person={true}
          />
        </div>
      )}
      {isActive === 2 && (
        <div className="container px-10 mx-auto">
          <p className="text-lg font-bold">Proffesional Board</p>
          <p className="text-base font-normal mb-4">
            you have contacted 1 person
          </p>
          <Offert
            img={"/personas/CarlotaLopezSoria.jpg"}
            title={"Juan Rodriguez"}
            subtitle={"System Engineer"}
            accion1={"view profile"}
            accion2={"contact"}
            date={"8d ago"}
            person={true}
          />
        </div>
      )}
    </>
  )
}

Professionals.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
