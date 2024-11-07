
// document.addEventListener("DOMContentLoaded", function() {
//     let tecnico = localStorage.getItem("usuarioActivo")
//     tecnico = JSON.parse(tecnico)

//     let saludoContainer = document.getElementById("saludo")

//     function capitalizeFirstLetter(string) {
//         return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
//     }

//     let saludoUser = document.createElement("h2")
//     let nombreMayus = capitalizeFirstLetter (usuarioActivo.username)
//     saludoUser.textContent = `Hola, ${nombreMayus} !!!` 
//     const saludo = document.getElementById("saludo")
//     saludo.appendChild(saludoUser)

    const locales = ["Abasto", "Administracion", "Alcorta", "Avellaneda", "Palermo", "Dot", "Florida", "Bullrich", "Santa Fe", "TOM", "Unicenter"]

    const select = document.createElement("select")
    select.id = "localSelect"

    locales.forEach(local=>{
        const option = document.createElement("option")
        option.value = local
        option.textContent = local
        select.appendChild(option)
    })

    const localSelection = document.getElementById("local")
    localSelection.appendChild(select)
    localSelection.appendChild(document.createElement("br"))

    const modalidad = ["Urgencia", "Preventivo"]

    const selectModalidad = document.createElement("select")
    selectModalidad.id = "modalidadSelect"

    modalidad.forEach(mod=>{
        const option = document.createElement("option")
        option.value = mod
        option.textContent = mod
        selectModalidad.appendChild(option)
    })

    localSelection.appendChild(selectModalidad)

    const inputContainer = document.createElement("div");
    inputContainer.id = "inputContainer";
    localSelection.appendChild(inputContainer);


    selectModalidad.addEventListener("change", function(){
        inputContainer.innerHTML=""
        switch (selectModalidad.value){
            case "Urgencia":
                const input1 = document.createElement("input");
                input1.placeholder = "Sector";
                inputContainer.appendChild(input1);
                inputContainer.appendChild(document.createElement("br"));
        

                const input2 = document.createElement("input");
                input2.placeholder = "Causa";
                inputContainer.appendChild(input2);
                inputContainer.appendChild(document.createElement("br"));

                const input3 = document.createElement("input");
                input3.placeholder = "Solución";
                inputContainer.appendChild(input3);
                inputContainer.appendChild(document.createElement("br"));

                const finalizarUrgencia = document.createElement("button");
                        finalizarUrgencia.textContent = "Finalizar";
                        inputContainer.appendChild(finalizarUrgencia);

                finalizarUrgencia.addEventListener("click", function() {
                    const urgenciaData = {
                        tecnico: usuarioActivo,
                        local: localSelection.value,
                        tipo: "Urgencia",
                        sector: input1.value,
                        causa: input2.value,
                        solucion: input3.value    
                };

                localStorage.setItem("registroUrgencia", JSON.stringify(urgenciaData));
                alert("Información de urgencia guardada.");
                input1.value = input2.value = input3.value = "";
            });

                break;

            case "Preventivo": {
                    
                    const items = ["Cambio de filtros de aire", "Limpieza de desagües", "Control de correas"];
                    
                    items.forEach(item => {
                        const check = document.createElement("input");
                        check.type = "checkbox";
                        check.id = item;
                        const label = document.createElement("label");
                        label.textContent = item;
                        label.htmlFor = item;
                        inputContainer.appendChild(check);
                        inputContainer.appendChild(label);
                        inputContainer.appendChild(document.createElement("br"));
                    });
                
                    
                    const inputSector = document.createElement("input");
                    inputSector.placeholder = "Sector";
                    inputContainer.appendChild(inputSector);
                
                    const inputTemperatura = document.createElement("input");
                    inputTemperatura.placeholder = "Valor de Temperatura";
                    inputTemperatura.type = "number";
                    inputContainer.appendChild(inputTemperatura);
                
                    const button = document.createElement("button");
                    button.textContent = "Agregar Registro de Temperatura";
                    inputContainer.appendChild(button);
                
                    
                    const registrosContainer = document.createElement("div");
                    registrosContainer.id = "registrosContainer";
                    inputContainer.appendChild(registrosContainer); 

                    button.addEventListener("click", function(event) {
                        event.preventDefault(); 

                        const sector = inputSector.value;
                        const temperatura = inputTemperatura.value;
                
                
                        if (sector && temperatura) {
                            const registro = document.createElement("p");
                            registro.textContent = `Sector: ${sector}, Temperatura: ${temperatura}°C`;
                            registrosContainer.appendChild(registro); 
                            inputSector.value = "";
                            inputTemperatura.value = "";
                        } else {
                            alert("Por favor, complete ambos campos."); 
                        }
                        
                })
                const finalizarPreventivo = document.createElement("button");
                    finalizarPreventivo.textContent = "Finalizar";
                    inputContainer.appendChild(finalizarPreventivo);

                    finalizarPreventivo.addEventListener("click", function() {
                        const preventivoData = {
                            tecnico: usuarioActivo,
                            local: localSelection.value,
                            tipo: "Preventivo",
                            sector: inputSector.value,
                            temperatura: inputTemperatura.value,
                            itemsSeleccionados: items.filter(item => document.getElementById(item).checked)  
                        };
                    localStorage.setItem("registroPreventivo", JSON.stringify(preventivoData));
                     alert("Información de preventivo guardada.");
               
                    inputSector.value = "";
                    inputTemperatura.value = "";
                    });
                    break
               }
                
        }
    })

// })


