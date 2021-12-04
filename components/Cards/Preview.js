import { useState } from "react"
import Link from "next/link"
import ButtonP from "../Buttons/ButtonP"
import ButtonS from "../Buttons/ButtonS"
import useTimeAgo from "hooks/useTimeAgo"
import useDateTimeFormat from "hooks/useDateTimeFormat"
import { FiCheck } from "react-icons/fi"

export default function Preview({
  id,
  img,
  title,
  subtitle,
  accion1,
  accion2,
  url,
  isUser,
  applied,
  createdAt,
  func,
}) {
  const [hover, setHover] = useState(false)
  const timeago = useTimeAgo(createdAt)
  const createdAtFormated = useDateTimeFormat(createdAt)

  return (
    <Link href={`/${isUser ? "users" : "teams"}/${url}`}>
      <a
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="flex items-center h-20 w-2/3 rounded-xl bg-color-light-neutral-1 dark:bg-color-neutral-1 shadow p-2 relative cursor-default"
      >
        <div className="h-16 w-16 rounded-xl mr-3">
          {/* img */}
          <img
            src={
              img ||
              (isUser
                ? "/personas/DefaultAvatar.jpg"
                : "/personas/DefaultTeamAvatar.png")
            }
            alt="img de la oferta"
            className="h-full w-full object-cover object-center rounded-xl"
          />
        </div>
        <div className="flex flex-col w-1/2">
          <p className="text-lg font-bold capitalize text-gray-900 dark:text-gray-100">
            {title}
          </p>
          {hover && !isUser && !applied ? (
            <div className="h-auto w-auto relative">
              <div className="flex items-center w-min	bg-green-200 rounded">
                <FiCheck className="h-5 w-5 ml-1 z-10" />
                <p className="text-gray-900 px-1.5 ml-1 text-base font-normal truncate z-10">
                  Your are elegible for this job
                </p>
              </div>
            </div>
          ) : (
            // descripcion
            <p className="text-base font-normal truncate text-gray-700 dark:text-gray-300">
              {subtitle}
            </p>
          )}
        </div>

        {hover ? (
          // botones
          <div className="absolute right-0 mr-4">
            <div className="flex items-center space-x-3">
              <ButtonS
                url={`/${isUser ? "users" : "teams"}/${url}`}
                text={accion1}
              />
              <ButtonP
                id={id}
                func={func}
                url={""}
                text={accion2}
                className={applied ? "bg-red-600 hover:bg-red-700" : ""}
              />
            </div>
          </div>
        ) : (
          <date
            title={createdAtFormated}
            className="text-sm absolute right-0 bottom-0 mb-2 mr-4 dark:text-gray-500"
          >
            {timeago}
          </date>
        )}
      </a>
    </Link>
  )
}
