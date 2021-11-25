import Link from "next/link"
import { useSidebar } from "../../context/SideBarContext"

export default function NewButton({ url, icon, text, current }) {
  const [isToggle, ToggleSidebar] = useSidebar()
  return (
    <Link href={url}>
      <a
        className={`flex items-center h-9 w-full px-2.5 py-2.5 rounded hover:bg-color-light-neutral-2 dark:hover:bg-color-neutral-3 relative
        ${current ? "bg-color-light-neutral-2 dark:bg-color-neutral-3" : ""}`}
        onClick={() => ToggleSidebar(false)}
      >
        <div className="w-5 h-5">{icon}</div>
        {!isToggle && (
          <p className="ml-1.5 max-w-40 text-base font-medium text-left text-black dark:text-white capitalize truncate overflow-clip overflow-hidden tracking-tight">
            {text}
          </p>
        )}
      </a>
    </Link>
  )
}
