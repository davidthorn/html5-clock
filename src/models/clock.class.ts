
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
            this.drawTick(tick, this.frame.radius * 0.9 , handSize * 0.7 , '#222222' )
        }

        this.drawHand(this.time.seconds , this.frame.radius * 0.9 , handSize * 0.7 , '#a1a1a1' )
        this.drawHand(this.time.minutes , this.frame.radius * 0.8 , handSize)
        this.drawHand(this.time.hours , this.frame.radius * 0.7 , handSize * 2)

        /// spot in the middle
        this.drawCircle(this.frame.center.x , this.frame.center.y , (this.frame.bounds.width / 100) * 2, 'black')
        
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
        
        let angle =  ((360 / 60) * point) - 90
        let radian = (angle / 180) * Math.PI
       
        let c = this.ctx

        c.beginPath()

        let secondPoint = {
            x: this.frame.center.x + length * Math.cos(radian),
            y: this.frame.center.y + length * Math.sin(radian)
        }

        c.moveTo(this.frame.center.x , this.frame.center.y)
        c.lineTo( secondPoint.x, secondPoint.y)
        c.lineWidth = thickness;
        c.strokeStyle = color
        c.stroke()
        c.closePath()
       
    }

    drawTick(point: number, length: number , thickness: number , color: string = 'black') {
        
        let lineLength = (this.frame.bounds.width / 100) * 2
        let angle =  ((360 / 60) * point) - 90
        let radian = (angle / 180) * Math.PI
       
        let c = this.ctx

        c.beginPath()

        let secondPoint = {
            x: this.frame.center.x + length * Math.cos(radian),
            y: this.frame.center.y + length * Math.sin(radian)
        }

        let tickPoint = {
            x: this.frame.center.x + (length - lineLength) * Math.cos(radian),
            y: this.frame.center.y + (length - lineLength) * Math.sin(radian)
        }

        c.beginPath()
        c.moveTo(tickPoint.x , tickPoint.y)
        c.lineTo(secondPoint.x, secondPoint.y)
        c.lineWidth = thickness;
        c.strokeStyle = color
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
