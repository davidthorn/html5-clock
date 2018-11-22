interface Window {
    clock: HTMLClock
}

interface Date {
    asHTMLClockTime: () => HTMLClockTime
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
    container: HTMLElement
    canvas: HTMLCanvasElement
    time: HTMLClockTime
    frame: HTMLClockFrame
    draw(): void
    resize(): void
}

type HTMLClockPoint = {
    x: number
    y: number
}

type HTMLClockBounds = {

    top: number
     
    left: number

    bottom: number // distance from top to furthest bottom position

    right: number // distance from left to furthest right position

    /// x position of the bounding box of the clock
    x: number
    
    /// y position of the bounding box of the clock
    y: number

    /// the width of the bounding box of the clock
    /// this should not be confused with the size of the actual clock face
    /// this represents the size of the bounding box in which the clock is located
    width: number

    /// the height of the bounding box of the clock
    /// this should not be confused with the size of the actual clock face
    /// this represents the size of the bounding box in which the clock is located
    height: number
}

type HTMLClockFrame = {

    /// The bounding box which the clock itself is located in
    bounds: HTMLClockBounds

    radius: number

    /// Is the center point of the clock in relation to the clock itself
    /// this is not the center point of the whole frame of the clock
    /// just the position in which the hands will be placed and from where
    /// the radius is calculated
    center: HTMLClockPoint
    
}
