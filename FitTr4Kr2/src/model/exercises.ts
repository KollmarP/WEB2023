export interface Exercise {
    id: number,
    name: string,
    type: "resitence" | "aerobic",
    calBurn: number,
    perPound: number,
    baseWeight: number,
    perTimeIntervalMins: number,
}