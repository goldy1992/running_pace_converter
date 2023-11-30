export const conversionConst = 1.60934460
export const ONE_KM = 1
export const ONE_MILE = 1.609344
export const TWO_KM = 2
export const FIVE_KM = 5
export const TEN_KM = 10
export const FIFTEEN_KM = 15
export const TEN_MILE = 16.09
export const HALF_MARATHON = 21.1
export const MARATHON = 42.2

export const SECONDS_IN_HOUR = 60 * 60
export const SECONDS_IN_MINUTE = 60

export enum RaceType {
    KM_1,
    MILE_1,
    KM_2,
    KM_5,
    KM_10,
    KM_15,
    MILE_10,
    HALF_MARATHON,
    MARATHON
}

export interface IRaceDistance {
    type: RaceType,
   // name: string,
    dist: number
}

export const distances : Array<IRaceDistance> = [
    { "type": RaceType.KM_2, "dist": TWO_KM},
    { "type": RaceType.KM_5, "dist": FIVE_KM},
    { "type": RaceType.KM_10, "dist": TEN_KM},
    { "type": RaceType.KM_15, "dist": FIFTEEN_KM},
    { "type": RaceType.MILE_10, "dist": TEN_MILE},
    { "type": RaceType.HALF_MARATHON, "dist": HALF_MARATHON},
    { "type": RaceType.MARATHON, "dist": MARATHON},
]