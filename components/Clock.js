import React from "react"

export default function Clock({
  timerDays,
  timerHours,
  timerMinutes,
  timerSeconds,
}) {
  return (
    <div className="w-full md:w-auto px-5">
      <div className="flex justify-center text-black dark:text-white text-center">
        <div className="w-20 md:w-24 border border-black dark:border-white bg-light-100 rounded-lg py-3 md:py-4 mx-2">
          <div className="text-2xl md:text-3xl font-semibold">
            <span>{timerDays}</span>
          </div>
          <div className="opacity-75 text-xs mt-3 uppercase">Day</div>
        </div>
        <div className="w-20 md:w-24 border border-black dark:border-white bg-light-100 rounded-lg py-3 md:py-4 mx-2">
          <div className="text-2xl md:text-3xl font-semibold">
            <span>{timerHours}</span>
          </div>
          <div className="opacity-75 text-xs mt-3 uppercase">Hour</div>
        </div>
        <div className="w-20 md:w-24 border border-black dark:border-white bg-light-100 rounded-lg py-3 md:py-4 mx-2">
          <div className="text-2xl md:text-3xl font-semibold">
            <span>{timerMinutes}</span>
          </div>
          <div className=" opacity-75 text-xs mt-3 uppercase">Min</div>
        </div>
        <div className="w-20 md:w-24 border border-black dark:border-white bg-light-100 rounded-lg py-3 md:py-4 mx-2">
          <div className="text-2xl md:text-3xl font-semibold">
            <span>{timerSeconds}</span>
          </div>
          <div className="opacity-75 text-xs mt-3 uppercase">Second</div>
        </div>
      </div>
    </div>
  )
}

Clock.defaultProps = {
  timerDays: 0,
  timerHours: 0,
  timerMinutes: 0,
  timerSeconds: 0,
}
