export default function Statistics({ icon, points, desc }) {
  return (
    <div className="flex flex-col items-center w-32 h-32 rounded-xl bg-color-light-neutral-1 dark:bg-color-neutral-1 shadow-sm p-2.5">
      {icon}
      <p className="text-center text-5xl font-bold my-2 text-gray-900 dark:text-white">
        {points < 999 ? points : "MAX"}
      </p>
      <p className="text-center text-sm font-medium uppercase text-gray-900 dark:text-white">
        {desc}
      </p>
    </div>
  )
}

Statistics.defaultProps = {
  icon: "",
  points: "0",
  desc: "Points",
}
