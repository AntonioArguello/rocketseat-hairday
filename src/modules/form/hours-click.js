export function hoursClick(){
    const hours = document.querySelectorAll('.hour-available')
    
    hours.forEach(( available ) => {
        available.addEventListener("click", (selected) => {

            // Remove seleção de qualquer li selecionada anteriormente
            hours.forEach((hour) => {
                hour.classList.remove("hour-selected")
            })

            // Seleciona nova li clicada
            selected.target.classList.add("hour-selected")
        })
    })
}