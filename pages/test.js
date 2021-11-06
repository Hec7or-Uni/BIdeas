import NewLayout from "../components/NewLayout"

export default function Test() {
  return <>test</>
}

Test.getLayout = function getLayout(page) {
  return <NewLayout>{page}</NewLayout>
}
