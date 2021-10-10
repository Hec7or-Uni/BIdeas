export default function Navbar({ username }) {
    return (
        <nav className="flex justify-between items-center h-16 bg-gray-200">
            <div className="flex items-center h-12">
                {/* Buscador */}
                <form
                    method="#"
                    onSubmit={() => console.log("Click")}
                    className="flex items-center bg-white p-2 rounded-md"
                >
                    <button
                        id="magnifier"
                        type="submit"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                    <input
                        id="search"
                        name="search"
                        type="search"
                        placeholder="Search..."
                        className="w-80 ml-2.5 outline-none text-xl font-semibold placeholder-opacity-100 placeholder-black text-black"
                    />
                </form>

                {/* Upgrade To Vip */}
                <div className="px-5 py-2 ml-8 rounded-full bg-gray-600">
                    <button
                        id="vip"
                        type="button"
                        className="uppercase text-xl font-bold text-white"
                        onClick={() => console.log("Click")}
                    >
                        upgrade to vip
                    </button>
                </div>
            </div>

            {/* Profile */}
            <div className="flex items-center h-12">
                <div className="w-12 max-h-12 rounded-full">
                    <img src="/personas/HectorToralPallas.jpg" className="w-12 max-h-12 rounded-full object-cover center" />
                </div>
                <p className="mx-2.5 text-xl font-semibold text-black">
                    {username}
                </p>
                <button
                    id="settings"
                    type="button"
                    onClick={() => console.log("Click")}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>
        </nav>
    )
}

Navbar.defaultProps = {
    username: 'Hec7orci7o'
}