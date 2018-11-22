interface Window {
    clock: any
    david: David
}

interface Date {
    asHTMLClockTime: () => HTMLClockTime
}

interface David {
    name: string
    surname: string
}

type Seconds = number
type Minutes = number
type Hours = number
type DayName = string
type MonthName = string
type YearShort = string
type YearLong = string

type HTMLClockTime = {
    seconds: Seconds
    minutes: Minutes
    hours: Hours
}

interface HTMLClock {
    time: HTMLClockTime
}

