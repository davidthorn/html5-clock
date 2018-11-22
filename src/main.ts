import { Clock } from './models'



const date = new Date();

window.clock = new Clock(date.asHTMLClockTime())


let canvas: HTMLCanvasElement
let context: CanvasRenderingContext2D

let canvasId: string = 'html5-clock'

window.onload = () => {

    

    console.log('window has loaded');

}