import Meta from './Meta'
import Navbar from './Navegation/Navbar'
import Sidebar from './Navegation/Sidebar'

export default function Layout({ children }) {
    return (
        <>
            <Meta />
            <Navbar />
            <div 
                className="flex mt-14"
                style={{minHeight: "calc(100vh - 3.5rem)"}}
            >
                <Sidebar />
                <main className="px-10 py-6">
                    {children}
                </main>
            </div>
        </>
    )
}