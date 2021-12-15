import { useRouter } from "next/router"
import ButtonP from "../Buttons/ButtonP"
import ButtonPM from "../Buttons/ButtonPM"
import ButtonS from "../Buttons/ButtonS"
import { signOut } from "next-auth/react"
import Logo from "../Logo"

export default function Navbar({ session }) {
  const router = useRouter()
  return (
    <div className="sticky top-0 h-16 w-full flex items-center tracking-wide bg-color-light-neutral-1 dark:bg-cm-color z-50">
      <div className="flex justify-center items-center container mx-auto relative">
        <Logo url={"/home"} />
        <div className="flex gap-x-3 absolute right-0 mx-4">
          {session ? (
            <ButtonP
              func={async () => {
                await signOut({ redirect: false })
                router.push("/")
              }}
              url={"/"}
              text={"sign out"}
            />
          ) : (
            <>
              <ButtonS url={"/login"} text={"log in"} />
              <ButtonPM url={"/invite"} text={"sign up"} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
