import LayoutOut from "../components/LayoutOut"
import { getSession } from "next-auth/react"
import Stats from "../components/Cards/Stats"
import { FiAward, FiBriefcase, FiHeart } from "react-icons/fi"

export default function Root() {
  return (
    <>
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

      <div className="w-full">
        <h3 className="mt-20 text-center text-7xl font-bold  mx-auto">
        Improve 
        <br />
        your team skills
        </h3>
        <h2 className="mt-16 text-center text-xl font-medium max-w-prose mx-auto">
          Join other teams with awesome projects or create you own and carry out 
          ideas you've always wanted to see come true
          <br />
          <br />       
          Thanks to the reward and level system.
          The more projects you carry out, the more interesting you will be for other teams and companies.
        </h2>        
        <div className="flex justify-center space-x-4 mt-12">
          <div className="flex flex-wrap flex-col w-1/6 h-96 rounded-xl bg-red-300 items-center justify-center ">
            <div className="text-center text-xl font-medium max-w-prose pl-10 pr-10 pb-12 ">
              Meet new people and share you best ideas
            </div>
            <Stats
                icon={<FiHeart className="h-6 w-6 text-red-500" />}
                points="10"
                desc="20"
              />
          </div>
          <div className="flex flex-wrap flex-col w-1/6 h-96 rounded-xl bg-purple-300 items-center justify-center ">
            <div className="text-center text-xl font-medium max-w-prose pl-10 pr-10 pb-12 ">
              Gain respect from teams you work with
            </div>
            <Stats
                icon={<FiAward className="h-6 w-6 text-purple-500" />}
                points="10"
                desc="20"
              />
          </div>
          <div className="flex flex-wrap flex-col w-1/6 h-96 rounded-xl bg-blue-300 items-center justify-center ">
            <div className="text-center text-xl font-medium max-w-prose pl-10 pr-10 pb-12 ">
              Make you profile more interesting for companies
            </div>
            <Stats
                icon={<FiBriefcase className="h-6 w-6 text-blue-500" />}
                points="10"
                desc="20"
              />
          </div> 
        </div>
      </div>
    </>
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
