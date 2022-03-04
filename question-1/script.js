/**
 * On this module you should write your answer to question #1.
 * This file would be executed with the following command (N=100):
 * $ node scritp.js 100
 */
var fs = require("fs");

function fact(n) {
    var res = 1;
    for(var i = 2; i <= n; i++) {
        res *= i;
    }
    return res;
}
function calcularOrdenesNoRedundantes(elementoDeS) {
    var suma = 0;
    for(valor of elementoDeS)
        suma += valor;
    res = fact(suma) / calcularOrdenesRedundantesPorOrden(elementoDeS);
    return res;
}

function calcularOrdenesRedundantesPorOrden(elementoDeS) {
    var ordenesRedundantesPorOrden = 1;
    for(valor of elementoDeS)
        ordenesRedundantesPorOrden *= fact(valor);
    return ordenesRedundantesPorOrden;
}

const args = process.argv.slice(-1);
console.log(`Running question #1 with args ${args}`);

const N = args;
var respuesta = 0;
var combinaciones = [];

// crear S
var cantidadUnos = parseInt(N);
var cantidadDos = 0;

while(cantidadUnos > 1) {
    combinaciones.push([cantidadUnos,cantidadDos]);
    cantidadUnos -= 2;
    cantidadDos++;
}
combinaciones.push([cantidadUnos,cantidadDos]);

console.log(combinaciones);

// Calcular respuesta
for(var combinacion of combinaciones) {
    console.log("------------------------------------------------------------");
    console.log(combinacion);

    // Si la cantidad de 1 o de 2 es 0, entonces solo hay un orden no redundante:
    // todos 1 o todos 2
    var ordenesNoRedundantes = 1;
    if(combinacion[0] != 0 && combinacion[1] != 0)
        ordenesNoRedundantes = calcularOrdenesNoRedundantes(combinacion);

    console.log(ordenesNoRedundantes);

    respuesta += ordenesNoRedundantes;
}

console.log("------------------------------------------------------------");

console.log(respuesta);
fs.writeFile("output.txt", respuesta.toString(), (err) => {
    if(err)
        throw err;
    console.log("Archivo respuesta escrito correctamete.");
});

