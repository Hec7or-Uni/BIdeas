import LineMenu from "../components/Navegation/LineMenu";

const data = [
    {
        id: 1,
        name: "overview"
    }, {
        id: 2,
        name: "recommended"
    }, {
        id: 3,
        name: "in progress"
    }
]

export default function Home() {
    return (
        <>
            {/* Cabecera */}
            <div className="flex relative mb-4">
                <div className="flex w-1/2 tracking-wide">
                    <div className="flex flex-col w-1/2 text-left">
                        <p className="text-sm font-medium uppercase">
                            announcement
                        </p>
                        <p className="text-lg font-bold">
                            EUROAVIA Mission
                        </p>
                    </div>
                    <div className="flex flex-col w-1/2 text-left">
                        <p className="text-sm font-medium uppercase">
                            changelog
                        </p>
                        <p className="text-lg font-bold capitalize">
                            version 0.1
                        </p>
                    </div>
                </div>
                <div className="flex flex-col w-1/2 text-right absolute right-0">
                    <p className="text-sm font-medium uppercase">
                        users
                    </p>
                    <p className="text-lg font-bold capitalize">
                        555 users online
                    </p>
                </div>
            </div>

            {/* Anuncio & estadisticas */}
            <div className="flex justify-between mb-12">
                <div
                    className="h-80 rounded-xl"
                    style={{ width: 'calc(50% - 1rem)' }}
                >
                    <img src="/anuncios/anuncio2.jpg" className="w-full h-full object-cover object-center rounded-xl" />
                </div>
                <div
                    className="flex h-80 rounded-xl gap-0.5"
                    style={{ width: 'calc(50% - 1rem)' }}
                >
                    {/* Tarjeta izquierda */}
                    <div
                        className="h-full rounded-tl-xl rounded-bl-xl p-4 bg-gray-200 tracking-wide relative"
                        style={{ width: '55%' }}
                    >
                        {/* Parte superior */}
                        <div className="flex items-center">
                            <div className="h-28 w-28 bg-red-500">
                                img
                            </div>
                            <div className="flex flex-col ml-5">
                                <p className="text-base font-bold capitalize">
                                    entrepreneur
                                </p>
                                <hr className="h-1 w-3/4 my-1.5 bg-gray-700 rounded-full" />
                                <p className="text-sm font-semibold">
                                    0% towards your own boss
                                </p>
                            </div>
                        </div>
                        {/* Histoial */}
                        {/* Rank */}
                        <div className="flex items-center absolute bottom-0 mb-10">
                            <p className="text-lg font-medium capitalize">
                                rank up - 0
                            </p>
                            <div className="flex  items-center h-7 w-7 ml-3 rounded-full relative">
                                <div className="w-full h-full rounded-full bg-green-200 absolute filter blur-sm" />
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto rotate-180 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    {/* Tarjeta derecha */}
                    <div
                        className="flex flex-col h-full gap-0.5"
                        style={{ width: '45%' }}
                    >
                        {/* Tarjeta superior derecha */}
                        <div
                            className="h-2/3 rounded-tr-xl p-4 bg-gray-200"
                            style={{ height: '60%' }}
                        >
                            <p className="text-base font-semibold">
                                Hec7orci7o
                            </p>
                        </div>
                        {/* Tarjeta inferior derecha */}
                        <div
                            className="flex justify-between items-center h-1/3 rounded-br-xl p-4 uppercase bg-gray-200"
                            style={{ height: '40%' }}
                        >
                            <div className="flex flex-col">
                                <p className="text-sm font-medium">
                                    plan
                                </p>
                                <p className="text-xl font-bold capitalize">
                                    free
                                </p>
                            </div>
                            <p className="text-xl font-bold">
                                go vip
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Selector */}
            <LineMenu data={data} />
        </>
    )
}
