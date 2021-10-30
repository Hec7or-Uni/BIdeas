import Link from "next/link"
import { useState } from "react"

export default function offert({
  img,
  title,
  subtitle,
  accion1,
  accion2,
  date,
  person,
}) {
  const [hover, setHover] = useState(false)

  return (
    <>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="flex items-center h-20 w-2/3 rounded-xl bg-gray-200 mb-8 p-2 relative"
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
          {hover && !person ? (
            // candidato apto?
            <div className="h-auto w-auto relative">
              <div className="w-full h-full bg-green-200 absolute filter blur-sm z-0" />
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1 z-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
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
          <div className="flex absolute right-0">
            <Link href="/">
              <a className="text-sm font-medium px-4 py-2 rounded-sm mr-2 uppercase border-2 border-black">
                {accion1}
              </a>
            </Link>
            <button className="text-white text-sm font-medium px-4 py-2 rounded-sm mr-4 uppercase bg-black">
              {accion2}
            </button>
          </div>
        ) : (
          // date
          <p className="text-sm absolute right-0 bottom-0 mb-2 mr-4">{date}</p>
        )}
      </div>
    </>
  )
}
