import Link from "next/link"

export default function TeUsCard({ img, title, desc, url, isUser }) {
  return (
    <Link href={`http://localhost:3000/${isUser ? "users" : "teams"}/${url}`}>
      <a className="flex items-center gap-x-4 h-28 w-1/2 mb-2 px-2 rounded-xl bg-white shadow">
        <div className="w-24 h-24 rounded-xl">
          <img
            src={img}
            alt={"Profile img of " + title}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="self-start w-3/5 overflow-ellipsis overflow-hidden mt-2">
          <p className="text-xl font-bold">{title}</p>
          <p className="text-base font-normal h-16 leading-5">{desc}</p>
        </div>
      </a>
    </Link>
  )
}

TeUsCard.defaultProps = {
  img: "/anuncios/anuncio3.jpg",
  title: "EUROAVIA MISION",
  desc: "Pellentesque lectus mauris, blandit vulputate condime ntum commodo, libero mattis molestie fermentum platea sagittis sit eu lacus, morbi arcu in tempor, tincidunt malesuada curabitur venenatis aliquet tempus, magna laoreet egestas congue iaculis ipsum eu semper et in sapien.",
  url: "hec7orci7o",
  isUser: true,
}
