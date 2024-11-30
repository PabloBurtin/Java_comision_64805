const userListUrl = '../db/usuarios.json'


document.addEventListener("DOMContentLoaded", function () {
    
    function cargarUsuarios () {
        return fetch(userListUrl)
        .then (response => response.json())
        .catch(error => {
            console.error("Error al cargar usuarios:", error);
            return []; 
        })
    }

    if (!localStorage.getItem("usuarios")){
    cargarUsuarios().then (usuarios => { 
        if(usuarios.length > 0){
            localStorage.setItem("usuarios", JSON.stringify(usuarios))
            console.log("Usuarios cargados en localStorage:", usuarios)
        }
    })}


document.getElementById('newuser').addEventListener('submit',function (event){
event.preventDefault()

const username = document.getElementById ('username').value
const nombre = document.getElementById ('nombre').value
const apellido = document.getElementById ('apellido').value
const password = document.getElementById ('password').value
const password2 = document.getElementById ('password2').value
const telefono = document.getElementById ('telefono').value

if (password !== password2){
    alert ("Las contraseñas no coinciden.")
    return
}

let usuarios = JSON.parse (localStorage.getItem("usarios")) || []

const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map(user => user.id)) + 1 : 1


    const newUser = {
        id: nuevoId,
        username: username,
        nombre: nombre,
        apellido: apellido,
        password: password,
        telefono: telefono
    }
    
    usuarios.push(newUser)
    
    localStorage.setItem ("usuarios", JSON.stringify(usuarios))
    
    this.reset ();
    
    alert ("Usuario agregado exitosamente")

    })
    let usuarioscargados = localStorage.getItem("usuarios")
    console.log("Usuarios cargados en localStorage:", usuarioscargados)
})





