'use client'
import { useEffect, useState } from "react";
import { JSX } from "react/jsx-runtime";
import DarkModeButton from "./components/dark_mode_button";
import { HALF_MARATHON, MARATHON, SECONDS_IN_HOUR, SECONDS_IN_MINUTE, conversionConst } from "./core/constants";
import { RaceTime } from "./core/race_time";
import { convertSpeed, finishTimeMinKm, generateRaceTimes } from "./core/calculations";
import { CircularThaiFlag, CircularBritishFlag, TickIcon } from "./components/icons/icons";
import LanguageButton from "./components/language_selected_button";
import th from './locales/th.json'
import en from './locales/en.json'


export default function PageContent() : JSX.Element {

    const [locale, setLocale] = useState(en)

    // input
    const [inputHours, setInputHours] = useState(0)
    const [inputMinutes, setInputMinutes] = useState(0)
    const [inputSeconds, setInputSeconds] = useState(0)
    const [isKm, setIsKm] = useState(true)
    // output

    const [raceTimes, setRaceTimes] = useState<Array<RaceTime>>([])

    const [outputHours, setOutputHours] = useState(0)
    const [outputMinutes, setOutputMinutes] = useState(0)
    const [outputSeconds, setOutputSeconds] = useState(0)

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
        let generatedRaceTimes = generateRaceTimes(totalSecPerKm)
        setRaceTimes(generatedRaceTimes)
        
        let [h, m, s] = convertSpeed(inputHours, inputMinutes, inputSeconds, isKm)
        setOutputHours(h)
        setOutputMinutes(m)
        setOutputSeconds(s)
        
    }

    useEffect(() => {
        update()
    }, [inputHours, inputMinutes, inputSeconds, isKm])

    const raceTimesJsx = raceTimes.map(rt => (
        <tr>
            <td className="border-separate border-t border-slate-500"><span className="py-2 px-2">{rt.raceType.name}</span></td>
            <td className="border-separate border-t border-s border-slate-500 text-center"><span className="py-2 px-2">{rt.h}</span></td>
            <td className="border-separate border-t border-s border-slate-500 text-center"><span className="py-2 px-2">{rt.m}</span></td>
            <td className="border-separate border-t border-s border-slate-500 text-center"><span className="py-2 px-2">{rt.s}</span></td>
        </tr>
    ))

    return (
      <main> 
        <div id="home" />
        <div className="absolute top-3 end-3 flex items-center space-x-4">
            <DarkModeButton/>
            <div className="flex no-wrap items-center space-x-2">
                <div className="flex no-wrap items-center space-x-2">
                    <LanguageButton 
                        name="English" 
                        selected = {locale == en}
                        onClick={()=> setLocale(en)}
                        icon = {( <CircularBritishFlag className="w-[24px] h-[24px]" />)}
                    />
                    <LanguageButton 
                        name="ไทย" 
                        selected = {locale == th}
                        onClick={()=> setLocale(th)}
                        icon = {( <CircularThaiFlag className="w-[24px] h-[24px]" />)}
                    />  
                </div>
            </div>
        </div>
         <div className='grid grid-cols-1 sm:grid-cols-5 gap-x-6 gap-y-4 px-4 py-[70px] mb-12 text-gray-800 dark:text-gray-200'>   
            <div className="sm:col-span-3 sm:col-start-2 flex flex-col sm:gap-x-2 gap-y-3 flex-wrap border-2 border-gray-500 bg-sky-50 dark:bg-gray-900 px-6 py-10 rounded-xl">

                <span className="flex-none text-2xl font-bold leading-10">{locale.convert_running_paces}</span>
                {/* Units */}
                <div className="flex-col space-y-2 pt-2">
                    <span className="block text-m leading-6">{locale.units}</span>
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
                    <span className="flex-none text-m leading-6">{locale.input}</span>
                    <div className="flex flex-col sm:flex-row gap-y-2 sm:gap-x-2 sm:flex-wrap">
                        <div className="sm:flex-1 flex-col space-y-2">
                            <label htmlFor="hours" className="block text-xs leading-2">{locale.hours}</label>
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
                            <label htmlFor="minutes" className="block text-xs leading-2">{locale.minutes}</label>
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
                            <label htmlFor="seconds" className="block text-xs leading-2">{locale.seconds}</label>
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
               {raceTimesJsx}
                </tbody>
            </table>
 
        </div>
   
    </div>

    </main>
)}  