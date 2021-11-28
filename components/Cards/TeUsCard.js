import Link from "next/link"
import ButtonP from "../Buttons/ButtonP"

export default function TeUsCard({ id, img, title, desc, url, isUser, owns }) {
  // handleFire & handleLeave PUEDE que sean la misma funcion
  // url: localhost:3000/api/user/participate?id=<id>

  function handleFire() {
    // elimina al usuario <id> de la tabla participates
    // identificada con el <id> de su participacion {idUser, idProject}
  }

  function handleLeave() {
    // elimina al usuario logeado <id> de la tabla participates
    // identificada con el <id> de su participacion {idUser, idProject}
  }

  return (
    <Link href={`http://localhost:3000/${isUser ? "users" : "teams"}/${url}`}>
      <a className="flex items-center gap-x-4 w-1/2 rounded-xl bg-color-light-neutral-1 dark:bg-color-neutral-1 shadow relative">
        <div className="w-24 h-24 rounded-xl">
          <img
            src={
              img ||
              (isUser
                ? "/personas/DefaultAvatar.jpg"
                : "/personas/DefaultTeamAvatar.png")
            }
            alt={"Profile img of " + title}
            className="w-full h-full object-cover rounded-2xl p-2"
          />
        </div>
        <div className="self-start w-3/5 overflow-ellipsis overflow-hidden mt-2">
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </p>
          <p className="text-base font-normal h-16 leading-5 text-gray-900 dark:text-white">
            {desc}
          </p>
        </div>
        {!owns && (
          <div className="absolute right-0 mr-4">
            <ButtonP
              id={id}
              func={() => console.log()}
              url={""}
              text={isUser ? "fire" : "leave"}
              className={"bg-red-600 hover:bg-red-700"}
            />
          </div>
        )}
      </a>
    </Link>
  )
}

TeUsCard.defaultProps = {
  img: "/personas/DefaultAvatar.jpg",
  title: "EUROAVIA MISION",
  desc: "Pellentesque lectus mauris, blandit vulputate condime ntum commodo, libero mattis molestie fermentum platea sagittis sit eu lacus, morbi arcu in tempor, tincidunt malesuada curabitur venenatis aliquet tempus, magna laoreet egestas congue iaculis ipsum eu semper et in sapien.",
  url: "hec7orci7o",
  isUser: true,
}
