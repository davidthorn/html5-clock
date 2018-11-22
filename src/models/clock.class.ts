
export class Clock implements HTMLClock {

    container: HTMLElement

    ctx: CanvasRenderingContext2D

    canvas: HTMLCanvasElement

    time: HTMLClockTime

    frame: HTMLClockFrame

    constructor(container: HTMLElement, time: HTMLClockTime, frame: HTMLClockFrame) {
        this.time = time
        this.frame = frame
        this.container = container
        this.canvas = document.createElement('canvas')
        this.container.appendChild(this.canvas)
        this.canvas.setAttribute('id' , 'html5-clock') 
        this.canvas.width = frame.bounds.width
        this.canvas.height = frame.bounds.height
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D 
    }

    draw() {
        this.ctx.clearRect(0, 0, this.frame.bounds.width , this.frame.bounds.height)
        this.drawContainer()
        this.drawClockFace()
    }

    drawContainer() {
        const c = this.ctx
        c.beginPath()
        c.fillStyle = 'red'
        c.fillRect(0, 0, this.frame.bounds.width , this.frame.bounds.height)
        c.closePath()
    }

    drawClockFace() {
        
        let c = this.ctx
        let center = this.frame.center

        this.drawStrokedCircle(center.x , center.y , this.frame.radius , 'white', 'black' , 2 )
        this.drawCircle(center.x , center.y , 2, 'black')
       
    }

    drawCircle(x: number, y: number, radius: number, fillColor: string = 'black' , shouldClosePath: boolean = true) {
        let c = this.ctx
        c.beginPath()
        c.fillStyle = fillColor
        c.arc(x, y , radius , 0 , 2 * Math.PI)
        c.fill()
        if(shouldClosePath) return
        c.closePath()
    }

    drawStrokedCircle(x: number, y: number, radius: number, fillColor: string = 'black', strokeColor: string = 'black' , strokeWidth: number = 1) {
        let c = this.ctx
        this.drawCircle(x, y, radius, fillColor , false)
        c.lineWidth = strokeWidth
        c.strokeStyle = strokeColor
        c.stroke()
        c.closePath()
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
