'use client'
import { useEffect, useState } from "react";
import { JSX } from "react/jsx-runtime";
import DarkModeButton from "./components/dark_mode_button";
import { HALF_MARATHON, IRaceDistance, MARATHON, RaceType, SECONDS_IN_HOUR, SECONDS_IN_MINUTE, conversionConst } from "./core/constants";
import { RaceTime } from "./core/race_time";
import { convertSpeed, finishTimeMinKm, generateRaceTimes } from "./core/calculations";
import { CircularThaiFlag, CircularBritishFlag, TickIcon } from "./components/icons/icons";
import LanguageButton from "./components/language_selected_button";
import th from './locales/th.json'
import en from './locales/en.json'
import ILocale from "./locales/ilocale";
import TextInput from "./components/text_input";
import RadioButtonInput from "./components/radio_button_input";
import LanguageIconButton from "./components/language_icon_button";

function formatNumberString(num: number) : String {
    if (num <= 9) {
        return "0" + num
    }

    return num.toString()
}

function getRaceName(locale : ILocale, raceDistance: RaceType) : String {
    switch(raceDistance) {
        case RaceType.KM_2:
            return locale.km_2
        case RaceType.KM_5:
            return locale.km_5
        case RaceType.KM_10:
            return locale.km_10
        case RaceType.KM_15:
            return locale.km_15
        case RaceType.MILE_10:
            return locale.miles_10
        case RaceType.HALF_MARATHON:
            return locale.half_marathon
        case RaceType.MARATHON:
            return locale.marathon
        default:
            return locale.km_2
    }
}

export default function PageContent() : JSX.Element {

    const [locale, setLocale] = useState<ILocale>(en)

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

    const raceTimesJsx = raceTimes.map((rt: RaceTime) => (
        <tr key={rt.raceDistance.type}>
            <td className="border-separate border-t border-neutral-500"><span className="py-2 px-2">{getRaceName(locale, rt.raceDistance.type)}</span></td>
            <td className="border-separate border-t border-s border-neutral-500 text-center"><span className="py-2 px-2">{rt.h}</span></td>
            <td className="border-separate border-t border-s border-neutral-500 text-center"><span className="py-2 px-2">{rt.m}</span></td>
            <td className="border-separate border-t border-s border-neutral-500 text-center"><span className="py-2 px-2">{rt.s}</span></td>
        </tr>
    ))

    return (
      <main> 
        <div id="home" />
        <div className="absolute top-3 end-3 flex items-center space-x-4">
            <DarkModeButton/>
            <div className="flex no-wrap items-center space-x-2">
                <div className="flex no-wrap items-center space-x-2">
                    <LanguageIconButton src="./gb_circle.svg" 
                        selected = {locale == en}
                        onSelected={()=> setLocale(en)} />
                    <LanguageIconButton src="./th_circle.svg" 
                        selected = {locale == th}
                        onSelected={()=> setLocale(th)} />
                </div>
            </div>
        </div>
         <div className='grid grid-cols-1 sm:grid-cols-5 gap-x-6 gap-y-4 px-4 py-[70px] mb-12 text-gray-800 dark:text-gray-200'>   
            <div className="sm:col-span-3 sm:col-start-2 flex flex-col sm:gap-x-2 gap-y-3 flex-wrap border border-gray-600 dark:border-gray-300 bg-neutral-200 dark:bg-neutral-800 px-6 py-10 rounded-xl">

                <span className="flex-none text-2xl font-bold leading-10">{locale.convert_running_paces}</span>
                {/* Units */}
                <div className="flex-col space-y-2 pt-2">
                    <span className="block text-m leading-6">{locale.units}</span>
                    <div className="sm:flex sm:gap-x-2 sm:flex-wrap">
                        <RadioButtonInput label="min/km" isChecked={isKm} onChange={() => setIsKm(true) }/>
                        <RadioButtonInput label="min/mile" isChecked={!isKm} onChange={() => setIsKm(false) }/>
                    </div>
                </div>

                { /* Input */}
                <div className="flex-col space-y-2 py-2">
                    <span className="flex-none text-m leading-6">{locale.input}</span>
                    <div className="flex flex-col sm:flex-row gap-y-2 sm:gap-x-2 sm:flex-wrap">
                    <TextInput label="hours"                            
                        onChange={(hrs : any) => {
                            let number = Number(hrs.currentTarget.value)
                            if (!isNaN(number)) {
                                setInputHours(number)
                            }
                        }}
                    />
                          
                    <TextInput label="minutes"
                        onChange={(mins) => {
                            let number = Number(mins.currentTarget.value)
                            if (!isNaN(number)) {
                                setInputMinutes(number)
                            }
                        }}
                    />
                      
                    <TextInput label="seconds"                           
                        onChange={(secs : any) => {
                            let number = Number(secs.currentTarget.value)
                            if (!isNaN(number)) {
                                setInputSeconds(number)
                            }
                        }}
                    />

                    </div>
                </div>
       

       
        <div className="my-5 w-full h-[1px] bg-neutral-600 dark:bg-neutral-400" />
        <div className="flex-none flex-col space-y-1">
            <p className="block text-l leading-6">{locale.pace + (locale == en ? " ": "") + locale.using_units + " "} <span className="font-bold">{isKm ? locale.unit_min_mile : locale.unit_min_km}</span></p>
            {/* <span className="block text-s leading-6 font-bold">{outputHours + " " + locale.hours_abbr + " " + outputMinutes + " " + locale.minutes_abbr + " " + outputSeconds + " " + locale.seconds_abbr} </span> */}
            <span className="text-s leading-6 font-bold">{formatNumberString(outputHours) + ":" + formatNumberString(outputMinutes) + ":" + formatNumberString(outputSeconds)}</span>
       <span className="text-sm leading-6">{ "  (" + locale.hours_abbr + " : " + locale.minutes_abbr + " : " + locale.seconds_abbr + ")"} </span> 

        </div>



            <table className="table-auto border-separate border border-neutral-500 border-spacing-0 w-full rounded">
            <caption className="caption-top py-2 text-xs">
                   {locale.race_table_description}
                </caption>
                <thead>
     
                    <tr className="">
                        <th rowSpan={2}className="px-2 py-2">{locale.race_distances}</th>
                        <th colSpan={3}className="border-s border-neutral-500 px-2 py-2">{locale.time}</th>
                    </tr>
                    <tr>
                        <th className="border-separate border-t border-s border-neutral-500">{locale.hours_abbr}</th>
                        <th className="border-separate border-t border-s border-neutral-500">{locale.minutes_abbr}</th>
                        <th className="border-separate border-t border-s border-neutral-500">{locale.seconds_abbr}</th>
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