import Link from "next/link"
import ButtonP from "../Buttons/ButtonP"
import toast, { Toaster } from "react-hot-toast"

export default function TeUsCard({ id, img, title, desc, url, isUser, owns }) {
  const handleRemove = (e) => {
    e.preventDefault()
    const id = e.target.id
    const params = new URLSearchParams({ id: id })
    const url = `http://localhost:3000/api/user/participates?${params.toString()}`
    return new Promise(function (resolve, reject) {
      fetch(url, { method: "DELETE" })
        .then((res) => {
          return res.json()
        })
        .then((res) => {
          if (!res) {
            reject(new Error("error"))
          }
          resolve("ok")
        })
    })
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
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
                func={(e) => {
                  toast
                    .promise(handleRemove(e), {
                      loading: isUser
                        ? "Dismissing the user..."
                        : "Leaving the team...",
                      success: isUser
                        ? "User successfully dismissed"
                        : "You left the team successfully",
                      error: isUser
                        ? "Error while dismissing the user"
                        : "Error while exiting the computer",
                    })
                    .then(() =>
                      toast("Reload to see the changes", {
                        icon: "⚠️",
                      })
                    )
                }}
                url={""}
                text={isUser ? "fire" : "leave"}
                className={"bg-red-600 hover:bg-red-700"}
              />
            </div>
          )}
        </a>
      </Link>
    </>
  )
}

TeUsCard.defaultProps = {
  img: "/personas/DefaultAvatar.jpg",
  title: "EUROAVIA MISION",
  desc: "Pellentesque lectus mauris, blandit vulputate condime ntum commodo, libero mattis molestie fermentum platea sagittis sit eu lacus, morbi arcu in tempor, tincidunt malesuada curabitur venenatis aliquet tempus, magna laoreet egestas congue iaculis ipsum eu semper et in sapien.",
  url: "hec7orci7o",
  isUser: true,
}
