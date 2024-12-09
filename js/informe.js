document.addEventListener("DOMContentLoaded", function(){

    function calcularPromedioTemperaturas(temperaturas) {
        const validTemperarutas = temperaturas.filter (temp => !isNaN (temp))
        if (validTemperarutas.length === 0){
            return 0
        }
        const suma = validTemperarutas.reduce ((acc, temp) => acc + temp, 0)
        return suma / validTemperarutas.length
    }

    const localSelect = sessionStorage.getItem("registroUrgencia")||sessionStorage.getItem("registroPreventivo")
    const tecnico = JSON.parse (sessionStorage.getItem("usuarioActivo"))
    const locales = '../db/locales.json'

    fetch(locales)
        .then(response =>response.json ())
        .then (data => {
            const registro = localSelect ? JSON.parse(localSelect):null
            const localName = registro ? registro.local: ''

            const localData = data.find(local => local.Local === localName)

            if (localData){
                document.querySelector ('.domicilio').textContent = localData.Domicilio
                document.querySelector ('.encargado').textContent = localData.Encargado
            }

            if (registro){
                const tipo = registro.tipo
                
                switch (tipo) {
                    case "Urgencia":
                        document.querySelector('.detalle').innerHTML = 
                        `Se atendio la urgencia registrada en el sector: ${registro.sector} <br>
                        El problema era: ${registro.causa}<br>
                        Se solucionó: ${registro.solucion}`
                        break

                    case "Preventivo":

                        const correasReemplazadas = JSON.parse(sessionStorage.getItem("correas")) || []
                        let correasDetalles = ""

                        if (correasReemplazadas.length > 0){
                            correasDetalles = correasReemplazadas.map(correa => `Sector: ${correa.sector} Modelo: ${correa.modelo}`).join('<br>')
                        }else{
                            correasDetalles = "No se cambiaron correas."
                        }

                        console.log("Correas almacenados:", JSON.parse(sessionStorage.getItem("correas")))

                        const temperaturas = JSON.parse(sessionStorage.getItem("temperaturas")) || [] 
    
                    
                        const promedio = calcularPromedioTemperaturas(temperaturas)

                        document.querySelector('.detalle').innerHTML = 
                        `<p>Se realizó el mantenimiento preventivo de los equipos de aire acondiciona.</p>  
                        <p>Realizando los siguientes trabajos.</p>
                        <p>${registro.itemsSeleccionados.join('</p><p>')}</p>
                        <Correas reemplazadas:</p>
                        <p>${correasDetalles}</p>
                        <p>Los equipos están inyectando una temperatura promedio de ${promedio.toFixed(2)}°C.</p>`;
                        break;
                    default:
                        console.warm ("Tipo de registro no válido.")
                }
                document.querySelector('.tecnico').textContent = `Realizado por: ${tecnico.nombre} ${tecnico.apellido}`
            }
            document.querySelector('.numero').textContent = `Número: ${Math.floor(Math.random()*1000)}`
            const opciones = { year: 'numeric', month: 'numeric', day: 'numeric' };
            document.querySelector('.fecha').textContent = `Fecha: ${new Date().toLocaleDateString('es-ES', opciones)}`
        })
        .catch(error => {
            console.log('Error al cargar el archivo JSON:', error)
        })
})