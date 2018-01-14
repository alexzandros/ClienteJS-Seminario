document.onreadystatechange = function(){
    if (document.readyState == "interactive" ){
        var ajaxConnection = new XMLHttpRequest();
        ajaxConnection.open("GET","http://localhost:5000/api/Estudiante/listado",true);
        ajaxConnection.onreadystatechange = function(){
            if (ajaxConnection.readyState == XMLHttpRequest.DONE && ajaxConnection.status == 200){
                crearListado (ajaxConnection.responseText);
            }
        }
        ajaxConnection.send();
    }
}

function crearListado(respuestaJSON){
    var respuestaObj = JSON.parse(respuestaJSON);
    window.listadoPersonas = respuestaObj;
    if (!Array.isArray(respuestaObj)){
        respuestaObj = [respuestaObj]
    }
    document.body.appendChild(renderListado(respuestaObj));
}

function renderListado(respuestaObj){
    var listadoDOM = document.createElement("ul");
    respuestaObj.forEach(function(elem,idx){
        var elementoDOM = document.createElement("li");
        elementoDOM.innerHTML = "<span id='elemento" + idx + "'>" + elem.nombre + "</span>"
        listadoDOM.appendChild(elementoDOM);
    });
    listadoDOM.addEventListener("mouseover",function(evt){
        if (evt.target.tagName.toLowerCase() === "span"){
            var id = parseInt(evt.target.id.substr(8));
            var persona = encontrarUnRegistro(id);
            var divAMostrar = document.getElementById("ventanaFlotante");
            divAMostrar.innerHTML = persona.nombre + " " + persona.apellido;
            divAMostrar.classList.remove("invisible");
        }
    });
    listadoDOM.addEventListener("mouseleave", function(evt){
        document.getElementById("ventanaFlotante").classList.add("invisible");
    });
    return listadoDOM;
}

function encontrarUnRegistro(id){
    var personaARetornar = null;
    window.listadoPersonas.forEach(function(elem, idx){
        if (idx == id){
            personaARetornar = elem;
        }
    });
    return personaARetornar;
}