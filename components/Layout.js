import Meta from './Meta'
import Navbar from './Navegation/Navbar'
import Sidebar from './Navegation/Sidebar'

export default function Layout({ children }) {
    return (
        <>
            <Meta />
            <Navbar />
            <div 
                className="flex mt-16"
                style={{minHeight: "calc(100vh - 4rem)"}}
            >
                <Sidebar />
                <main className="p-8">
                    {children}
                </main>
            </div>
        </>
    )
}