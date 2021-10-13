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
            <div className="flex relative">
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

            <LineMenu data={data} />
        </>
    )
}
