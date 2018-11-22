
export class Clock implements HTMLClock {

    time: HTMLClockTime

    frame: HTMLClockFrame

    constructor(time: HTMLClockTime, frame: HTMLClockFrame) {
        this.time = time
        this.frame = frame
    }

} 

Date.prototype.asHTMLClockTime = (): HTMLClockTime => {
    let date = new Date();
    return {
            seconds : date.getSeconds() , 
            minutes: date.getMinutes() , 
            hours: date.getHours() 
        }
}
