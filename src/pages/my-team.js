import Header from "components/Header"
import LineMenu from "components/Navegation/LineMenu"
import { useLMenu } from "../context/LMenuContext"

const data = [
  {
    id: 1,
    name: "team",
  },
  {
    id: 2,
    name: "team settings",
  },
]

export default function Team() {
  const [isActive] = useLMenu()
  return (
    <div className="">
      <Header />
      <LineMenu data={data} />
      {isActive === 1 && <div>1</div>}
      {isActive === 2 && <div>2</div>}
    </div>
  )
}
