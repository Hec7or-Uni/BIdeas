import Link from "next/link"

export default function TeUsCard({ img, title, desc, url, isUser }) {
  return (
    <Link href={`http://localhost:3000/${isUser ? "users" : "teams"}/${url}`}>
      <a className="flex items-center gap-x-4 h-28 w-1/2 px-2 rounded-xl bg-color-light-neutral-1 dark:bg-color-neutral-1 shadow">
        <div className="w-24 h-24 rounded-xl">
          <img
            src={img}
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
