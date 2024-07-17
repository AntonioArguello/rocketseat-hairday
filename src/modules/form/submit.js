import dayjs from "dayjs"
import { scheduleNew } from "../../services/schedule-new.js";
import { scheduleDays } from "../schedules/schedule-load.js";

const form = document.querySelector("form")
const clientName = document.getElementById("client")
const selectedDate = document.getElementById("date")

// Data para formatar o input atual
const dateToday = dayjs(new Date()).format("YYYY-MM-DD")

// Carrega a data atual e a define como mínima
selectedDate.value = dateToday
selectedDate.min = dateToday

form.onsubmit = async (event) => {
    event.preventDefault();

    try {
        // Recupera o nome do cliente
        const name = clientName.value.trim()
        
        if(!name) {
            return alert("Informe o nome do cliente!")
        }

        // Recupera o horário selecionado
        const hourSelected = document.querySelector(".hour-selected")
        
        if(!hourSelected) {
            return alert("Selecione a hora.")
        }

        // Recupera somente a hora
        const [hour] = hourSelected.innerText.split(":")

        // Insere a hora na data
        const when = dayjs(selectedDate.value).add(hour, "hour")
        
        // Gera um ID
        const id = new Date().getTime()
        
        // Faz o agendamento
        await scheduleNew ({
            id,
            name,
            when
        })

        // Recarrega os agendamentos
        await scheduleDays()

        // Limpa o input de nome do cliente
        clientName.value = ""
    } catch (error) {
        alert("Não foi possível realizar o agendamento.")
        console.log(error)
    }
}