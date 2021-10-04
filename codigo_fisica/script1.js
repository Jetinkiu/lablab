const mostrar_regla = document.getElementById("mostrar_regla")
const mostrar_tiempos = document.getElementById("mostrar_tiempos")
const p_sturges = document.getElementById("p_sturges")
const p_mínimo = document.getElementById("p_mínimo")
const p_máximo = document.getElementById("p_máximo")
const p_rango = document.getElementById("p_rango")
const p_intervalo = document.getElementById("p_intervalo")
const p_r_extendido = document.getElementById("p_r_extendido")
const p_d_rangos = document.getElementById("p_d_rangos")
const p_datos_intervalos = document.getElementById("p_datos_intervalos")
const p_diferencia_tiempo = document.getElementById("p_diferencia_tiempo")

const tiempo4 = document.getElementById("tiempo4")

const regla_distancia = [1.3, 2.2, 2.2, 2.7, 3.1, 3.2, 3.2, 3.6, 3.2, 4.1, 4.1, 4.7, 4.8, 5.3, 5.3, 5.4, 5.5, 5.7, 5.8, 5.9, 6.2, 6.2, 6.3, 6.6, 6.8, 6.9, 7.2, 8.1, 10.1, 12.2]
let newy = regla_distancia.sort(function(a,b) { return a-b; })


let regla_tiempo = []
let array_intérvalos = []
let array_frecuencia = []

extraer_distancia()
function extraer_distancia() {
    for (let i=0; i<regla_distancia.length; i++) {
        mostrar_regla.innerHTML += regla_distancia[i] + "  &nbsp;&nbsp;  "
    }
}

extraer_tiempos()
function extraer_tiempos(){
    let h = 6.0
    let g = 9.775
    let num = 1
    for (let i=0; i<regla_distancia.length; i++) {
        let tiempo = Math.sqrt((2*regla_distancia[i]/100)/g)
        regla_tiempo[i] = tiempo
        mostrar_tiempos.innerHTML += "<br>" + tiempo
        num++
    }
}

regla_sturges()
function regla_sturges() {
    let k1 = 1 + (3.322 * Math.log10(regla_distancia.length))
    p_sturges.innerHTML = "Resultado: " + k1
    return k1
}

let ancho_intervalo  = 0
let r = 0

tiempos()
function tiempos() {
    r = regla_tiempo.length - 1
    p_mínimo.innerHTML = regla_tiempo[0]
    p_máximo.innerHTML = regla_tiempo[r]
    // calculamos el rango
    let rango = regla_tiempo[r] - regla_tiempo[0]
    p_rango.innerHTML = rango

    let dato_sturges = regla_sturges()
    ancho_intervalo = rango / dato_sturges
    p_intervalo.innerHTML = ancho_intervalo

    // rango extendido
    let r1 = dato_sturges * ancho_intervalo
    p_r_extendido.innerHTML = r1

    // distribucion R y R1
    if((rango-r1)<0.0000000001) {
        let diferencia_rangos = 0 / 2
        p_d_rangos.innerHTML = diferencia_rangos
    }

    return ancho_intervalo
}




let ancho_intervalo_array = [0]
let ancho_dato = 0
let valor_maximo = regla_tiempo[regla_tiempo.length - 1]

let contador = 1
for (let i=0; i<=valor_maximo; i += ancho_intervalo) {
    ancho_dato += ancho_intervalo
    ancho_intervalo_array[contador] = ancho_dato
    contador++
}


let interval_names_array = [0]
let intervalo_frecuencia_array = [0]
let some = ""
let interval_names = ""
let interval_show_names = ""

intervalos_function ()
function intervalos_function (){
    for (let i=0; i<ancho_intervalo_array.length - 1; i++) {
        let counter = 0
        for (let j=0; j<regla_tiempo.length; j++) {
            if(regla_tiempo[j] > ancho_intervalo_array[i] && regla_tiempo[j] <= ancho_intervalo_array[i+1]){
                interval_names = " => (" + ancho_intervalo_array[i].toFixed(2) + ", "  + ancho_intervalo_array[i+1].toFixed(2) + "]"
                interval_show_names = ancho_intervalo_array[i].toFixed(2) + " - "  + ancho_intervalo_array[i+1].toFixed(2)
                some = regla_tiempo[j].toFixed(2) + interval_names
                counter++
                // console.log(some)
                p_datos_intervalos.innerHTML += `${some} <br>`
                intervalo_frecuencia_array[i+1] = counter
    
                interval_names_array[i+1] = interval_show_names
            } else {
                // console.log("vacio")
                intervalo_frecuencia_array[i+1] = counter
                // console.log(ancho_intervalo_array[i].toFixed(2))
                interval_show_names = ancho_intervalo_array[i].toFixed(2)  + " - "  + ancho_intervalo_array[i+1].toFixed(2);
                interval_names_array[i+1] = interval_show_names
            }
            
        }
    }
    // console.log(intervalo_frecuencia_array)
    // console.log(interval_names_array)
}

diferencias()
function diferencias() {
    let medio = 0.5

    let tiempo_suma = 0
    for(let i=0; i<regla_tiempo.length; i++){
        tiempo_suma += regla_tiempo[i]
    }
    let tiempo_conteo = regla_tiempo.length
    let tiempo_media = tiempo_suma/tiempo_conteo

    let diferencia_altura = 0.1

    let altura_suma = 0
    for(let i=0; i<newy.length; i++){
        altura_suma += newy[i]
    }
    let altura_conteo = newy.length
    let altura_media = altura_suma/altura_conteo

    let diferencia_gravedad = 0.39

    let gravedad_la_paz = 9.775

    let resultado = medio * (tiempo_media) * (Math.abs(diferencia_altura / altura_media) + Math.abs(diferencia_gravedad / gravedad_la_paz))
    resultado = resultado.toFixed(3)
    p_diferencia_tiempo.innerHTML = "La diferencia es " + resultado + "<br>" + "El tiempo = " + tiempo_media.toFixed(2) + " (+)(-) " + resultado
    console.log(resultado)
}


var ctx = document.getElementById('chart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [interval_names_array[1], interval_names_array[2], interval_names_array[3], interval_names_array[4], interval_names_array[5], interval_names_array[6], interval_names_array[7], interval_names_array[8]],
        datasets: [{
            label: '# of Votes',
            data: [intervalo_frecuencia_array[1], intervalo_frecuencia_array[2], intervalo_frecuencia_array[3], intervalo_frecuencia_array[4], intervalo_frecuencia_array[5], intervalo_frecuencia_array[6], intervalo_frecuencia_array[7], intervalo_frecuencia_array[8]],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 2,
            barPercentage: 1,
            categoryPercentage: 1
            
        }]
    },

    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});