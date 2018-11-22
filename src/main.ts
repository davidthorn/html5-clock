import { Clock } from './models'

window.onload = () => {

    let container = document.getElementById('container') as HTMLElement
    const date = new Date();
    let bounds = container.getBoundingClientRect()

    window.clock = new Clock(container, date.asHTMLClockTime(), {
        bounds: bounds as HTMLClockBounds,
        radius: (bounds.width * 0.95) / 2,
        center: {
            x: bounds.width / 2 ,
            y: bounds.height / 2
        }
    })

    setInterval(() => {
        window.clock.draw()
    }, 1000)

}