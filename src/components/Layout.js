import Meta from './Meta'
import Navbar from './Navegation/Navbar'
import Sidebar from './Navegation/Sidebar'

import { sideBar } from '../context/sideBar'

export default function Layout({ children }) {
    return (
        <>
            <Meta />
            <div className="flex h-screen">
                <Sidebar />
                <div className="w-full">
                    <Navbar />
                    <main className="w-full px-10 py-6">
                        {children}
                    </main>
                </div>
            </div>

        </>
    )
}