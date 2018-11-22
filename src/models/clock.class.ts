
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

        c.moveTo(this.frame.center.x , this.frame.center.y)
        c.lineTo(this.frame.center.x + length * Math.cos(radian) , this.frame.center.y + length * Math.sin(radian))
        c.lineWidth = thickness;
        c.strokeStyle = color
        c.stroke()
        c.closePath()
       
    }

    drawLine(x: number, y: number, length: number, fillColor: string = 'black', angle: number) {

        let newX: number = 0
        let newY: number = 0

        switch(angle) {
            case 0:
                newX = x
                newY = y - length
            break;
            case 90:
                newX = x + length
                newY = y
            break;
            case 180:
                newX = x
                newY = y + length
            break;
            case 270:
                newX = x - length
                newY = y
                console.log({ newX, newY })
            break;
            default: 
                let rem = angle % 90
                let hypo: number = length // hypotheneus
                let sin = Math.sin(rem) // SOH 

                /// O = S * H
                let op: number = Math.abs(sin * hypo)

                // A = O * T // T = 0/A
                let adj: number = Math.abs(op / Math.tan(rem))
        
                switch(true) {
                    case angle >= 0 && angle < 90:
                        console.log(`${angle} >= 0 && ${angle} < 90`)
                        newX = x + op
                        newY = y -adj
                    break;
                    case angle >= 90 && angle < 180:
                        newX = x + op
                        newY = y + adj
                    break;
                    case angle >= 180 && angle < 270:
                        newX = x - op
                        newY = y + adj
                    break;
                    case angle >= 270 && angle < 360:
                        newX = x - op
                        newY = y - adj
                    break;
                    default: break
                }

                
                console.log({
                    trig: {
                        hypoa: hypo * hypo,
                        adja: (adj * adj),
                        opa: Math.sqrt((hypo * hypo) - (adj * adj)),
                        hypo, 
                        adj,
                        op
                    },
                    x,
                    y,
                    sin,
                    angle,
                    rem,
                    hypo,
                    adj,
                    op,
                    newX,
                    newY
                })
            break;
        }

        /// 0 = y - length

        /// 30 = 1 hypo  required

        // 60 = 2 = hyp required

        // 90 = 3 = x + length 


        let angleCorrect = angle === 0 ? 360 : angle


        

        let c = this.ctx
        c.beginPath()
        c.strokeStyle = 'blue'
        c.moveTo(x, y)
        c.lineTo(newX, newY)
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
