import { useLMenu } from "../../context/LMenuContext"

export default function LineMenu({ data }) {
  const [isActive, setActive] = useLMenu()

  return (
    <div className="mb-4">
      <div className="flex items-start w-full tracking-wide">
        {data.map((item) => {
          return (
            <input
              key={item.id}
              id={item.id}
              name={item.id}
              type="button"
              value={item.name}
              onClick={(e) => setActive(item.id)}
              className={`flex justify-center w-36 py-3 border-b-2 border-black  dark:text-gray-100 border-opacity-0 text-center text-xs font-black uppercase tracking-wide cursor-pointer ${
                isActive === item.id
                  ? "border-opacity-100 dark:border-white"
                  : ""
              } bg-transparent`}
            />
          )
        })}
      </div>
      <hr className="border-black dark:border-white mb-4" />
    </div>
  )
}
