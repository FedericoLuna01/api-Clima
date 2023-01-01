const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})

function buscarClima(e) {
    e.preventDefault();

    // validar formulario
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === '') {
        mostrarAlerta('Ambos campos son obligatorios');
        return;

    }

    // consultar api
    consultarAPI(ciudad, pais);
}


function mostrarAlerta(mensaje) {
    const alerta = document.querySelector('.bg-red-100');

    if(!alerta) {
        const alerta = document.createElement('DIV');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'text-center', 'mx-auto', 'mt-6', 'py-6', 'rounded');

        alerta.innerHTML = mensaje;
        formulario.appendChild(alerta)

        setTimeout(() => {
            alerta.remove()
        }, 3000);
    }
}
    
function consultarAPI(ciudad, pais) {
    const appId = '9f383f37816158cc68406145e8ff05e9'

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

    Spinner();

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => { 
            limpiarHTML()
            if(datos.cod === '404') {
                mostrarAlerta('Ciudad no encontrada')
                return;
            }

            // mostrar respuesta en html
            mostrarClima(datos)
        })

        

}

function mostrarClima(datos) {
    const {name, main: {temp, temp_max, temp_min}} = datos
    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('P');
    nombreCiudad.textContent = `Clima en: ${name}`
    nombreCiudad.classList.add('font-bold', 'text-2xl')

    const actual = document.createElement('P');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMaxima = document.createElement('P')
    tempMaxima.innerHTML = `Max: ${max}&#8451;`
    tempMaxima.classList.add('text-xl')

    const tempMinima = document.createElement('P')
    tempMinima.innerHTML = `Min: ${min}&#8451;`
    tempMinima.classList.add('text-xl')

    const resultadoDiv = document.createElement('DIV');
    resultado.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);

    resultado.appendChild(resultadoDiv);
    
}

const kelvinACentigrados = grados => parseInt(grados - 273.15);


function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

function Spinner() {
    limpiarHTML();

    const divSpiner = document.createElement('DIV');
    divSpiner.classList.add('sk-fading-circle');
    divSpiner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpiner);

}