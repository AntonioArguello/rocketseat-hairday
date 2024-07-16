import { scheduleDays } from "../schedules/schedule-load"

// Seleciona o input de data
const selectedDate = document.getElementById("date")

// Recarrega a lista de horários quando o input mudar
selectedDate.onchange = () => scheduleDays()