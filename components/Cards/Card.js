export default function Card({ img, title, desc }) {
  return (
    <div className="flex flex-col items-center h-80 w-64 rounded-xl bg-indigo-300 p-4 text-black transition duration-150 ease-in-out hover:scale-105">
      <div className="flex justify-center items-center h-32 w-32 mt-7 mb-4 bg-purple-50">
        .
      </div>
      <div className="w-48 tracking-tighter">
        <p className="font-bold text-2xl text-center capitalize">{title}</p>
        <p className="mt-0.5 text-base text-center font-medium">{desc}</p>
      </div>
    </div>
  )
}

Card.defaultProps = {
  img: "",
  title: "error",
  desc: "An error has ocurred while loading the page.",
}