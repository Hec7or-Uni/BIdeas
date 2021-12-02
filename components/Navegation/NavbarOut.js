import ButtonP from "../Buttons/ButtonP"
import ButtonS from "../Buttons/ButtonS"
import { signOut } from "next-auth/react"
import Logo from "../Logo"

export default function Navbar({ session }) {
  return (
    <div className="sticky top-0 h-16 w-full flex items-center tracking-wide bg-color-light-neutral-1 dark:bg-cm-color z-50">
      <div className="flex justify-center items-center container mx-auto relative">
        <Logo url={"/home"} />
        <div className="flex gap-x-3 absolute right-0 mx-4">
          {session ? (
            <ButtonP func={() => signOut()} url={"/"} text={"sign out"} />
          ) : (
            <>
              <ButtonS url={"/login"} text={"log in"} />
              <ButtonP url={"/invite"} text={"sign up"} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
