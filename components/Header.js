export default function Header({ username, id, studies }) {
    return (
        <div className="flex justify-between gap-4">
            {/* Profile */}
            <div className="flex items-center">
                <div className="w-24 h-24 rounded-full relative">
                    <img src="/personas/HectorToralPallas.jpg" className="w-24 max-h-24 rounded-full object-cover center" />
                    <div className="flex w-8 h-8 mb-1 ml-1 rounded-full absolute right-0 bottom-0">
                        <img src="/banderas/spain.png" className="rounded-full object-cover center" />
                    </div>
                </div>

                <div className="ml-8">
                    <div className="flex items-end">
                        <p className="text-2xl font-bold text-black">
                            {username}
                        </p>
                        <p className="ml-2 text-xl font-semibold text-black">
                            #{id}
                        </p>
                    </div>
                    <p className="text-xl font-semibold text-gray-800">
                        {studies}
                    </p>
                </div>
            </div>

            <div className="flex gap-4">
                {/* Rank */}
                <div className="flex flex-col uppercase">
                    <p className="">
                        rank
                    </p>
                    <p className="">
                        noob
                    </p>
                </div>
                {/* Plan Type */}
                <div className="flex flex-col uppercase">
                    <p className="">
                        plan type
                    </p>
                    <p className="">
                        free
                    </p>
                    <p className="">
                        go vip
                    </p>
                </div>
            </div>
        </div>
    )
}

Header.defaultProps = {
    username: 'Hec7orci7o',
    id: 129454,
    studies: 'Engineer'
}