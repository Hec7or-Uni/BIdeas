import Link from "next/Link"

export default function Navbar({ username }) {
  return (
    <div className="h-16 w-full flex items-center tracking-wide bg-gray-200 z-50">
      <div className="flex justify-center container mx-auto relative">
        <div className="absolute left-0">logo</div>
        <nav>enlaces</nav>
        <div className="gap-x-3 absolute right-0">
          <Link href="/login">
            <a className="capitalize text-sm font-bold px-4 py-2 border-2 border-black rounded mx-3">
              Sign in
            </a>
          </Link>
          <Link href="/invite">
            <a className="capitalize text-sm font-bold px-4 py-2 border-2 border-black rounded">
              Join Now
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

Navbar.defaultProps = {
  username: "Hec7orci7o",
}
