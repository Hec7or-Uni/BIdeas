export default function Statistics({ icon, points, desc }) {
  return (
    <div className="flex flex-col items-center w-32 h-32 rounded-xl bg-white shadow-sm p-2.5">
      {icon}
      <p className="text-center text-5xl font-bold my-2">{points}</p>
      <p className="text-center text-sm font-medium uppercase">{desc}</p>
    </div>
  )
}

Statistics.defaultProps = {
  icon: "",
  points: "0",
  desc: "Points",
}
