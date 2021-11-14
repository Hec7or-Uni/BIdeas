import Meta from "./Meta"
import NavbarOut from "./Navegation/NavbarOut"
import Footer from "./Navegation/Footer"

export default function Layout({ children }) {
  const { session } = children.props
  return (
    <>
      <Meta />
      <NavbarOut session={session} />
      <main className="container mx-auto">{children}</main>
      <Footer/>
    </>
  )
}
