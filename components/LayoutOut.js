import Meta from "./Meta"
import NavbarOut from "./Navegation/NavbarOut"

export default function Layout({ children }) {
  const { session } = children.props
  return (
    <>
      <Meta />
      <NavbarOut session={session} />
      <main className="container mx-auto">{children}</main>
    </>
  )
}
