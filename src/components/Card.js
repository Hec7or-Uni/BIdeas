export default function Card() {
    return (
        <div className="flex flex-col items-center h-80 w-64 rounded-xl bg-blue-500 p-4 text-white">
            <div className="h-36 w-36 mt-4 bg-purple-500">
                img
            </div>
            <div className="my-auto">
                <p className="mt-4 font-bold text-xl text-center capitalize">
                    create a team
                </p>
                <p className="mt-0.5 text-base text-center">
                    Do you want to create a team?
                    Create yours here!
                </p>
            </div>
        </div>
    )
}