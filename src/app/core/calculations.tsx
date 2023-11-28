import * as constants from "./constants"
import { RaceTime } from "./race_time"

export function convertSpeed(
    hours : number, 
    minutes: number, 
    seconds: number, 
    isKm: boolean) {
    let totalSecs = (hours * 60 * 60) + (minutes * 60) + seconds
    let modifier = isKm ? (totalSecs * constants.conversionConst) : (totalSecs / constants.conversionConst)
    let outputHours = Math.trunc(modifier / (60 * 60))
    modifier -= (outputHours * 60 * 60)
    let outputMins = (minutes > 0 ) ? Math.trunc(modifier / 60) : 0
    let ouputSecs = Math.ceil(modifier) % 60
    return [outputHours, outputMins, ouputSecs]
}

export function finishTimeMinKm(
        secondsPerKm: number,
        raceDistance: constants.IRaceDistance) : RaceTime {
    console.log("hit finishTimeMinKm")
    let totalSecs = Math.trunc(secondsPerKm * raceDistance.dist)
    let hours = Math.trunc(totalSecs / (constants.SECONDS_IN_HOUR))
    totalSecs -= (hours * constants.SECONDS_IN_HOUR)
    let mins = Math.trunc(totalSecs / constants.SECONDS_IN_MINUTE)
    let seconds = totalSecs - (mins * constants.SECONDS_IN_MINUTE)
    return {
        "h": hours,
        "m": mins,
        "s": seconds,
        "raceType": raceDistance,

    }
}

export function generateRaceTimes(
    totalSeconds: number, 
) : Array<RaceTime> {
    let toReturn : Array<RaceTime> = []
    constants.distances.forEach((d) => {
        let raceTime : RaceTime = finishTimeMinKm(totalSeconds, d)
        toReturn.push(raceTime)
    })
    return toReturn
}
