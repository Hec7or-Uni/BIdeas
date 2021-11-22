import Meta from "./Meta"
import NavbarOut from "./Navegation/NavbarOut"
import Footer from "./Navegation/Footer"

export default function Layout({ children }) {
  const { session } = children.props
  return (
    <>
      <div className="dark:bg-gradient-to-t dark:from-cm-color dark:via-cm-color dark:to-cm-color2">
        <Meta />
        <NavbarOut session={session} />

        <main className="container mx-auto ">{children}</main>
        <Footer />
      </div>
    </>
  )
}
