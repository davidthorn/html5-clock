
export class Clock implements HTMLClock {

    time: HTMLClockTime

    constructor(time: HTMLClockTime) {
        this.time = time
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