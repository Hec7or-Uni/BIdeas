import FAQ from "components/FAQ"
import LayoutOut from "../components/LayoutOut"

export default function faq() {
  return (
    <div className="container px-16 py-8 ">
      <div className="mx-auto flex flex-wrap items-center justify-center w-1/2 pb-10">
        <h2 className="px-2 py-2 font-bold text-2xl capitalize mb-4">
          frequently asked questions
        </h2>
        <FAQ
          title={"Lorem ipsum dolor sit amet, consectetur adipiscing elit?"}
          content={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet venenatis urna cursus. Eleifend quam adipiscing vitae proin. Scelerisque varius morbi enim nunc faucibus a pellentesque. Condimentum vitae sapien pellentesque habitant morbi tristique senectus. Tortor at risus viverra adipiscing at in tellus integer feugiat. Et odio pellentesque diam volutpat commodo sed egestas."
          }
        />
        <FAQ
          title={"Lorem ipsum dolor sit amet, consectetur adipiscing elit?"}
          content={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet venenatis urna cursus. Eleifend quam adipiscing vitae proin. Scelerisque varius morbi enim nunc faucibus a pellentesque. Condimentum vitae sapien pellentesque habitant morbi tristique senectus. Tortor at risus viverra adipiscing at in tellus integer feugiat. Et odio pellentesque diam volutpat commodo sed egestas."
          }
        />
        <FAQ
          title={"Lorem ipsum dolor sit amet, consectetur adipiscing elit?"}
          content={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet venenatis urna cursus. Eleifend quam adipiscing vitae proin. Scelerisque varius morbi enim nunc faucibus a pellentesque. Condimentum vitae sapien pellentesque habitant morbi tristique senectus. Tortor at risus viverra adipiscing at in tellus integer feugiat. Et odio pellentesque diam volutpat commodo sed egestas."
          }
        />
      </div>
    </div>
  )
}

faq.getLayout = function getLayout(page) {
  return <LayoutOut>{page}</LayoutOut>
}
