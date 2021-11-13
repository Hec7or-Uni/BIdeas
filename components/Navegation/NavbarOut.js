import Link from "next/Link"
import Boton from "../Buttons/Button.js"

export default function Navbar({ username }) {
  return (
    <div className="h-16 w-full flex items-center tracking-wide bg-gray-200 z-50">
      <div className="flex justify-center container mx-auto relative">
        <div className="absolute left-0">logo</div>
        <nav>enlaces</nav>
        <div className="flex gap-x-3 absolute right-0">
          <Boton 
            url={"/login"}
            text={"Sign in"}
          />
          <Boton 
            url={"/invite"}
            text={"Join now"}
          />
        </div>
      </div>
    </div>
  )
}

Navbar.defaultProps = {
  username: "Hec7orci7o",
}
