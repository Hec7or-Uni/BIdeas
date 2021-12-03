import LineMenu from "../../components/Navegation/LineMenu"
import Meta from "components/Meta"
import { links4pro, links4teams } from "data/LineMenu"
import { useA4Hired } from "../../context/A4HiredContext"
import toast, { Toaster } from "react-hot-toast"

export default function Preload({
  user,
  web,
  title,
  subtitle,
  handleMenu,
  isActive,
}) {
  const [isToggled, Toggle] = useA4Hired()

  function handleUpdate(e) {
    e.preventDefault()

    const query = {
      id: user,
      av4hire: !isToggled,
    }

    return new Promise(function (resolve, reject) {
      fetch(`http://localhost:3000/api/user`, {
        method: "PUT",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(query),
      })
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
      <Toaster position="top-center" reverseOrder={false} />
      <Meta title={web} />
      <div className="px-8">
        <p className="text-lg font-bold dark:text-gray-100">{title}</p>
        <p className="text-base font-normal dark:text-gray-100">{subtitle}</p>
      </div>
      <div className="flex items-center gap-x-5 w-full bg-color-light-neutral-1 dark:bg-gray-900 shadow-sm px-8 my-8 py-5">
        <div
          className={`flex w-12 h-5 rounded-full shadow-inner transition duration-200 ease-in-out
        ${isToggled ? "bg-green-400" : "bg-red-400"}`}
        >
          <button
            onClick={(e) => {
              toast
                .promise(handleUpdate(e), {
                  loading: "Saving changes...",
                  success: "Changes succesfully saved",
                  error: "Error while saving changes",
                })
                .then(() => Toggle(!isToggled))
            }}
            className={`self-center w-6 h-6 bg-white rounded-full transition duration-500 
          ${isToggled ? "transform translate-x-full" : ""}`}
          />
        </div>

        <div>
          <p className="text-lg font-semibold text-black dark:text-white">
            Available for hire
          </p>
          <p className="text-base font-normal text-black dark:text-white">
            Make my profile available for hire
          </p>
        </div>
      </div>
      <div className="px-8">
        <LineMenu
          handleMenu={handleMenu}
          data={web === "Teams" ? links4teams : links4pro}
          isActive={isActive}
        />
      </div>
    </>
  )
}
