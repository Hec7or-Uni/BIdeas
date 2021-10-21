export default function Card() {
    return (
        <div className="flex flex-col items-center h-4/6 w-56 rounded-xl bg-blue-500 p-4 text-white" >
            <div className="flex justify-center items-center w-28 h-28 lg:h-32 lg:w-32 relative">
                {/* <div className="mt-1 w-2/4 h-2/4 lg:w-3/4 lg:h-3/4 rounded-3xl bg-red-200 absolute filter blur-sm z-10" /> */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-1/2 h-1/2 text-red-600 z-20" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
            </div>
            <div className="">
                <p className=" font-bold text-base lg:text-xl text-center capitalize">
                    ERROR
                </p>
                <p className="mt-0.5 text-sm lg:text-base text-center">
                    An error has ocurred while loading the page.
                    Try to refresh.
                </p>
            </div>
        </div>
    )
}