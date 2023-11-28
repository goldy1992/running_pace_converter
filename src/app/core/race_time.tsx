import { IRaceDistance, RaceType } from "./constants"

export interface RaceTime {
    h: number
    m: number,
    s: number
    raceType: IRaceDistance
}

export type RaceTimes = Array<RaceTime>
