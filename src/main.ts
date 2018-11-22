import { Clock } from './models'






let canvas: HTMLCanvasElement
let context: CanvasRenderingContext2D

let canvasId: string = 'html5-clock'

window.onload = () => {

    canvas = document.getElementById('html5-clock') as HTMLCanvasElement
    context = canvas.getContext('2d') as CanvasRenderingContext2D
    const date = new Date();
    canvas.width = 400
    canvas.height = 400

    context.beginPath()

    context.fillStyle = 'red'
    context.fillRect(0, 0, canvas.width , canvas.height)

    context.closePath()
    
    let bounds = canvas.getBoundingClientRect()

    

    window.clock = new Clock(date.asHTMLClockTime(), {
        bounds: bounds as HTMLClockBounds,
        radius: 200,
        center: {
            x: 1 ,
            y: 1
        }
    })

    let isMoving = true

    

    document.addEventListener('mouseup' , () => {
        isMoving = false
    })

    document.addEventListener('mousemove' , (event) => {
        if(isMoving) return
        let bds = window.clock.frame.bounds
        console.log(bds)
        
        if(event.clientX >= bds.left && event.clientX <= (bds.left + bds.width) &&
        event.clientY >= bds.top && event.clientY <= (bds.top + bds.height)  ) {
        
            console.log(event.clientX)
            context.beginPath()

            context.fillStyle = 'blue'
            context.arc(event.clientX - bds.left , event.clientY - bds.top , 6 , 0 , 2 * Math.PI)
            context.fill()
            context.closePath()
        }
    })

    document.addEventListener('mousedown' , (event) => {
        isMoving = true
    })

    console.log('window has loaded');

}