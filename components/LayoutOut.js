import Meta from "./Meta"
import NavbarOut from "./Navegation/NavbarOut"
export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <NavbarOut />
      <main className="container mx-auto">{children}</main>
    </>
  )
}
