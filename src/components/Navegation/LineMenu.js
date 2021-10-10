import { useState } from "react"

export default function LineMenu({ data }) {
    const [isActive, setActive] = useState(false);

    return (
        <>
            <div className="flex items-start w-full mt-8 tracking-wide">
                {data.map(item => {
                    return (<input
                            key={item.id}
                            id={item.id}
                            name={item.id}
                            type="button"
                            value={item.name}
                            onClick={e => setActive(item.id)}
                            className={`flex justify-center w-44 pt-1.5 pb-3 border-b-2 border-black border-opacity-0 text-center text-base font-semibold uppercase ${isActive === item.id ? 'border-opacity-100' : ''} bg-white`}
                        />
                    )
                })}
            </div>
            <hr className="border-black" />
        </>
    )
}