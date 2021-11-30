import FAQ from "components/FAQ"
import LayoutOut from "../components/LayoutOut"

export default function faq() {
  return (
    <div className="container px-16 py-8 min-h-screen -mt-16">
      <div className="mx-auto flex flex-wrap items-center justify-center w-1/2 pb-10 mt-24">
        <h2 className="px-2 py-2 font-bold text-2xl capitalize mb-8 dark:text-gray-100">
          frequently asked questions
        </h2>
        <FAQ
          title={"What is BIdeas?"}
          content={
            <p>
              BIdeas is a platform where people from all over the world can come
              together to create and develop their projects. In short, we are a
              platform that puts people in contact with each other.
            </p>
          }
        />
        <FAQ
          title={"Why BIdeas?"}
          content={
            <p>
              Ideas arises from the need of one of our colleagues who once
              wanted to develop an idea and in the process saw how difficult it
              was to find people as passionate as him to develop it from 0,
              that&apos;s why BIdeas tries to attract different profiles of
              people to facilitate the problem that we once had and make it
              easier for users.
            </p>
          }
        />
        <FAQ
          title={"How to create a team?"}
          content={
            <>
              <ol>1 Log in to your account.</ol>
              <ol>2 Navigate to /my-team.</ol>
              <ol>3 Click on create team.</ol>
              <ol>4 Fill in the requested information.</ol>
              <ol>5 Save the changes.</ol>
            </>
          }
        />
        <FAQ
          title={"How to join a team?"}
          content={
            <>
              <ol>1 Log in to your account.</ol>
              <ol>2 Navigate to /careers/teams.</ol>
              <ol>3 Search for the team that fits your needs.</ol>
              <ol>4 Click on apply for job.</ol>
              <ol>5 Wait to be accepted by the team leader of that team.</ol>
            </>
          }
        />
        <FAQ
          title={"How to find the best projects?"}
          content={
            <p>
              Finding the ideal project is often one of the hardest tasks, some
              people may think that points are everything, but, if you really
              want to find a team to be comfortable in, we recommend you to look
              at the people involved in each team and google them. You can tell
              a lot about a person just by what they post on their social
              networks.
            </p>
          }
        />
        <FAQ
          title={"How to report a bug?"}
          content={
            <>
              <p>
                To report any failure or bug you can contact one of the
                developers of the project, in order to do so their github
                profiles are available in the footer of the page.
              </p>
              <p>
                If you experiment any bug, please try to reload the page before
                contacting, thank you.
              </p>
            </>
          }
        />
      </div>
    </div>
  )
}

faq.getLayout = function getLayout(page) {
  return <LayoutOut>{page}</LayoutOut>
}
