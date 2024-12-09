document.getElementById("ingresar").addEventListener("click", function(event) {
    event.preventDefault()
  
    const userInput = document.getElementById("user").value.toLowerCase()
    const passwordInput = document.getElementById("password").value

    const usuariosLocalStorage = JSON.parse(localStorage.getItem("usuarios")) || []
    
    const storedUser = usuariosLocalStorage.find(user => user.username.toLowerCase() === userInput)

    if (storedUser && storedUser.password === passwordInput){
        sessionStorage.setItem("usuarioActivo", JSON.stringify(storedUser));
        window.location.href = "./paginas/seleccion.html"
    }
    else{
    fetch ('./db/usuarios.json')
        .then (response => response.json())
        .then(usuarios => {
            const usuario = usuarios.find(user =>
                user.username.toLowerCase() === userInput &&
                user.password === passwordInput
            );

            if (usuario) {
                sessionStorage.setItem("usuarioActivo", JSON.stringify(usuario));
                window.location.href = "./paginas/seleccion.html";
            } else {
                alert("Usuario no registrado");
            }
        })
        .catch(error => {
            console.error("Error al cargar los usuarios:", error);
            alert("Ocurrió un error al cargar los datos. Intenta más tarde.")
        })
    }
})



document.getElementById("registrar").addEventListener("click", function(event) {
    event.preventDefault(); 
    window.location.href = "./paginas/newuser.html"; })

