// const locales = ["abasto", "administracion", "alcorta", "avellaneda", "palermo", "dot", "florida", "bullrich", "santa fe", "tom", "unicenter"]

// const evaporadores = []

// const temperaturas = []

// function agregarEvaporador (){
//  evaporadores.push (prompt ("Indica el sector"))
// }

// function registrarTemperatura (){
//     temperaturas.push (parseFloat(prompt("Ingresa la temperatura de inyección")))
// }

// let seleccionLocal;

// function mantenimientoPreventivo () {
//     alert ("Reemplaza todo los filtros")
//     let registro = confirm ("Agrega evaporador")
//     while (registro !== false){
//     agregarEvaporador()
//     registrarTemperatura()
//     registro = confirm ("Agrega evaporador") 
//     } 
//     console.log ("Se concurrió al local de "+ seleccionLocal + " y se realizó el mantenimiento preventivo. Se registraron los siguientes valores")

//     console.table({Evaporadores:evaporadores, Temperatura:temperaturas})   
// }

// function incidencia () {
//     let diagnostico = prompt("¿Qué problema tiene el equipo?")
//     console.log ("Se encontró el siguiente problema en el equipo :", diagnostico)
// }


// while (seleccionLocal != true) {
//     seleccionLocal = prompt("Ingresa el local donde estás").toLowerCase();

//     if (locales.includes(seleccionLocal)) {
//         break;
//     } else {
//         alert("Local no encontrado, por favor intenta de nuevo."); // Alerta si el local no es válido
//     }
// }


// let tipoMantenimiento = prompt("Selecciona el tipo de mantenimiento: preventivo o incidencia").toLowerCase();

// while (tipoMantenimiento !== "preventivo" || tipoMantenimiento !== "incidencia"){
// switch (tipoMantenimiento){
//     case "preventivo":
//         mantenimientoPreventivo();
//         break;
//     case "incidencia":
//         incidencia ();
//         break;
//     default:
//         alert ("Opción incorrecta");
//         tipoMantenimiento = prompt("Selecciona el tipo de mantenimiento: preventivo o incidencia").toLowerCase();
//         continue;

// }
// break;
// 

const usuarios = [
    { id: 1, username: "carlos", userlastname: "galli" },
    { id: 2, username: "carlos", userlastname: "faccini" },
    { id: 3, username: "roberto", userlastname: "herrera" },
    { id: 4, username: "cristian", userlastname: "rivero" },
    { id: 5, username: "richard", userlastname: "gauto" },
];


document.getElementById("ingresar").addEventListener("click", function(event) {
    event.preventDefault(); // Previene la acción predeterminada del botón

  
    const usernameInput = document.getElementById("username").value.toLowerCase();
    const userlastnameInput = document.getElementById("userlastname").value.toLowerCase();

    
    const usuario = usuarios.find(user => user.username.toLowerCase() === usernameInput && user.userlastname.toLowerCase() === userlastnameInput);

   
    if (usuario) {
        localStorage.setItem("usuarioActivo",JSON.stringify(usuario));
        window.location.href = "./paginas/seleccion.html"; 
    } else {
       alert ("Usuario no registrado")
    }
});

document.getElementById("registrar").addEventListener("click", function(event) {
    event.preventDefault(); 
    window.location.href = "./paginas/newuser.html"; })

const usuarioActivo =JSON.parse(localStorage.getItem("usuarioActivo"))



function saludar (){
    const saludoUser = document.createElement("h2")
    saludoUser.textContent = `Hola, ${usuarioActivo} !!!`
    const saludo = document.getElementById("saludo")
    saludo.appendChild(saludoUser)
}

