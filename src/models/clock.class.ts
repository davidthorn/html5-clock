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
        let date = new Date()
        this.time = date.asHTMLClockTime()
        this.ctx.clearRect(0, 0, this.frame.bounds.width , this.frame.bounds.height)
        this.drawContainer()
        this.drawClockFace()

        let handSize = this.frame.bounds.width / 100

        for(let tick = 0; tick <= 60; tick++) {
            this.drawTick(tick, this.frame.radius * 0.9 , handSize * 0.7 , tick % 5 === 0 ? '#222222' : '#22222220' )
        }
        
        this.drawHand(this.time.minutes , this.frame.radius * 0.8 , handSize)
        this.drawHand((this.time.hours - 12) * 5 , this.frame.radius * 0.7 , handSize * 2)

        /// spot in the middle
        this.drawCircle(this.frame.center.x , this.frame.center.y , (this.frame.bounds.width / 100) * 2, 'black')
        this.drawHand(this.time.seconds , this.frame.radius * 0.9 , handSize * 0.7 , '#a1a1a1' )
        this.drawCircle(this.frame.center.x , this.frame.center.y , (this.frame.bounds.width / 100) * 1.2, 'silver')
        
    }

    drawContainer() {
        const c = this.ctx
        c.beginPath()
        c.fillStyle = 'white'
        c.fillRect(0, 0, this.frame.bounds.width , this.frame.bounds.height)
        c.closePath()
    }

    drawClockFace() {
        let c = this.ctx
        let center = this.frame.center
        this.drawStrokedCircle(center.x , center.y , this.frame.radius , 'white', 'black' , (this.frame.bounds.width / 100) * 2 )
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

    drawHand(point: number, length: number , thickness: number , color: string = 'black') {
        let secondPoint = this.getPointForTick(point , length)
        this.drawLine(this.frame.center , secondPoint , thickness , color)
    }

    drawTick(point: number, length: number , thickness: number , color: string = 'black') {
        let lineLength = (this.frame.bounds.width / 100) * (point % 15 === 0 ? 4 : 2 )
        let secondPoint = this.getPointForTick(point , length)
        let tickPoint = this.getPointForTick(point , length - lineLength)
        this.drawLine(tickPoint, secondPoint, thickness * (point % 15 === 0 ? 2 : 1 ) , color)
    }

    drawLine(start: HTMLClockPoint , end: HTMLClockPoint, thickness: number , color: string) {
        let c = this.ctx
        c.beginPath()
        c.moveTo(start.x , start.y)
        c.lineTo(end.x, end.y)
        c.lineWidth = thickness
        c.strokeStyle = color
        c.stroke()
        c.closePath()
    }

    getPointForTick(point: number , length: number): HTMLClockPoint {
        
        let angle =  ((360 / 60) * point) - 90
        let radian = (angle / 180) * Math.PI
       
        let secondPoint: HTMLClockPoint = {
            x: this.frame.center.x + length * Math.cos(radian),
            y: this.frame.center.y + length * Math.sin(radian)
        }

        return secondPoint
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
