import { useState } from "react"

const data = [
    {
        id: 1,
        name: "profile"
    }, {
        id: 2,
        name: "profile settings"
    }
]


export default function LineMenu() {
    const [isActive, setActive] = useState(false);

    return (
        <>
            <div className="flex items-start w-full mt-8 tracking-wide">
                {data.map(item => {
                    return (
                        <button
                            key={item.id}
                            id={item.id}
                            type="button"
                            className={`flex justify-center w-44 pt-1.5 pb-3 border-b-2 border-black border-opacity-0 ${isActive ? 'border-opacity-100' : ''}`}

                        >
                            <p className="text-center text-lg font-semibold uppercase">
                                {item.name}
                            </p>
                        </button>
                    )
                })}
            </div>
            <hr className="border-black" />
        </>
    )
}