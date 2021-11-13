import Button from "../Buttons/Button.js"
import { signOut } from "next-auth/react"

export default function Navbar({ session }) {
  return (
    <div className="h-16 w-full flex items-center tracking-wide bg-gray-200 z-50">
      <div className="flex justify-center container mx-auto relative">
        <div className="absolute left-0 mx-4">logo</div>
        <nav>enlaces</nav>
        <div className="flex gap-x-3 absolute right-0 mx-4">
          {session ? (
            <Button func={() => signOut()} url={"/"} text={"sign out"} />
          ) : (
            <>
              <Button url={"/login"} text={"sign in"} />
              <Button url={"/invite"} text={"join now"} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
