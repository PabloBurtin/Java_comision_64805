function loadData(){
   fetch ("../db/locales.json")
    .then (response => {
        if (!response.ok){
            throw new Error ('Network response was not ok')
        }
        return response.json ()
    })
    .then (data => {
        const container = document.getElementById("listado-de-locales")

        data.forEach(item => {
            const localDiv = document.createElement("div")
            localDiv.classList.add('local')
    
            localDiv.innerHTML = `
            <h4>${item.Local}</h4>
            <p>Domicilio: ${item.Domicilio}</p>
            <p>Tipo de equipo: ${item['Tipo de equipo']}</p>
            <p>Teléorno: ${item.Telefono}</p>
            <p>Encargado: ${item.Encargado}</p>
            ${item.iframe}`
    
            container.appendChild(localDiv)
        })
    })

   
    .catch(error =>{
        console.error ("Error al cargar el archivo JSON", error)
    })
}


loadData()
