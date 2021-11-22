import Link from "next/link"

export default function Shortcut({ img, title, desc, url }) {
  return (
    <Link href={url}>
      <a className="flex flex-col items-center h-80 min-w-15.5 w-15.5 rounded-xl shadow p-4 transition duration-150 ease-in-out scale-95 hover:scale-100 bg-color-light-neutral-1 dark:bg-color-neutral-1">
        <div className="flex justify-center items-center h-32 w-32 mt-7 mb-4">
          {typeof img === "object" ? (
            img
          ) : (
            <img
              src={img || "/personas/DefaultTeamAvatar.png"}
              alt={title + " team profile image"}
              className="w-full h-full object-cover object-center rounded-xl"
            />
          )}
        </div>
        <div className="w-44 tracking-tighter">
          <p className="font-bold text-2xl text-center capitalize text-gray-900 dark:text-gray-100">
            {title}
          </p>
          <p className="mt-0.5 text-sm text-center font-medium text-gray-500 dark:text-gray-400">
            {desc}
          </p>
        </div>
      </a>
    </Link>
  )
}

Shortcut.defaultProps = {
  img: "https://images.unsplash.com/photo-1555861496-0666c8981751?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
  title: "error",
  desc: "An error has ocurred while loading the page.",
}
