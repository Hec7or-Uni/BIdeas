import ButtonP from "../Buttons/ButtonP"
import ButtonS from "../Buttons/ButtonS"
import { useState } from "react"
import { FiCheck } from "react-icons/fi"

export default function offert({
  img,
  title,
  subtitle,
  accion1,
  accion2,
  date,
  person,
  applied,
}) {
  const [hover, setHover] = useState(false)

  return (
    <>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="flex items-center h-20 w-2/3 rounded-xl bg-white shadow mb-8 p-2 relative"
      >
        <div className="h-16 w-16 rounded-xl bg-blue-500 mr-3">
          {/* img */}
          <img
            src={img}
            alt="img de la oferta"
            className="h-16 w-16 object-cover object-center rounded-xl"
          />
        </div>
        <div className="flex flex-col w-1/2">
          <p className="text-lg font-bold capitalize">{title}</p>
          {hover && !person && !applied ? (
            <div className="h-auto w-auto relative">
              <div className="w-full h-full bg-green-200 absolute filter blur-sm z-0" />
              <div className="flex items-center">
                <FiCheck className="h-5 w-5 ml-1 z-10" />
                <p className="text-black  px-1.5 ml-1 text-base font-normal truncate z-10">
                  Your are elegible for this job
                </p>
              </div>
            </div>
          ) : (
            // descripcion
            <p className="text-base font-normal truncate">{subtitle}</p>
          )}
        </div>

        {hover ? (
          // botones
          <div className="absolute right-0 mr-4">
            <div className="flex items-center space-x-3">
              <ButtonS url={"/"} text={accion1} />
              {!applied && <ButtonP url={"/"} text={accion2} />}
            </div>
          </div>
        ) : (
          // date
          <p className="text-sm absolute right-0 bottom-0 mb-2 mr-4">{date}</p>
        )}
      </div>
    </>
  )
}
