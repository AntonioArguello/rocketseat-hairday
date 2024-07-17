import { openingHours } from "../../utils/opening-hours.js"
import dayjs from "dayjs"
import { hoursClick } from "./hours-click.js"

const hours = document.getElementById("hours")

export function hoursLoad({ date, dailySchedules }){
    // Limpa a lista de horários
    hours.innerHTML = ""

    // Obtém a lista dos horários ocupados
    const unavailableHours = dailySchedules.map((schedule) => dayjs(schedule.when).format("HH:mm"))
    
    const opening = openingHours.map((hour) => {
        // Recupera somente a hora
        const [scheduleHour] = hour.split(":")

        // Adiciona a hora na data e verifica se está no passado
        const isHourPast =  dayjs(date).add(scheduleHour, "hour").isBefore(dayjs())
        
        // Variável que diz se o horário está disponível ou já passou
        const notAvailable = unavailableHours.includes(hour) || isHourPast

        return {
            hour,
            notAvailable,
        }
    })

    // Renderizar os horários
    opening.forEach(( { hour, notAvailable } ) => {
        const li = document.createElement("li")

        li.classList.add("hour")
        li.classList.add(notAvailable ? "hour-unavailable" : "hour-available")
        
        li.textContent = hour

        if (hour === "9:00") {
            hourHeaderAdd("Manhã")
        } else if (hour === "13:00") {
            hourHeaderAdd("Tarde")
        } else if (hour === "18:00") {
            hourHeaderAdd("Noite")
        }

        hours.append(li)
    })

    // Adiciona o evento de clique nos horários disponíveis
    hoursClick()
}

function hourHeaderAdd(title) {
    const header = document.createElement("li")
    header.classList.add("hour-period")
    header.textContent = title
    
    hours.append(header)
}
