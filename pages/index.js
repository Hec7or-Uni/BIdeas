import LayoutOut from "../components/LayoutOut"
import { getSession } from "next-auth/react"

export default function Root() {
  return (
    <div className="w-full">
      <h1 className="mt-32 text-center text-7xl font-bold  mx-auto">
        A Massive
        <br />
        Online Coworking
      </h1>
      <h2 className="mt-16 text-center text-xl font-medium max-w-prose mx-auto">
        Join a dynamically growing community of entrepreneurs and take your
        teamwork skills to the next level through the most engaging, playful and
        practical, hands-on training experience.
      </h2>
      <div className="w-1/2 h-96 mt-16 rounded-xl bg-red-200 mx-auto" />
    </div>
  )
}

Root.getLayout = function getLayout(page) {
  return <LayoutOut>{page}</LayoutOut>
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })

  return {
    props: {
      session,
    },
  }
}
