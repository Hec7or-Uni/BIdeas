import LayoutOut from "../components/LayoutOut"

export default function Root() {
  return (
    <div className="w-full">
      <h1 className="mt-32 text-center text-7xl font-bold  mx-auto">
        A Massive
        <br />
        Hacking Playground
      </h1>
      <h2 className="mt-16 text-center text-xl font-medium max-w-prose mx-auto">
        Join a dynamically growing hacking community and take your cybersecurity
        skills to the next level through the most captivating, gamified,
        hands-on training experience!
      </h2>
    </div>
  )
}

Root.getLayout = function getLayout(page) {
  return <LayoutOut>{page}</LayoutOut>
}
