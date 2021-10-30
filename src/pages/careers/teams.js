import Offert from "../../components/Cards/Offert"
import { useA4Hired } from "../../context/A4HiredContext"

import LineMenu from "../../components/Navegation/LineMenu"
import { useLMenu } from "../../context/LMenuContext"

const data = [
  {
    id: 1,
    name: "Jobs",
  },
  {
    id: 2,
    name: "Applied Jobs",
  },
]

export default function Teams() {
  const [isToggled, Toggle] = useA4Hired()
  const [isActive] = useLMenu()

  function handleToggle() {
    Toggle(!isToggled)
  }
  return (
    <>
      <div className="px-10">
        <p className="text-lg font-bold">Lot of Jobs</p>
        <p className="text-base font-normal">
          Here you will be able to find some of the projects that are looking
          for professionals. Hopefully you will find one to your liking.
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
          <p className="text-lg font-bold">Job Board</p>
          <p className="text-base font-normal mb-4">
            142 active job opportunities
          </p>
          <Offert
            img={"/anuncios/anuncio4.jpg"}
            title={"human resources"}
            subtitle={"rrpp | well paid"}
            accion1={"view job"}
            accion2={"apply for job"}
            date={"8d ago"}
          />
          <Offert
            img={"/anuncios/anuncio5.jpg"}
            title={"Técnico/a de Soporte Telefonía"}
            subtitle={
              "+1 año trabajando con centralitas Alcatel. • Idiomas: Euskera y saber desenvolverse en Inglés (medio-alto a nivel oral). • Estudios en informática o telecomunicaciones: grado/ingeniería/FP…(no imprescindibles si se tiene la"
            }
            accion1={"view job"}
            accion2={"apply for job"}
            date={"8d ago"}
          />
        </div>
      )}
      {isActive === 2 && (
        <div className="container px-10 mx-auto">
          <p className="text-lg font-bold">Job Board</p>
          <p className="text-base font-normal mb-4">you applied for 1 job</p>
          <Offert
            img={"/anuncios/anuncio3.jpg"}
            title={"Space X goes to mars"}
            subtitle={"engineer required"}
            accion1={"view job"}
            accion2={"apply for job"}
            date={"8d ago"}
            applied={true}
          />
        </div>
      )}
    </>
  )
}
