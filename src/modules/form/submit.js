import dayjs from "dayjs"

const form = document.querySelector("form")
const selectedDate = document.getElementById("date")

// Data para formatar o input atual
const dateToday = dayjs(new Date()).format("YYYY-MM-DD")

// Carrega a data atual e a define como mínima
selectedDate.value = dateToday
selectedDate.min = dateToday

form.onsubmit = (event) => {
    event.preventDefault();
}