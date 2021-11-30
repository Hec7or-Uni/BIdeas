export default function Careers({ title, text, lista }) {
  return (
    <div className="container px-8 mx-auto">
      <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
        {title}
      </p>
      <p className="text-base font-normal mb-4 text-gray-700 dark:text-gray-100">
        {text}
      </p>
      <div className="flex flex-col gap-y-4">{lista.map((item) => item)}</div>
    </div>
  )
}
