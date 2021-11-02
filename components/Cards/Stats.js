export default function Card1({ icon, points, desc }) {
  return (
    <div className="flex flex-col items-center w-32 h-32 rounded-xl bg-gray-200 p-2.5">
      <div className="w-7 h-7">{icon}</div>
      <p className="text-center text-5xl font-bold my-2">{points}</p>
      <p className="text-center text-sm font-medium uppercase">{desc}</p>
    </div>
  )
}

Card1.defaultProps = {
  icon: "",
  points: "0",
  desc: "Points",
}
