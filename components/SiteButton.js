import Link from 'next/Link'
import { useState } from 'react';

export default function SiteButton({ icon, site, url, links }) {
    const [isActive, setActive] = useState(false);
    const testing = (links.length >= 1);

    return (
        <div className="mb-0.5">
            {testing ? (
                <>
                    <button
                        type="button"
                        onClick={() => setActive(!isActive)}
                        className="flex items-center w-full px-2 py-4 rounded-md hover:bg-gray-200 relative"
                    >
                        {icon}
                        <p className="w-40 mx-4 text-xl font-semibold text-left text-black capitalize truncate overflow-clip overflow-hidden tracking-wide">
                            {site}
                        </p>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 absolute right-0 mx-4 transition duration-500 ${isActive ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div className="flex flex-col w-full">
                        {isActive && (links.map(item => {
                            return (
                                <Link href={item.url}>
                                    <a className="px-2 py-3 rounded-md">
                                        <p className="w-40 mx-4 text-xl font-semibold text-left text-black capitalize truncate overflow-clip overflow-hidden tracking-wide">
                                            {item.name}
                                        </p>
                                    </a>
                                </Link>
                            )
                        }))}
                    </div>
                </>
            ) : (
                <Link href={url}>
                    <a className="flex items-center w-full px-2 py-4 rounded-md hover:bg-gray-200 relative">
                        {icon}
                        <p className="w-40 mx-4 text-xl font-semibold text-left text-black capitalize truncate overflow-clip overflow-hidden tracking-wide">
                            {site}
                        </p>
                    </a>
                </Link>
            )}
        </div>
    )
}