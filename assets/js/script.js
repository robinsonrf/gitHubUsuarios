const baseUrl = 'https://api.github.com/users'; //url Base

const request = async (url) => {
    const results = await fetch(url);
    const response = await results.json();
    return response;
}

const getUser = async (nombre) => {
    const urlNombre = `${baseUrl}/${nombre}`;
    return request(urlNombre);
}

const getRepo = async (nombre, pagina, repoPagina) => {
    const urlRepo = `${baseUrl}/${nombre}/repos?page=${pagina}&per_page=${repoPagina}`;
    return request(urlRepo);

}


const usuario = (datosUsuario) =>{
    if(datosUsuario.message !="Not Found"){
    let divUsuario = document.getElementById("divUsuario").innerHTML =
        `<h3>Datos de Usuario</h3>
        <img src="${datosUsuario.avatar_url}" alt="avatar" width="260px">
        <ul class="list-unstyled">
            <li>Nombre de Usuario:${datosUsuario.name} </li>
            <li>Nombre de Login: ${datosUsuario.login}</li>
            <li>Cantidad de Repositorios: ${datosUsuario.public_repos}</li>
            <li>Localidad: ${datosUsuario.location}</li>
            <li>Tipo de Usuario: ${datosUsuario.type}</li>
        </ul>`;
    return divUsuario;
    }
    else{
        alert("Usuario No Existe, intenta nuevamente");
        window.location.reload();
    }
};

const repos = (datosRepos) =>{
    let divRepos = document.getElementById("divRepos");
    divRepos.innerHTML = "";
    let h3 = document.createElement("h3");
    divRepos.appendChild(h3).innerHTML ="Nombre de Repositorios"
    datosRepos.forEach(element => {
        divRepos.innerHTML+=`
            <a href="${element.html_url}" class="my-2 d-block"
            target="_blank">${element.name}</a>`;
            return
        });
};

const llamarFunciones = (nombre, pagina, repoPagina) => {
    Promise.all([getUser(nombre), getRepo(nombre, pagina, repoPagina)])
        .then(
            datos => {
                usuario(datos[0]);
                repos(datos[1]);
            }
        )
        .catch ( error => console.log("error del catch", error));
}

let submit = document.querySelector("form")
    submit.addEventListener("submit", async event => {
        event.preventDefault();

let nombre = document.getElementById("nombre").value;
let pagina = document.getElementById("pagina").value;
let repoPagina = document.getElementById("repoPagina").value;

if (nombre != "" && pagina > 0 && repoPagina > 0) {
    await llamarFunciones(nombre, pagina, repoPagina);
}
else {
    alert("Debe llenar los datos de manera correta")
}

});
