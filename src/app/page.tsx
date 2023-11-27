'use client'
import { useEffect, useState } from "react";
import { JSX } from "react/jsx-runtime";
import DarkModeButton from "./components/dark_mode_button";

const conversionConst = 1.609344
const ONE_KM = 1
const ONE_MILE = 1.609344
const TWO_KM = 5
const FIVE_KM = 5
const TEN_KM = 10
const FIFTEEN_KM = 15
const TEN_MILE = 16.09
const HALF_MARATHON = 21.1
const MARATHON = 42.2

const SECONDS_IN_HOUR = 60 * 60
const SECONDS_IN_MINUTE = 60

interface RaceTime {
    h: number
    m: number,
    s: number
    dist: number
}

const defaultRaceTime : (dist: number) => RaceTime = (dist: number) => {
    return {
        "h": 0,
        "m": 0,
        "s": 0,
        "dist": dist
    }
}

function convertSpeed(
    hours : number, 
    minutes: number, 
    seconds: number, 
    isKm: boolean) {
    let totalSecs = (hours * 60 * 60) + (minutes * 60) + seconds
    let modifier = isKm ? (totalSecs * conversionConst) : (totalSecs / conversionConst)
    let outputHours = Math.trunc(modifier / (60 * 60))
    modifier -= (outputHours * 60 * 60)
    let outputMins = (minutes > 0 ) ? Math.trunc(modifier / 60) : 0
    let ouputSecs = Math.ceil(modifier) % 60
    return [outputHours, outputMins, ouputSecs]
}

function finishTimeMinKm(
        secondsPerKm: number,
        distance: number) {
    let totalSecs = Math.trunc(secondsPerKm * distance)
    let hours = Math.trunc(totalSecs / (SECONDS_IN_HOUR))
    totalSecs -= (hours * SECONDS_IN_HOUR)
    let mins = Math.trunc(totalSecs / SECONDS_IN_MINUTE)
    let seconds = totalSecs - (mins * SECONDS_IN_MINUTE)
    return [hours, mins, seconds]
}



export default function PageContent() : JSX.Element {

    // input
    const [inputHours, setInputHours] = useState(0)
    const [inputMinutes, setInputMinutes] = useState(0)
    const [inputSeconds, setInputSeconds] = useState(0)
    const [isKm, setIsKm] = useState(true)
    // output
    const [outputHours, setOutputHours] = useState(0)
    const [outputMinutes, setOutputMinutes] = useState(0)
    const [outputSeconds, setOutputSeconds] = useState(0)

    const [km1Time, setKm1ime] = useState(defaultRaceTime(HALF_MARATHON))
    const [km5Time, setKm5Time] = useState(defaultRaceTime(FIVE_KM))
    const [km10Time, setKm10Time] = useState(defaultRaceTime(TEN_KM))
    const [km15Time, setKm15Time] = useState(defaultRaceTime(FIFTEEN_KM))
    const [mile10Time, setMile10Time] = useState(defaultRaceTime(TEN_MILE))
    const [hMarathonTime, setHMarathonTime] = useState(defaultRaceTime(HALF_MARATHON))
    const [marathonTime, setMarathonTime] = useState(defaultRaceTime(MARATHON))

    const update = () => {
        let totalSecPerKm, totalSecPerMile
        if (isKm) {
            totalSecPerKm = (inputHours * SECONDS_IN_HOUR) 
                            + (inputMinutes * SECONDS_IN_MINUTE) 
                            + inputSeconds
            totalSecPerMile = totalSecPerKm * conversionConst
        } else {
            totalSecPerMile = (inputHours * SECONDS_IN_HOUR) 
                            + (inputMinutes * SECONDS_IN_MINUTE) 
                            + inputSeconds
            totalSecPerKm = totalSecPerMile / conversionConst
        }
        let [h, m, s] = convertSpeed(inputHours, inputMinutes, inputSeconds, isKm)
        setOutputHours(h)
        setOutputMinutes(m)
        setOutputSeconds(s)
        
        let [hMarathonH, hMarathonM, hMarathonS] = finishTimeMinKm(totalSecPerKm, HALF_MARATHON)
        setHMarathonTime({
            "h": hMarathonH,
            "m": hMarathonM,
            "s": hMarathonS,
            "dist": HALF_MARATHON
        })

        let [marathonH, marathonM, marathonS] = finishTimeMinKm(totalSecPerKm, MARATHON)
        setMarathonTime({
            "h": marathonH,
            "m": marathonM,
            "s": marathonS,
            "dist": MARATHON
        })
    }

    useEffect(() => {
        update()
    }, [inputHours, inputMinutes, inputSeconds, isKm])

    return (
      <main> 
        <div id="home" />
        <div className="absolute top-3 end-3">
            <DarkModeButton/>
        </div>
         <div className='grid grid-cols-1 sm:grid-cols-5 gap-x-6 gap-y-4 px-4 py-12 mb-12 text-gray-800 dark:text-gray-200'>   
            <div className="sm:col-span-3 sm:col-start-2 flex flex-col sm:gap-x-2 gap-y-3 flex-wrap border-2 border-gray-500 bg-sky-50 dark:bg-gray-900 px-6 py-10 rounded-xl">

                <span className="flex-none text-2xl font-bold leading-10">Convert Running Paces</span>
                {/* Units */}
                <div className="flex-col space-y-2 pt-2">
                    <span className="block text-m leading-6">Units</span>
                    <div className="sm:flex sm:gap-x-2 sm:flex-wrap">
                        <div className="sm:flex-none flex items-center gap-x-3">
                            <input type="radio" id="minPerKm" checked={isKm} onChange={() => setIsKm(true) }
                            className="default:bg-neutral-200 dark:default:bg-neutral-800" />
                            <label htmlFor="minPerKm" className="pr-2 text-sm">min/km</label>
                        </div>
                        <div className="sm:flex-none flex items-center gap-x-3">
                            <input type="radio" id="minPerMile" checked={!isKm} onChange={() => setIsKm(false) }/>
                            <label className="text-sm" htmlFor="minPerMile">min/mile</label>
                        </div>
                    </div>
                </div>

                { /* Input */}
                <div className="flex-col space-y-2 py-2">
                    <span className="flex-none text-m leading-6">Input</span>
                    <div className="flex flex-col sm:flex-row gap-y-2 sm:gap-x-2 sm:flex-wrap">
                        <div className="sm:flex-1 flex-col space-y-2">
                            <label htmlFor="hours" className="block text-xs leading-2">Hours</label>
                            <input type="text" inputMode="numeric" id="hours" placeholder="0"
                            className="pl-2 py-2 border-0 appearance-none rounded-md sm:leading-6 ring-1 focus:ring-inset text-sm bg-sky-100 dark:bg-sky-900"
                            onChange={(hrs : any) => {
                                let number = Number(hrs.currentTarget.value)
                                if (!isNaN(number)) {
                                    setInputHours(number)
                                }
                            }}/>
                        </div>        
                        <div className="sm:flex-1 flex-col space-y-2">
                            <label htmlFor="minutes" className="block text-xs leading-2">Minutes</label>
                            <input type="text" id="minutes" placeholder="0" 
                            className="pl-2 py-2 border-0 rounded-md sm:leading-6 ring-1 focus:ring-inset text-sm bg-sky-100 dark:bg-sky-900"
                            onChange={(mins) => {
                                let number = Number(mins.currentTarget.value)
                                if (!isNaN(number)) {
                                    setInputMinutes(number)
                                }
                            }}/>
                        </div>
                        <div className="sm:flex-1 flex-col space-y-2">
                            <label htmlFor="seconds" className="block text-xs leading-2">Seconds</label>
                            <input type="text" id="seconds" placeholder="0" 
                            className="pl-2 py-2 border-0 rounded-md sm:leading-6 ring-1 focus:ring-inset text-sm bg-sky-100 dark:bg-sky-900"
                            onChange={(secs : any) => {
                                let number = Number(secs.currentTarget.value)
                                if (!isNaN(number)) {
                                    setInputSeconds(number)
                                }
                            }}/>
                        </div>
                    </div>
                </div>
       

       
        <div className="my-5 w-full h-[1px] bg-gray-500" />
        <div className="flex-none flex-col space-y-1">
            <p className="block text-l leading-6">Pace in <span className="font-bold">{isKm ? "min/mile" : "min/km"}</span></p>
            <span className="block text-s leading-6 font-bold">{outputHours + "h " + outputMinutes + "m " + outputSeconds + "s"} </span>
        </div>



            <table className="table-auto border-separate border border-slate-500 border-spacing-0 w-full rounded">
            <caption className="caption-top py-1 text-xs">
                    Summary of race distance times running at this pace.
                </caption>
                <thead>
     
                    <tr className="">
                        <th rowSpan={2}className="px-2 py-2">Race Distance</th>
                        <th colSpan={3}className="border-s border-slate-500 px-2 py-2">Time</th>
                    </tr>
                    <tr>
                        <th className="border-separate border-t border-s border-slate-500">h</th>
                        <th className="border-separate border-t border-s border-slate-500">m</th>
                        <th className="border-separate border-t border-s border-slate-500">s</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="border-separate border-t border-slate-500"><span className="py-2 px-2">Half Marathon</span></td>
                    <td className="border-separate border-t border-s border-slate-500 text-center"><span className="py-2 px-2">{hMarathonTime.h}</span></td>
                    <td className="border-separate border-t border-s border-slate-500 text-center"><span className="py-2 px-2">{hMarathonTime.m}</span></td>
                    <td className="border-separate border-t border-s border-slate-500 text-center"><span className="py-2 px-2">{hMarathonTime.s}</span></td>
                </tr>
                <tr>
                <td className="border-separate border-t border-slate-500"><span className="py-2 px-2">Marathon</span></td>
                    <td className="border-separate border-t border-s border-slate-500 text-center"><span className="py-2 px-2">{marathonTime.h}</span></td>
                    <td className="border-separate border-t border-s border-slate-500 text-center"><span className="py-2 px-2">{marathonTime.m}</span></td>
                    <td className="border-separate border-t border-s border-slate-500 text-center"><span className="py-2 px-2">{marathonTime.s}</span></td>

                </tr>
                </tbody>
            </table>
 
        </div>
   
    </div>

    </main>
)}  