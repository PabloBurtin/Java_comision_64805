document.addEventListener("DOMContentLoaded", function() {
    let tecnico = sessionStorage.getItem("usuarioActivo")
    
    if (tecnico) {
        tecnico = JSON.parse (tecnico)

        let saludoContainer = document.getElementById("saludo")

        if (saludoContainer && tecnico.nombre && tecnico.apellido) {
            let nombreCompleto = `${tecnico.nombre} ${tecnico.apellido}`

            let saludoUser = document.createElement ("h3")
            saludoUser.textContent = `Bienvenido ${nombreCompleto}`
            
            saludoContainer.appendChild(saludoUser)
        }
        else{
            console.error ("El contenedor de saludo o los datos del usuario no están disponibles.")
        }
    }


    fetch('../db/locales.json')
        .then(response=>response.json())
        .then(data => {
            console.log (data)
            

            const select = document.createElement("select")
            select.id = "localSelect"

            const emptyOption = document.createElement ("option")
            emptyOption.value = ""
            emptyOption.textContent = ""
            select.appendChild(emptyOption)

            data.forEach(local=>{
                const option = document.createElement("option")
                option.value = local.Local
                option.textContent = local.Local
                select.appendChild(option)
            })

            const localSelection = document.getElementById("local")
            localSelection.appendChild(select)
            localSelection.appendChild(document.createElement("br"))

            const modalidad = ["Urgencia", "Preventivo"]

            const selectModalidad = document.createElement("select")
            selectModalidad.id = "modalidadSelect"

            const emptyModalityOption = document.createElement("option")
            emptyModalityOption.value = ""
            emptyModalityOption.textContent = ""
            selectModalidad.appendChild(emptyModalityOption)
        
            modalidad.forEach(mod=>{
                const option = document.createElement("option")
                option.value = mod
                option.textContent = mod
                selectModalidad.appendChild(option)
            })
        
            localSelection.appendChild(selectModalidad)
        
            const inputContainer = document.createElement("div")
            inputContainer.id = "inputContainer"
            localSelection.appendChild(inputContainer)
        
        
            selectModalidad.addEventListener("change", function(){
                inputContainer.innerHTML=""
                switch (selectModalidad.value){
                    case "Urgencia":
                        const input1 = document.createElement("input")
                        input1.placeholder = "Sector"
                        inputContainer.appendChild(input1)
                        inputContainer.appendChild(document.createElement("br"))
                
        
                        const input2 = document.createElement("input")
                        input2.placeholder = "Causa";
                        inputContainer.appendChild(input2);
                        inputContainer.appendChild(document.createElement("br"))
        
                        const input3 = document.createElement("input")
                        input3.placeholder = "Solución"
                        inputContainer.appendChild(input3)
                        inputContainer.appendChild(document.createElement("br"))
        
                        const finalizarUrgencia = document.createElement("button")
                                finalizarUrgencia.textContent = "Finalizar";
                                inputContainer.appendChild(finalizarUrgencia)
        
                        finalizarUrgencia.addEventListener("click", function() {
                            const urgenciaData = {
                                tecnico: tecnico,
                                local: select.value,
                                tipo: "Urgencia",
                                sector: input1.value,
                                causa: input2.value,
                                solucion: input3.value    
                        };
        
                        sessionStorage.setItem("registroUrgencia", JSON.stringify(urgenciaData))
                        alert("Información de urgencia guardada.")
                        input1.value = ""
                        input2.value = ""
                        input3.value = ""

                        window.location.href = 'informe.html'
                    })
        
                        break
        
                    case "Preventivo": {
                            
                            const items = ["Cambio de filtros de aire", "Limpieza de desagües", "Control de correas"]
                            const trabajosConteiner = document.createElement("div")
                            trabajosConteiner.id = "trabajosConteiner"
                            inputContainer.appendChild(trabajosConteiner)

                            const selectContainer = document.createElement ("div")
                            selectContainer.id = "selectContainer"
                            inputContainer.appendChild (selectContainer)

                            items.forEach(item => {
                                const check = document.createElement("input")
                                check.type = "checkbox";
                                check.id = item;
                                const label = document.createElement("label")
                                label.textContent = item;
                                label.htmlFor = item;
                                trabajosConteiner.appendChild(check);
                                trabajosConteiner.appendChild(label);
                                trabajosConteiner.appendChild(document.createElement("br"))

                                if (item === "Control de correas") {
                                    check.addEventListener ('change', function (){

                                        selectContainer.innerHTML =''

                                        if (check.checked){

                                            const pregunta = document.createElement("p")
                                            pregunta.textContent = "¿Reemplazaste una correa?"
                                            selectContainer.appendChild(pregunta)

                                        

                                            const select = document.createElement("select")
                                            select.id="correaSelect"
                                            
                                            const emptyOption = document.createElement("option");
                                            emptyOption.value = "";
                                            emptyOption.textContent = "";
                                            select.appendChild(emptyOption);

                                            const optionYes = document.createElement("option")
                                            optionYes.value = "si"
                                            optionYes.textContent = "Sí"
                                            const optionNo = document.createElement("option")
                                            optionNo.value = "no"
                                            optionNo.textContent = "No"
                                            const optionNoCorresponde = document.createElement ("option")
                                            optionNoCorresponde.value = "no_corresponde"
                                            optionNoCorresponde.textContent = "No corresponde"
    
                                            select.appendChild(optionYes)
                                            select.appendChild(optionNo)
                                            select.appendChild(optionNoCorresponde)

                                            selectContainer.appendChild(select)

                                            const br =document.createElement("br")
                                            selectContainer.appendChild(br)
    
    
                                            select.addEventListener('change', function() {
                                                
                                                const existingSectorInput = document.getElementById("sectorInput")
                                                const existingModelInput = document.getElementById("modelInput")
                                                if (existingSectorInput) existingSectorInput.remove()
                                                if (existingModelInput) existingModelInput.remove()
                            
                                                if (select.value === "si") {
                                                    const sectorInput = document.createElement("input")
                                                    sectorInput.id = "sectorInput"
                                                    sectorInput.placeholder = "Indique el sector"
                                                    selectContainer.appendChild(sectorInput);
                                                    selectContainer.appendChild(document.createElement("br"))
                            
                                                    const modelInput = document.createElement("input")
                                                    modelInput.id = "modelInput";
                                                    modelInput.placeholder = "Indique el modelo"
                                                    selectContainer.appendChild(modelInput)
                                                    selectContainer.appendChild(document.createElement("br"))

                                                    const button = document.createElement("button")
                                                    button.textContent = "Agregar reemplazo de correa"
                                                    selectContainer.appendChild(button)

                                                    button.addEventListener("click", function() {
                                
                                                        const sector = sectorInput.value
                                                        const modelo = modelInput.value
                                                
                                                
                                                        if (sector && modelo) {
                                                            const registro = document.createElement("p")
                                                            registro.textContent = `Sector: ${sector} Modelo: ${modelo}`
                                                            registrosContainer.appendChild(registro)
                        
                                                            let correasReemplazadas = JSON.parse(sessionStorage.getItem("correas")) || []
                                                            correasReemplazadas.push({ sector, modelo })

                                                            sessionStorage.setItem("correas", JSON.stringify(correasReemplazadas))

                                                            sectorInput.value = ""
                                                            modelInput.value = ""
                        
                                                        } else {
                                                            alert("Por favor, complete ambos campos.")
                                                        }
                                                        
                                                })
                                                }
                                            })
    
                                        }
                                        
                                        else {
                                            const existingSelect = document.getElementById("correaSelect");
                                            if (existingSelect) {
                                                existingSelect.parentNode.removeChild(existingSelect);
                                            }
                                            const sectorInput = document.getElementById("sectorInput");
                                            const modelInput = document.getElementById("modelInput");
                                            if (sectorInput) sectorInput.remove();
                                            if (modelInput) modelInput.remove();
                                        }
                                    })
                                }
                            })

                            const inputSector = document.createElement("input")
                            inputSector.placeholder = "Sector"
                            inputContainer.appendChild(inputSector)
                        
                            const inputTemperatura = document.createElement("input")
                            inputTemperatura.placeholder = "Valor de Temperatura"
                            inputTemperatura.type = "number"
                            inputContainer.appendChild(inputTemperatura)
                        
                            const button = document.createElement("button")
                            button.textContent = "Agregar Registro de Temperatura"
                            inputContainer.appendChild(button)
                        
                            
                            const registrosContainer = document.createElement("div")
                            registrosContainer.id = "registrosContainer"
                            inputContainer.appendChild(registrosContainer)
        
                            button.addEventListener("click", function(event) {
                                event.preventDefault() 
        
                                const sector = inputSector.value
                                const temperatura = inputTemperatura.value
                        
                        
                                if (sector && temperatura) {
                                    const registro = document.createElement("p")
                                    registro.textContent = `Sector: ${sector}, Temperatura: ${temperatura}°C`
                                    registrosContainer.appendChild(registro)

                                    let temperaturaAlmacenadas = JSON.parse (sessionStorage.getItem("temperaturas")) || []
                                    let temperaturaNum = parseFloat (temperatura)

                                    if (!isNaN (temperaturaNum)){
                                        temperaturaAlmacenadas.push(temperaturaNum)
                                        sessionStorage.setItem("temperaturas", JSON.stringify(temperaturaAlmacenadas))
                                    }

                                    const temperaturas = JSON.parse (sessionStorage.getItem ("temperaturas")) || []
                                    console.log (temperaturas)

                                    inputSector.value = ""
                                    inputTemperatura.value = ""

                                } else {
                                    alert("Por favor, complete ambos campos.")
                                }
                                
                        })
                        const finalizarPreventivo = document.createElement("button");
                            finalizarPreventivo.textContent = "Finalizar"
                            inputContainer.appendChild(finalizarPreventivo)
        
                            finalizarPreventivo.addEventListener("click", function() {
                                const preventivoData = {
                                    tecnico: tecnico,
                                    local: select.value,
                                    tipo: "Preventivo",
                                    sector: inputSector.value,
                                    temperatura: inputTemperatura.value,
                                    itemsSeleccionados: items.filter(item => document.getElementById(item).checked)  
                                };
                            sessionStorage.setItem("registroPreventivo", JSON.stringify(preventivoData))
                                
                            alert("Información de preventivo guardada.")
                            
                            window.location.href = 'informe.html'
                            })
                            break
                       }
                        
                }
            })

        })

    .catch(error => {
            console.error('Error al cargar el archivo JSON:', error)
        })
})


